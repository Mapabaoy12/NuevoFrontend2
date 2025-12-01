import { api } from './api';

export interface PedidoItemRequest {
    productoId: number;
    cantidad: number;
}

export interface CrearPedidoRequest {
    usuarioEmail: string;
    items: PedidoItemRequest[];
    codigoPromo?: string;
}

export interface PedidoItemResponse {
    id: number;
    productoId: number;
    titulo: string;
    imagen: string;
    forma: string;
    tamanio: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}

export interface PedidoResponse {
    id: number;
    fecha: string;
    items: PedidoItemResponse[];
    subtotal: number;
    descuentoCodigo: number;
    descuentoUsuario: number;
    total: number;
    codigoPromoAplicado?: string;
    estado: 'PENDIENTE' | 'COMPLETADO' | 'CANCELADO';
}

export interface ActualizarEstadoRequest {
    estado: 'PENDIENTE' | 'COMPLETADO' | 'CANCELADO';
}

export const pedidosAPI = {
    // Crear pedido
    crear: async (pedidoData: CrearPedidoRequest): Promise<PedidoResponse> => {
        const response = await api.post('/pedidos', pedidoData);
        return response.data;
    },

    // Obtener pedidos por usuario
    obtenerPorUsuario: async (email: string): Promise<PedidoResponse[]> => {
        const response = await api.get(`/pedidos/usuario/${email}`);
        return response.data;
    },

    // Obtener todos los pedidos (admin)
    obtenerTodos: async (): Promise<PedidoResponse[]> => {
        const response = await api.get('/pedidos');
        return response.data;
    },

    // Obtener pedido por ID
    obtenerPorId: async (id: number): Promise<PedidoResponse> => {
        const response = await api.get(`/pedidos/${id}`);
        return response.data;
    },

    // Actualizar estado (admin)
    actualizarEstado: async (id: number, estado: ActualizarEstadoRequest['estado']): Promise<PedidoResponse> => {
        const response = await api.put(`/pedidos/${id}/estado`, { estado });
        return response.data;
    },

    // Eliminar pedido (admin)
    eliminar: async (id: number): Promise<void> => {
        await api.delete(`/pedidos/${id}`);
    }
};