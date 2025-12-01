import { useState } from 'react';
import type { Pedido } from '../../../interfaces/pedidoInterface';

interface PedidoFormProps {
    pedido: Pedido;
    onSubmit: (pedidoId: string, estado: 'completado' | 'pendiente' | 'cancelado') => void;
    onCancel: () => void;
}

export const PedidoForm = ({ pedido, onSubmit, onCancel }: PedidoFormProps) => {
    const [estado, setEstado] = useState<'completado' | 'pendiente' | 'cancelado'>(pedido.estado);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(pedido.id, estado);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">
                        Cambiar Estado del Pedido
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <p className="text-sm text-gray-600">ID del Pedido</p>
                            <p className="font-medium">#{pedido.id.slice(-12)}</p>
                            <p className="text-sm text-gray-600 mt-2">Fecha</p>
                            <p className="font-medium">
                                {new Date(pedido.fecha).toLocaleDateString('es-CL', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">Total</p>
                            <p className="font-bold text-rose-600 text-lg">
                                ${pedido.total.toLocaleString('es-CL')}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estado Actual
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="estado"
                                        value="completado"
                                        checked={estado === 'completado'}
                                        onChange={(e) => setEstado(e.target.value as 'completado')}
                                        className="mr-3"
                                    />
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                                            Completado
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            El pedido fue entregado exitosamente
                                        </span>
                                    </div>
                                </label>

                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="estado"
                                        value="pendiente"
                                        checked={estado === 'pendiente'}
                                        onChange={(e) => setEstado(e.target.value as 'pendiente')}
                                        className="mr-3"
                                    />
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm font-medium">
                                            Pendiente
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            El pedido está en proceso
                                        </span>
                                    </div>
                                </label>

                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="estado"
                                        value="cancelado"
                                        checked={estado === 'cancelado'}
                                        onChange={(e) => setEstado(e.target.value as 'cancelado')}
                                        className="mr-3"
                                    />
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-medium">
                                            Cancelado
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            El pedido fue cancelado
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                            >
                                Actualizar Estado
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
