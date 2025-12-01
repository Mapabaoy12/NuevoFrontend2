import { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import type { Pedido } from '../../../interfaces/pedidoInterface';
import { PedidoItem } from './PedidoItem';
import { PedidoForm } from './PedidoForm';

export const PedidoList = () => {
    const { pedidos, actualizarPedido, eliminarPedido } = useAdmin();
    const [showForm, setShowForm] = useState(false);
    const [editingPedido, setEditingPedido] = useState<Pedido | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState<string>('todos');

    const pedidosFiltrados = pedidos.filter(pedido => {
        const matchesSearch = pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pedido.items.some(item => 
                                item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
                            );
        const matchesEstado = filterEstado === 'todos' || pedido.estado === filterEstado;
        
        return matchesSearch && matchesEstado;
    });

    const pedidosOrdenados = [...pedidosFiltrados].sort((a, b) => 
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );

    const handleEditPedido = (pedido: Pedido) => {
        setEditingPedido(pedido);
        setShowForm(true);
    };

    const handleSubmit = (pedidoId: string, estado: 'completado' | 'pendiente' | 'cancelado') => {
        const estadoBackend = estado.toUpperCase() as 'COMPLETADO' | 'PENDIENTE' | 'CANCELADO';
        actualizarPedido(parseInt(pedidoId), estadoBackend);
        setShowForm(false);
        setEditingPedido(undefined);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingPedido(undefined);
    };

    const totalPedidos = pedidos.length;
    const pedidosCompletados = pedidos.filter(p => p.estado === 'completado').length;
    const pedidosPendientes = pedidos.filter(p => p.estado === 'pendiente').length;
    const pedidosCancelados = pedidos.filter(p => p.estado === 'cancelado').length;
    const totalVentas = pedidos
        .filter(p => p.estado === 'completado')
        .reduce((sum, p) => sum + p.total, 0);

    return (
        <div>
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Gestión de Pedidos</h2>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por ID o producto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estado
                        </label>
                        <select
                            value={filterEstado}
                            onChange={(e) => setFilterEstado(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        >
                            <option value="todos">Todos</option>
                            <option value="completado">Completado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Pedidos</p>
                    <p className="text-2xl font-bold text-blue-600">{totalPedidos}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Completados</p>
                    <p className="text-2xl font-bold text-green-600">{pedidosCompletados}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Pendientes</p>
                    <p className="text-2xl font-bold text-yellow-600">{pedidosPendientes}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Cancelados</p>
                    <p className="text-2xl font-bold text-red-600">{pedidosCancelados}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Ventas Totales</p>
                    <p className="text-2xl font-bold text-purple-600">
                        ${totalVentas.toLocaleString('es-CL')}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {pedidosOrdenados.length > 0 ? (
                    pedidosOrdenados.map(pedido => (
                        <PedidoItem
                            key={pedido.id}
                            pedido={pedido}
                            onEdit={handleEditPedido}
                            onDelete={(id) => eliminarPedido(id)}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No se encontraron pedidos</p>
                    </div>
                )}
            </div>

            {showForm && editingPedido && (
                <PedidoForm
                    pedido={editingPedido}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};
