import { Destacadas } from "../components/home/Destacado"
import { ProductosGrid } from "../components/home/ProductosGrid"

import { productosDestacados } from "../data/productos"
import { pastelesRecientes } from "../data/productos"
export const HomePage = () => {
    return (
    <div>
        <Destacadas/>
        <ProductosGrid
            title="Nuevos Productos" productos={pastelesRecientes}
        />
        <ProductosGrid
            title="Productos destacados" productos={productosDestacados}
        />

    </div>
    )
}