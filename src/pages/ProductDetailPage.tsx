import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productos, type Producto } from "../data/productos";
import { ProductImage } from "../components/product/ProductImage";
import { ProductInfo } from "../components/product/ProductInfo";
import { ProductActions } from "../components/product/ProductActions";
import { ProductNotFound } from "../components/product/ProductNotFound";
import { HiArrowLeft } from "react-icons/hi";

export const ProductDetailPage = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState<Producto | null>(null);

    useEffect(() => {
        const foundProducto = productos.find(p => p.id === Number(id));
        if (foundProducto) {
            setProducto(foundProducto);
        }
    }, [id]);

    if (!producto) {
        return <ProductNotFound />;
    }

    return (
        <div className="py-8 px-4">
            <Link 
                to="/pasteles"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-colors"
            >
                <HiArrowLeft size={20} />
                Volver a pasteles
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                <ProductImage 
                    imagen={producto.imagen} 
                    titulo={producto.titulo} 
                />

                <div className="space-y-6">
                    <ProductInfo producto={producto} />
                    <ProductActions producto={producto} />
                </div>
            </div>
        </div>
    );
};
