import { CardProduct } from "../productos/CardProduct";
import type { Producto } from "../../data/productos";

interface Props {
    title: string;
    productos: Producto[];
    loading?: boolean;
}

export const ProductosGrid = ({ title, productos, loading = false }: Props) => {
    if (loading) {
        return (
            <div className="my-32">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
                        {title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-8 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-32">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
                    {title}
                </h2>
                {productos.length === 0 ? (
                    <p className="text-center text-gray-500">No hay productos disponibles</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-8 lg:grid-cols-4">
                        {productos.map((producto) => (
                            <CardProduct key={producto.id} producto={producto} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

