import type { LoggedInUser } from "../../types/auth";

type HomeDashBoardProps={
    user: LoggedInUser,
    onSelectOption: (option: 'donutGraph' | 'barGraph' | 'depositCash') => void;
}

function HomeDashBoard({user, onSelectOption} : HomeDashBoardProps){
    return (

        <div>
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-emerald-50">
                    ¡Bienvenid@, {user.name}! 👋
                </h2>
                <p className="mt-2 text-white text-xl font-mono">
                    Selecciona una opción para comenzar.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">

                <button onClick={()=> onSelectOption('donutGraph')} className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-4 text-7xl text-center">
                        📊
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Grafica Ganadas/Perdidas
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Detalle de las apuestas ganadas y perdidas totales.
                    </p>
                </button>

                <button onClick={() => onSelectOption('barGraph')} className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-4 text-7xl text-center">
                        📈
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Victoria Por Caracol
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Detalle de las victorias obtenidas de cada caracol.
                    </p>
                </button>

                <button onClick={() => onSelectOption('depositCash')} className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-4 text-6xl font-bold">
                        💰 ${user.cash}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Cargar Cash para apuestas
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Cargar dinero para proximas apuestas.
                    </p>
                </button>

            </div>
        </div>
    );
}

export default HomeDashBoard;