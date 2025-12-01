import { PedidoItem } from "../pedidos/PedidoItem";
import type { PedidoResponse } from "../../api/pedidos";

interface OrdersListProps {
    pedidos: PedidoResponse[];
    loading?: boolean;
}

export const OrdersList = ({ pedidos, loading = false }: OrdersListProps) => {
    if (loading) {
        return (
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Mis Pedidos</h2>
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
                </div>
            </div>
        );
    }

    if (pedidos.length === 0) {
        return (
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Mis Pedidos</h2>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="text-gray-600">No tienes pedidos realizados aún</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Mis Pedidos ({pedidos.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pedidos.map((pedido) => (
                    <PedidoItem key={pedido.id} pedido={pedido} />
                ))}
            </div>
        </div>
    );
};
