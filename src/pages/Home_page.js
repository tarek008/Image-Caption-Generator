import React from "react";
import styles from "./style.js";
import { useState } from "react";
import { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect } from "react";
import TextToSpeech from "./text_to_speech.js";
import Webcam from "react-webcam";
import { Button } from "@mui/material";

const Homepage = () => {
  const [caption, setCaption] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false); // State to manage camera activation
  const webcamRef = useRef(null); // Reference to the webcam component
  const [useRearCamera, setUseRearCamera] = useState(true);

  const videoConstraints = {
    facingMode: useRearCamera ? { exact: "environment" } : "user",
  };

  useEffect(() => {
    // This will clean up the object URL when the component unmounts
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  async function uploadImage(imageFile) {
    console.log("Uploading image...", imageFile);
    const formData = new FormData();
    formData.append("file", imageFile);
    console.log("Uploading image2...", formData);

    try {
      const response = await fetch(
        "https://my-caption-app-altlcaiirq-od.a.run.app/process-image/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Uploading image3...", response);
      const result = await response.json();
      console.log("Uploading image4...", result);
      return result.text;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file)); // Display the image
      setLoading(true); // Start loading
      try {
        var generatedCaption = await uploadImage(file);
        generatedCaption = generatedCaption
          .replace("startseq", "")
          .replace("endseq", "")
          .trim();
        setCaption(generatedCaption); // Set the generated caption
      } catch (error) {
        setCaption("Failed to load caption."); // Set error message if there's an error
      }
      setLoading(false); // Stop loading
    }
  };
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc); // Display the captured image

    // Convert the image src (base64) to a blob
    const response = await fetch(imageSrc);
    const blob = await response.blob();

    // Create a file from the blob
    const file = new File([blob], "webcam-image.jpg", { type: "image/jpeg" });

    // Set loading state to true before the upload
    setLoading(true);

    try {
      let generatedCaption = await uploadImage(file);
      if (generatedCaption) {
        generatedCaption = generatedCaption
          .replace("startseq", "")
          .replace("endseq", "")
          .trim();
        setCaption(generatedCaption);
        setLoading(false); // Set loading to false after the upload and setting the caption
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setCaption("Failed to load caption.");
      setLoading(false);
    }
  }, [webcamRef]);
  // Function to toggle between front and rear cameras
  const toggleCamera = () => {
    setUseRearCamera(!useRearCamera);
  };
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Image Caption Generator</h1>
        <p>Upload an image or photo and generate captions with AI.</p>
      </div>
      <div style={styles.uploadcontainer}>
        <p>1. UPLOAD PHOTO OR IMAGE</p>

        <div style={styles.uploadbox} onClick={handleUploadClick}>
          <div style={styles.uploadicon}>
            {imageSrc ? (
              <img src={imageSrc} alt="Uploaded" style={styles.imagePreview} />
            ) : (
              <CloudUploadIcon style={{ fontSize: "inherit" }} />
            )}
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
      {loading ? (
        <div style={styles.caption}>Loading caption...</div>
      ) : (
        caption && (
          <div style={styles.caption}>
            {caption} <TextToSpeech text={caption} />{" "}
          </div>
        )
      )}{" "}
      {isCameraOn && (
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg"
          style={styles.webcam} // You need to define this style
        />
      )}
      <Button onClick={toggleCamera}>Toggle Camera</Button>
      <Button onClick={() => setIsCameraOn(!isCameraOn)}>
        {isCameraOn ? "Turn off Camera" : "Turn on Camera"}
      </Button>
      {isCameraOn && <Button onClick={capture}>Capture Photo</Button>}
    </div>
  );
};

export default Homepage;
