import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { AppHeader } from './components/AppHeader';
import { WidgetCard } from './components/WidgetCard';
import { WidgetForm } from './components/WidgetForm';
import { CodeDisplay } from './components/CodeDisplay';
import { PreviewDashboard } from './components/PreviewDashboard';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ChangePasswordForm } from './components/auth/ChangePasswordForm';
import { SubscriptionCard } from './components/SubscriptionCard';
import { ManageSubscription } from './components/ManageSubscription';
import { supabase } from './lib/supabase';
import { getTemplateVariations } from './utils/generateTemplateVariations';
import { stripeProducts } from './stripe-config';
import { useAuth } from './hooks/useAuth';
import { useSubscription } from './hooks/useSubscription';
import type { WidgetTemplate, TemplateVariation } from './types/widget';

type PopupType = 'login' | 'signup' | 'changePassword' | 'manageSubscription' | null;

function App() {
  const { user } = useAuth();
  const { isPro } = useSubscription();
  const [templates, setTemplates] = useState<WidgetTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<WidgetTemplate | null>(null);
  const [formConfig, setFormConfig] = useState<Record<string, any> | null>(null);
  const [variations, setVariations] = useState<TemplateVariation[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [embedCode, setEmbedCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    setLoading(true);
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-widget/templates`;
    const headers = {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(apiUrl, { headers });
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
    setLoading(false);
  }

  function handleFormSubmit(config: Record<string, any>) {
    setFormConfig(config);
    const templateVariations = getTemplateVariations(selectedTemplate!.name, config);
    setVariations(templateVariations);
  }

  function handleBackToForm() {
    setFormConfig(null);
    setVariations([]);
  }

  async function handleGenerateCode(variationId: string) {
    setIsGenerating(true);
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-widget/generate`;
    const headers = {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          templateId: selectedTemplate!.id,
          config: formConfig,
          variationId,
        }),
      });

      const widget = await response.json();
      setGeneratedCode(widget.generated_code);

      const embedId = widget.id + '-' + Date.now().toString(36);
      const { data: instance } = await supabase
        .from('widget_instances')
        .insert({
          widget_id: widget.id,
          embed_code: embedId,
          is_active: true
        })
        .select()
        .maybeSingle();

      if (instance) {
        setEmbedCode('<script src="https://ryady.com/functions/v1/embed/' + embedId + '"></script>');
      }

      setSelectedTemplate(null);
      setFormConfig(null);
      setVariations([]);
    } catch (error) {
      console.error('Error generating widget:', error);
      alert('حدث خطأ أثناء إنشاء الكود. الرجاء المحاولة مرة أخرى.');
    }
    setIsGenerating(false);
  }

  function handleCloseCode() {
    setGeneratedCode(null);
    setEmbedCode(null);
  }

  function handleLoginSuccess() {
    setActivePopup(null);
  }

  function handleSignupSuccess() {
    setActivePopup(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <AppHeader
        showAuthButton={true}
        onLoginClick={() => setActivePopup('login')}
        onSignupClick={() => setActivePopup('signup')}
        onChangePassword={() => setActivePopup('changePassword')}
        onManageSubscription={() => setActivePopup('manageSubscription')}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16" dir="rtl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-blue-600" size={48} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            أنشئ إضافات جافاسكريبت احترافية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            10 أنواع من الإضافات الجاهزة لموقعك - مجاناً مع مدعوم بواسطة أو النسخة المدفوعة بدون علامة تجارية
          </p>
          <div className="mt-6 inline-block bg-white px-6 py-3 rounded-full shadow-md">
            <p className="text-sm text-gray-700">
              اختر الويدجت ← املأ النموذج ← احصل على الكود
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-gray-600">جاري التحميل...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {templates.map((template) => (
              <WidgetCard
                key={template.id}
                template={template}
                onSelect={setSelectedTemplate}
              />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">كيف يعمل؟</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center" dir="rtl">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h3 className="font-semibold text-gray-800">اختر الإضافة</h3>
                <p className="text-sm text-gray-600">اختر الإضافة المناسبة من القائمة</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h3 className="font-semibold text-gray-800">أدخل البيانات</h3>
                <p className="text-sm text-gray-600">املأ النموذج بالمعلومات المطلوبة</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
                <h3 className="font-semibold text-gray-800">انسخ والصق</h3>
                <p className="text-sm text-gray-600">انسخ الكود وأضفه لموقعك</p>
              </div>
            </div>
          </div>
        </div>

        {!isPro && (
          <div className="mt-16 mb-12 max-w-4xl mx-auto">
            <div className="text-center mb-8" dir="rtl">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">اشترك في النسخة المميزة</h2>
              <p className="text-gray-600">احصل على ويدجت بدون علامة مدعوم بواسطة</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">خطة مجانية</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">مجاني</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600 justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span>ويدجت غير محدود</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-600 justify-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <span>يظهر مدعوم بواسطة صانع الويدجت</span>
                  </li>
                </ul>
              </div>
              {stripeProducts.map((product) => (
                <SubscriptionCard
                  key={product.priceId}
                  product={product}
                  onLoginRequired={() => setActivePopup('login')}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedTemplate && !formConfig && (
        <WidgetForm
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onGenerate={handleFormSubmit}
          isGenerating={false}
        />
      )}

      {formConfig && variations.length > 0 && selectedTemplate && (
        <PreviewDashboard
          template={selectedTemplate}
          config={formConfig}
          variations={variations}
          onBack={handleBackToForm}
          onGenerateCode={handleGenerateCode}
          isGenerating={isGenerating}
        />
      )}

      {generatedCode && (
        <CodeDisplay
          code={generatedCode}
          embedCode={embedCode || undefined}
          onClose={handleCloseCode}
        />
      )}

      {activePopup === 'login' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <LoginForm onSuccess={handleLoginSuccess} onClose={() => setActivePopup(null)} />
          </div>
        </div>
      )}

      {activePopup === 'signup' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <SignupForm onSuccess={handleSignupSuccess} onClose={() => setActivePopup(null)} />
          </div>
        </div>
      )}

      {activePopup === 'changePassword' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <ChangePasswordForm onClose={() => setActivePopup(null)} />
          </div>
        </div>
      )}

      {activePopup === 'manageSubscription' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <ManageSubscription onClose={() => setActivePopup(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
