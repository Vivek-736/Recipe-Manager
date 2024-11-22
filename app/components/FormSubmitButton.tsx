"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
    children: React.ReactNode;
    className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
    children,
    className,
    ...props
}: FormSubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            className={`w-full py-3 px-4 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white text-lg font-medium rounded-md shadow-md focus:outline-none focus:ring focus:ring-green-300 transition-all ${className}`}
            type="submit"
            disabled={pending}
        >
            {pending && <span className="loading loading-spinner" />}
            {children}
        </button>
    );
}