import NextConfig from 'next/config';

const { serverRuntimeConfig = {} } = NextConfig() || {};

export const Config = {
    API_URL: serverRuntimeConfig.API_URL,
};
