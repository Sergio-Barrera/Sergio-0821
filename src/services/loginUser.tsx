import type {AuthUser, StoredUser} from "../types/auth";
import { getUsers } from './registerUser'
import {hashPassword} from './passwordHash'

const SESSION_KEY = 'sessionUser';

export const loginUser= async (
    dataLogin: AuthUser

): Promise<StoredUser> => {

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