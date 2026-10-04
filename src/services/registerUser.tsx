import type {RegisterData, DataBase} from "../types/auth";
import {saltGenerate, hashPassword} from './passwordHash'

const USERS_KEY = 'users';
const SESSION_KEY = 'sessionUser';

export const getUsers = (): DataBase[] => {
    const users=localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

const saveUser = (user: DataBase[]) => {
    localStorage.setItem(USERS_KEY,JSON.stringify(user));
}

export const userRegister = async (registerData: RegisterData): Promise<DataBase> => {
    
    const users=getUsers();
    const emailExist = users.some((user)=>user.email===registerData.email);

    if(emailExist){
        throw new Error("Ya existe una cuenta con este correo electronico.");
    }

    const salt = saltGenerate();
    const passwordHash = await hashPassword(registerData.password, salt);
    const newUser : DataBase = {
        id: crypto.randomUUID(),
        name: registerData.name,
        email: registerData.email.trim().toLowerCase(),
        passwordHash,
        salt,
        cash: 0,
    }

    users.push(newUser);
    saveUser(users);
    localStorage.setItem(SESSION_KEY, newUser.id);
    return newUser;
}