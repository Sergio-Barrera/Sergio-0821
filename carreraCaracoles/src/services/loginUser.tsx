import type {AuthUser, LoggedInUser} from "../types/auth";
import { getUsers } from './registerUser'
import {hashPassword} from './passwordHash'

const SESSION_KEY = 'sessionUser';

export const loginUser= async (
    dataLogin: AuthUser

): Promise<LoggedInUser> => {

    const users=getUsers();
    const standarEmail=dataLogin.email.trim().toLowerCase();
    const user = users.find((user) => user.email === standarEmail);

    if(!user){
        throw new Error("Correo o contraseña incorrecto");
    }

    const passwordHash = await hashPassword(dataLogin.password, user.salt);

    if (passwordHash !== user.passwordHash) {
        throw new Error("Correo o contraseña incorrectos");
    }

    localStorage.setItem(SESSION_KEY,user.id);
    return user;
}

export const getSessionUser = (): LoggedInUser | null =>{
    const userId = localStorage.getItem(SESSION_KEY);

    if(!userId){
        return null;
    }

    const users=getUsers();

    return (users.find((user)=> user.id === userId) ?? null);
}

export const logoutUser = (): void => {
    localStorage.removeItem(SESSION_KEY);
}