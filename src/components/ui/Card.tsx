import { LucideIcon } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', hover = true, padding = 'md' }: CardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`bg-white rounded-xl border border-slate-100 shadow-soft ${
        hover ? 'card-lift hover:shadow-soft-lg hover:border-slate-200' : ''
      } ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

interface CardWithIconProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function CardWithIcon({ icon: Icon, title, description, className = '' }: CardWithIconProps) {
  return (
    <Card className={className}>
      <div className="w-12 h-12 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-cyan-600" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </Card>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, features, className = '' }: FeatureCardProps) {
  return (
    <Card className={`h-full ${className}`} padding="lg">
      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed mb-4">{description}</p>
      {features && features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-slate-600">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
