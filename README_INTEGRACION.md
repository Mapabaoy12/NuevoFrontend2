# 🎯 Integración Frontend-Backend Completa

## ✅ Cambios Realizados

### 1. **Servicios API** (`src/api/`)
- ✅ `api.ts` - Cliente Axios con interceptores de error
- ✅ `productos.ts` - CRUD completo de productos
- ✅ `pedidos.ts` - CRUD completo de pedidos
- ✅ `usuarios.ts` - CRUD completo de usuarios
- ✅ `admin.ts` - Estadísticas del dashboard
- ✅ `index.ts` - Exportación centralizada

### 2. **Contexts Actualizados**
- ✅ `AdminContext` - Ahora consume backend con fallback a localStorage
- ✅ `ProductosContext` (nuevo) - Gestión de productos para toda la app

### 3. **Configuración**
- ✅ `.env` - Variables de entorno
- ✅ `.env.example` - Plantilla de configuración

### 4. **Main.tsx**
- ✅ Agregado `ProductosProvider` al árbol de providers

---

## 🚀 Cómo Usar en Tu Frontend

### **Opción 1: Usar ProductosContext (Recomendado para páginas públicas)**

En componentes como `HomePage`, `PastelesPage`, `ProductDetailPage`:

```tsx
import { useProductos } from '../context/ProductosContext';

export const MiComponente = () => {
    const { productos, loading, error } = useProductos();

    if (loading) {
        return <div className="text-center p-8">Cargando productos...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-600">{error}</div>;
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            {productos.map(producto => (
                <CardProduct key={producto.id} producto={producto} />
            ))}
        </div>
    );
};
```

### **Opción 2: Usar AdminContext (Solo para área admin)**

```tsx
import { useAdmin } from '../context/AdminContext';

export const ProductList = () => {
    const { 
        productos, 
        loading, 
        error,
        agregarProducto,
        actualizarProducto,
        eliminarProducto 
    } = useAdmin();

    const handleCreate = async () => {
        await agregarProducto({
            titulo: "Nueva Torta",
            precio: 10000,
            descripcion: "Deliciosa",
            imagen: "/img/torta.jpg",
            forma: "Circulares",
            tamanio: "Grande",
            stock: 10
        });
    };

    // Las funciones son async, puedes usar await
    const handleUpdate = async (id: number) => {
        await actualizarProducto(id, { stock: 20 });
    };

    const handleDelete = async (id: number) => {
        await eliminarProducto(id);
    };
};
```

---

## 🔄 Comportamiento Automático

### **Modo Online (Backend disponible)**
1. ✅ Carga datos desde `http://localhost:8080/api`
2. ✅ Todas las operaciones CRUD se sincronizan con el backend
3. ✅ Los cambios se reflejan inmediatamente

### **Modo Offline (Backend no disponible)**
1. ⚠️ Muestra mensaje de error informativo
2. ✅ Usa datos locales (localStorage + datos iniciales)
3. ✅ Las operaciones funcionan localmente
4. ✅ La app NO se rompe

---

## 📦 Ejemplo Completo: HomePage

```tsx
import { useProductos } from '../context/ProductosContext';
import { ProductosGrid } from '../components/home/ProductosGrid';
import { Destacado } from '../components/home/Destacado';
import { Novedades } from '../components/home/Novedades';

export const HomePage = () => {
    const { productos, loading, error } = useProductos();

    // Productos destacados (primeros 4)
    const productosDestacados = productos.slice(0, 4);
    
    // Productos recientes (últimos 4)
    const productosRecientes = productos.slice(-4);

    return (
        <div>
            {error && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <Destacado productos={productosDestacados} loading={loading} />
            <Novedades productos={productosRecientes} loading={loading} />
            <ProductosGrid productos={productos} loading={loading} />
        </div>
    );
};
```

---

## 🛠️ Componentes que Necesitas Actualizar

### **1. HomePage** (`src/pages/HomePage.tsx`)
```tsx
// ANTES
import { productosDestacados } from '../data/productos';

// DESPUÉS
import { useProductos } from '../context/ProductosContext';
const { productos } = useProductos();
const productosDestacados = productos.slice(0, 4);
```

### **2. PastelesPage** (`src/pages/PastelesPage.tsx`)
```tsx
// ANTES
import { productos } from '../data/productos';

// DESPUÉS
import { useProductos } from '../context/ProductosContext';
const { productos, loading } = useProductos();
```

### **3. ProductDetailPage** (`src/pages/ProductDetailPage.tsx`)
```tsx
// ANTES
import { productos } from '../data/productos';
const producto = productos.find(p => p.id === parseInt(id));

// DESPUÉS
import { useProductos } from '../context/ProductosContext';
const { obtenerProductoPorId } = useProductos();
const producto = obtenerProductoPorId(parseInt(id));
```

### **4. FilterContext** (`src/context/FilterContext.tsx`)
```tsx
// ANTES
import { productos as allProductos } from '../data/productos';

// DESPUÉS
import { useProductos } from './ProductosContext';
const { productos: allProductos } = useProductos();
```

---

## 📡 Endpoints que el Frontend Consumirá

### **Productos**
- `GET /api/productos` - Obtener todos
- `GET /api/productos/activos` - Solo activos (usados en ProductosContext)
- `POST /api/productos` - Crear nuevo
- `PUT /api/productos/{id}` - Actualizar
- `DELETE /api/productos/{id}` - Eliminar

### **Pedidos**
- `GET /api/pedidos` - Obtener todos (admin)
- `GET /api/pedidos/usuario/{email}` - Por usuario
- `POST /api/pedidos` - Crear pedido
- `PUT /api/pedidos/{id}/estado` - Cambiar estado
- `DELETE /api/pedidos/{id}` - Eliminar

### **Usuarios**
- `GET /api/usuarios` - Obtener todos (admin)
- `GET /api/usuarios/{email}` - Por email
- `POST /api/usuarios` - Registrar usuario
- `PUT /api/usuarios/{email}` - Actualizar
- `DELETE /api/usuarios/{email}` - Eliminar

---

## 🎨 Componentes de Loading

Puedes crear un componente reutilizable:

```tsx
// src/components/shared/Loading.tsx
export const Loading = () => (
    <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
    </div>
);

// Uso
{loading ? <Loading /> : <ProductosGrid productos={productos} />}
```

---

## 🔐 Seguridad (Próximo paso)

Para producción, considera agregar:
1. JWT tokens en los headers
2. Refresh tokens
3. Validación de roles (admin vs usuario)
4. HTTPS

---

## 📝 Notas Importantes

1. **IDs de Pedidos**: El backend usa `Long` (number), el frontend los convierte a string para compatibilidad
2. **Estados**: Backend usa UPPERCASE (`PENDIENTE`), frontend usa lowercase (`pendiente`)
3. **Fechas**: Se convierten automáticamente entre string (backend) y Date (frontend)
4. **Precios**: El backend podría usar `BigDecimal`, el frontend usa `number`

---

## ✅ Checklist de Integración

- [x] Servicios API creados
- [x] Contexts actualizados
- [x] ProductosProvider agregado a main.tsx
- [x] Manejo de errores implementado
- [x] Modo fallback funcionando
- [ ] Actualizar HomePage para usar useProductos()
- [ ] Actualizar PastelesPage para usar useProductos()
- [ ] Actualizar ProductDetailPage para usar useProductos()
- [ ] Actualizar FilterContext para usar useProductos()
- [ ] Probar con backend corriendo
- [ ] Probar sin backend (modo offline)

---

## 🚀 Para Empezar

1. **Instala las dependencias** (ya hecho):
   ```bash
   npm install axios
   ```

2. **Configura el backend**:
   - Asegúrate que esté corriendo en `http://localhost:8080`
   - O cambia la URL en `.env`

3. **Inicia el frontend**:
   ```bash
   npm run dev
   ```

4. **Verifica la consola**:
   - Verás logs si el backend no responde
   - Los datos se cargarán desde el backend automáticamente

---

¡Todo listo! 🎉 Tu frontend ahora está preparado para consumir el backend de Spring Boot.
