"use client";

import { useState, useEffect } from "react"; // <-- Dodaj useState
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { AuthScreen } from "@/components/AuthScreen";
import { useShoppingList } from "@/hooks/useShoppingList";
import AddProductForm from "@/components/AddProductForm";
import QuickAddGrid from "@/components/QuickAddGrid";
import SettingsModal from "@/components/SettingsModal"; // <-- Import modalu
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FaUserGear } from "react-icons/fa6";
import Loading from "@/components/Loading";

const VoiceForm = dynamic(() => import("@/components/VoiceForm"), {
  ssr: false,
});

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // <-- Stan otwarcia modalu
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // <-- Stan dla modalu potwierdzenia
  const {
    products,
    loading: listLoading,
    addProduct,
    toggleProductStatus,
    deleteProduct,
    clearList,
  } = useShoppingList(user?.uid || "");

  useEffect(() => {
    const loader = document.getElementById("global-loader");
    if (loader) {
      loader.style.display = "none";
    }
  }, []);

  if (authLoading) {
    return <Loading />;
  }
  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="flex bg-slate-100 min-h-full justify-center sm:py-6">
      <main className="relative flex w-full max-w-md flex-col bg-slate-50 shadow-xl sm:rounded-3xl sm:border sm:border-slate-200 overflow-hidden">
        {/* NAGŁÓWEK */}
        <header className="fixed top-0 left-0 w-full flex items-center justify-between bg-white px-4 py-4 border-b border-slate-200 shadow-sm z-10">
          <div className="flex items-center gap-2 min-w-0">
            {/* Zmieniono div na button, aby kliknięcie otwierało ustawienia */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="h-8 w-8 flex-shrink-0 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold text-white shadow-sm hover:bg-emerald-500 active:scale-95 transition-all text-center"
              title="Ustawienia konta"
            >
              <FaUserGear size={18} />
            </button>

            <span className="font-semibold text-slate-800 text-sm truncate">
              {user.displayName || user.email}
            </span>
          </div>

          <button
            onClick={() => signOut(auth)}
            className="text-slate-400 hover:text-red-500 p-1 flex-shrink-0 transition-colors"
            title="Wyloguj się"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </button>
        </header>

        {/* JEDNOLITY OBSZAR SCROLLOWANIA */}
        <div className="flex-1 mt-[10vh] overflow-y-auto px-4 py-4 space-y-5">
          <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-w-full overflow-hidden">
            <AddProductForm onAddProduct={(name) => addProduct(name, "inne")} />
            <VoiceForm onAddProduct={(name) => addProduct(name, "inne")} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Wózek
              </h2>
              {products.length > 0 && (
                <button
                  onClick={() => setIsConfirmOpen(true)}
                  className="text-xs font-bold text-red-900 transition-colors uppercase  py-2 px-3 bg-red-100/80 border border-red-900 rounded-2xl"
                >
                  Wyczyść listę
                </button>
              )}
            </div>

            {listLoading ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
              </div>
            ) : products.length === 0 ? (
              <p className="text-sm text-center text-slate-400 py-6 italic">
                Lista jest pusta. Wszystko kupione!
              </p>
            ) : (
              <ul className="space-y-2">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-150 ${
                      product.completed
                        ? "bg-slate-100/70 border-slate-200/60 text-slate-400 line-through"
                        : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <div
                      className="flex-1 cursor-pointer flex items-center gap-3 min-w-0"
                      onClick={() =>
                        toggleProductStatus(product.id, product.completed)
                      }
                    >
                      <div
                        className={`h-5 w-5 flex-shrink-0 rounded-md border flex items-center justify-center transition-colors ${
                          product.completed
                            ? "bg-emerald-600 border-emerald-600"
                            : "border-slate-300 bg-slate-50"
                        }`}
                      >
                        {product.completed && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="w-3.5 h-3.5 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-base font-semibold lowercase">
                        {product.name}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-slate-400 hover:text-red-500 p-1 flex-shrink-0 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pb-6">
            <QuickAddGrid
              onAddProduct={(name, category) => addProduct(name, category)}
            />
          </div>
        </div>
      </main>
      {/* RENDEROWANIE MODALU USTAWIEŃ */}
      {isSettingsOpen && (
        <SettingsModal user={user} onClose={() => setIsSettingsOpen(false)} />
      )}

      {/* MODAL POTWIERDZENIA CZYSZCZENIA LISTY */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-4 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-xl text-red-500 font-bold">
              ⚠️
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Czy na pewno?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Ta operacja bezpowrotnie usunie wszystkie produkty znajdujące
                się obecnie w wózku.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors uppercase tracking-wider"
              >
                Anuluj
              </button>
              <button
                onClick={() => {
                  clearList();
                  setIsConfirmOpen(false);
                }}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-red-500 active:bg-red-700 transition-all uppercase tracking-wider"
              >
                Wyczyść
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
