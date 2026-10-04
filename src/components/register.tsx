import React, { useState } from "react";
import type {RegisterData, RegisterErrors} from "../types/auth";
import { userRegister } from '../services/registerUser';
import Swal from "sweetalert2";

type RegisterProps = {
  setView: (view: "index" | "login" | "register") => void;
};

function Register({setView}:RegisterProps){

    const [registerData, setRegisterData] = useState<RegisterData>({
        name : "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [registerErrors, setRegisterErrors] = useState<RegisterErrors>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const validateRegister=()=>{
        const newError:RegisterErrors={
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }

        if(!registerData.name.trim()){
            newError.name="El campo nombre es obligatorio";
        }else if(registerData.name.length<3){
            newError.name="El nombre debe tener minimo 3 caracteres"
        }

        if(!registerData.email.trim()){
            newError.email="El campo correo electronico es obligatorio"
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)){
            newError.email = "El correo electrónico no es válido";
        }

        if (!registerData.password) {
            newError.password = "No se detecto ninguna contraseña";
        } else if (registerData.password.length < 8) {
            newError.password = "La contraseña debe contener minimo 8 caracteres";
        } else if (!/[A-Z]/.test(registerData.password)) {
            newError.password = "La contraseña debe contener al menos una mayúscula";
        } else if (!/[a-z]/.test(registerData.password)) {
            newError.password = "La contraseña debe contener al menos una minúscula";
        } else if (!/[0-9]/.test(registerData.password)) {
            newError.password = "La contraseña debe contener al menos un número";
        }

        if (!registerData.confirmPassword) {
            newError.confirmPassword = "Debes confirmar tu contraseña";
        } else if (registerData.password !== registerData.confirmPassword){
            newError.confirmPassword = "Las contraseñas no coinciden";
        }

        setRegisterErrors(newError);

        return Object.values(newError).every(
            (error) => error === ""
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;

        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };

    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!validateRegister()){
            return;
        }

        try{
            await userRegister(registerData);
            Swal.fire(
                "¡Cuenta creada!",
                "La cuenta se registro exitosamente.",
                "success",
            );
        }catch(error){
            if (error instanceof Error) {
                Swal.fire(
                    "Email registrado",
                    error.message,
                    "warning",
                );
            }
        }
    };

    return(
        <div className="min-h-screen px-4 py-10">
            <div className="mx-auto max-w-2xl rounded-2xl border-2 border-white bg-linear-to-br from-[#6b4226] via-[#9a6845] to-[#d1a77d] p-8 shadow-lg">
                <h1 className="mb-2 text-center text-white text-3xl font-bold">CARRERA DE CARACOLES</h1>
                <p className="mb-8 text-amber-50">
                    Completa los siguientes datos para registrarte.
                </p>
                <form noValidate className="space-y-5" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold text-blue-50">Nombre completo</label>
                        <input
                            name="name"
                            value={registerData.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Ej: Juan Pérez Osorio"
                            className={`w-full rounded-lg border-2 px-4 font-semibold py-3 outline-none transition placeholder-white focus:bg-white focus:text-amber-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            ${
                                registerErrors.name
                                ? "border-red-600 bg-white"
                                : registerData.name ? "bg-white border-amber-950"
                                : "border-slate-300"
                            }`}
                        />
                        {registerErrors.name &&(
                            <p className="mt-1 flex items-center gap-1 text-sm text-red-800 font-bold">
                                <span className="font-extrabold">X</span>
                                {registerErrors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-blue-50">Correo electronico</label>
                        <input
                            name="email"
                            value={registerData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="ejemploJuan@gmail.com"
                            className={`w-full rounded-lg border-2 px-4 font-semibold py-3 outline-none transition placeholder-white focus:bg-white focus:text-amber-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            ${
                                registerErrors.email
                                ? "border-red-600 bg-white"
                                : registerData.email ? "bg-white border-amber-950"
                                : "border-slate-300"
                            }`}
                        />
                        {registerErrors.email &&(
                            <p className="mt-1 flex items-center gap-1 text-sm text-red-800 font-bold">
                                <span className="font-extrabold">X</span>
                                {registerErrors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-blue-50">Contraseña</label>
                        <input
                            name="password"
                            value={registerData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="***************"
                            className={`w-full rounded-lg border-2 px-4 font-semibold py-3 outline-none transition placeholder-white focus:bg-white focus:text-amber-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            ${
                                registerErrors.password
                                ? "border-red-600 bg-white"
                                : registerData.password ? "bg-white border-amber-950"
                                : "border-slate-300"
                            }`}
                        />
                        {registerErrors.password &&(
                            <p className="mt-1 flex items-center gap-1 text-sm text-red-800 font-bold">
                                <span className="font-extrabold">X</span>
                                {registerErrors.password}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-blue-50">Confirmación de contrseña</label>
                        <input
                            name="confirmPassword"
                            value={registerData.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            placeholder="***************"
                            className={`w-full rounded-lg border-2 px-4 font-semibold py-3 outline-none transition placeholder-white focus:bg-white focus:text-amber-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            ${
                                registerErrors.confirmPassword
                                ? "border-red-600 bg-white"
                                : registerData.confirmPassword ? "bg-white border-amber-950"
                                : "border-slate-300"
                            }`}
                        />
                        {registerErrors.confirmPassword &&(
                            <p className="mt-1 flex items-center gap-1 text-sm text-red-800 font-bold">
                                <span className="font-extrabold">X</span>
                                {registerErrors.confirmPassword}
                            </p>
                        )}
                    </div>
                    <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Registrar Usuario</button>
                    <button onClick={()=>setView("index")} className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Regresar</button>
                </form>
            </div>
        </div>
    )
}
 
export default Register