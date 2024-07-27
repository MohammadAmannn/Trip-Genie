import React, { useEffect } from 'react';

const AutoSuggestComponent = ({ onChange }) => {
  useEffect(() => {
    const accessToken = import.meta.env.VITE_APP_ACCESS_TOKEN

    // Function to dynamically load a script and execute a callback once the script is loaded
    const loadScript = (url, callback) => {
      const script = document.createElement('script'); // Create a new script element
      script.src = url; // Set the source URL of the script
      script.async = true; // Set the script to load asynchronously
      script.onload = callback; // Set the callback to be called once the script is loaded
      script.onerror = () => console.error(`Error loading script: ${url}`); // Log an error if the script fails to load
      document.body.appendChild(script); // Append the script element to the body
    };

    // Function to initialize the autosuggest search functionality
    const initializeAutoSuggest = () => {
      // Check if the Mappls SDK is loaded
      if (!window.mappls) {
        console.error('Mappls SDK not loaded');
        return;
      }

      // Configuration options for the search
      const optional_config = {
        region: 'IND', // Set the region to India
        height: 300 // Set the height of the search box
      };

      try {
        // Get the search input element
        const searchElement = document.getElementById('auto');
        // Check if the search function is available
        if (window.mappls.search) {
          // Initialize the search functionality
          new window.mappls.search(searchElement, optional_config, (data) => {
            // Handle the search result
            if (data) {
              const dt = data[0]; // Get the first result
              if (!dt) return false; // If no data, exit
              const eloc = dt.eLoc; // Get the eLoc of the place
              const place = dt.placeName + ', ' + dt.placeAddress; // Format the place details
              console.log('Selected Place:', place, 'eLoc:', eloc); // Log the selected place and eLoc
              if (onChange) {
                onChange(place); // Pass the selected place to the parent component
              }
            }
          });
        } else {
          console.error('mappls.search is not available'); // Log an error if search function is not available
        }
      } catch (e) {
        console.error('Error initializing mappls.search:', e); // Catch and log any errors during initialization
      }
    };

    // Load the Mappls SDK and initialize the autosuggest once it's loaded
    loadScript(`https://apis.mappls.com/advancedmaps/api/${accessToken}/map_sdk?layer=vector&v=3.0&callback=initAutoSuggest`, () => {
      loadScript(`https://apis.mappls.com/advancedmaps/api/${accessToken}/map_sdk_plugins?v=3.0`, () => {
        if (window.initAutoSuggest) {
          window.initAutoSuggest();
        }
      });
    });

    // Set the callback function to initialize the autosuggest
    window.initAutoSuggest = initializeAutoSuggest;

    // Cleanup function to remove scripts when the component is unmounted
    return () => {
      const scripts = document.querySelectorAll('script[src*="mappls.com"]'); // Select all Mappls scripts
      scripts.forEach(script => document.body.removeChild(script)); // Remove each script from the body
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="relative p-4">
      {/* Input field for search */}
      <input
        type="text"
        id="auto"
        name="auto"
        placeholder="Search places or eLoc's..."
        required
        spellCheck="false"
        className="w-[100%] h-10 text-lg px-4 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-colors md:flex min-w-20 "
      />
    </div>
  );
};

export default AutoSuggestComponent;
