export interface StoredUser{
    id: string
    name: string,
    email: string,
    passwordHash: string,
    salt: string
}

export interface AuthUser{
    email: string,
    password: string,
}

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

export interface LoginErrors {
    email : string,
    password : string,
}