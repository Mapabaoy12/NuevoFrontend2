interface ProductImageProps {
    imagen: string;
    titulo: string;
}

export const ProductImage = ({ imagen, titulo }: ProductImageProps) => {
    return (
        <div className="w-full">
            <img 
                src={imagen} 
                alt={titulo}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
            />
        </div>
    );
};
