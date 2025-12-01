import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { InputField } from "./InputField";
import { RememberMeCheckbox } from "./RememberMeCheckbox";
import { ForgotPasswordLink } from "./ForgotPasswordLink";
import { useUser } from "../../context/UserContext";
import { AUTH_MESSAGES } from "../../constants/messages";

interface LoginFormData {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { login } = useUser();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const success = await login(formData.email, formData.password);
        
        if (success) {
            alert("Sesión iniciada exitosamente");
            navigate("/account");
        } else {
            alert("Email no encontrado o credenciales inválidas. Por favor, regístrate.");
            navigate("/registro");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label="Correo electronico"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    icon={HiMail}
                />

                <InputField
                    label="Contrasenia"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    icon={HiLockClosed}
                />

                <div className="flex items-center justify-between">
                    <RememberMeCheckbox />
                    <ForgotPasswordLink />
                </div>

                <button
                    type="submit"
                    className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium"
                >
                    Iniciar Sesion
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    ¿No tienes cuenta?{" "}
                    <Link to="/registro" className="text-rose-600 hover:text-rose-700 font-medium">
                        Registrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};
