import React, { useEffect, useState } from "react";
import AutoSuggestComponent from "../create-trip/Autocomplete";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOption, SelectTravelList } from "@/constent/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AImodel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [formField, setFormData] = useState({
    Destination: "",
    NoOfDays: "",
    Budget: "",
    Members: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formField, [name]: value });
  };

  useEffect(() => {
    console.log(formField);
  }, [formField]);

  const onGenerateTrip = async () => {
    const { Destination, NoOfDays, Budget, Members } = formField;

    if (!Destination || !NoOfDays || !Budget || !Members) {
      toast("Please fill in all the required fields correctly.");
      return;
    }

    setLoading(true);
    const finalPrompt = AI_PROMPT.replace('{location}', Destination)
      .replace('{totaldays}', NoOfDays)
      .replace('{traveler}', Members)
      .replace('{budget}', Budget)
      .replace('{totaldays}', NoOfDays);

    toast("Creating Your Trip, Please Wait...");
    console.log('Prompt:', finalPrompt);

    try {
      const result = await chatSession.sendMessage(finalPrompt);
      console.log('AI Response:', result?.response?.text());
      saveAiTrip(result?.response?.text());
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveAiTrip = async (tripData) => {
    setLoading(true);
    try {
      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userChoice: formField,
        tripData: JSON.parse(tripData),
        id: docId
      });

      toast.success("Trip created successfully!");
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error("Failed to save trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 lg:p-16 xl:p-20 mx-auto max-w-4xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 opacity-30"></div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-white text-center">Tell Us Your Travel Preferences 🏕️</h2>
        <p className="text-lg text-gray-200 mb-8 text-center">
          Our AI Trip Planner revolutionizes the way you plan your travels.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">What Is Your Destination Of Choice?</h3>
            <AutoSuggestComponent onChange={(value) => handleInputChange("Destination", value)} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">How Many Days Are You Planning Your Trip?</h3>
            <Input 
              placeholder="Ex. 3" 
              type="number" 
              onChange={(e) => handleInputChange("NoOfDays", e.target.value)} 
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">What Is Your Budget?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SelectBudgetOption.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => handleInputChange('Budget', item.title)} 
                  className={`p-4 border rounded-lg cursor-pointer transition-transform transform ${formField?.Budget === item.title ? 'bg-blue-300 border-blue-500 shadow-lg scale-105' : 'hover:bg-blue-200'}`}>
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-lg font-medium ml-2">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">Select Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SelectTravelList.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => handleInputChange('Members', item.title)} 
                  className={`p-4 border rounded-lg cursor-pointer transition-transform transform ${formField?.Members === item.title ? 'bg-blue-300 border-blue-500 shadow-lg scale-105' : 'hover:bg-blue-200'}`}>
                  <span className="text-3xl">{item.icon}</span>
                  <span className="ml-2 font-medium">{item.title}</span>
                  <span className="text-gray-300 ml-2">{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button onClick={onGenerateTrip} disabled={loading} className="w-full md:w-auto">
            {loading ? "Generating..." : "Generate Trip"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
