import { useState } from "react";
import { Field } from "formik";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    id: string;
    name: string;
    placeholder?: string;
    label?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ id, name, placeholder = "Enter password" }) => {
    
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="relative">
            <Field id={id}
                type={showPassword ? "text" : "password"}
                name={name}
                className="w-full p-2 border border-[#E6E6E6] rounded-lg focus:outline-none pr-10"
                placeholder={placeholder}
            />
            <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                aria-label="Toggle password visibility"
                className="absolute top-1/2 -translate-y-1/2 h-full right-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
};

export default PasswordInput;
