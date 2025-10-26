import * as Icons from 'lucide-react';
import type { WidgetTemplate } from '../types/widget';

interface WidgetCardProps {
  template: WidgetTemplate;
  onSelect: (template: WidgetTemplate) => void;
}

export function WidgetCard({ template, onSelect }: WidgetCardProps) {
  const IconComponent = (Icons as any)[template.icon] || Icons.Box;

  return (
    <button
      onClick={() => onSelect(template)}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-right"
    >
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg">
          <IconComponent className="text-white" size={28} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{template.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
        </div>
      </div>
    </button>
  );
}
