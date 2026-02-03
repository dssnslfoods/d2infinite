interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className = '',
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`${align === 'center' ? 'text-center' : 'text-left'} mb-12 lg:mb-16 ${className}`}
    >
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
          dark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg sm:text-xl max-w-3xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${dark ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
