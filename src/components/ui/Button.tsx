import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

/* 按钮：胶囊形，主操作走渐变填充，次操作走卡片底 + 发丝边 */
const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-[13px] font-medium transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-transparent bg-accent-gradient text-onaccent shadow-glow hover:-translate-y-0.5 hover:shadow-lift',
  secondary:
    'border-line bg-surface text-ink shadow-soft hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent',
  ghost: 'border-transparent bg-transparent text-muted hover:bg-subtle hover:text-ink',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[12px]',
  md: 'h-11 px-5',
};

export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return <button type={type} className={buttonStyles(variant, size, className)} {...rest} />;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={buttonStyles(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}
