import type { IconType } from "react-icons";

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon: IconType;
    required?: boolean;
    minLength?: number;
}

export const InputField = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    icon: Icon,
    required = true,
    minLength
}: InputFieldProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder={placeholder}
                    required={required}
                    minLength={minLength}
                />
            </div>
        </div>
    );
};
