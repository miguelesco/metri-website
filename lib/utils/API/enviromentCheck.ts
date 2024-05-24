const enviroment = process.env.ENVIROMENT;

export const APIURL = enviroment === 'production' ? process.env.API_URL_PROD : process.env.API_URL_DEV;

