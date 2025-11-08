import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import type { CartItem as CartItemType } from "../../interfaces/cartInterface";
import { formatPrice } from "../../utils/formatters";

interface CartItemProps {
    item: CartItemType;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
}

export const CartItem = ({ item, updateQuantity, removeFromCart }: CartItemProps) => {
    return (
        <div className="flex gap-4 bg-white p-4 rounded-lg shadow border border-slate-200">
            <img 
                src={item.imagen} 
                alt={item.titulo} 
                className="w-24 h-24 object-cover rounded"
            />
            
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-lg">{item.titulo}</h3>
                    <p className="text-gray-600 text-sm">{formatPrice(item.precio)} c/u</p>
                </div>
                
                <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm text-gray-600">Cantidad:</span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Disminuir cantidad"
                        >
                            <HiMinus size={16} />
                        </button>
                        
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Aumentar cantidad"
                        >
                            <HiPlus size={16} />
                        </button>
                    </div>
                    
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                        aria-label="Eliminar producto"
                    >
                        <HiTrash size={18} />
                    </button>
                </div>
            </div>
            
            <div className="text-right flex flex-col justify-between">
                <p className="font-semibold text-lg text-rose-600">
                    {formatPrice(item.precio * item.quantity)}
                </p>
            </div>
        </div>
    );
};
