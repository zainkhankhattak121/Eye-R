import React, { useRef, useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, Pressable, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Platform, Alert } from "react-native";
import { Image } from "expo-image";
import { AntDesign, Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const BASE_URL = "https://zainkhankhattak121-colordetection.hf.space";

export default function ColorIdentificationScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef(null);
  const [uri, setUri] = useState(null);
  const [mode, setMode] = useState("picture");
  const [facing, setFacing] = useState("back");
  const [recording, setRecording] = useState(false);
  const [detectedColor, setDetectedColor] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoDetect, setAutoDetect] = useState(false);
  const [serverOk, setServerOk] = useState(null); // null=unknown, true/false=status
  const detectionInterval = useRef(null);

  // Auto-detection loop
  useEffect(() => {
    if (autoDetect) {
      detectionInterval.current = setInterval(() => {
        if (!isProcessing) detectColorAtCenter();
      }, 1000);
    } else {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
        detectionInterval.current = null;
      }
    }
    return () => {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
        detectionInterval.current = null;
      }
    };
  }, [autoDetect, isProcessing]);

  // Simple server health check (root route must exist on backend)
  const checkServer = async () => {
    try {
      const res = await fetch(`${BASE_URL}/`);
      setServerOk(res.ok);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
    } catch (e) {
      setServerOk(false);
      Alert.alert("Server not reachable", `Tried: ${BASE_URL}\n${e.message}`);
    }
  };

  useEffect(() => {
    // auto-check once when screen mounts
    checkServer();
  }, []);

  const detectColorAtCenter = async () => {
    if (!ref.current || isProcessing) return;
    try {
      setIsProcessing(true);

      const photo = await ref.current.takePictureAsync({
        quality: 0.3,
        base64: false,
        skipProcessing: true,
      });

      const formData = new FormData();
      formData.append("file", {
        uri: photo.uri,
        name: "color.jpg",
        type: "image/jpeg",
      });

      // DO NOT set Content-Type manually; let fetch add the boundary
      const response = await fetch(`${BASE_URL}/detect-color`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        setDetectedColor(data);
      }
    } catch (error) {
      console.error("Color detection error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getHexColor = (rgb) => {
    if (!rgb) return "";
    return rgb.map((c) => parseInt(c, 10).toString(16).padStart(2, "0")).join("");
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", color: "white", marginBottom: 20 }}>
          We need camera permission to detect colors
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" color="#4a90e2" />
      </View>
    );
  }

  const takePicture = async () => {
    if (ref.current) {
      const photo = await ref.current.takePictureAsync();
      setUri(photo.uri);
    }
  };

  const recordVideo = async () => {
    if (recording) {
      setRecording(false);
      ref.current?.stopRecording();
      return;
    }
    setRecording(true);
    if (ref.current) {
      const video = await ref.current.recordAsync();
      console.log({ video });
    }
  };

  const toggleMode = () => setMode((prev) => (prev === "picture" ? "video" : "picture"));
  const toggleFacing = () => setFacing((prev) => (prev === "back" ? "front" : "back"));
  const resetCamera = () => {
    setUri(null);
    setDetectedColor(null);
  };
  const toggleAutoDetect = () => setAutoDetect((x) => !x);

  return (
    <View style={styles.container}>
      {uri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri }} contentFit="contain" style={styles.previewImage} />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton} onPress={resetCamera}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cameraWrapper}>
          <CameraView
            style={styles.camera}
            ref={ref}
            mode={mode}
            facing={facing}
            mute={false}
            responsiveOrientationWhenOrientationLocked
          >
            {/* Center crosshair */}
            <View style={styles.targetContainer}>
              <View style={styles.targetHorizontal} />
              <View style={styles.targetVertical} />
            </View>

            {/* Server status pill */}
            <View style={styles.serverPill}>
              <Text style={styles.serverText}>
                {serverOk === null ? "Checking server…" : serverOk ? "Server: Online" : "Server: Offline"}
              </Text>
              <TouchableOpacity onPress={checkServer} style={styles.serverRetry}>
                <Text style={styles.serverRetryText}>Ping</Text>
              </TouchableOpacity>
            </View>

            {detectedColor && (
              <View style={styles.colorInfo}>
                <View
                  style={[
                    styles.colorPreview,
                    { backgroundColor: `rgb(${detectedColor.rgb.join(",")})` },
                  ]}
                />
                <Text style={styles.colorText}>{detectedColor.color_name}</Text>
                <Text style={styles.colorText}>RGB: {detectedColor.rgb.join(", ")}</Text>
                <Text style={styles.colorText}>HEX: #{getHexColor(detectedColor.rgb)}</Text>
              </View>
            )}

            <View style={styles.bottomControls}>
              <View style={styles.detectionControls}>
                <TouchableOpacity
                  onPress={autoDetect ? () => setAutoDetect(false) : detectColorAtCenter}
                  style={[
                    styles.detectButton,
                    autoDetect && styles.detectButtonActive,
                    isProcessing && styles.processingButton,
                  ]}
                  disabled={isProcessing}
                >
                  <MaterialIcons name="color-lens" size={24} color={autoDetect ? "#4a90e2" : "white"} />
                  <Text style={styles.detectButtonText}>
                    {autoDetect ? "Auto Detecting" : "Detect Color"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleAutoDetect} style={styles.autoToggle}>
                  <Text style={styles.autoToggleText}>{autoDetect ? "Stop Auto" : "Start Auto"}</Text>
                </TouchableOpacity>

                {isProcessing && <ActivityIndicator size="small" color="#4a90e2" style={styles.loadingIndicator} />}
              </View>

              <View style={styles.shutterContainer}>
                <Pressable onPress={toggleMode} style={styles.modeButton}>
                  {mode === "picture" ? (
                    <AntDesign name="picture" size={28} color="white" />
                  ) : (
                    <Feather name="video" size={28} color="white" />
                  )}
                </Pressable>

                <Pressable onPress={mode === "picture" ? takePicture : recordVideo} style={styles.shutterButton}>
                  <View
                    style={[
                      styles.shutterBtn,
                      recording && styles.recordingIndicator,
                      { borderColor: mode === "picture" ? "white" : "red" },
                    ]}
                  >
                    <View
                      style={[
                        styles.shutterBtnInner,
                        { backgroundColor: mode === "picture" ? "white" : "red" },
                      ]}
                    />
                  </View>
                </Pressable>

                <Pressable onPress={toggleFacing} style={styles.flipButton}>
                  <FontAwesome6 name="rotate-left" size={28} color="white" />
                </Pressable>
              </View>
            </View>
          </CameraView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  cameraWrapper: { flex: 1, position: "relative" },
  camera: { flex: 1, width: "100%" },
  previewContainer: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  previewImage: { width: "100%", height: "80%" },
  bottomControls: { position: "absolute", bottom: 0, left: 0, right: 0, paddingBottom: 20 },
  detectionControls: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 20 },
  detectButton: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  detectButtonActive: { backgroundColor: "rgba(74,144,226,0.2)", borderColor: "#4a90e2" },
  processingButton: { opacity: 0.7 },
  detectButtonText: { color: "white", fontSize: 16, marginLeft: 8 },
  autoToggle: { marginLeft: 10, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.15)" },
  autoToggleText: { color: "white", fontSize: 14 },
  loadingIndicator: { marginLeft: 10 },
  shutterContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 30 },
  shutterButton: { alignItems: "center", justifyContent: "center" },
  shutterBtn: { backgroundColor: "transparent", borderWidth: 4, width: 75, height: 75, borderRadius: 37.5, alignItems: "center", justifyContent: "center" },
  shutterBtnInner: { width: 60, height: 60, borderRadius: 30 },
  recordingIndicator: { borderColor: "red" },
  modeButton: { padding: 15 },
  flipButton: { padding: 15 },
  colorInfo: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 150,
  },
  colorPreview: { width: 60, height: 60, borderRadius: 30, marginBottom: 10, borderWidth: 2, borderColor: "rgba(255,255,255,0.5)" },
  colorText: { color: "white", fontSize: 16, marginVertical: 2, textAlign: "center" },
  buttonRow: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  actionButton: { backgroundColor: "#4a90e2", paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  targetContainer: { position: "absolute", top: "50%", left: "50%", marginLeft: -25, marginTop: -25, width: 50, height: 50, justifyContent: "center", alignItems: "center" },
  targetHorizontal: { position: "absolute", width: 50, height: 2, backgroundColor: "rgba(255,255,255,0.7)" },
  targetVertical: { position: "absolute", width: 2, height: 50, backgroundColor: "rgba(255,255,255,0.7)" },
  serverPill: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  serverText: { color: "white", fontSize: 12 },
  serverRetry: { marginLeft: 6, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 10 },
  serverRetryText: { color: "white", fontSize: 12 },
});
