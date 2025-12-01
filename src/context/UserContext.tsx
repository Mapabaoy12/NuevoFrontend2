import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Usuario } from '../data/Usuario';
import { usuariosAPI, type UsuarioResponse } from '../api/usuarios';

interface UserContextType {
    user: Usuario | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: Usuario) => Promise<boolean>;
    logout: () => void;
    updateUser: (userData: Partial<Usuario>) => Promise<boolean>;
    isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Convertir UsuarioResponse a Usuario
const convertirAUsuario = (response: UsuarioResponse): Usuario => ({
    nombre: response.nombre,
    email: response.email,
    telefono: response.telefono,
    fechaNacimiento: response.fechaNacimiento,
    direccion: response.direccion,
    codigoPromocional: response.codigoPromocional,
    esDuocUC: response.esDuocUC,
    esMayorDe50: response.esMayorDe50,
    tieneDescuentoFelices50: response.tieneDescuentoFelices50,
    descuentoPorcentaje: response.descuentoPorcentaje,
    tortaGratisCumpleanosDisponible: response.tortaGratisCumpleanosDisponible,
    tortaGratisCumpleanosUsada: response.tortaGratisCumpleanosUsada,
    añoTortaGratisCumpleanos: response.anioTortaGratisCumpleanos
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cargar usuario desde localStorage al iniciar (solo email como sesión)
    useEffect(() => {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            cargarUsuarioDesdeBackend(savedEmail);
        }
    }, []);

    const cargarUsuarioDesdeBackend = async (email: string) => {
        try {
            setLoading(true);
            const response = await usuariosAPI.obtenerPorEmail(email);
            const usuarioConvertido = convertirAUsuario(response);
            setUser(usuarioConvertido);
            setError(null);
        } catch (err) {
            console.error('Error al cargar usuario:', err);
            setError('No se pudo cargar la información del usuario');
            localStorage.removeItem('userEmail');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            
            // Verificar que el usuario existe
            const response = await usuariosAPI.obtenerPorEmail(email);
            const usuarioConvertido = convertirAUsuario(response);
            
            // Guardar sesión
            localStorage.setItem('userEmail', email);
            setUser(usuarioConvertido);
            
            console.log('✅ Login exitoso:', email);
            return true;
        } catch (err: any) {
            console.error('❌ Error en login:', err);
            setError('Credenciales inválidas o usuario no encontrado');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData: Usuario): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            
            const request = {
                nombre: userData.nombre,
                email: userData.email,
                telefono: userData.telefono,
                fechaNacimiento: userData.fechaNacimiento,
                direccion: userData.direccion,
                codigoPromocional: userData.codigoPromocional
            };
            
            const response = await usuariosAPI.crear(request);
            const usuarioConvertido = convertirAUsuario(response);
            
            // Guardar sesión
            localStorage.setItem('userEmail', usuarioConvertido.email);
            setUser(usuarioConvertido);
            
            console.log('✅ Registro exitoso:', usuarioConvertido.email);
            return true;
        } catch (err: any) {
            console.error('❌ Error en registro:', err);
            setError(err.response?.data?.message || 'Error al crear la cuenta');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (userData: Partial<Usuario>): Promise<boolean> => {
        if (!user) return false;
        
        try {
            setLoading(true);
            setError(null);
            
            const request = {
                nombre: userData.nombre,
                telefono: userData.telefono,
                fechaNacimiento: userData.fechaNacimiento,
                direccion: userData.direccion
            };
            
            const response = await usuariosAPI.actualizar(user.email, request);
            const usuarioConvertido = convertirAUsuario(response);
            
            setUser(usuarioConvertido);
            console.log('✅ Usuario actualizado:', user.email);
            return true;
        } catch (err: any) {
            console.error('❌ Error al actualizar usuario:', err);
            setError('Error al actualizar información');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userEmail');
        console.log('✅ Sesión cerrada');
    };

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout,
                updateUser,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe ser usado con UserProvider');
    }
    return context;
};
