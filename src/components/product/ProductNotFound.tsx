import { Link } from "react-router-dom";

interface ProductNotFoundProps {
    title?: string;
    message?: string;
    buttonText?: string;
    redirectTo?: string;
}

export const ProductNotFound = ({ 
    title = "Producto no encontrado",
    message = "Lo sentimos, no pudimos encontrar el producto que buscas.",
    buttonText = "Ver todos los pasteles",
    redirectTo = "/pasteles"
}: ProductNotFoundProps) => {
    return (
        <div className="text-center py-16 px-4">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link 
                to={redirectTo}
                className="inline-block bg-rose-500 text-white px-8 py-3 rounded-lg hover:bg-rose-600 transition-colors"
            >
                {buttonText}
            </Link>
        </div>
    );
};
