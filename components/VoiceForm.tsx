"use client";

import React, { useState, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface VoiceFormProps {
  onAddProduct: (name: string) => void;
}

const VoiceForm: React.FC<VoiceFormProps> = ({ onAddProduct }) => {
  const [alertText, setAlertText] = useState<string>("");
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  const commands = [
    {
      command: "*",
      callback: (food: string) => {
        if (food) {
          onAddProduct(food);
          showAlert("Dodano do listy");
        }
      },
    },
  ];

  const { listening, browserSupportsSpeechRecognition } = useSpeechRecognition({
    commands,
  });

  const showAlert = (text: string) => {
    setAlertText(text);
    setIsAlertVisible(true);
  };

  // Obsługa automatycznego znikania powiadomienia
  useEffect(() => {
    if (isAlertVisible && alertText === "Nagrywanie zakończone") {
      const timer = setTimeout(() => {
        setIsAlertVisible(false);
        setAlertText("");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isAlertVisible, alertText]);

  const handleVoice = () => {
    if (!listening) {
      showAlert("Powiedz nazwę produktu...");
      SpeechRecognition.startListening({ continuous: true, language: "pl-PL" }); // Warto dodać język polski
    } else {
      showAlert("Nagrywanie zakończone");
      SpeechRecognition.stopListening();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return null; // Zwracamy null zamiast pustego div, czystszy kod w TS
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Dynamiczny Alert w Tailwindzie zamiast mutowania DOM */}
      <div
        className={`w-full text-center text-sm py-1.5 px-3 rounded-lg transition-all duration-300 ${
          isAlertVisible
            ? "opacity-100 scale-100 bg-emerald-900/80 text-emerald-200 border border-emerald-800/50"
            : "opacity-0 scale-95 pointer-events-none h-0 p-0 overflow-hidden"
        }`}
      >
        {alertText}
      </div>

      {/* Przycisk Mikrofonu */}
      <button
        type="button"
        onClick={handleVoice}
        className={`flex items-center justify-center w-14 h-14 rounded-full text-xl transition-all duration-300 shadow-lg ${
          listening
            ? "bg-emerald-800 text-white animate-pulse ring-4 ring-emerald-600/30"
            : "bg-emerald-600 text-slate-100 hover:bg-slate-700 "
        }`}
        aria-label="Dodaj produkt głosowo"
      >
        <FaMicrophone className={listening ? "scale-110" : ""} />
      </button>
    </div>
  );
};

export default VoiceForm;
