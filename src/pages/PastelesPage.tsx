import { ContainerFilter } from "../components/productos/containerFilter";
import { FilteredProductsGrid } from "../components/productos/FilteredProductsGrid";
import { useProductos } from "../context/ProductosContext";
import { useFilters } from "../context/FilterContext";

export const PastelesPage = () => {
    const { productos, loading, error } = useProductos();
    const { applyFilters, filters } = useFilters();
    
    const filteredProducts = applyFilters(productos);
    const hasActiveFilters = filters.formas.length > 0 || filters.tamanios.length > 0;

    return (
        <>
            <h1 className="text-5xl font-semibold text-center mb-12">Pasteles</h1>
            
            {error && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    <p className="font-medium">⚠️ {error}</p>
                    <p className="text-sm mt-1">Mostrando productos locales. Intenta recargar la página.</p>
                </div>
            )}
            
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                <ContainerFilter />
                <FilteredProductsGrid 
                    productos={filteredProducts} 
                    hasActiveFilters={hasActiveFilters}
                    loading={loading}
                />
            </div>
        </>
    );
};