import axios from "axios";

// Configuración base de Axios
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8180/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // El servidor respondió con un código de error
            console.error('Error de respuesta:', error.response.data);
        } else if (error.request) {
            // La petición fue hecha pero no hubo respuesta
            console.error('Error de red:', error.message);
        } else {
            // Algo pasó al configurar la petición
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);