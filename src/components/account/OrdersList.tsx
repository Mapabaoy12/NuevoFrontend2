import { PedidoItem } from "../pedidos/PedidoItem";
import type { Pedido } from "../../interfaces/pedidoInterface";

interface OrdersListProps {
    pedidos: Pedido[];
}

export const OrdersList = ({ pedidos }: OrdersListProps) => {
    if (pedidos.length === 0) return null;

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
