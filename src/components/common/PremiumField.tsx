import React, { useId } from "react";

export interface PremiumFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelEn: string;
  labelAr: string;
  icon?: React.ReactNode;
  helperText?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isLoading?: boolean;
}

export const PremiumField = React.forwardRef<HTMLInputElement, PremiumFieldProps>(
  (
    {
      labelEn,
      labelAr,
      icon,
      helperText,
      errorMessage,
      isRequired = false,
      isLoading = false,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const id = useId();
    const hasError = Boolean(errorMessage);

    return (
      <div className={`uos-field-group flex flex-col gap-1.5 text-left rtl:text-right ${className}`}>
        {/* Bilingual Label System */}
        <div className="flex items-center justify-between px-1 text-xs font-semibold tracking-wide">
          <label htmlFor={id} className="text-[var(--color-text-primary)] flex items-center gap-1">
            <span>{labelEn}</span>
            {isRequired && <span className="text-[var(--color-gold-500)]">*</span>}
          </label>
          <label htmlFor={id} className="text-[var(--color-text-secondary)] font-arabic dir-rtl">
            {labelAr}
          </label>
        </div>

        {/* Input Surface */}
        <div
          className={`
            relative flex items-center h-[52px] w-full px-4 rounded-[var(--radius-md)]
            bg-[var(--glass-l1-bg)] backdrop-blur-[8px]
            border border-[var(--glass-l1-border)]
            transition-all duration-[var(--transition-smooth)]
            hover:border-[var(--glass-l2-border)] hover:bg-[var(--glass-l2-bg)]
            focus-within:border-[var(--color-gold-500)] focus-within:ring-2 focus-within:ring-[var(--color-gold-500)]/20
            focus-within:shadow-[0_0_15px_rgba(212,175,55,0.15)]
            ${hasError ? "!border-red-500/80 focus-within:!ring-red-500/20" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
          `}
        >
          {/* Leading Icon */}
          {icon && (
            <div className="mr-3 text-[var(--color-text-tertiary)] flex-shrink-0 transition-colors focus-within:text-[var(--color-gold-500)] rtl:ml-3 rtl:mr-0">
              {icon}
            </div>
          )}

          {/* Core Input */}
          <input
            id={id}
            ref={ref}
            disabled={disabled}
            className="w-full bg-transparent text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-0 border-0 p-0 font-sans"
            {...props}
          />

          {/* Inline Loader indicator */}
          {isLoading && (
            <div className="ml-2 w-4 h-4 border-2 border-[var(--color-gold-500)] border-t-transparent rounded-full animate-spin rtl:mr-2 rtl:ml-0" />
          )}
        </div>

        {/* Feedback / Helper Footer */}
        {(helperText || errorMessage) && (
          <div className="px-1 text-xs">
            {errorMessage ? (
              <span className="text-red-400 font-medium">{errorMessage}</span>
            ) : (
              <span className="text-[var(--color-text-tertiary)]">{helperText}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

PremiumField.displayName = "PremiumField";
