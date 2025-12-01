import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { productos as productosIniciales, type Producto } from '../data/productos';
import type { Usuario } from '../data/Usuario';
import type { Pedido } from '../interfaces/pedidoInterface';
import { productosAPI, usuariosAPI, pedidosAPI } from '../api';

interface AdminContextType {
    // Productos
    productos: Producto[];
    loading: boolean;
    error: string | null;
    agregarProducto: (producto: Omit<Producto, 'id'>) => Promise<void>;
    actualizarProducto: (id: number, producto: Partial<Producto>) => Promise<void>;
    eliminarProducto: (id: number) => Promise<void>;
    cargarProductos: () => Promise<void>;
    
    // Usuarios
    usuarios: Usuario[];
    usuariosLoading: boolean;
    actualizarUsuario: (email: string, usuario: Partial<Usuario>) => Promise<void>;
    eliminarUsuario: (email: string) => Promise<void>;
    cargarUsuarios: () => Promise<void>;
    
    // Pedidos
    pedidos: Pedido[];
    pedidosLoading: boolean;
    actualizarPedido: (id: number, estado: 'PENDIENTE' | 'COMPLETADO' | 'CANCELADO') => Promise<void>;
    eliminarPedido: (id: number) => Promise<void>;
    cargarPedidos: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [productos, setProductos] = useState<Producto[]>(productosIniciales);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(false);
    const [usuariosLoading, setUsuariosLoading] = useState(false);
    const [pedidosLoading, setPedidosLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Función para convertir ProductoResponse del backend a Producto del frontend
    const convertirProducto = (productoBackend: any): Producto => ({
        id: productoBackend.id,
        titulo: productoBackend.titulo,
        imagen: productoBackend.imagen,
        forma: productoBackend.forma,
        tamanio: productoBackend.tamanio,
        precio: productoBackend.precio,
        descripcion: productoBackend.descripcion,
        stock: productoBackend.stock
    });

    // Función para convertir UsuarioResponse del backend a Usuario del frontend
    const convertirUsuario = (usuarioBackend: any): Usuario => ({
        nombre: usuarioBackend.nombre,
        email: usuarioBackend.email,
        telefono: usuarioBackend.telefono,
        fechaNacimiento: usuarioBackend.fechaNacimiento,
        direccion: usuarioBackend.direccion,
        codigoPromocional: usuarioBackend.codigoPromocional,
        esDuocUC: usuarioBackend.esDuocUC,
        esMayorDe50: usuarioBackend.esMayorDe50,
        tieneDescuentoFelices50: usuarioBackend.tieneDescuentoFelices50,
        descuentoPorcentaje: usuarioBackend.descuentoPorcentaje,
        tortaGratisCumpleanosDisponible: usuarioBackend.tortaGratisCumpleanosDisponible,
        tortaGratisCumpleanosUsada: usuarioBackend.tortaGratisCumpleanosUsada,
        añoTortaGratisCumpleanos: usuarioBackend.anioTortaGratisCumpleanos
    });

    // Función para convertir PedidoResponse del backend a Pedido del frontend
    const convertirPedido = (pedidoBackend: any): Pedido => ({
        id: pedidoBackend.id.toString(),
        fecha: new Date(pedidoBackend.fecha),
        items: pedidoBackend.items.map((item: any) => ({
            id: item.productoId,
            titulo: item.titulo,
            imagen: item.imagen,
            forma: item.forma,
            tamanio: item.tamanio,
            precio: item.precioUnitario,
            descripcion: item.descripcion || '',
            stock: 0,
            quantity: item.cantidad
        })),
        subtotal: pedidoBackend.subtotal,
        descuentoCodigo: pedidoBackend.descuentoCodigo,
        descuentoUsuario: pedidoBackend.descuentoUsuario,
        total: pedidoBackend.total,
        codigoPromoAplicado: pedidoBackend.codigoPromoAplicado,
        estado: pedidoBackend.estado.toLowerCase() as 'completado' | 'pendiente' | 'cancelado'
    });

    // Cargar productos desde el backend
    const cargarProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const productosBackend = await productosAPI.obtenerTodos();
            setProductos(productosBackend.map(convertirProducto));
        } catch (err) {
            console.error('Error al cargar productos:', err);
            setError('Error al cargar productos desde el backend. Usando datos locales.');
            // Fallback a datos locales si el backend no está disponible
            setProductos(productosIniciales);
        } finally {
            setLoading(false);
        }
    };

    // Cargar usuarios desde el backend
    const cargarUsuarios = async () => {
        setUsuariosLoading(true);
        try {
            const usuariosBackend = await usuariosAPI.obtenerTodos();
            setUsuarios(usuariosBackend.map(convertirUsuario));
        } catch (err) {
            console.error('Error al cargar usuarios:', err);
            // Fallback a localStorage
            const savedUsuarios = localStorage.getItem('usuariosRegistrados');
            if (savedUsuarios) {
                setUsuarios(JSON.parse(savedUsuarios));
            }
        } finally {
            setUsuariosLoading(false);
        }
    };

    // Cargar pedidos desde el backend
    const cargarPedidos = async () => {
        setPedidosLoading(true);
        try {
            const pedidosBackend = await pedidosAPI.obtenerTodos();
            setPedidos(pedidosBackend.map(convertirPedido));
        } catch (err) {
            console.error('Error al cargar pedidos:', err);
            // Fallback a localStorage
            const savedPedidos = localStorage.getItem('pedidos');
            if (savedPedidos) {
                const parsedPedidos = JSON.parse(savedPedidos);
                setPedidos(parsedPedidos.map((p: any) => ({
                    ...p,
                    fecha: new Date(p.fecha)
                })));
            }
        } finally {
            setPedidosLoading(false);
        }
    };

    // Cargar datos iniciales
    useEffect(() => {
        cargarProductos();
        cargarUsuarios();
        cargarPedidos();
    }, []);

    // Funciones CRUD para productos
    const agregarProducto = async (nuevoProducto: Omit<Producto, 'id'>) => {
        try {
            const productoCreado = await productosAPI.crear({
                titulo: nuevoProducto.titulo,
                imagen: nuevoProducto.imagen,
                forma: nuevoProducto.forma,
                tamanio: nuevoProducto.tamanio,
                precio: nuevoProducto.precio,
                descripcion: nuevoProducto.descripcion,
                stock: nuevoProducto.stock
            });
            setProductos([...productos, convertirProducto(productoCreado)]);
        } catch (err) {
            console.error('Error al agregar producto:', err);
            // Fallback a funcionamiento local
            const nuevoId = Math.max(...productos.map(p => p.id), 0) + 1;
            const productoCompleto: Producto = {
                ...nuevoProducto,
                id: nuevoId,
                stock: nuevoProducto.stock || 0
            };
            setProductos([...productos, productoCompleto]);
        }
    };

    const actualizarProducto = async (id: number, productoActualizado: Partial<Producto>) => {
        try {
            const productoActualizadoBackend = await productosAPI.actualizar(id, productoActualizado);
            setProductos(productos.map(p => 
                p.id === id ? convertirProducto(productoActualizadoBackend) : p
            ));
        } catch (err) {
            console.error('Error al actualizar producto:', err);
            // Fallback a funcionamiento local
            setProductos(productos.map(p => 
                p.id === id ? { ...p, ...productoActualizado } : p
            ));
        }
    };

    const eliminarProducto = async (id: number) => {
        try {
            await productosAPI.eliminar(id);
            setProductos(productos.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error al eliminar producto:', err);
            // Fallback a funcionamiento local
            setProductos(productos.filter(p => p.id !== id));
        }
    };

    // Funciones CRUD para usuarios
    const actualizarUsuario = async (email: string, usuarioActualizado: Partial<Usuario>) => {
        try {
            const usuarioActualizadoBackend = await usuariosAPI.actualizar(email, usuarioActualizado);
            setUsuarios(usuarios.map(u => 
                u.email === email ? convertirUsuario(usuarioActualizadoBackend) : u
            ));
        } catch (err) {
            console.error('Error al actualizar usuario:', err);
            setUsuarios(usuarios.map(u => 
                u.email === email ? { ...u, ...usuarioActualizado } : u
            ));
        }
    };

    const eliminarUsuario = async (email: string) => {
        try {
            await usuariosAPI.eliminar(email);
            setUsuarios(usuarios.filter(u => u.email !== email));
        } catch (err) {
            console.error('Error al eliminar usuario:', err);
            setUsuarios(usuarios.filter(u => u.email !== email));
        }
    };

    // Funciones CRUD para pedidos
    const actualizarPedido = async (id: number, estado: 'PENDIENTE' | 'COMPLETADO' | 'CANCELADO') => {
        try {
            const pedidoActualizado = await pedidosAPI.actualizarEstado(id, estado);
            setPedidos(pedidos.map(p => 
                p.id === id.toString() ? convertirPedido(pedidoActualizado) : p
            ));
        } catch (err) {
            console.error('Error al actualizar pedido:', err);
            setPedidos(pedidos.map(p => 
                p.id === id.toString() ? { ...p, estado: estado.toLowerCase() as any } : p
            ));
        }
    };

    const eliminarPedido = async (id: number) => {
        try {
            await pedidosAPI.eliminar(id);
            setPedidos(pedidos.filter(p => p.id !== id.toString()));
        } catch (err) {
            console.error('Error al eliminar pedido:', err);
            setPedidos(pedidos.filter(p => p.id !== id.toString()));
        }
    };

    return (
        <AdminContext.Provider
            value={{
                productos,
                loading,
                error,
                agregarProducto,
                actualizarProducto,
                eliminarProducto,
                cargarProductos,
                usuarios,
                usuariosLoading,
                actualizarUsuario,
                eliminarUsuario,
                cargarUsuarios,
                pedidos,
                pedidosLoading,
                actualizarPedido,
                eliminarPedido,
                cargarPedidos,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin solamente debe ser usado con AdminProvider');
    }
    return context;
};
