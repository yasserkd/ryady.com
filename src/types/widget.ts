export interface WidgetTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  fields: WidgetField[];
  created_at: string;
}

export interface WidgetField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'color' | 'number' | 'datetime' | 'select';
  default?: string;
  options?: string[];
}

export interface Widget {
  id: string;
  template_id: string;
  config: Record<string, any>;
  generated_code: string;
  created_at: string;
}

export interface TemplateVariation {
  id: string;
  name: string;
  description: string;
  preview: string;
}
