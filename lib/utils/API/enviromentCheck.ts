const enviroment = process.env.NEXT_PUBLIC_ENVIROMENT;

export const APIURL = enviroment === 'production' ? process.env.NEXT_PUBLIC_API_URL_PROD : process.env.NEXT_PUBLIC_API_URL_DEV;

