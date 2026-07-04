"use client";

import React, { useState } from "react";

interface AddProductFormProps {
  onAddProduct: (name: string) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddProduct(inputValue);
    setInputValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 max-w-full"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="wpisz nazwę produktu..."
        className="flex-1 min-w-0 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
      />
      <button
        type="submit"
        disabled={!inputValue.trim()}
        className="flex-shrink-0 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm  active:bg-emerald-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider"
      >
        Dodaj
      </button>
    </form>
  );
};

export default AddProductForm;
