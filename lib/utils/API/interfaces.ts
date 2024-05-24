export interface IMetriPriceResponse {
    metri_price: number
}

export interface ICurrentUser {
    id: number,
    email: string,
    created_at: string,
    updated_at: string
}

export interface LoginParams {
    email: string,
    password: string
}

export interface RegisterParams {
    email: string,
    password: string,
    confirmPassword: string
}

export interface ILoginResponse {
    jwt: string
}