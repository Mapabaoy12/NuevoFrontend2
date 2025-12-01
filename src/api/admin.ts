import { api } from './api';

export interface EstadisticasResponse {
    totalPedidos: number;
    pedidosCompletados: number;
    pedidosPendientes: number;
    pedidosCancelados: number;
    totalVentas: number;
    totalProductos: number;
    productosActivos: number;
    productosSinStock: number;
    totalUsuarios: number;
}

export const adminAPI = {
    // Obtener estadísticas generales
    obtenerEstadisticas: async (): Promise<EstadisticasResponse> => {
        const response = await api.get('/admin/estadisticas');
        return response.data;
    }
};
