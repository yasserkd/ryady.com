/*
  # Create Widgets System

  1. Changes
    - Drop old tasks table (no longer needed)
    - Create new `widgets` table for storing generated widget codes
    - Create new `widget_templates` table for predefined widget types
    
  2. New Tables
    - `widget_templates`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Template name (e.g., "Social Media Bar")
      - `description` (text) - Template description
      - `icon` (text) - Icon name for UI
      - `fields` (jsonb) - Required fields configuration
      - `created_at` (timestamptz) - Creation timestamp
      
    - `widgets`
      - `id` (uuid, primary key) - Unique identifier
      - `template_id` (uuid) - Reference to widget_templates
      - `config` (jsonb) - User configuration data
      - `generated_code` (text) - Generated JavaScript code
      - `created_at` (timestamptz) - Creation timestamp
      
  3. Security
    - Enable RLS on both tables
    - Public read access for templates
    - Public insert/read access for widgets
*/

DROP TABLE IF EXISTS tasks;

CREATE TABLE IF NOT EXISTS widget_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  fields jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS widgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES widget_templates(id),
  config jsonb NOT NULL,
  generated_code text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE widget_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE widgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view templates"
  ON widget_templates
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view widgets"
  ON widgets
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert widgets"
  ON widgets
  FOR INSERT
  WITH CHECK (true);

INSERT INTO widget_templates (name, description, icon, fields) VALUES
  ('شريط السوشل ميديا', 'شريط يظهر عند نهاية الصفحة مع روابط السوشل ميديا', 'Share2', '[{"name":"facebook","label":"رابط الفيسبوك","type":"url"},{"name":"twitter","label":"رابط تويتر","type":"url"},{"name":"instagram","label":"رابط الانستقرام","type":"url"},{"name":"youtube","label":"رابط اليوتيوب","type":"url"},{"name":"color","label":"لون الشريط","type":"color","default":"#4F46E5"}]'),
  ('نافذة منبثقة ترحيبية', 'نافذة ترحيبية تظهر عند دخول الزائر للموقع', 'MessageSquare', '[{"name":"title","label":"عنوان الرسالة","type":"text"},{"name":"message","label":"نص الرسالة","type":"textarea"},{"name":"buttonText","label":"نص الزر","type":"text","default":"فهمت"},{"name":"delay","label":"التأخير بالثواني","type":"number","default":"2"}]'),
  ('عداد تنازلي', 'عداد تنازلي لحدث أو تاريخ معين', 'Clock', '[{"name":"targetDate","label":"التاريخ المستهدف","type":"datetime"},{"name":"title","label":"عنوان العداد","type":"text"},{"name":"color","label":"لون العداد","type":"color","default":"#EF4444"}]'),
  ('زر العودة للأعلى', 'زر يظهر عند التمرير للأسفل للعودة لأعلى الصفحة', 'ArrowUp', '[{"name":"color","label":"لون الزر","type":"color","default":"#3B82F6"},{"name":"position","label":"موضع الزر","type":"select","options":["يمين","يسار"],"default":"يمين"}]');
