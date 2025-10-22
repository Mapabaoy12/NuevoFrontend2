import { CardProduct } from "../components/productos/CardProduct";
import type { Producto } from "../data/productos";

/* Props: title and array of productos */
interface Props {
    title: string;
    productos: Producto[];
}

export const ProductosGrid = ({ title, productos }: Props) => {
    return (
        <div className="my-32">
            <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
                {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-8 lg:grid-cols-4">
                {productos.map((producto) => (
                    <CardProduct key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

