import { api } from './api';

export interface UsuarioResponse {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    fechaNacimiento: string;
    direccion: string;
    codigoPromocional?: string;
    esDuocUC: boolean;
    esMayorDe50: boolean;
    tieneDescuentoFelices50: boolean;
    descuentoPorcentaje: number;
    tortaGratisCumpleanosDisponible: boolean;
    tortaGratisCumpleanosUsada: boolean;
    anioTortaGratisCumpleanos?: number;
}

export interface CrearUsuarioRequest {
    nombre: string;
    email: string;
    telefono: string;
    fechaNacimiento: string;
    direccion: string;
    codigoPromocional?: string;
}

export const usuariosAPI = {
    // Obtener todos los usuarios
    obtenerTodos: async (): Promise<UsuarioResponse[]> => {
        const response = await api.get('/usuarios');
        return response.data;
    },

    // Obtener usuario por email
    obtenerPorEmail: async (email: string): Promise<UsuarioResponse> => {
        const response = await api.get(`/usuarios/${email}`);
        return response.data;
    },

    // Crear nuevo usuario (registro)
    crear: async (usuario: CrearUsuarioRequest): Promise<UsuarioResponse> => {
        const response = await api.post('/usuarios', usuario);
        return response.data;
    },

    // Actualizar usuario
    actualizar: async (email: string, usuario: Partial<CrearUsuarioRequest>): Promise<UsuarioResponse> => {
        const response = await api.put(`/usuarios/${email}`, usuario);
        return response.data;
    },

    // Eliminar usuario
    eliminar: async (email: string): Promise<void> => {
        await api.delete(`/usuarios/${email}`);
    },

    // Verificar si existe un usuario
    existe: async (email: string): Promise<boolean> => {
        try {
            await api.get(`/usuarios/${email}/existe`);
            return true;
        } catch {
            return false;
        }
    }
};
