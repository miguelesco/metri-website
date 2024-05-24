
export interface DefaultResponse<T> {
    data: T | null;
    error: string | null;
}

export interface IMetriPriceResponse {
    current_price: number
}

export interface ICurrentUser {
    balance: number,
    user: {
        id: number,
        email: string,
        created_at: string,
        updated_at: string
    }
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
    message: string,
    token: string,
    user: ICurrentUser
}

export interface IHistoryResponse {
    id: number;
    user_id: number;
    crypto_type: string;
    amount: string;
    status: string;
    transaction_id: string;
    blockchain: string;
    wallet_address: string;
    transaction_hash: string;
    created_at: string;
    updated_at: string;
    metri_equivalent: string;
}