import { useState } from 'react';
import { Crown, Loader2 } from 'lucide-react';
import { stripeProducts } from '../stripe-config';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface SubscriptionCardProps {
  product: typeof stripeProducts[0];
  onLoginRequired?: () => void;
}

export function SubscriptionCard({ product, onLoginRequired }: SubscriptionCardProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

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

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          price_id: product.priceId,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: window.location.href,
          mode: product.mode,
          customer_email: user?.email || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert('فشل في إنشاء جلسة الدفع. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-purple-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
        مميز
      </div>
      
      <div className="text-center mb-6">
        <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="text-center">
          <span className="text-4xl font-bold text-gray-900">
            {product.currencySymbol}{product.price}
          </span>
          <span className="text-gray-500 ml-1">
            /{product.mode === 'subscription' ? 'شهر' : 'مرة واحدة'}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-6 text-center">
        <div className="flex items-center text-sm text-gray-600 justify-center gap-2" dir="rtl">
          <span>تخصيص متقدم للويدجت</span>
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
        </div>
        <div className="flex items-center text-sm text-gray-600 justify-center gap-2" dir="rtl">
          <span>دعم فني ذو أولوية</span>
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
        </div>
        <div className="flex items-center text-sm text-gray-600 justify-center gap-2" dir="rtl">
          <span>إزالة علامة مدعوم بواسطة</span>
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
        </div>
        <div className="flex items-center text-sm text-gray-600 justify-center gap-2" dir="rtl">
          <span>الوصول إلى القوالب المميزة</span>
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
        </div>
      </div>

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            جاري المعالجة...
          </>
        ) : (
          <>
            <Crown className="w-4 h-4" />
            اشترك الآن
          </>
        )}
      </button>
    </div>
  );
}