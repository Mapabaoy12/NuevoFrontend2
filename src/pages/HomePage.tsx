import { Destacadas } from "../home/Destacado"
import { ProductosGrid } from "../home/ProductosGrid"
import { Categoria } from "../home/Categorias"
import { productos } from "../data/productos"
export const HomePage = () => {
    return (
    <div>
        <Destacadas/>
        <ProductosGrid
            title="Nuevos Productos" productos={productos}
        />
        <ProductosGrid
            title="Productos destacados" productos={[{id:999, titulo:'Producto Destacado 1', imagen:'', forma:'Circulares', tamanio:'Pequenia', precio:0, descripcion:'Destacado temporal'}]}
        />

        <Categoria/>
    </div>
    )
}