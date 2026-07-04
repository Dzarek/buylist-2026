const loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 p-4 animate-fade-in">
      <div className="flex h-full w-full max-w-md flex-col items-center justify-center bg-white p-8 shadow-xl rounded-3xl border border-slate-100 text-center space-y-10">
        {/* Nowoczesny wskaźnik ładowania z pulsującym tłem i ikoną wózka */}
        <div className="relative flex items-center justify-center">
          {/* Zewnętrzny, pulsujący pierścień */}
          <div className="absolute h-16 w-16 rounded-full bg-emerald-100 animate-ping opacity-75"></div>

          {/* Środkowy okrąg z gradientem */}
          <div className="relative h-14 w-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white animate-pulse"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
        </div>

        {/* Tekst informacyjny */}
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Synchronizacja listy
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Sprawdzam stan sesji i pobieram produkty...
          </p>
        </div>
      </div>
    </div>
  );
};

export default loading;
