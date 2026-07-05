"use client";

import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";

export const AuthScreen: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas autoryzacji");
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div>
          <Image
            src="/bigLogo.png"
            alt="logo"
            width={50}
            height={50}
            className="h-12 w-12  mx-auto"
          />
          <h2 className="mt-6 text-center uppercase text-xl font-bold tracking-tight text-slate-900">
            {isRegister ? "rejestracja" : "logowanie"}
          </h2>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleAuth}>
          {error && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-600 rounded-xl font-medium">
              {error}
            </div>
          )}
          <div className="space-y-3 rounded-md">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                placeholder="Adres e-mail"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                placeholder="Hasło"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-xl bg-emerald-600 px-3 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition-colors uppercase tracking-wider shadow-sm"
            >
              {isRegister ? "Zarejestruj się" : "Zaloguj się"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
          >
            {isRegister
              ? "Masz już konto? Zaloguj się"
              : "Nie masz konta? Zarejestruj się"}
          </button>
        </div>
      </div>
    </div>
  );
};
