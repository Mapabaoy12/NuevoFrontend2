import { HiInformationCircle } from "react-icons/hi";

interface UserDiscountInfoProps {
    descuentoPorcentaje: number;
    esMayorDe50: boolean;
    tieneDescuentoFelices50: boolean;
}

export const UserDiscountInfo = ({ 
    descuentoPorcentaje, 
    esMayorDe50, 
    tieneDescuentoFelices50 
}: UserDiscountInfoProps) => {
    if (descuentoPorcentaje === 0) return null;

    return (
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
                <HiInformationCircle className="text-rose-600 shrink-0 mt-0.5" size={20} />
                <div>
                    <p className="text-rose-800 font-medium text-sm">
                        Descuento de usuario: {descuentoPorcentaje}%
                    </p>
                    <p className="text-rose-600 text-xs mt-1">
                        {esMayorDe50 
                            ? "Por ser mayor de 50 años" 
                            : tieneDescuentoFelices50 
                            ? "Código FELICES50 de por vida" 
                            : ""}
                    </p>
                </div>
            </div>
        </div>
    );
};
