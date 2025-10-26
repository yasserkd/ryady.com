/*
  # إضافة نظام الاشتراكات والتضمين

  ## الجداول الجديدة

  1. `subscriptions` - خطط الاشتراك
    - `id` (uuid, primary key)
    - `name` (text) - اسم الخطة
    - `price` (decimal) - السعر الشهري
    - `features` (jsonb) - المزايا
    - `is_active` (boolean) - نشط أم لا
    - `created_at` (timestamp)

  2. `user_subscriptions` - اشتراكات المستخدمين
    - `id` (uuid, primary key)
    - `user_id` (uuid) - معرف المستخدم
    - `subscription_id` (uuid) - معرف الخطة
    - `status` (text) - حالة الاشتراك (active, cancelled, expired)
    - `started_at` (timestamp)
    - `expires_at` (timestamp)
    - `created_at` (timestamp)

  3. `widget_instances` - نسخ الويدجت المنشورة
    - `id` (uuid, primary key)
    - `widget_id` (uuid) - مرجع للويدجت الأصلي
    - `embed_code` (text) - كود التضمين الفريد
    - `view_count` (bigint) - عدد المشاهدات
    - `last_viewed_at` (timestamp)
    - `is_active` (boolean)
    - `created_at` (timestamp)

  ## التعديلات

  1. إضافة حقول جديدة لجدول `widgets`:
    - `is_premium` (boolean) - هل الويدجت مدفوع
    - `show_branding` (boolean) - إظهار "Powered by"

  ## الأمان

  - تفعيل RLS على جميع الجداول الجديدة
  - سياسات للقراءة والكتابة حسب صلاحية المستخدم
*/

-- إنشاء جدول خطط الاشتراك
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- إنشاء جدول اشتراكات المستخدمين
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired')) DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- إنشاء جدول نسخ الويدجت
CREATE TABLE IF NOT EXISTS widget_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  widget_id UUID REFERENCES widgets(id) ON DELETE CASCADE,
  embed_code TEXT UNIQUE NOT NULL,
  view_count BIGINT DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- إضافة حقول جديدة لجدول widgets
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'widgets' AND column_name = 'is_premium'
  ) THEN
    ALTER TABLE widgets ADD COLUMN is_premium BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'widgets' AND column_name = 'show_branding'
  ) THEN
    ALTER TABLE widgets ADD COLUMN show_branding BOOLEAN DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'widgets' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE widgets ADD COLUMN user_id UUID;
  END IF;
END $$;

-- إدراج الخطط الافتراضية
INSERT INTO subscriptions (name, name_ar, price, features, is_active) VALUES
  ('Free', 'مجاني', 0, '["unlimited_widgets", "all_templates", "powered_by_branding"]'::jsonb, true),
  ('Pro', 'احترافي', 9, '["unlimited_widgets", "all_templates", "no_branding", "priority_support", "future_premium_templates"]'::jsonb, true)
ON CONFLICT DO NOTHING;

-- تفعيل RLS على الجداول الجديدة
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE widget_instances ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان لجدول subscriptions
CREATE POLICY "الجميع يمكنهم عرض خطط الاشتراك"
  ON subscriptions FOR SELECT
  TO public
  USING (is_active = true);

-- سياسات الأمان لجدول user_subscriptions
CREATE POLICY "المستخدمون يمكنهم عرض اشتراكاتهم"
  ON user_subscriptions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "المستخدمون يمكنهم إنشاء اشتراكات"
  ON user_subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "المستخدمون يمكنهم تحديث اشتراكاتهم"
  ON user_subscriptions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- سياسات الأمان لجدول widget_instances
CREATE POLICY "الجميع يمكنهم عرض نسخ الويدجت النشطة"
  ON widget_instances FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "إنشاء نسخ الويدجت"
  ON widget_instances FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "تحديث نسخ الويدجت"
  ON widget_instances FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_widget_instances_embed_code ON widget_instances(embed_code);
CREATE INDEX IF NOT EXISTS idx_widget_instances_widget_id ON widget_instances(widget_id);
CREATE INDEX IF NOT EXISTS idx_widgets_user_id ON widgets(user_id);

-- دالة للتحقق من الاشتراك النشط
CREATE OR REPLACE FUNCTION has_active_subscription(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_subscriptions
    WHERE user_id = p_user_id
      AND status = 'active'
      AND (expires_at IS NULL OR expires_at > now())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة للتحقق من اشتراك Pro
CREATE OR REPLACE FUNCTION is_pro_user(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_subscriptions us
    JOIN subscriptions s ON us.subscription_id = s.id
    WHERE us.user_id = p_user_id
      AND us.status = 'active'
      AND s.name = 'Pro'
      AND (us.expires_at IS NULL OR us.expires_at > now())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
