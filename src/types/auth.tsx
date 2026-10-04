export interface RegisterData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface RegisterErrors {
    name : string,
    email : string,
    password : string,
    confirmPassword: string,
}

export interface DataBase{
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    salt: string,
    cash: number,
}

export interface AuthUser{
    email: string,
    password: string,
}

export interface LoginErrors {
    email : string,
    password : string,
}

export interface LoggedInUser{
    id: string,
    name: string,
    email: string,
    salt: string,
    cash: number
}