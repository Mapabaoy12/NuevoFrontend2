// Guía de integración con Backend

## 🚀 Configuración Inicial

### 1. Variables de Entorno
El archivo `.env` ya está configurado con:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### 2. Servicios API Creados
- ✅ `/src/api/api.ts` - Cliente Axios configurado
- ✅ `/src/api/productos.ts` - CRUD de productos
- ✅ `/src/api/pedidos.ts` - CRUD de pedidos
- ✅ `/src/api/usuarios.ts` - CRUD de usuarios
- ✅ `/src/api/admin.ts` - Estadísticas del admin
- ✅ `/src/api/index.ts` - Exportación centralizada

### 3. Contexts Actualizados
- ✅ `AdminContext` - Ahora consume el backend
- ✅ `ProductosContext` (nuevo) - Para productos en toda la app

## 📝 Cómo Usar

### En componentes de Admin:
```tsx
import { useAdmin } from '../context/AdminContext';

const MiComponente = () => {
    const { 
        productos, 
        loading, 
        error,
        agregarProducto,
        actualizarProducto,
        eliminarProducto 
    } = useAdmin();

    // Todas las operaciones son async y se sincronizan con el backend
    const handleAgregar = async () => {
        await agregarProducto({
            titulo: "Nueva torta",
            precio: 10000,
            // ...
        });
    };
};
```

### En componentes normales (catálogo, home, etc):
```tsx
import { useProductos } from '../context/ProductosContext';

const Catalogo = () => {
    const { productos, loading, error } = useProductos();

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {productos.map(producto => (
                <ProductCard key={producto.id} producto={producto} />
            ))}
        </div>
    );
};
```

## 🔄 Modo Fallback
Si el backend no está disponible:
- ✅ La app funciona con datos locales (localStorage + datos iniciales)
- ✅ Muestra mensajes de error informativos
- ✅ No bloquea la funcionalidad

## 🎯 Próximos Pasos

1. **Envolver la app con ProductosProvider** en `main.tsx`:
```tsx
import { ProductosProvider } from './context/ProductosContext';

<ProductosProvider>
    <App />
</ProductosProvider>
```

2. **Actualizar componentes** para usar `useProductos()` en lugar de datos estáticos

3. **Implementar CartContext con backend** para sincronizar el carrito

4. **Añadir autenticación JWT** (opcional)

## 🔐 Endpoints del Backend

### Productos
- GET `/api/productos` - Todos los productos
- GET `/api/productos/activos` - Solo activos
- GET `/api/productos/{id}` - Por ID
- POST `/api/productos` - Crear
- PUT `/api/productos/{id}` - Actualizar
- DELETE `/api/productos/{id}` - Eliminar

### Pedidos
- GET `/api/pedidos` - Todos
- GET `/api/pedidos/usuario/{email}` - Por usuario
- POST `/api/pedidos` - Crear
- PUT `/api/pedidos/{id}/estado` - Actualizar estado
- DELETE `/api/pedidos/{id}` - Eliminar

### Usuarios
- GET `/api/usuarios` - Todos
- GET `/api/usuarios/{email}` - Por email
- POST `/api/usuarios` - Crear
- PUT `/api/usuarios/{email}` - Actualizar
- DELETE `/api/usuarios/{email}` - Eliminar

### Admin
- GET `/api/admin/estadisticas` - Estadísticas generales
