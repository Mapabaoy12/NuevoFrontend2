import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Producto } from "../../data/productos";

interface Props {
    producto : Producto
}


export const CardProduct = ({producto}:Props) => {
    

    return(
        <div className="flex flex-col gap-6 relative">
            <Link to={`/pasteles/${producto.titulo}`} className="flex relative group ">
                <div className="flex h-[350px] w-full items-center justify-center py-2 lg:h-[250px]">
                    <img src={producto.imagen} alt={producto.titulo}
                    className="object-contain h-full w-full" />
                </div>
                <button className="bg-white border border-slate-200 absolute w-full bottom-0 py-3 rounded-3xl flex items-center justify-center gap-1 text-sm font-medium hover:bg-stone-100 translate-y-full transition-all duration-300 group-hover:translate-y-0">
                    <FiPlus/>
                    Aniadir
                </button>
            </Link>
                <div className="flex flex-col gap-1 items-center">
                    <p className="text-[15px] font-medium">
                        {producto.titulo}
                    </p>
                    <p className="text-[15px] font-medium">
                        {producto.precio}
                    </p>

                    
                </div>
                <div className="absolute top-2 left-2">
                    {
                        producto.stock ===  0 && <span>Agotado</span>
                    }
                </div>
            </div>
    )
}