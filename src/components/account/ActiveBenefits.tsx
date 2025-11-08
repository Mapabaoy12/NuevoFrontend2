import { HiGift } from "react-icons/hi";
import type { Usuario } from "../../data/Usuario";

interface ActiveBenefitsProps {
    user: Usuario;
}

export const ActiveBenefits = ({ user }: ActiveBenefitsProps) => {
    const hasBenefits = user.descuentoPorcentaje > 0 || user.tortaGratisCumpleanosDisponible;

    if (!hasBenefits) return null;

    return (
        <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <HiGift className="text-rose-500" />
                Tus Beneficios Activos
            </h3>
            <div className="space-y-2">
                {user.esMayorDe50 && (
                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-3">
                        <p className="text-rose-800 font-medium">🎉 50% de descuento en todos los productos</p>
                        <p className="text-rose-600 text-sm">Por ser mayor de 50 años</p>
                    </div>
                )}
                
                {user.tieneDescuentoFelices50 && !user.esMayorDe50 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <p className="text-purple-800 font-medium">🎊 10% de descuento de por vida</p>
                        <p className="text-purple-600 text-sm">Código FELICES50 aplicado</p>
                    </div>
                )}
                
                {user.tortaGratisCumpleanosDisponible && !user.tortaGratisCumpleanosUsada && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-800 font-medium">🎂 Torta gratis en tu cumpleaños</p>
                        <p className="text-blue-600 text-sm">Beneficio Duoc UC (un solo uso)</p>
                    </div>
                )}
                
                {user.tortaGratisCumpleanosUsada && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="text-gray-600 font-medium">🎂 Torta de cumpleaños</p>
                        <p className="text-gray-500 text-sm">Beneficio utilizado en {user.añoTortaGratisCumpleanos}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
