import { useState } from 'react';
import { Copy, Check, X } from 'lucide-react';

interface CodeDisplayProps {
  code: string;
  embedCode?: string;
  onClose: () => void;
}

export function CodeDisplay({ code, embedCode, onClose }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const displayCode = embedCode || code;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">تم إنشاء الكود بنجاح!</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-green-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-800 mb-2 text-right">مزايا كود التضمين:</h3>
            <ul className="space-y-1 text-blue-700 text-right list-disc list-inside text-sm">
              <li>✨ كود بسيط - سطر واحد فقط!</li>
              <li>📊 تتبع عدد المشاهدات تلقائياً</li>
              <li>🔄 إمكانية التحديث عن بُعد</li>
              <li>⚡ تحميل أسرع وأكثر كفاءة</li>
              <li>🔒 الكود محمي ولا يمكن تعديله</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-right">
            <p className="text-amber-800 text-sm">
              <strong>ملاحظة:</strong> النسخة المجانية تتضمن علامة "مدعوم بواسطة ريادي" صغيرة في الركن السفلي.
              {' '}
              <a href="https://ryady.com/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                اشترك في الباقة الاحترافية بـ 9$ شهرياً
              </a>
              {' '}
              لإزالة العلامة.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-2 text-right">خطوات التفعيل:</h3>
            <ol className="space-y-2 text-green-700 text-right list-decimal list-inside">
              <li>انسخ الكود أدناه بالضغط على زر النسخ</li>
              <li>افتح ملف HTML الخاص بموقعك</li>
              <li>الصق الكود قبل وسم {'</body>'}</li>
              <li>احفظ الملف وأعد تحميل الصفحة</li>
            </ol>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    تم النسخ!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    نسخ الكود
                  </>
                )}
              </button>
            </div>

            <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
              <code>{displayCode}</code>
            </pre>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            إنشاء إضافة جديدة
          </button>
        </div>
      </div>
    </div>
  );
}
