import React from "react";
import styles from "./style.js";
import { Button } from "@mui/material";
import { useState } from "react";
import { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const Homepage = () => {
  const [caption, setCaption] = useState("");

  async function uploadImage(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch(
        "https://my-caption-app1-altlcaiirq-uc.a.run.app/process-image/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      return result.text;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("file testt", file);
      const generatedCaption = await uploadImage(file);
      setCaption(generatedCaption);
    }
  };
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Image Caption Generator</h1>
        <p>Upload an image or photo and generate captions with AI.</p>
      </div>

      <p>1. UPLOAD PHOTO OR IMAGE</p>
      <div>
        <div style={styles.uploadcontainer}>
          <div style={styles.uploadbox} onClick={handleUploadClick}>
            <div style={styles.uploadicon}>
              <CloudUploadIcon style={{ fontSize: "inherit" }} />
            </div>
            <div>Click to Upload</div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        {caption && <div>Caption: {caption}</div>}
      </div>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Generate Captions
      </Button>
    </div>
  );
};

export default Homepage;
