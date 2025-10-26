import { useState } from 'react';
import { X, CreditCard, Loader2, Crown, ExternalLink } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { supabase } from '../lib/supabase';

interface ManageSubscriptionProps {
  onClose: () => void;
}

export function ManageSubscription({ onClose }: ManageSubscriptionProps) {
  const { isPro, subscription } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleManageStripe = async () => {
    setLoading(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      } else {
        headers['Authorization'] = `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-portal`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            return_url: window.location.origin,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'فشل في فتح بوابة الاشتراك');
      }
    } catch (err) {
      console.error('Error opening portal:', err);
      setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <CreditCard className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الاشتراك</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            {isPro ? (
              <>
                <Crown className="w-8 h-8 text-yellow-500" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">اشتراك Pro</h3>
                  <p className="text-sm text-gray-600">الاشتراك نشط</p>
                </div>
              </>
            ) : (
              <>
                <CreditCard className="w-8 h-8 text-gray-400" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">خطة مجانية</h3>
                  <p className="text-sm text-gray-600">لا يوجد اشتراك نشط</p>
                </div>
              </>
            )}
          </div>

          {isPro && subscription && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">الحالة:</span>
                <span className={`font-medium ${
                  subscription.status === 'active' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {subscription.status === 'active' ? 'نشط' : subscription.status}
                </span>
              </div>
              {subscription.expires_at && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ينتهي في:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(subscription.expires_at).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {isPro ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-right" dir="rtl">
              يمكنك إدارة اشتراكك، تحديث طريقة الدفع، أو إلغاء الاشتراك من خلال بوابة Stripe الآمنة.
            </p>
            <button
              onClick={handleManageStripe}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري التحميل...
                </>
              ) : (
                <>
                  <ExternalLink className="w-5 h-5" />
                  فتح بوابة الاشتراك
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-right" dir="rtl">
              أنت حالياً على الخطة المجانية. قم بالترقية للحصول على ميزات إضافية!
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              إغلاق
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
