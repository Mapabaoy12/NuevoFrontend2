import { Destacadas } from "../components/home/Destacado"
import { ProductosGrid } from "../components/home/ProductosGrid"
import { useProductos } from "../context/ProductosContext"

export const HomePage = () => {
    const { productos, loading, error } = useProductos();

    // Productos destacados (primeros 4)
    const productosDestacados = productos.slice(0, 4);
    
    // Productos recientes (últimos 4)
    const pastelesRecientes = productos.slice(-4).reverse();

    return (
        <div>
            {error && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 mx-4">
                    <p className="font-medium">⚠️ {error}</p>
                    <p className="text-sm mt-1">Mostrando productos locales. Intenta recargar la página.</p>
                </div>
            )}
            
            <Destacadas/>
            
            <ProductosGrid
                title="Nuevos Productos" 
                productos={pastelesRecientes}
                loading={loading}
            />
            
            <ProductosGrid
                title="Productos destacados" 
                productos={productosDestacados}
                loading={loading}
            />
        </div>
    )
}