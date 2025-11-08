interface FilterCheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
}

export const FilterCheckbox = ({ label, checked, onChange }: FilterCheckboxProps) => {
    return (
        <label className="inline-flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
            <input 
                type="checkbox" 
                checked={checked}
                onChange={onChange}
                className="text-rose-600 border-gray-300 focus:ring-rose-500 accent-rose-600 cursor-pointer"
            />
            <span className="ml-2 text-black select-none">{label}</span>
        </label>
    );
};
