import { useState } from "react";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  const [view,setView]=useState<"index" | "login" | "register">("index");

  return (
    <div className="min-h-screen p-5 bg-linear-to-br from-[#5A3825] via-[#8A5A3B] to-[#C79A6B]">
        {view==="index" && (
          <div className="fade-in flex flex-col md:flex-row min-h-screen items-center justify-center gap-4">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-2">
              <h1 className="font-mono text-shadow-2xs text-shadow-white tracking-wide px-4 py-2 text-center md:text-left mt-4 text-5xl md:text-7xl font-bold text-amber-950 ">CARRERA DE CARACOLES</h1>
              <img className="w-90 md:w-100 lg:w-110 h-auto object-cover" alt="Turbo" src="https://i.pinimg.com/originals/5e/64/1b/5e641b4cd21107ef7894f11d58ef89d2.png"/>
            </div>
            <div className="md:w-1/2 flex w-full max-w-sm flex-row gap-4 px-6 md:flex-col">
              <button onClick={()=>setView("login")} className="rounded-xl bg-white px-6 py-4 text-lg font-bold text-[#6b4226] shadow-lg transition hover:scale-[1.02] hover:bg-[#f8f1eb]">
                Tengo una cuenta
              </button>
              <button onClick={()=>setView("register")} className="rounded-xl border-2 border-white bg-transparent px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-[1.02] hover:bg-white/10">
                Crear una cuenta
              </button>
            </div>
          </div>
        )}

        {view === "login" && (
          <div className="fade-in">
            <Login setView={setView}/>
          </div>
        )}

        {view === "register" && (
          <div className="fade-in">
            <Register setView={setView} />
          </div>
        )}
    </div>
  )
}

export default App