import axios from 'axios';

const BASE_URL = '/.netlify/functions/climateProxy';

const ENDPOINTS = {
    TEMPERATURE: `${BASE_URL}?endpoint=temperature`,
    CO2: `${BASE_URL}?endpoint=co2`,
    METHANE: `${BASE_URL}?endpoint=methane`,
    NO2: `${BASE_URL}?endpoint=no2`,
    ARCTIC: `${BASE_URL}?endpoint=arctic`,
};

const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        console.log(`API Response from ${url}:`, response.data);

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`API Error: Received status ${response.status}`);
        }
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.message);
        
        throw new Error(`Impossibile recuperare i dati da ${url}.`);
    }
};

export const getTemperatureData = () => {
    return fetchData(ENDPOINTS.TEMPERATURE);
};

export const getCo2Data = () => {
    return fetchData(ENDPOINTS.CO2);
};

export const getMethaneData = () => {
    return fetchData(ENDPOINTS.METHANE);
};

export const getNo2Data = () => {
    return fetchData(ENDPOINTS.NO2);
};

export const getArcticData = () => {
    return fetchData(ENDPOINTS.ARCTIC);
};

// Esportazione di tutte le funzioni di fetching
export default {
    getTemperatureData,
    getCo2Data,
    getMethaneData,
    getNo2Data,
    getArcticData,
};
