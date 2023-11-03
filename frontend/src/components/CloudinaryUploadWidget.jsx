import { Button } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId, onUploadSuccess }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = (e) => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            setPublicId(result.info.public_id);
            onUploadSuccess(result.info.secure_url);
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };
  

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
       <Button 
        component="label" 
        variant="contained" 
        startIcon={<CloudUploadIcon />}
        id="upload_widget"
        type="submit"
        style={{ paddingLeft: 16, marginRight: 16, marginTop:12, paddingTop: 10 }}
        onClick={initializeCloudinaryWidget}
       >
        Upload Picture
      </Button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
