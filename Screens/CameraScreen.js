import React, { useRef, useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StyleSheet, Text, View, Image } from "react-native";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const [colors, setColors] = useState([]);

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>We need camera permission</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Function to process the camera frame
  const processFrame = async () => {
    if (cameraRef.current) {
      const frame = await cameraRef.current.takePictureAsync({
        quality: 0.1, // Lower quality for faster processing
        base64: true, // Get the image as a base64 string
      });

      if (frame.base64) {
        // Analyze the frame for colors
        const dominantColor = getDominantColor(frame.base64);
        setColors([dominantColor]); // Update the state with the detected color
      }
    }
  };

  // Function to get the dominant color from an image (simplified)
  const getDominantColor = (base64Image) => {
    // This is a placeholder function. Replace it with actual color detection logic.
    // For example, you can use a library like `color-thief` or `vibrant.js`.
    console.log("Processing image for dominant color...");
    return "#FF0000"; // Return a placeholder color (red)
  };

  // Continuously process frames in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      processFrame();
    }, 100); // Process frames every 100ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        facing={facing}
        mode="picture"
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.overlay}>
          <Text style={styles.colorText}>
            Detected Color: {colors[0] || "None"}
          </Text>
        </View>
        <View style={styles.shutterContainer}>
          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  colorText: {
    color: "white",
    fontSize: 16,
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
});