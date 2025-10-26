import type { TemplateVariation } from '../types/widget';

export function getTemplateVariations(templateName: string, config: any): TemplateVariation[] {
  if (templateName.includes('سوشل') || templateName.includes('Social')) {
    return getSocialMediaVariations(config);
  } else if (templateName.includes('ترحيب') || templateName.includes('Welcome')) {
    return getWelcomePopupVariations(config);
  } else if (templateName.includes('عداد') || templateName.includes('Countdown')) {
    return getCountdownVariations(config);
  } else if (templateName.includes('العودة') || templateName.includes('Scroll')) {
    return getScrollToTopVariations(config);
  } else if (templateName.includes('كوكيز') || templateName.includes('Cookie')) {
    return getCookieConsentVariations(config);
  } else if (templateName.includes('نشرة') || templateName.includes('Newsletter')) {
    return getNewsletterVariations(config);
  } else if (templateName.includes('دردشة') || templateName.includes('Chat')) {
    return getChatVariations(config);
  } else if (templateName.includes('إعلانات') || templateName.includes('Announcement')) {
    return getAnnouncementVariations(config);
  } else if (templateName.includes('طقس') || templateName.includes('Weather')) {
    return getWeatherVariations(config);
  } else if (templateName.includes('اقتباس') || templateName.includes('Quote')) {
    return getQuoteVariations(config);
  }
  return [];
}

function getSocialMediaVariations(config: any): TemplateVariation[] {
  const { facebook, twitter, instagram, youtube } = config;

  return [
    {
      id: 'social-1',
      name: 'شريط كلاسيكي',
      description: 'شريط أفقي بسيط في الأسفل',
      preview: generateSocialBar1(facebook, twitter, instagram, youtube),
    },
    {
      id: 'social-2',
      name: 'تدرج عصري',
      description: 'خلفية متدرجة مع الأيقونات',
      preview: generateSocialBar2(facebook, twitter, instagram, youtube),
    },
    {
      id: 'social-3',
      name: 'أزرار عائمة',
      description: 'أزرار دائرية منفصلة',
      preview: generateSocialBar3(facebook, twitter, instagram, youtube),
    },
    {
      id: 'social-4',
      name: 'شريط جانبي',
      description: 'شريط عمودي على الجانب',
      preview: generateSocialBar4(facebook, twitter, instagram, youtube),
    },
  ];
}

function generateSocialBar1(fb: string, tw: string, ig: string, yt: string): string {
  return `<div style="position:fixed;bottom:-100px;left:0;right:0;background:#4F46E5;padding:15px;display:flex;justify-content:center;gap:20px;transition:bottom .3s;z-index:9999;box-shadow:0 -2px 10px rgba(0,0,0,.1)" class="social-preview">
    ${fb ? `<a href="${fb}" style="color:#fff;text-decoration:none;padding:8px 16px;border-radius:5px;background:rgba(255,255,255,.2)">Facebook</a>` : ''}
    ${tw ? `<a href="${tw}" style="color:#fff;text-decoration:none;padding:8px 16px;border-radius:5px;background:rgba(255,255,255,.2)">Twitter</a>` : ''}
    ${ig ? `<a href="${ig}" style="color:#fff;text-decoration:none;padding:8px 16px;border-radius:5px;background:rgba(255,255,255,.2)">Instagram</a>` : ''}
    ${yt ? `<a href="${yt}" style="color:#fff;text-decoration:none;padding:8px 16px;border-radius:5px;background:rgba(255,255,255,.2)">YouTube</a>` : ''}
  </div>`;
}

function generateSocialBar2(fb: string, tw: string, ig: string, yt: string): string {
  return `<div style="position:fixed;bottom:-100px;left:0;right:0;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:20px;display:flex;justify-content:center;gap:15px;transition:bottom .3s;z-index:9999;box-shadow:0 -4px 20px rgba(0,0,0,.2)" class="social-preview">
    ${fb ? `<a href="${fb}" style="color:#fff;text-decoration:none;padding:12px 20px;border-radius:25px;background:rgba(255,255,255,.15);backdrop-filter:blur(10px);font-weight:600">📘 Facebook</a>` : ''}
    ${tw ? `<a href="${tw}" style="color:#fff;text-decoration:none;padding:12px 20px;border-radius:25px;background:rgba(255,255,255,.15);backdrop-filter:blur(10px);font-weight:600">🐦 Twitter</a>` : ''}
    ${ig ? `<a href="${ig}" style="color:#fff;text-decoration:none;padding:12px 20px;border-radius:25px;background:rgba(255,255,255,.15);backdrop-filter:blur(10px);font-weight:600">📷 Instagram</a>` : ''}
    ${yt ? `<a href="${yt}" style="color:#fff;text-decoration:none;padding:12px 20px;border-radius:25px;background:rgba(255,255,255,.15);backdrop-filter:blur(10px);font-weight:600">▶️ YouTube</a>` : ''}
  </div>`;
}

function generateSocialBar3(fb: string, tw: string, ig: string, yt: string): string {
  const buttons = [];
  if (fb) buttons.push(`<a href="${fb}" style="width:50px;height:50px;border-radius:50%;background:#1877F2;color:#fff;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 15px rgba(0,0,0,.2)">f</a>`);
  if (tw) buttons.push(`<a href="${tw}" style="width:50px;height:50px;border-radius:50%;background:#1DA1F2;color:#fff;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 15px rgba(0,0,0,.2)">𝕏</a>`);
  if (ig) buttons.push(`<a href="${ig}" style="width:50px;height:50px;border-radius:50%;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);color:#fff;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 15px rgba(0,0,0,.2)">📷</a>`);
  if (yt) buttons.push(`<a href="${yt}" style="width:50px;height:50px;border-radius:50%;background:#FF0000;color:#fff;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 15px rgba(0,0,0,.2)">▶</a>`);

  return `<div style="position:fixed;bottom:-200px;left:50%;transform:translateX(-50%);display:flex;gap:15px;transition:bottom .3s;z-index:9999" class="social-preview">${buttons.join('')}</div>`;
}

function generateSocialBar4(fb: string, tw: string, ig: string, yt: string): string {
  const buttons = [];
  if (fb) buttons.push(`<a href="${fb}" style="display:block;padding:15px;color:#fff;text-decoration:none;background:#1877F2;margin-bottom:2px;text-align:center">f</a>`);
  if (tw) buttons.push(`<a href="${tw}" style="display:block;padding:15px;color:#fff;text-decoration:none;background:#1DA1F2;margin-bottom:2px;text-align:center">𝕏</a>`);
  if (ig) buttons.push(`<a href="${ig}" style="display:block;padding:15px;color:#fff;text-decoration:none;background:#E4405F;margin-bottom:2px;text-align:center">📷</a>`);
  if (yt) buttons.push(`<a href="${yt}" style="display:block;padding:15px;color:#fff;text-decoration:none;background:#FF0000;text-align:center">▶</a>`);

  return `<div style="position:fixed;right:-60px;top:50%;transform:translateY(-50%);width:60px;background:#fff;box-shadow:-2px 0 10px rgba(0,0,0,.1);transition:right .3s;z-index:9999;border-radius:8px 0 0 8px" class="social-preview">${buttons.join('')}</div>`;
}

function getWelcomePopupVariations(config: any): TemplateVariation[] {
  const { title, message, buttonText } = config;

  return [
    {
      id: 'welcome-1',
      name: 'بسيط وأنيق',
      description: 'تصميم بسيط ونظيف',
      preview: generateWelcome1(title, message, buttonText),
    },
    {
      id: 'welcome-2',
      name: 'بطاقة متدرجة',
      description: 'خلفية متدرجة ملونة',
      preview: generateWelcome2(title, message, buttonText),
    },
    {
      id: 'welcome-3',
      name: 'زجاجي عصري',
      description: 'تأثير زجاجي حديث',
      preview: generateWelcome3(title, message, buttonText),
    },
    {
      id: 'welcome-4',
      name: 'داكن جريء',
      description: 'ثيم داكن مع لمسات مميزة',
      preview: generateWelcome4(title, message, buttonText),
    },
  ];
}

function generateWelcome1(title: string, message: string, btnText: string): string {
  return `<div style="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:99999" class="welcome-preview">
    <div style="background:#fff;padding:40px;border-radius:12px;max-width:400px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.2)">
      <h2 style="margin:0 0 15px;color:#333;font-size:24px">${title || 'Welcome'}</h2>
      <p style="margin:0 0 25px;color:#666;line-height:1.6">${message || 'Welcome to our site'}</p>
      <button style="background:#4F46E5;color:#fff;border:none;padding:12px 30px;border-radius:6px;cursor:pointer;font-size:16px">${btnText || 'OK'}</button>
    </div>
  </div>`;
}

function generateWelcome2(title: string, message: string, btnText: string): string {
  return `<div style="position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:99999" class="welcome-preview">
    <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px;border-radius:20px;max-width:400px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.3)">
      <h2 style="margin:0 0 15px;color:#fff;font-size:28px;font-weight:700">${title || 'Welcome'}</h2>
      <p style="margin:0 0 25px;color:rgba(255,255,255,.9);line-height:1.8;font-size:16px">${message || 'Welcome to our site'}</p>
      <button style="background:#fff;color:#667eea;border:none;padding:14px 35px;border-radius:25px;cursor:pointer;font-size:16px;font-weight:600;box-shadow:0 4px 15px rgba(0,0,0,.2)">${btnText || 'OK'}</button>
    </div>
  </div>`;
}

function generateWelcome3(title: string, message: string, btnText: string): string {
  return `<div style="position:fixed;inset:0;background:rgba(0,0,0,.4);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:99999" class="welcome-preview">
    <div style="background:rgba(255,255,255,.1);backdrop-filter:blur(20px);padding:40px;border-radius:20px;max-width:400px;text-align:center;border:1px solid rgba(255,255,255,.2);box-shadow:0 8px 32px rgba(0,0,0,.1)">
      <h2 style="margin:0 0 15px;color:#fff;font-size:26px">${title || 'Welcome'}</h2>
      <p style="margin:0 0 25px;color:rgba(255,255,255,.9);line-height:1.7">${message || 'Welcome to our site'}</p>
      <button style="background:rgba(255,255,255,.2);color:#fff;border:1px solid rgba(255,255,255,.3);padding:12px 30px;border-radius:25px;cursor:pointer;font-size:16px;backdrop-filter:blur(10px)">${btnText || 'OK'}</button>
    </div>
  </div>`;
}

function generateWelcome4(title: string, message: string, btnText: string): string {
  return `<div style="position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;z-index:99999" class="welcome-preview">
    <div style="background:#1a1a2e;padding:40px;border-radius:15px;max-width:400px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.5);border:2px solid #16213e">
      <h2 style="margin:0 0 15px;color:#fff;font-size:28px;font-weight:700">${title || 'Welcome'}</h2>
      <p style="margin:0 0 25px;color:#a8b2d1;line-height:1.7">${message || 'Welcome to our site'}</p>
      <button style="background:#0f4c75;color:#fff;border:none;padding:14px 35px;border-radius:8px;cursor:pointer;font-size:16px;font-weight:600;box-shadow:0 4px 15px rgba(15,76,117,.4)">${btnText || 'OK'}</button>
    </div>
  </div>`;
}

function getCountdownVariations(config: any): TemplateVariation[] {
  const { title } = config;

  return [
    {
      id: 'countdown-1',
      name: 'شريط علوي',
      description: 'شريط ثابت في الأعلى',
      preview: generateCountdown1(title),
    },
    {
      id: 'countdown-2',
      name: 'بطاقة مركزية',
      description: 'عرض كبير في المنتصف',
      preview: generateCountdown2(title),
    },
    {
      id: 'countdown-3',
      name: 'ركن بسيط',
      description: 'ويدجت صغير في الزاوية',
      preview: generateCountdown3(title),
    },
    {
      id: 'countdown-4',
      name: 'شريط عريض كامل',
      description: 'شريط عريض جريء بالعرض الكامل',
      preview: generateCountdown4(title),
    },
  ];
}

function generateCountdown1(title: string): string {
  return `<div style="position:fixed;top:0;left:0;right:0;background:#EF4444;color:#fff;padding:15px 20px;text-align:center;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,.2)" class="countdown-preview">
    <div style="font-size:16px;font-weight:600;margin-bottom:8px">${title || 'Countdown'}</div>
    <div style="display:flex;justify-content:center;gap:20px;font-size:20px;font-weight:700">
      <div><span style="font-size:28px">05</span> Days</div>
      <div><span style="font-size:28px">12</span> Hours</div>
      <div><span style="font-size:28px">34</span> Mins</div>
      <div><span style="font-size:28px">56</span> Secs</div>
    </div>
  </div>`;
}

function generateCountdown2(title: string): string {
  return `<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%);color:#fff;padding:40px 60px;border-radius:20px;text-align:center;z-index:9999;box-shadow:0 20px 60px rgba(0,0,0,.3)" class="countdown-preview">
    <div style="font-size:24px;font-weight:700;margin-bottom:20px">${title || 'Countdown'}</div>
    <div style="display:flex;justify-content:center;gap:25px">
      <div style="text-align:center"><div style="font-size:48px;font-weight:900">05</div><div style="font-size:14px;opacity:.9">DAYS</div></div>
      <div style="text-align:center"><div style="font-size:48px;font-weight:900">12</div><div style="font-size:14px;opacity:.9">HOURS</div></div>
      <div style="text-align:center"><div style="font-size:48px;font-weight:900">34</div><div style="font-size:14px;opacity:.9">MINS</div></div>
      <div style="text-align:center"><div style="font-size:48px;font-weight:900">56</div><div style="font-size:14px;opacity:.9">SECS</div></div>
    </div>
  </div>`;
}

function generateCountdown3(title: string): string {
  return `<div style="position:fixed;top:20px;right:20px;background:#fff;color:#333;padding:15px 20px;border-radius:12px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.15);border:2px solid #EF4444" class="countdown-preview">
    <div style="font-size:14px;font-weight:600;margin-bottom:8px;color:#EF4444">${title || 'Countdown'}</div>
    <div style="display:flex;gap:10px;font-size:12px">
      <div style="text-align:center"><div style="font-size:20px;font-weight:700;color:#EF4444">05</div><div>D</div></div>
      <div style="text-align:center"><div style="font-size:20px;font-weight:700;color:#EF4444">12</div><div>H</div></div>
      <div style="text-align:center"><div style="font-size:20px;font-weight:700;color:#EF4444">34</div><div>M</div></div>
      <div style="text-align:center"><div style="font-size:20px;font-weight:700;color:#EF4444">56</div><div>S</div></div>
    </div>
  </div>`;
}

function generateCountdown4(title: string): string {
  return `<div style="position:fixed;top:0;left:0;right:0;background:#1a1a2e;color:#fff;padding:25px 20px;text-align:center;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.4);border-bottom:4px solid #EF4444" class="countdown-preview">
    <div style="font-size:22px;font-weight:700;margin-bottom:15px;letter-spacing:2px">${title || 'COUNTDOWN'}</div>
    <div style="display:flex;justify-content:center;gap:30px">
      <div style="background:rgba(239,68,68,.1);padding:10px 20px;border-radius:8px;border:1px solid rgba(239,68,68,.3)"><div style="font-size:32px;font-weight:900;color:#EF4444">05</div><div style="font-size:12px;opacity:.8">DAYS</div></div>
      <div style="background:rgba(239,68,68,.1);padding:10px 20px;border-radius:8px;border:1px solid rgba(239,68,68,.3)"><div style="font-size:32px;font-weight:900;color:#EF4444">12</div><div style="font-size:12px;opacity:.8">HOURS</div></div>
      <div style="background:rgba(239,68,68,.1);padding:10px 20px;border-radius:8px;border:1px solid rgba(239,68,68,.3)"><div style="font-size:32px;font-weight:900;color:#EF4444">34</div><div style="font-size:12px;opacity:.8">MINS</div></div>
      <div style="background:rgba(239,68,68,.1);padding:10px 20px;border-radius:8px;border:1px solid rgba(239,68,68,.3)"><div style="font-size:32px;font-weight:900;color:#EF4444">56</div><div style="font-size:12px;opacity:.8">SECS</div></div>
    </div>
  </div>`;
}

function getScrollToTopVariations(config: any): TemplateVariation[] {
  return [
    {
      id: 'scroll-1',
      name: 'زر دائري',
      description: 'زر دائري كلاسيكي',
      preview: generateScroll1(),
    },
    {
      id: 'scroll-2',
      name: 'مربع عصري',
      description: 'تصميم مربع حديث',
      preview: generateScroll2(),
    },
    {
      id: 'scroll-3',
      name: 'حبة عائمة',
      description: 'شكل حبة مع نص',
      preview: generateScroll3(),
    },
    {
      id: 'scroll-4',
      name: 'دائرة متدرجة',
      description: 'نمط متدرج ملون',
      preview: generateScroll4(),
    },
  ];
}

function generateScroll1(): string {
  return `<button style="position:fixed;bottom:30px;right:30px;width:50px;height:50px;border-radius:50%;background:#3B82F6;color:#fff;border:none;font-size:24px;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,.2);z-index:9999" class="scroll-preview">↑</button>`;
}

function generateScroll2(): string {
  return `<button style="position:fixed;bottom:30px;right:30px;width:50px;height:50px;border-radius:12px;background:#1a1a2e;color:#fff;border:2px solid #3B82F6;font-size:24px;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,.2);z-index:9999" class="scroll-preview">↑</button>`;
}

function generateScroll3(): string {
  return `<button style="position:fixed;bottom:30px;right:30px;padding:12px 20px;border-radius:25px;background:#3B82F6;color:#fff;border:none;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,.2);z-index:9999;display:flex;align-items:center;gap:5px" class="scroll-preview">↑ TOP</button>`;
}

function generateScroll4(): string {
  return `<button style="position:fixed;bottom:30px;right:30px;width:55px;height:55px;border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;font-size:24px;cursor:pointer;box-shadow:0 6px 20px rgba(102,126,234,.4);z-index:9999" class="scroll-preview">↑</button>`;
}

function getCookieConsentVariations(config: any): TemplateVariation[] {
  const { message, acceptText } = config;
  return [
    {
      id: 'cookie-1',
      name: 'شريط سفلي داكن',
      description: 'شريط بسيط في الأسفل',
      preview: `<div style="position:fixed;bottom:0;left:0;right:0;background:#1a1a2e;color:#fff;padding:20px;z-index:9999;box-shadow:0 -2px 10px rgba(0,0,0,.2)" class="cookie-preview">
        <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:15px">
          <p style="margin:0;flex:1;min-width:300px">${message || 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك'}</p>
          <button style="background:#3B82F6;color:#fff;border:none;padding:10px 25px;border-radius:6px;cursor:pointer;font-weight:600">${acceptText || 'قبول'}</button>
        </div>
      </div>`
    },
    {
      id: 'cookie-2',
      name: 'بطاقة ركنية',
      description: 'بطاقة بيضاء في الركن',
      preview: `<div style="position:fixed;bottom:20px;left:20px;background:#fff;color:#333;padding:20px;border-radius:12px;max-width:350px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.15);border:2px solid #e5e7eb" class="cookie-preview">
        <p style="margin:0 0 15px;font-size:14px;line-height:1.6">${message || 'نستخدم ملفات تعريف الارتباط'}</p>
        <button style="background:#3B82F6;color:#fff;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;width:100%;font-weight:600">${acceptText || 'قبول'}</button>
      </div>`
    },
    {
      id: 'cookie-3',
      name: 'شريط متدرج',
      description: 'خلفية متدرجة ملونة',
      preview: `<div style="position:fixed;bottom:0;left:0;right:0;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:20px;z-index:9999;box-shadow:0 -4px 20px rgba(0,0,0,.3)" class="cookie-preview">
        <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:15px">
          <p style="margin:0;flex:1;min-width:300px;font-size:15px">${message || 'نستخدم ملفات تعريف الارتباط'}</p>
          <button style="background:#fff;color:#667eea;border:none;padding:10px 25px;border-radius:25px;cursor:pointer;font-weight:700;box-shadow:0 2px 10px rgba(0,0,0,.2)">${acceptText || 'قبول'}</button>
        </div>
      </div>`
    },
    {
      id: 'cookie-4',
      name: 'نافذة مركزية',
      description: 'رسالة في منتصف الشاشة',
      preview: `<div style="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:99999" class="cookie-preview">
        <div style="background:#fff;padding:30px;border-radius:15px;max-width:450px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.2)">
          <p style="margin:0 0 20px;color:#333;font-size:15px;line-height:1.6">${message || 'نستخدم ملفات تعريف الارتباط'}</p>
          <button style="background:#3B82F6;color:#fff;border:none;padding:12px 40px;border-radius:8px;cursor:pointer;font-weight:600;width:100%">${acceptText || 'موافق'}</button>
        </div>
      </div>`
    }
  ];
}

function getNewsletterVariations(config: any): TemplateVariation[] {
  const { title, placeholder, buttonText } = config;
  return [
    {
      id: 'newsletter-1',
      name: 'نافذة منبثقة',
      description: 'نموذج منبثق مركزي',
      preview: `<div style="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:99999" class="newsletter-preview">
        <div style="background:#fff;padding:40px;border-radius:12px;max-width:400px;width:90%;text-align:center">
          <h3 style="margin:0 0 15px;font-size:24px;color:#333">${title || 'اشترك في نشرتنا'}</h3>
          <input type="email" placeholder="${placeholder || 'بريدك الإلكتروني'}" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:6px;margin-bottom:15px;text-align:center">
          <button style="width:100%;background:#3B82F6;color:#fff;border:none;padding:12px;border-radius:6px;cursor:pointer;font-weight:600">${buttonText || 'اشترك'}</button>
        </div>
      </div>`
    },
    {
      id: 'newsletter-2',
      name: 'بطاقة جانبية متدرجة',
      description: 'نموذج متدرج على الجانب',
      preview: `<div style="position:fixed;left:20px;bottom:20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:25px;border-radius:12px;max-width:300px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.2)" class="newsletter-preview">
        <h4 style="margin:0 0 12px;font-size:18px">${title || 'اشترك في نشرتنا'}</h4>
        <input type="email" placeholder="${placeholder || 'بريدك'}" style="width:100%;padding:10px;border:none;border-radius:6px;margin-bottom:10px;text-align:center">
        <button style="width:100%;background:#fff;color:#667eea;border:none;padding:10px;border-radius:6px;cursor:pointer;font-weight:600">${buttonText || 'اشترك'}</button>
      </div>`
    },
    {
      id: 'newsletter-3',
      name: 'شريط علوي',
      description: 'نموذج ثابت في الأعلى',
      preview: `<div style="position:fixed;top:0;left:0;right:0;background:#1a1a2e;color:#fff;padding:15px;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,.2)" class="newsletter-preview">
        <div style="max-width:1000px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:15px">
          <h4 style="margin:0;font-size:16px">${title || 'اشترك في نشرتنا'}</h4>
          <div style="display:flex;gap:10px;flex:1;max-width:400px">
            <input type="email" placeholder="${placeholder || 'بريدك'}" style="flex:1;padding:10px;border:none;border-radius:6px;text-align:center">
            <button style="background:#3B82F6;color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:600;white-space:nowrap">${buttonText || 'اشترك'}</button>
          </div>
        </div>
      </div>`
    },
    {
      id: 'newsletter-4',
      name: 'بطاقة ركنية بسيطة',
      description: 'تصميم بسيط في الركن',
      preview: `<div style="position:fixed;right:20px;bottom:20px;background:#fff;padding:25px;border-radius:15px;max-width:320px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.15);border:2px solid #3B82F6" class="newsletter-preview">
        <h4 style="margin:0 0 15px;font-size:18px;color:#333">${title || 'اشترك في نشرتنا'}</h4>
        <input type="email" placeholder="${placeholder || 'بريدك'}" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;margin-bottom:12px;text-align:center">
        <button style="width:100%;background:#3B82F6;color:#fff;border:none;padding:12px;border-radius:8px;cursor:pointer;font-weight:600">${buttonText || 'اشترك'}</button>
      </div>`
    }
  ];
}

function getChatVariations(config: any): TemplateVariation[] {
  const { platform } = config;
  const isWhatsApp = platform === 'WhatsApp';
  return [
    {
      id: 'chat-1',
      name: 'زر دائري كبير',
      description: 'زر عائم دائري',
      preview: `<button style="position:fixed;bottom:25px;left:25px;width:60px;height:60px;border-radius:50%;background:#25D366;color:#fff;border:none;font-size:28px;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,.4);z-index:9999;display:flex;align-items:center;justify-content:center" class="chat-preview">💬</button>`
    },
    {
      id: 'chat-2',
      name: 'زر مع نص',
      description: 'زر مع نص توضيحي',
      preview: `<button style="position:fixed;bottom:25px;left:25px;padding:15px 25px;border-radius:30px;background:#25D366;color:#fff;border:none;font-size:16px;font-weight:600;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,.4);z-index:9999;display:flex;align-items:center;gap:8px" class="chat-preview">💬 ${isWhatsApp ? 'واتساب' : 'دردش معنا'}</button>`
    },
    {
      id: 'chat-3',
      name: 'بطاقة منسدلة',
      description: 'بطاقة مع معلومات',
      preview: `<div style="position:fixed;bottom:25px;left:25px;z-index:9999" class="chat-preview">
        <button style="width:60px;height:60px;border-radius:50%;background:#25D366;color:#fff;border:none;font-size:28px;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,.4);display:flex;align-items:center;justify-content:center">💬</button>
        <div style="position:absolute;bottom:75px;left:0;background:#fff;padding:15px;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,.15);min-width:200px">
          <p style="margin:0;font-size:14px;color:#333;font-weight:600">محتاج مساعدة؟</p>
          <p style="margin:5px 0 0;font-size:12px;color:#666">تواصل معنا عبر ${isWhatsApp ? 'واتساب' : 'الدردشة'}</p>
        </div>
      </div>`
    },
    {
      id: 'chat-4',
      name: 'زر مربع',
      description: 'تصميم مربع حديث',
      preview: `<button style="position:fixed;bottom:25px;left:25px;padding:15px;border-radius:12px;background:#25D366;color:#fff;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,.4);z-index:9999;display:flex;flex-direction:column;align-items:center;gap:5px;min-width:70px" class="chat-preview">
        <span style="font-size:24px">💬</span>
        <span style="font-size:12px;font-weight:600">${isWhatsApp ? 'واتساب' : 'دردشة'}</span>
      </button>`
    }
  ];
}

function getAnnouncementVariations(config: any): TemplateVariation[] {
  const { message } = config;
  return [
    {
      id: 'announcement-1',
      name: 'شريط علوي أزرق',
      description: 'شريط إعلان في الأعلى',
      preview: `<div style="position:fixed;top:0;left:0;right:0;background:#3B82F6;color:#fff;padding:12px 20px;text-align:center;z-index:9999;font-size:14px;font-weight:500" class="announcement-preview">${message || 'إعلان خاص'} ✨</div>`
    },
    {
      id: 'announcement-2',
      name: 'شريط متدرج',
      description: 'تصميم متدرج ملون',
      preview: `<div style="position:fixed;top:0;left:0;right:0;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:15px 20px;text-align:center;z-index:9999;font-size:15px;font-weight:600;box-shadow:0 2px 10px rgba(0,0,0,.1)" class="announcement-preview">🎉 ${message || 'عرض خاص'} 🎉</div>`
    },
    {
      id: 'announcement-3',
      name: 'شريط داكن عريض',
      description: 'شريط داكن مميز',
      preview: `<div style="position:fixed;top:0;left:0;right:0;background:#1a1a2e;color:#fff;padding:18px 20px;text-align:center;z-index:9999;font-size:16px;font-weight:600;border-bottom:3px solid #3B82F6" class="announcement-preview">📢 ${message || 'إعلان مهم'}</div>`
    },
    {
      id: 'announcement-4',
      name: 'شريط سفلي',
      description: 'إعلان في الأسفل',
      preview: `<div style="position:fixed;bottom:0;left:0;right:0;background:#FCD34D;color:#78350F;padding:14px 20px;text-align:center;z-index:9999;font-size:15px;font-weight:600;box-shadow:0 -2px 10px rgba(0,0,0,.1)" class="announcement-preview">⚡ ${message || 'عرض لفترة محدودة'} ⚡</div>`
    }
  ];
}

function getWeatherVariations(config: any): TemplateVariation[] {
  const { city } = config;
  return [
    {
      id: 'weather-1',
      name: 'بطاقة بسيطة',
      description: 'عرض طقس بسيط',
      preview: `<div style="position:fixed;top:20px;left:20px;background:#fff;padding:20px;border-radius:12px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.1);min-width:200px" class="weather-preview">
        <div style="font-size:18px;font-weight:600;color:#333;margin-bottom:10px">${city || 'المدينة'}</div>
        <div style="font-size:36px;font-weight:700;color:#3B82F6">22°</div>
        <div style="font-size:14px;color:#666;margin-top:5px">☀️ مشمس</div>
      </div>`
    },
    {
      id: 'weather-2',
      name: 'بطاقة متدرجة',
      description: 'تصميم متدرج ملون',
      preview: `<div style="position:fixed;top:20px;left:20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:25px;border-radius:15px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.2);min-width:220px" class="weather-preview">
        <div style="font-size:16px;font-weight:500;margin-bottom:15px;opacity:0.9">${city || 'المدينة'}</div>
        <div style="font-size:48px;font-weight:700">22°</div>
        <div style="font-size:16px;margin-top:10px;opacity:0.9">☀️ مشمس</div>
      </div>`
    },
    {
      id: 'weather-3',
      name: 'بطاقة مفصلة',
      description: 'عرض مع تفاصيل إضافية',
      preview: `<div style="position:fixed;top:20px;right:20px;background:#fff;padding:20px;border-radius:12px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.1);min-width:240px" class="weather-preview">
        <div style="font-size:18px;font-weight:600;color:#333;margin-bottom:15px">${city || 'المدينة'}</div>
        <div style="display:flex;align-items:center;gap:15px;margin-bottom:15px">
          <div style="font-size:48px">☀️</div>
          <div style="font-size:42px;font-weight:700;color:#3B82F6">22°</div>
        </div>
        <div style="font-size:14px;color:#666">مشمس</div>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;font-size:12px;color:#666">
          <span>💧 65%</span>
          <span>💨 12 كم/س</span>
        </div>
      </div>`
    },
    {
      id: 'weather-4',
      name: 'شريط أفقي',
      description: 'شريط طقس صغير',
      preview: `<div style="position:fixed;top:0;left:0;right:0;background:#3B82F6;color:#fff;padding:12px 20px;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,.1)" class="weather-preview">
        <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:20px;font-size:14px">
          <span style="font-weight:600">${city || 'المدينة'}</span>
          <span style="font-size:20px">☀️</span>
          <span style="font-size:20px;font-weight:700">22°</span>
          <span>مشمس</span>
        </div>
      </div>`
    }
  ];
}

function getQuoteVariations(config: any): TemplateVariation[] {
  return [
    {
      id: 'quote-1',
      name: 'بطاقة جانبية',
      description: 'عرض اقتباس أنيق',
      preview: `<div style="position:fixed;top:50%;right:20px;transform:translateY(-50%);background:#fff;padding:25px;border-radius:12px;max-width:300px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.1);border-left:4px solid #3B82F6" class="quote-preview">
        <p style="margin:0 0 10px;font-size:16px;font-style:italic;color:#333;line-height:1.6">"النجاح هو القدرة على الانتقال من فشل إلى فشل دون فقدان الحماس"</p>
        <p style="margin:0;font-size:14px;color:#666;font-weight:600">— ونستون تشرشل</p>
      </div>`
    },
    {
      id: 'quote-2',
      name: 'بطاقة متدرجة',
      description: 'خلفية متدرجة ملونة',
      preview: `<div style="position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:25px;border-radius:15px;max-width:320px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.2)" class="quote-preview">
        <p style="margin:0 0 12px;font-size:16px;font-style:italic;line-height:1.6">"الطريقة الوحيدة للقيام بعمل عظيم هي أن تحب ما تفعله"</p>
        <p style="margin:0;font-size:14px;opacity:0.9;font-weight:600">— ستيف جوبز</p>
      </div>`
    },
    {
      id: 'quote-3',
      name: 'شريط علوي',
      description: 'اقتباس في شريط الأعلى',
      preview: `<div style="position:fixed;top:0;left:0;right:0;background:#1a1a2e;color:#fff;padding:15px 20px;text-align:center;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,.2)" class="quote-preview">
        <p style="margin:0;font-size:15px;font-style:italic">💡 "الحكمة هي معرفة ما يجب فعله بعد ذلك"</p>
      </div>`
    },
    {
      id: 'quote-4',
      name: 'نافذة مركزية',
      description: 'عرض كبير في الوسط',
      preview: `<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:40px;border-radius:15px;max-width:500px;text-align:center;z-index:9999;box-shadow:0 10px 40px rgba(0,0,0,.15)" class="quote-preview">
        <div style="font-size:48px;margin-bottom:20px">✨</div>
        <p style="margin:0 0 15px;font-size:20px;font-style:italic;color:#333;line-height:1.7">"كن التغيير الذي تريد أن تراه في العالم"</p>
        <p style="margin:0;font-size:16px;color:#666;font-weight:600">— المهاتما غاندي</p>
      </div>`
    }
  ];
}
