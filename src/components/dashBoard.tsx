import { useEffect, useState } from "react";
import type { LoggedInUser } from "../types/auth";
import SnailPayForm from "./DashBoard/snailPayForm";
import HomeDashBoard from './DashBoard/homeDashBoard'

interface DashboardProps{
    user: LoggedInUser,
    onLogout: () =>void,
}

function DashBoard({
        user,
        onLogout,
    }: DashboardProps){

    const [menu, setMenu] = useState(false);
    const [viewMain, setViewMain] = useState <
        "homeDashBoard" |
        "depositCash"
        >("homeDashBoard");

    const handleSelectOption = (
        option: "depositCash"
    ) => {
        setViewMain(option);
        window.history.pushState(null, "");
    };

    useEffect(() => {
        const handleBack = () =>{
            setViewMain("homeDashBoard");
        };

        window.addEventListener('popstate', handleBack);
        return () => {
            window.removeEventListener("popstate", handleBack);
        }
    }, []);

    return(
        <div className="min-h-screen bg-linear-to-br from-[#6b4226] via-[#9a6845] to-[#d1a77d]">
            <header className="flex items-center justify-between border-b-4 border-white bg-[#5A3825] pl-6 py-2.5 shadow-sm">
                <h1 className="text-2xl tracking-wider font-extrabold text-white">
                    <span className="text-3xl">🏁</span> CARRERA DE CARACOLES <span className="text-3xl">🐌</span>
                </h1>

                <div className="relative">
                    <button onClick={() => setMenu(!menu)} className="flex items-center gap-2 pl-3 py-2 pr-9 transition hover:bg-[#7e4f2f]">
                        <div className="inline-flex items-center gap-2">
                            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm shrink-0">
                                <span className="text-xl">👤</span>
                            </div>
                            <span className="font-medium text-lg tracking-wider text-fuchsia-50">
                                {user.name}
                            </span>
                        </div>
                        <span className={`text-white transition-transform
                            ${
                                menu ? "rotate-180" : ""
                            }`}
                            >
                            ▼        
                        </span>
                    </button>

                    {menu && (
                        <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                            <button onClick={onLogout} className="w-full px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50">
                                🚪Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="w-full px-6 py-10">

                {viewMain ==="homeDashBoard" && <HomeDashBoard user={user} onSelectOption={handleSelectOption}/>}
                {viewMain ==="depositCash" && <SnailPayForm/>}

            </main>
        </div>
    )
}

 export default DashBoard;