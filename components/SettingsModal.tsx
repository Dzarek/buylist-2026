"use client";

import React, { useState } from "react";
import { User, updateProfile, updatePassword } from "firebase/auth";

interface SettingsModalProps {
  user: User;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ user, onClose }) => {
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [newPassword, setNewPassword] = useState("");

  const [nameMessage, setNameMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);
  const [passMessage, setPassMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const [nameLoading, setNameLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameMessage(null);
    setNameLoading(true);

    try {
      await updateProfile(user, { displayName: displayName.trim() });
      setNameMessage({
        text: "Nazwa użytkownika została zaktualizowana!",
        isError: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setNameMessage({
        text: error.message || "Błąd aktualizacji nazwy",
        isError: true,
      });
    } finally {
      setNameLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMessage(null);

    if (newPassword.length < 6) {
      setPassMessage({
        text: "Hasło musi mieć minimum 6 znaków",
        isError: true,
      });
      return;
    }

    setPassLoading(true);
    try {
      await updatePassword(user, newPassword);
      setPassMessage({ text: "Hasło zostało zmienione!", isError: false });
      setNewPassword("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Firebase może wymagać ponownego zalogowania (recent-login), jeśli użytkownik zalogował się dawno temu
      setPassMessage({
        text:
          error.code === "auth/requires-recent-login"
            ? "Wymagane ponowne zalogowanie przed zmianą hasła."
            : error.message || "Błąd aktualizacji hasła",
        isError: true,
      });
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 border border-slate-200 shadow-2xl space-y-5">
        {/* NAGŁÓWEK MODALU */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Ustawienia Konta
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm"
          >
            Zamknij
          </button>
        </div>

        {/* SEKCJA 1: ZMIANA NAZWY */}
        <form onSubmit={handleUpdateName} className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Nazwa użytkownika / rodziny
          </label>
          {nameMessage && (
            <div
              className={`p-2.5 text-xs rounded-xl font-medium ${nameMessage.isError ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"}`}
            >
              {nameMessage.text}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="np. Dorota i Jarek ❤️"
              className="flex-1 min-w-0 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-800 border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={nameLoading}
              className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 active:bg-emerald-700 transition-all disabled:opacity-50"
            >
              Zapisz
            </button>
          </div>
        </form>

        <hr className="border-slate-100" />

        {/* SEKCJA 2: ZMIANA HASŁA */}
        <form onSubmit={handleUpdatePassword} className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Zmień hasło
          </label>
          {passMessage && (
            <div
              className={`p-2.5 text-xs rounded-xl font-medium ${passMessage.isError ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"}`}
            >
              {passMessage.text}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="nowe hasło (min. 6 znaków)"
              className="flex-1 min-w-0 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-800 border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={passLoading || !newPassword}
              className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 active:bg-emerald-700 transition-all disabled:opacity-50"
            >
              Zmień
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
