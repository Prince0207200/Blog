import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "infield",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="relative w-full">
            <input
                type={type}
                className={` w-full px-3 py-4 bg-black text-custom-yellow border border-custom-yellow rounded-lg outline-none  ${className}`}
                ref={ref}
                id={id}
                {...props}
            />
            {label && (
                <label
                    htmlFor={id}
                    className="text-custom-yellow"
                ></label>
            )}
        </div>
    );
});

export default Input;
