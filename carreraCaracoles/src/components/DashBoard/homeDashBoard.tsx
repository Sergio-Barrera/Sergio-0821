import type { LoggedInUser } from "../../types/auth";
import BarGraph from "./Graphs/barGraph";
import DonutGraph from "./Graphs/donutGraph";

type HomeDashBoardProps={
    user: LoggedInUser,
    onSelectOption: (option: 'depositCash') => void;
}

function HomeDashBoard({user, onSelectOption} : HomeDashBoardProps){
    return (

        <div>
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-emerald-50">
                    ¡Bienvenid@, {user.name}! 👋
                </h2>
                <p className="mt-2 text-white text-xl font-mono">
                    Te mostramos tu resumen de la racha del día
                </p>
            </div>

            <div className="mx-auto w-full max-w-7xl grid gap-6 grid-cols-1 md:grid-cols-2">

                <button className="bg-white rounded-2xl min-h-80 shadow-md p-6 border-2 border-amber-800 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">📊</span>
                        <h3 className="text-xl font-semibold text-gray-800">
                            Grafica de apuestas Ganadas/Perdidas
                        </h3>
                    </div>
                    <div className="h-48 flex items-center justify-center">
                        <DonutGraph />
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        Detalle de las apuestas ganadas y perdidas totales del día.
                    </p>
                    <p className="text-blue-500 text-xs mt-2 opacity-0 group-hover:opacity-100 transition">
                        🔍 Click para ampliar
                    </p>
                </button>

                <button className="bg-white rounded-2xl min-h-80 shadow-md p-6 border-2 border-amber-800 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">📈</span>
                        <h3 className="text-xl font-semibold text-gray-800">
                            Grafica de victorias de los caracoles
                        </h3>
                    </div>
                    <div className="h-48 flex items-center justify-center">
                        <BarGraph />
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        Detalle de las victorias obtenidas del día de cada caracol.
                    </p>
                    <p className="text-blue-500 text-xs mt-2 opacity-0 group-hover:opacity-100 transition">
                        🔍 Click para ampliar
                    </p>
                </button>

                <button onClick={() => onSelectOption('depositCash')} className="bg-white rounded-2xl min-h-45 shadow-md md:col-span-2 p-6 border-2 border-amber-800 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
                    <div className="mb-4 text-6xl font-bold text-center">
                        💰 ${user.cash}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Cargar saldo para apuestas
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Carga saldo para tus proximas apuestas y no te quedes sin dinero para apostar.
                    </p>
                </button>

            </div>
        </div>
    );
}

export default HomeDashBoard;