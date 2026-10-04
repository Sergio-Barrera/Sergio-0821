import type {StoredUser, RegisterData} from "../types/auth";
import {saltGenerate, hashPassword} from './passwordHash'

const USERS_KEY = 'users';

export const getUsers = (): StoredUser[] => {
    const users=localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

const saveUser = (user: StoredUser[]) => {
    localStorage.setItem(USERS_KEY,JSON.stringify(user));
}

export const userRegister = async (registerData: RegisterData): Promise<void> => {
    
    const users=getUsers();
    const emailExist = users.some((user)=>user.email===registerData.email);

    if(emailExist){
        throw new Error("Ya existe una cuenta con este correo electronico.");
    }

    const salt = saltGenerate();
    const passwordHash = await hashPassword(registerData.password, salt);
    const newUser : StoredUser = {
        id: crypto.randomUUID(),
        name: registerData.name,
        email: registerData.email.trim().toLowerCase(),
        passwordHash,
        salt,
    }

    users.push(newUser);
    saveUser(users);
}