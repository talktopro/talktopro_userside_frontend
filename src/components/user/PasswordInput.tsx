import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.ComponentProps<"input"> { }

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState<boolean>(false);

        return (
            <div className="relative w-full">
                <input
                    type={showPassword ? "text" : "password"}
                    className={cn(
                        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-10",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-foreground/50"
                >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };