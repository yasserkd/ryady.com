import { useState } from 'react';
import { Code2, ArrowLeft, Loader2 } from 'lucide-react';
import type { TemplateVariation, WidgetTemplate } from '../types/widget';

interface PreviewDashboardProps {
  template: WidgetTemplate;
  config: Record<string, any>;
  variations: TemplateVariation[];
  onBack: () => void;
  onGenerateCode: (variationId: string) => void;
  isGenerating: boolean;
}

function getThumbnail(variationId: string): JSX.Element {
  if (variationId.startsWith('social-1')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-center">
        <div className="w-full bg-indigo-600 rounded px-2 py-1.5 flex gap-1 justify-center">
          <div className="w-6 h-4 bg-white bg-opacity-30 rounded text-[6px] flex items-center justify-center text-white">F</div>
          <div className="w-6 h-4 bg-white bg-opacity-30 rounded text-[6px] flex items-center justify-center text-white">X</div>
          <div className="w-6 h-4 bg-white bg-opacity-30 rounded text-[6px] flex items-center justify-center text-white">IG</div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('social-2')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-center">
        <div className="w-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg px-2 py-2 flex gap-1 justify-center">
          <div className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-[6px] text-white">F</div>
          <div className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-[6px] text-white">X</div>
          <div className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-[6px] text-white">IG</div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('social-3')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-center">
        <div className="flex gap-1.5">
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[8px] flex items-center justify-center">F</div>
          <div className="w-5 h-5 rounded-full bg-sky-500 text-white text-[8px] flex items-center justify-center">X</div>
          <div className="w-5 h-5 rounded-full bg-pink-600 text-white text-[8px] flex items-center justify-center">IG</div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('social-4')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-center justify-end">
        <div className="flex flex-col gap-0.5 bg-white rounded-l-md shadow-md">
          <div className="w-5 h-4 bg-blue-600 text-white text-[8px] flex items-center justify-center">F</div>
          <div className="w-5 h-4 bg-sky-500 text-white text-[8px] flex items-center justify-center">X</div>
          <div className="w-5 h-4 bg-pink-600 text-white text-[8px] flex items-center justify-center">IG</div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('welcome-1')) {
    return (
      <div className="w-full h-full bg-black bg-opacity-20 rounded-lg p-3 flex items-center justify-center">
        <div className="bg-white rounded-lg p-2.5 shadow-xl w-20">
          <div className="h-2 bg-gray-800 rounded mb-1"></div>
          <div className="h-1 bg-gray-400 rounded mb-1"></div>
          <div className="h-1 bg-gray-400 rounded mb-2"></div>
          <div className="h-2 bg-indigo-600 rounded-md"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('welcome-2')) {
    return (
      <div className="w-full h-full bg-black bg-opacity-20 rounded-lg p-3 flex items-center justify-center">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-2.5 shadow-xl w-20">
          <div className="h-2 bg-white rounded mb-1"></div>
          <div className="h-1 bg-white bg-opacity-70 rounded mb-1"></div>
          <div className="h-1 bg-white bg-opacity-70 rounded mb-2"></div>
          <div className="h-2 bg-white rounded-full"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('welcome-3')) {
    return (
      <div className="w-full h-full bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-2.5 shadow-xl w-20 border border-white border-opacity-20">
          <div className="h-2 bg-white rounded mb-1"></div>
          <div className="h-1 bg-white bg-opacity-80 rounded mb-1"></div>
          <div className="h-1 bg-white bg-opacity-80 rounded mb-2"></div>
          <div className="h-2 bg-white bg-opacity-30 rounded-full border border-white border-opacity-30"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('welcome-4')) {
    return (
      <div className="w-full h-full bg-black bg-opacity-50 rounded-lg p-3 flex items-center justify-center">
        <div className="bg-gray-900 rounded-lg p-2.5 shadow-xl w-20 border-2 border-gray-700">
          <div className="h-2 bg-white rounded mb-1"></div>
          <div className="h-1 bg-gray-400 rounded mb-1"></div>
          <div className="h-1 bg-gray-400 rounded mb-2"></div>
          <div className="h-2 bg-blue-700 rounded"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('countdown-1')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
        <div className="bg-red-500 rounded p-2 text-white">
          <div className="h-1 bg-white rounded mb-1"></div>
          <div className="flex gap-1 justify-center">
            <div className="text-center">
              <div className="text-[10px] font-bold">05</div>
              <div className="text-[5px]">يوم</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-bold">12</div>
              <div className="text-[5px]">ساعة</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-bold">34</div>
              <div className="text-[5px]">دقيقة</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('countdown-2')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-center justify-center">
        <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-xl p-2 text-white shadow-lg">
          <div className="h-1 bg-white rounded mb-1"></div>
          <div className="flex gap-1 justify-center">
            <div className="text-center">
              <div className="text-[12px] font-bold">05</div>
              <div className="text-[4px]">أيام</div>
            </div>
            <div className="text-center">
              <div className="text-[12px] font-bold">12</div>
              <div className="text-[4px]">ساعات</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('countdown-3')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex justify-end">
        <div className="bg-white rounded-lg p-1.5 shadow-md border-2 border-red-500">
          <div className="h-1 bg-red-500 rounded mb-0.5"></div>
          <div className="flex gap-0.5 text-[8px] font-bold text-red-500">
            <div>05د</div>
            <div>12س</div>
            <div>34ق</div>
          </div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('countdown-4')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
        <div className="bg-gray-900 rounded p-2 text-white border-b-2 border-red-500">
          <div className="h-1 bg-white rounded mb-1"></div>
          <div className="flex gap-1 justify-center">
            <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded px-1 py-0.5">
              <div className="text-[10px] font-bold text-red-500">05</div>
              <div className="text-[4px]">يوم</div>
            </div>
            <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded px-1 py-0.5">
              <div className="text-[10px] font-bold text-red-500">12</div>
              <div className="text-[4px]">ساعة</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('scroll-1')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-end">
        <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg text-sm">
          ↑
        </div>
      </div>
    );
  } else if (variationId.startsWith('scroll-2')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-end">
        <div className="w-7 h-7 rounded-lg bg-gray-900 border-2 border-blue-600 text-white flex items-center justify-center shadow-lg text-sm">
          ↑
        </div>
      </div>
    );
  } else if (variationId.startsWith('scroll-3')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-end">
        <div className="px-2 py-1 rounded-full bg-blue-600 text-white flex items-center gap-0.5 shadow-lg text-[8px] font-semibold">
          ↑ TOP
        </div>
      </div>
    );
  } else if (variationId.startsWith('scroll-4')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-end">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center shadow-lg text-sm">
          ↑
        </div>
      </div>
    );
  } else if (variationId.startsWith('cookie-1')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-center">
        <div className="w-full bg-gray-900 rounded p-1.5 flex justify-between items-center gap-1">
          <div className="h-1 bg-white rounded flex-1"></div>
          <div className="px-1.5 py-0.5 bg-blue-600 rounded text-white text-[6px]">OK</div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('cookie-2')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-start">
        <div className="bg-white rounded-lg p-1.5 shadow-md border border-gray-200 w-20">
          <div className="h-1 bg-gray-400 rounded mb-1"></div>
          <div className="h-2 bg-blue-600 rounded"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('cookie-3')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-center">
        <div className="w-full bg-gradient-to-r from-purple-500 to-purple-700 rounded p-1.5 flex justify-between items-center gap-1">
          <div className="h-1 bg-white rounded flex-1"></div>
          <div className="px-1.5 py-0.5 bg-white rounded-full text-purple-600 text-[6px] font-bold">OK</div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('cookie-4')) {
    return (
      <div className="w-full h-full bg-black bg-opacity-30 rounded-lg p-3 flex items-center justify-center">
        <div className="bg-white rounded-lg p-2 shadow-xl w-20">
          <div className="h-1 bg-gray-400 rounded mb-1"></div>
          <div className="h-2 bg-blue-600 rounded"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('newsletter-1')) {
    return (
      <div className="w-full h-full bg-black bg-opacity-20 rounded-lg p-3 flex items-center justify-center">
        <div className="bg-white rounded-lg p-2 shadow-xl w-20">
          <div className="h-1.5 bg-gray-800 rounded mb-1"></div>
          <div className="h-1 bg-gray-300 rounded mb-1"></div>
          <div className="h-1.5 bg-blue-600 rounded"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('newsletter-2')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-start">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-1.5 shadow-md w-16">
          <div className="h-1 bg-white rounded mb-0.5"></div>
          <div className="h-1 bg-white bg-opacity-70 rounded mb-0.5"></div>
          <div className="h-1.5 bg-white rounded"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('newsletter-3')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
        <div className="bg-gray-900 rounded p-1 flex justify-between items-center gap-1">
          <div className="h-1 bg-white rounded w-8"></div>
          <div className="flex gap-0.5 flex-1">
            <div className="h-1.5 bg-white bg-opacity-30 rounded flex-1"></div>
            <div className="px-1 py-0.5 bg-blue-600 rounded text-white text-[5px]">OK</div>
          </div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('newsletter-4')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-end">
        <div className="bg-white rounded-lg p-1.5 shadow-md border-2 border-blue-600 w-18">
          <div className="h-1 bg-gray-400 rounded mb-1"></div>
          <div className="h-1 bg-gray-300 rounded mb-1"></div>
          <div className="h-1.5 bg-blue-600 rounded"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('chat-1')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-start">
        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg text-sm">
          💬
        </div>
      </div>
    );
  } else if (variationId.startsWith('chat-2')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-start">
        <div className="px-2 py-1 rounded-full bg-green-500 text-white flex items-center gap-0.5 shadow-lg text-[7px] font-semibold">
          💬 WA
        </div>
      </div>
    );
  } else if (variationId.startsWith('chat-3')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-start">
        <div className="relative">
          <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg text-xs">
            💬
          </div>
          <div className="absolute bottom-8 left-0 bg-white rounded-md p-1 shadow-md w-16">
            <div className="h-1 bg-gray-700 rounded mb-0.5"></div>
            <div className="h-0.5 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('chat-4')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-start">
        <div className="bg-green-500 rounded-lg p-1.5 shadow-lg flex flex-col items-center gap-0.5">
          <div className="text-xs">💬</div>
          <div className="text-[5px] text-white font-bold">WA</div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('announcement-1')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
        <div className="bg-blue-600 rounded p-1.5 text-white text-center">
          <div className="h-1 bg-white rounded mx-auto" style={{width: '80%'}}></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('announcement-2')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded p-1.5 text-white text-center shadow-md">
          <div className="h-1 bg-white rounded mx-auto" style={{width: '80%'}}></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('announcement-3')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
        <div className="bg-gray-900 rounded p-2 text-white text-center border-b-2 border-blue-600">
          <div className="h-1 bg-white rounded mx-auto" style={{width: '70%'}}></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('announcement-4')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end">
        <div className="w-full bg-yellow-400 rounded p-1.5 text-center shadow-md">
          <div className="h-1 bg-yellow-900 rounded mx-auto" style={{width: '80%'}}></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('weather-1')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex justify-start items-start">
        <div className="bg-white rounded-lg p-1.5 shadow-md w-16">
          <div className="h-1 bg-gray-700 rounded mb-1"></div>
          <div className="text-xl text-center">☀️</div>
          <div className="h-1.5 bg-blue-600 rounded mt-0.5"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('weather-2')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex justify-start items-start">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-1.5 shadow-md w-16 text-white">
          <div className="h-0.5 bg-white rounded mb-1"></div>
          <div className="text-2xl text-center">☀️</div>
          <div className="h-1 bg-white rounded mt-0.5"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('weather-3')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex justify-end items-start">
        <div className="bg-white rounded-lg p-1.5 shadow-md w-20">
          <div className="h-1 bg-gray-700 rounded mb-1"></div>
          <div className="flex items-center gap-1 mb-1">
            <div className="text-lg">☀️</div>
            <div className="h-2 bg-blue-600 rounded flex-1"></div>
          </div>
          <div className="h-0.5 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('weather-4')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
        <div className="bg-blue-600 rounded p-1 flex items-center justify-center gap-1 text-white">
          <div className="h-1 bg-white rounded w-8"></div>
          <div className="text-sm">☀️</div>
          <div className="h-1.5 bg-white rounded w-6"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('quote-1')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex justify-end items-center">
        <div className="bg-white rounded-lg p-1.5 shadow-md w-20 border-l-2 border-blue-600">
          <div className="h-1 bg-gray-400 rounded mb-0.5"></div>
          <div className="h-1 bg-gray-400 rounded mb-0.5"></div>
          <div className="h-0.5 bg-gray-500 rounded"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('quote-2')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 flex items-end justify-end">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-1.5 shadow-md w-20 text-white">
          <div className="h-1 bg-white rounded mb-0.5"></div>
          <div className="h-1 bg-white rounded mb-0.5"></div>
          <div className="h-0.5 bg-white bg-opacity-70 rounded"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('quote-3')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
        <div className="bg-gray-900 rounded p-1.5 text-white text-center shadow-md">
          <div className="text-xs mb-0.5">💡</div>
          <div className="h-0.5 bg-white rounded"></div>
        </div>
      </div>
    );
  } else if (variationId.startsWith('quote-4')) {
    return (
      <div className="w-full h-full bg-black bg-opacity-20 rounded-lg p-3 flex items-center justify-center">
        <div className="bg-white rounded-lg p-2 shadow-xl w-24">
          <div className="text-xl text-center mb-1">✨</div>
          <div className="h-0.5 bg-gray-400 rounded mb-0.5"></div>
          <div className="h-0.5 bg-gray-400 rounded mb-0.5"></div>
          <div className="h-0.5 bg-gray-500 rounded"></div>
        </div>
      </div>
    );
  }

  return <div className="w-full h-full bg-gray-100 rounded-lg"></div>;
}

export function PreviewDashboard({
  template,
  config,
  variations,
  onBack,
  onGenerateCode,
  isGenerating
}: PreviewDashboardProps) {
  const [selectedVariation, setSelectedVariation] = useState<string>(variations[0]?.id || '');

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            العودة للنموذج
          </button>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 md:p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-right">اختر التصميم المناسب</h2>
              <p className="text-blue-100 text-sm md:text-base text-right">
                اختر أحد القوالب المتاحة ثم اضغط على "إنشاء الكود" للحصول على الكود النهائي
              </p>
            </div>

            <div className="p-6 md:p-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-right">القوالب المتاحة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {variations.map((variation) => (
                    <div
                      key={variation.id}
                      onClick={() => setSelectedVariation(variation.id)}
                      className={`border-2 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                        selectedVariation === variation.id
                          ? 'border-blue-600 bg-blue-50 shadow-lg ring-2 ring-blue-200'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100">
                        {getThumbnail(variation.id)}
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 text-right">
                            <h4 className="font-bold text-gray-800 text-lg mb-1">
                              {variation.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {variation.description}
                            </p>
                          </div>
                          {selectedVariation === variation.id && (
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mr-2">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onGenerateCode(selectedVariation)}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 rounded-xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    جاري إنشاء الكود...
                  </>
                ) : (
                  <>
                    <Code2 size={24} />
                    إنشاء الكود للتصميم المحدد
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
