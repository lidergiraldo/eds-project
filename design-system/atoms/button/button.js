// design-system/atoms/button/button.js
import { h } from '@dropins/tools/preact.js';
import htm from '../../../scripts/htm.js';

const html = htm.bind(h);

/**
 * Button — Design System Atom
 *
 * @param {string}  props.label
 * @param {string}  [props.href]
 * @param {'primary'|'secondary'|'ghost'|'danger'|'accent'|'info'|'link'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {'_self'|'_blank'} [props.target='_self']
 * @param {string}  [props.icon]
 * @param {'left'|'right'} [props.iconPosition='left']
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.loading=false]
 * @param {function} [props.onClick]
 */
export const Button = ({
  label,
  href = null,
  variant = 'primary',
  size = 'md',
  target = '_self',
  icon = null,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  ...rest
}) => {
  // ─── VARIANT STYLES ───────────────────────────────────────
  const variantStyles = {
    primary: {
      container: disabled
        ? '!bg-brand-primary/40 !border-transparent'
        : '!bg-brand-primary !border-brand-primary hover:!bg-brand-primary-hover hover:!border-brand-primary-hover hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(108,99,255,0.3)] active:translate-y-0',
      label: disabled ? '!text-white/40' : '!text-white',
    },
    secondary: {
      container: disabled
        ? '!bg-transparent !border-brand-primary/40'
        : '!bg-transparent !border-brand-primary hover:!bg-brand-primary/10 hover:-translate-y-0.5 active:translate-y-0',
      label: disabled ? '!text-brand-primary/40' : '!text-brand-primary',
    },
    ghost: {
      container: disabled
        ? '!bg-transparent !border-border/40'
        : '!bg-transparent !border-border hover:!bg-surface-2 hover:!border-muted hover:-translate-y-0.5 active:translate-y-0',
      label: disabled ? '!text-text/40' : '!text-text',
    },
    accent: {
      container: disabled
        ? '!bg-brand-accent/40 !border-transparent'
        : '!bg-brand-accent !border-brand-accent hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0',
      label: disabled ? '!text-bg/40' : '!text-bg !font-bold',
    },
    danger: {
      container: disabled
        ? '!bg-brand-secondary/40 !border-transparent'
        : '!bg-brand-secondary !border-brand-secondary hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0',
      label: disabled ? '!text-white/40' : '!text-white',
    },
    info: {
      container: disabled
        ? '!bg-feedback-info/40 !border-transparent'
        : '!bg-feedback-info !border-feedback-info hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0',
      label: disabled ? '!text-bg/40' : '!text-bg',
    },
    link: {
      container: disabled
        ? '!bg-transparent !border-transparent !px-0 !py-0'
        : '!bg-transparent !border-transparent !px-0 !py-0 hover:!text-brand-primary-hover',
      label: disabled
        ? '!text-brand-primary/40'
        : '!text-brand-primary underline underline-offset-4',
    },
  };

  // ─── SIZE STYLES ──────────────────────────────────────────
  const sizeStyles = {
    sm: { container: '!py-[8px] !px-[16px]', label: '!text-[12.5px]' },
    md: { container: '!py-[11px] !px-[22px]', label: '!text-[14px]' },
    lg: { container: '!py-[15px] !px-[32px]', label: '!text-[15px] !font-semibold' },
    xl: { container: '!py-[18px] !px-[40px]', label: '!text-[16px] !font-semibold' },
  };

  const v = variantStyles[variant] ?? variantStyles.primary;
  const s = sizeStyles[size] ?? sizeStyles.md;

  // ─── CLASSES ──────────────────────────────────────────────
  const containerClass = [
    'group relative inline-flex items-center justify-center gap-2',
    '!rounded-xl !border-2 !border-solid transition-all duration-200',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    'outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0',
    s.container, v.container,
  ].join(' ');

  const labelClass = [
    'inline-flex items-center gap-2 font-semibold leading-none whitespace-nowrap',
    s.label, v.label,
  ].join(' ');

  const focusRingClass = [
    'absolute inset-0 rounded-xl pointer-events-none',
    'outline outline-2 outline-offset-2 outline-brand-primary',
    'opacity-0 transition-opacity duration-150 group-focus-visible:opacity-100',
  ].join(' ');

  // ─── ICON ─────────────────────────────────────────────────
  const iconEl = icon && html`
    <img src=${`/icons/${icon}.svg`} alt="" aria-hidden="true" loading="lazy" class="size-4 shrink-0" />
  `;

  // ─── SPINNER ──────────────────────────────────────────────
  const spinnerEl = loading && html`
    <span aria-hidden="true" class="size-4 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin" />
  `;

  // ─── INNER ────────────────────────────────────────────────
  const inner = html`
    <div class=${focusRingClass} />
    <span class=${labelClass}>
      ${!loading && iconPosition === 'left' && iconEl}
      ${label}
      ${!loading && iconPosition === 'right' && iconEl}
    </span>
    ${spinnerEl}
  `;

  // ─── RENDER ───────────────────────────────────────────────
  if (href && !disabled) {
    return html`
      <a
        data-component="button"
        href=${href}
        target=${target}
        rel=${target === '_blank' ? 'noopener noreferrer' : undefined}
        aria-label=${target === '_blank' ? `${label} (opens in new tab)` : undefined}
        aria-busy=${loading ? 'true' : undefined}
        class=${containerClass}
        ...${rest}
      >${inner}</a>
    `;
  }

  return html`
    <button
      data-component="button"
      type="button"
      disabled=${disabled || undefined}
      aria-disabled=${disabled ? 'true' : undefined}
      aria-busy=${loading ? 'true' : undefined}
      class=${containerClass}
      ...${rest}
    >${inner}</button>
  `;
};

export default Button;
