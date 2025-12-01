import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { pedidosAPI, type PedidoResponse } from '../api/pedidos';
import { useUser } from './UserContext';

interface PedidosContextType {
    pedidos: PedidoResponse[];
    loading: boolean;
    error: string | null;
    cargarPedidosUsuario: () => Promise<void>;
    obtenerPedidoPorId: (id: number) => PedidoResponse | undefined;
}

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
    const [pedidos, setPedidos] = useState<PedidoResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();

    const cargarPedidosUsuario = async () => {
        if (!user) {
            setPedidos([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            console.log('🔄 Cargando pedidos del usuario:', user.email);
            const pedidosBackend = await pedidosAPI.obtenerPorUsuario(user.email);
            console.log('✅ Pedidos cargados:', pedidosBackend.length);
            
            setPedidos(pedidosBackend);
        } catch (err: any) {
            console.error('❌ Error al cargar pedidos:', err);
            setError('No se pudieron cargar los pedidos');
            setPedidos([]);
        } finally {
            setLoading(false);
        }
    };

    // Cargar pedidos cuando el usuario cambie
    useEffect(() => {
        if (user) {
            cargarPedidosUsuario();
        } else {
            setPedidos([]);
        }
    }, [user]);

    const obtenerPedidoPorId = (id: number): PedidoResponse | undefined => {
        return pedidos.find(p => p.id === id);
    };

    return (
        <PedidosContext.Provider
            value={{
                pedidos,
                loading,
                error,
                cargarPedidosUsuario,
                obtenerPedidoPorId
            }}
        >
            {children}
        </PedidosContext.Provider>
    );
};

export const usePedidos = () => {
    const context = useContext(PedidosContext);
    if (!context) {
        throw new Error('usePedidos must be used within a PedidosProvider');
    }
    return context;
};
