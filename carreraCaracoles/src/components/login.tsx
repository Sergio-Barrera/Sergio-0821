import { useState, type ChangeEvent, type FormEvent } from "react";
import { loginUser } from '../services/loginUser';
import type { AuthUser, LoginErrors, LoggedInUser } from '../types/auth';
import Swal from "sweetalert2";
 
type LoginProps = {
  setView: (view: "index") => void,
  onLoginSuccess: (user: LoggedInUser) => void,
};

function Login({setView, onLoginSuccess,}:LoginProps){
    const [formLogin, setFormLogin] = useState<AuthUser>({
        email: "",
        password: ""
    });

    const [loginErrors, setLoginErrors] = useState<LoginErrors>({
        email: "",
        password: "",
    });

    const validateLogin=()=>{
        const newError:LoginErrors={
            email: "",
            password: "",
        }
    
        if(!formLogin.email.trim()){
            newError.email="Campo correo electronico vacio"
        }

        if (!formLogin.password) {
            newError.password = "Campo contraseña vacio";
        } 
    
        setLoginErrors(newError);
    
        return Object.values(newError).every(
            (error) => error === ""
        );
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value}=e.target;

        setFormLogin({
            ...formLogin,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!validateLogin()){
            return;
        }
        
        try {
            const user = await loginUser(formLogin);
            onLoginSuccess(user);
        }catch (error) {
            if (error instanceof Error) {
                Swal.fire(
                    "Credenciales incorrectas",
                    "El correo o la contraseña no son validos.",
                    "error",
                );
            }
        }

    }

    return(
        <div className="min-h-screen px-4 py-10">
            <div className="mx-auto max-w-2xl rounded-2xl border-2 border-white bg-linear-to-br from-[#6b4226] via-[#9a6845] to-[#d1a77d] p-8 shadow-lg">
                <h1 className="mb-2 text-center text-white text-3xl font-bold">INICIAR SESIÓN</h1>
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-blue-50">Correo electronico</label>
                        <input
                            type="email"
                            name="email"
                            value={formLogin.email}
                            onChange={handleChange}
                            placeholder="ejemploJuan@gmail.com"
                            className={`w-full rounded-lg border-2 px-4 py-3 outline-none transition placeholder-white focus:bg-white focus:text-[#6b4226] focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                            ${
                                loginErrors.email
                                ? "border-red-600 bg-white"
                                : formLogin.email ? "bg-white border-amber-950"
                                : "border-slate-300"
                            }`}
                        />
                        {loginErrors.email &&(
                            <p className="mt-1 flex items-center gap-1 text-sm text-red-800 font-bold">
                                <span className="font-extrabold">X</span>
                                {loginErrors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-blue-50">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formLogin.password}
                            onChange={handleChange}
                            placeholder="***************"
                            className={`w-full rounded-lg border-2 px-4 py-3 outline-none transition placeholder-white focus:bg-white focus:text-[#6b4226] focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                            ${
                                loginErrors.password
                                ? "border-red-600 bg-white"
                                : formLogin.password ? "bg-white border-amber-950"
                                : "border-slate-300"
                            }`}
                        />
                        {loginErrors.password &&(
                            <p className="mt-1 flex items-center gap-1 text-sm text-red-800 font-bold">
                                <span className="font-extrabold">X</span>
                                {loginErrors.password}
                            </p>
                        )}
                    </div>
                    <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Iniciar Sesión</button>
                    <button onClick={()=>setView("index")} className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Regresar</button>
                </form>
            </div>
        </div>
    );
}
export default Login;