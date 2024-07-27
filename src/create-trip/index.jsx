import React, { useEffect, useState } from "react";
import AutoSuggestComponent from "../create-trip/Autocomplete"; // Ensure the correct path
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOption, SelectTravelList } from "@/constent/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AImodel";
import { doc, documentId, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig"; // Make sure to import the Firestore database
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [formField, setFormData] = useState({
    Destination: "",
    NoOfDays: "",
    Budget: "",
    Members: ""
  });

  const [Loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const handleInputChange = (name, value) => {
    setFormData({ ...formField, [name]: value });
  };

  useEffect(() => {
    console.log(formField);
  }, [formField]);

  const OnGenerateTrip = async () => {
    const { Destination, NoOfDays, Budget, Members } = formField;

    if (!Destination || !NoOfDays || !Budget || !Members) {
      toast("Please fill in all the required fields correctly.");
      return;
    }

    // if (Number(NoOfDays) <= 5) {
    //   toast("Number of days should be greater than 5.");
    //   return;
    // }

    setLoading(true);
    const final_prompt = AI_PROMPT.replace('{location}', formField?.Destination)
      .replace('{totaldays}', formField?.NoOfDays)
      .replace('{traveler}', formField?.Members)
      .replace('{budget}', formField?.Budget)
      .replace('{totaldays}', formField?.NoOfDays);

    toast("Creating Your Trip Please Wait");
    console.log('Prompt:', final_prompt); // Log the final prompt for debugging

    try {
      const result = await chatSession.sendMessage(final_prompt);
      console.log('AI Response:', result?.response?.text());
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error('Error generating trip:', error); // Log the specific error
      toast.error("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    try {
      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips",docId), {
        userChoice: formField,
        tripData: JSON.parse(TripData),
        id:docId
      });


      toast.success("Trip created successfully!");
      navigate('/view-trip/'+docId)
    } catch (error) {
      console.error('Error saving trip:', error); // Log the specific error
      toast.error("Failed to save trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell Us Your Travel Preference 🏕️</h2>
      <p className="mt-3 text-xl text-gray-500">
        Our AI Trip Planner revolutionizes the way you plan your travels.
      </p>
      <div className="mt-10 flex flex-col ">
        <div>
          <h2 className="text-xl flex font-medium">
            What Is Your Destination Of Choice?
          </h2>
          <AutoSuggestComponent onChange={(value) => handleInputChange("Destination", value)} />
        </div>
        <div>
          <h2 className="text-xl flex my-6 font-medium">
            How Many Days Are You Planning Your Trip?
          </h2>
          <Input 
            placeholder="Ex. 3" 
            type="number" 
            onChange={(e) => handleInputChange("NoOfDays", e.target.value)} 
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-6 flex font-medium">What Is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 ">
          {SelectBudgetOption.map((item, index) => (
            <div 
              key={index}
              onClick={() => handleInputChange('Budget', item.title)} 
              className={`p-4 border rounded-lg cursor-pointer 
                ${formField?.Budget === item.title ? 'shadow-lg border-blue-500' : 'hover:shadow-lg'}
              `}>
              <span className="text-4xl">{item.icon}</span>
              <span className="text-lg">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl flex my-6 font-medium">Select Members</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 ">
          {SelectTravelList.map((item, index) => (
            <div 
              key={index} 
              onClick={() => handleInputChange('Members', item.title)} 
              className={`p-4 border rounded-lg cursor-pointer 
                ${formField?.Members === item.title ? 'shadow-lg border-blue-500' : 'hover:shadow-lg'}
              `}>
              <span className="text-4xl">{item.icon}</span>
              <span className="ml-2">{item.title}</span>
              <span className="ml-2">{item.description}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button onClick={OnGenerateTrip} disabled={Loading}>
          {Loading ? "Generating..." : "Generate Trip"}
        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;