import axios from 'axios';

const BASE_URL = 'https://global-warming.org/api/';

const ENDPOINTS = {
    TEMPERATURE: `${BASE_URL}temperature-api`,
    CO2: `${BASE_URL}co2-api`,
    METHANE: `${BASE_URL}methane-api`,
    NO2: `${BASE_URL}nitrous-oxide-api`,
    ARCTIC: `${BASE_URL}arctic-api`,
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
