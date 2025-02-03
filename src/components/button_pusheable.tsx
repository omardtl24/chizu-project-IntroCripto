import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonPusheableProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    isLoading?: boolean;
    children?: React.ReactNode;
}

export const ButtonPusheable = React.forwardRef<HTMLButtonElement, ButtonPusheableProps>(
    ({ className, isLoading = false, children, ...props }, ref) => {
        return (
            <button
                className={cn("button-82-pushable", className)}
                role="button"
                ref={ref}
                {...props}
            >
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text ">
                    {isLoading ? <div className="loader pb-2"></div> : children}
                </span>
            </button>
        );
    }
);

ButtonPusheable.displayName = "ButtonPusheable";