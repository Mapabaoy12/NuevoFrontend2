import { useState } from 'react';
import type { Pedido } from '../../../interfaces/pedidoInterface';
import { formatPrice } from '../../../utils/formatters';

interface PedidoItemProps {
    pedido: Pedido;
    onEdit: (pedido: Pedido) => void;
    onDelete: (id: number) => void;
}

export const PedidoItem = ({ pedido, onEdit, onDelete }: PedidoItemProps) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleDelete = () => {
        onDelete(parseInt(pedido.id));
        setShowDeleteConfirm(false);
    };

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case 'completado':
                return 'bg-green-100 text-green-700';
            case 'pendiente':
                return 'bg-yellow-100 text-yellow-700';
            case 'cancelado':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getEstadoText = (estado: string) => {
        switch (estado) {
            case 'completado':
                return 'Completado';
            case 'pendiente':
                return 'Pendiente';
            case 'cancelado':
                return 'Cancelado';
            default:
                return estado;
        }
    };

    const formatFecha = (fecha: Date) => {
        return new Date(fecha).toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Pedido #{pedido.id.slice(-8)}</h3>
                        <p className="text-sm text-gray-600">{formatFecha(pedido.fecha)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(pedido.estado)}`}>
                        {getEstadoText(pedido.estado)}
                    </span>
                </div>

                <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {pedido.items.length} {pedido.items.length === 1 ? 'producto' : 'productos'}
                    </span>
                    {pedido.codigoPromoAplicado && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            Código: {pedido.codigoPromoAplicado}
                        </span>
                    )}
                    {pedido.descuentoUsuario > 0 && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            Descuento usuario: {pedido.descuentoUsuario}%
                        </span>
                    )}
                </div>

                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-sm text-rose-600 hover:text-rose-700 font-medium text-left"
                >
                    {showDetails ? '▼ Ocultar detalles' : '▶ Ver detalles'}
                </button>

                {showDetails && (
                    <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-medium mb-2">Productos:</h4>
                        <div className="space-y-2">
                            {pedido.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span>
                                        {item.quantity}x {item.titulo}
                                    </span>
                                    <span className="font-medium">
                                        {formatPrice(item.precio * item.quantity)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal:</span>
                                <span>{formatPrice(pedido.subtotal)}</span>
                            </div>
                            {pedido.descuentoCodigo > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Descuento código:</span>
                                    <span>-{formatPrice(pedido.descuentoCodigo)}</span>
                                </div>
                            )}
                            {pedido.descuentoUsuario > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Descuento usuario ({pedido.descuentoUsuario}%):</span>
                                    <span>-{formatPrice((pedido.subtotal * pedido.descuentoUsuario) / 100)}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                                <span>Total:</span>
                                <span className="text-rose-600">{formatPrice(pedido.total)}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 justify-end pt-2 border-t border-gray-200">
                    <button
                        onClick={() => onEdit(pedido)}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                    >
                        Cambiar Estado
                    </button>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    >
                        Eliminar
                    </button>
                </div>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
                        <h3 className="text-xl font-bold mb-4">Confirmar eliminación</h3>
                        <p className="text-gray-600 mb-6">
                            ¿Estás seguro de que deseas eliminar el pedido #{pedido.id.slice(-8)}? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
