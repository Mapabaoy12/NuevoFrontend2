import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiMail, HiLockClosed, HiUser, HiPhone, HiCalendar, HiLocationMarker, HiTag } from "react-icons/hi";
import { InputField } from "./InputField";
import { TermsCheckbox } from "./TermsCheckbox";
import { useUser } from "../../context/UserContext";
import { calcularEdad, esDuocEmail, type Usuario } from "../../data/Usuario";
import { AUTH_MESSAGES } from "../../constants/messages";

interface RegistroFormData {
    nombre: string;
    email: string;
    telefono: string;
    fechaNacimiento: string;
    direccion: string;
    codigoPromocional: string;
    password: string;
    confirmPassword: string;
}

export const RegistroForm = () => {
    const [formData, setFormData] = useState<RegistroFormData>({
        nombre: "",
        email: "",
        telefono: "",
        fechaNacimiento: "",
        direccion: "",
        codigoPromocional: "",
        password: "",
        confirmPassword: ""
    });
    const [promoInfo, setPromoInfo] = useState<string>("");
    const navigate = useNavigate();
    const { login } = useUser();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value
        });

        // Mostrar información de promociones aplicables
        if (name === 'email') {
            if (esDuocEmail(value)) {
                setPromoInfo("🎂 ¡Correo Duoc UC detectado! Recibirás una torta gratis en tu cumpleaños.");
            } else {
                setPromoInfo("");
            }
        }

        if (name === 'codigoPromocional' && value.toUpperCase() === 'FELICES50') {
            setPromoInfo("🎉 ¡Código válido! Recibirás 10% de descuento de por vida.");
        } else if (name === 'codigoPromocional' && value === '') {
            setPromoInfo("");
        }
    };

    const validateAge = (fechaNacimiento: string): boolean => {
        const today = new Date();
        const birthDate = new Date(fechaNacimiento);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // Ajustar edad si aún no ha cumplido años este año
        const adjustedAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ? age - 1
            : age;

        return adjustedAge <= 102 && adjustedAge >= 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        if (!validateAge(formData.fechaNacimiento)) {
            alert("La fecha de nacimiento no es válida. La edad debe ser menor o igual a 102 años.");
            return;
        }

        // Calcular edad del usuario
        const edad = calcularEdad(formData.fechaNacimiento);
        const esMayorDe50 = edad >= 50;
        const esDuoc = esDuocEmail(formData.email);
        const tieneCodigoFelices50 = formData.codigoPromocional.toUpperCase() === 'FELICES50';

        // Calcular descuento aplicable (el mayor descuento gana)
        let descuentoPorcentaje = 0;
        const beneficios: string[] = [];

        if (esMayorDe50) {
            descuentoPorcentaje = 50;
            beneficios.push("50% de descuento por ser mayor de 50 años");
        } else if (tieneCodigoFelices50) {
            descuentoPorcentaje = 10;
            beneficios.push("10% de descuento de por vida con código FELICES50");
        }

        if (esDuoc) {
            beneficios.push("Torta gratis en tu cumpleaños como estudiante Duoc UC");
        }

        // Crear objeto usuario
        const nuevoUsuario: Usuario = {
            nombre: formData.nombre,
            email: formData.email,
            telefono: formData.telefono,
            fechaNacimiento: formData.fechaNacimiento,
            direccion: formData.direccion,
            codigoPromocional: formData.codigoPromocional,
            esDuocUC: esDuoc,
            esMayorDe50: esMayorDe50,
            tieneDescuentoFelices50: tieneCodigoFelices50,
            descuentoPorcentaje: descuentoPorcentaje,
            tortaGratisCumpleanosDisponible: esDuoc,
            tortaGratisCumpleanosUsada: false,
        };

        // Guardar usuario en la lista de usuarios registrados
        const usuariosRegistrados = localStorage.getItem('usuariosRegistrados');
        let listaUsuarios = [];
        
        if (usuariosRegistrados) {
            try {
                listaUsuarios = JSON.parse(usuariosRegistrados);
            } catch {
                listaUsuarios = [];
            }
        }

        // Verificar si el email ya existe
        const emailExiste = listaUsuarios.some((u: Usuario) => u.email === nuevoUsuario.email);
        
        if (emailExiste) {
            alert(AUTH_MESSAGES.EMAIL_ALREADY_REGISTERED);
            navigate("/login");
            return;
        }

        // Agregar nuevo usuario a la lista
        listaUsuarios.push(nuevoUsuario);
        localStorage.setItem('usuariosRegistrados', JSON.stringify(listaUsuarios));

        // Guardar usuario en el contexto (iniciar sesión automáticamente)
        login(nuevoUsuario);
        
        // Mostrar mensaje con beneficios
        let mensaje = "¡Cuenta creada exitosamente!";
        if (beneficios.length > 0) {
            mensaje += "\n\nTus beneficios:\n• " + beneficios.join("\n• ");
        }
        
        alert(mensaje);
        navigate("/account");
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                    label="Nombre completo"
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    icon={HiUser}
                />

                <InputField
                    label="Correo electrónico"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    icon={HiMail}
                />

                <InputField
                    label="Teléfono"
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+56 9 1234 5678"
                    icon={HiPhone}
                />

                <InputField
                    label="Fecha de nacimiento"
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    placeholder=""
                    icon={HiCalendar}
                />

                <InputField
                    label="Dirección"
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Calle, número, comuna"
                    icon={HiLocationMarker}
                />

                <div>
                    <InputField
                        label="Código promocional (opcional)"
                        type="text"
                        name="codigoPromocional"
                        value={formData.codigoPromocional}
                        onChange={handleChange}
                        placeholder="Ej: FELICES50"
                        icon={HiTag}
                        required={false}
                    />
                    {promoInfo && (
                        <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                            {promoInfo}
                        </p>
                    )}
                </div>

                <InputField
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    icon={HiLockClosed}
                    minLength={6}
                />

                <InputField
                    label="Confirmar contraseña"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    icon={HiLockClosed}
                    minLength={6}
                />

                <TermsCheckbox />

                <button
                    type="submit"
                    className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium"
                >
                    Crear Cuenta
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-rose-600 hover:text-rose-700 font-medium">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};
