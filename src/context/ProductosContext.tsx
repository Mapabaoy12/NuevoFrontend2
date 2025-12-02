import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Producto } from '../data/productos';
import { productosAPI } from '../api';
import { productos as productosIniciales } from '../data/productos';

interface ProductosContextType {
    productos: Producto[];
    loading: boolean;
    error: string | null;
    cargarProductos: () => Promise<void>;
    obtenerProductoPorId: (id: number) => Producto | undefined;
    filtrarPorForma: (forma: string) => Producto[];
    filtrarPorTamanio: (tamanio: string) => Producto[];
}

const ProductosContext = createContext<ProductosContextType | undefined>(undefined);

export const ProductosProvider = ({ children }: { children: ReactNode }) => {
    const [productos, setProductos] = useState<Producto[]>(productosIniciales);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cargarProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log(' Cargando productos desde el backend...');
            const productosBackend = await productosAPI.obtenerTodos();
            console.log(' Productos cargados:', productosBackend.length);
            
            const productosConvertidos = productosBackend.map(p => ({
                id: p.id,
                titulo: p.titulo,
                imagen: p.imagen,
                forma: p.forma,
                tamanio: p.tamanio,
                precio: p.precio,
                descripcion: p.descripcion,
                stock: p.stock
            }));
            setProductos(productosConvertidos);
        } catch (err) {
            console.error(' Error al cargar productos:', err);
            setError('No se pudieron cargar los productos del servidor. Usando datos locales.');
            setProductos(productosIniciales);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const obtenerProductoPorId = (id: number): Producto | undefined => {
        return productos.find(p => p.id === id);
    };

    const filtrarPorForma = (forma: string): Producto[] => {
        return productos.filter(p => p.forma === forma);
    };

    const filtrarPorTamanio = (tamanio: string): Producto[] => {
        return productos.filter(p => p.tamanio === tamanio);
    };

    return (
        <ProductosContext.Provider
            value={{
                productos,
                loading,
                error,
                cargarProductos,
                obtenerProductoPorId,
                filtrarPorForma,
                filtrarPorTamanio
            }}
        >
            {children}
        </ProductosContext.Provider>
    );
};

export const useProductos = () => {
    const context = useContext(ProductosContext);
    if (!context) {
        throw new Error('useProductos debe ser usado dentro de ProductosProvider');
    }
    return context;
};
