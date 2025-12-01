import { api } from './api';

export interface ProductoResponse {
    id: number;
    titulo: string;
    imagen: string;
    forma: string;
    tamanio: string;
    precio: number;
    descripcion: string;
    stock: number;
}

export interface CrearProductoRequest {
    titulo: string;
    imagen: string;
    forma: string;
    tamanio: string;
    precio: number;
    descripcion: string;
    stock?: number;
}

export const productosAPI = {
    // Obtener todos los productos
    obtenerTodos: async (): Promise<ProductoResponse[]> => {
        const response = await api.get('/productos');
        return response.data;
    },

    // Obtener producto por ID
    obtenerPorId: async (id: number): Promise<ProductoResponse> => {
        const response = await api.get(`/productos/${id}`);
        return response.data;
    },

    // Crear nuevo producto
    crear: async (producto: CrearProductoRequest): Promise<ProductoResponse> => {
        const response = await api.post('/productos', producto);
        return response.data;
    },

    // Actualizar producto
    actualizar: async (id: number, producto: Partial<CrearProductoRequest>): Promise<ProductoResponse> => {
        const response = await api.put(`/productos/${id}`, producto);
        return response.data;
    },

    // Eliminar producto
    eliminar: async (id: number): Promise<void> => {
        await api.delete(`/productos/${id}`);
    }
};
