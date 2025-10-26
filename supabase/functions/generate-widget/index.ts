import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

function generateWidgetCode(templateName: string, config: any, variationId: string): string {
  let code = '';

  if (templateName.includes('\u0633\u0648\u0634\u0644') || templateName.includes('Social')) {
    code = generateSocialMediaCode(config, variationId);
  } else if (templateName.includes('\u062a\u0631\u062d\u064a\u0628') || templateName.includes('Welcome')) {
    code = generateWelcomeCode(config, variationId);
  } else if (templateName.includes('\u0639\u062f\u0627\u062f') || templateName.includes('Countdown')) {
    code = generateCountdownCode(config, variationId);
  } else if (templateName.includes('\u0627\u0644\u0639\u0648\u062f\u0629') || templateName.includes('Scroll')) {
    code = generateScrollCode(config, variationId);
  } else if (templateName.includes('\u0643\u0648\u0643\u064a\u0632') || templateName.includes('Cookie')) {
    code = generateCookieCode(config, variationId);
  } else if (templateName.includes('\u0646\u0634\u0631\u0629') || templateName.includes('Newsletter')) {
    code = generateNewsletterCode(config, variationId);
  } else if (templateName.includes('\u062f\u0631\u062f\u0634\u0629') || templateName.includes('Chat')) {
    code = generateChatCode(config, variationId);
  } else if (templateName.includes('\u0625\u0639\u0644\u0627\u0646\u0627\u062a') || templateName.includes('Announcement')) {
    code = generateAnnouncementCode(config, variationId);
  } else if (templateName.includes('\u0637\u0642\u0633') || templateName.includes('Weather')) {
    code = generateWeatherCode(config, variationId);
  } else if (templateName.includes('\u0627\u0642\u062a\u0628\u0627\u0633') || templateName.includes('Quote')) {
    code = generateQuoteCode(config, variationId);
  }

  return code ? `<script>\n${code}\n</script>` : '';
}

function generateSocialMediaCode(config: any, variationId: string): string {
  const { facebook, twitter, instagram, youtube } = config;
  const links = [];
  if (facebook) links.push({ name: 'Facebook', url: facebook, color: '#1877F2', icon: 'f' });
  if (twitter) links.push({ name: 'Twitter', url: twitter, color: '#1DA1F2', icon: 'X' });
  if (instagram) links.push({ name: 'Instagram', url: instagram, color: '#E4405F', icon: 'IG' });
  if (youtube) links.push({ name: 'YouTube', url: youtube, color: '#FF0000', icon: 'YT' });

  if (variationId === 'social-1') {
    return `(function(){var s=document.createElement('style');s.textContent='#social-bar{position:fixed;bottom:-100px;left:0;right:0;background:#4F46E5;padding:15px;display:flex;justify-content:center;gap:20px;transition:bottom .3s;z-index:9999;box-shadow:0 -2px 10px rgba(0,0,0,.1)}#social-bar.visible{bottom:0}#social-bar a{color:#fff;text-decoration:none;padding:8px 16px;border-radius:5px;background:rgba(255,255,255,.2)}#social-bar a:hover{background:rgba(255,255,255,.3)}';document.head.appendChild(s);var b=document.createElement('div');b.id='social-bar';b.innerHTML='${links.map(l => `<a href="${l.url}" target="_blank">${l.name}</a>`).join('')}';document.body.appendChild(b);window.addEventListener('scroll',function(){var h=document.documentElement.scrollHeight;var t=window.scrollY;var c=window.innerHeight;if(t+c>=h-100){b.classList.add('visible')}else{b.classList.remove('visible')}})})();`;
  } else if (variationId === 'social-2') {
    return `(function(){var s=document.createElement('style');s.textContent='#social-bar{position:fixed;bottom:-100px;left:0;right:0;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:20px;display:flex;justify-content:center;gap:15px;transition:bottom .3s;z-index:9999;box-shadow:0 -4px 20px rgba(0,0,0,.2)}#social-bar.visible{bottom:0}#social-bar a{color:#fff;text-decoration:none;padding:12px 20px;border-radius:25px;background:rgba(255,255,255,.15);backdrop-filter:blur(10px);font-weight:600}#social-bar a:hover{background:rgba(255,255,255,.25)}';document.head.appendChild(s);var b=document.createElement('div');b.id='social-bar';b.innerHTML='${links.map(l => `<a href="${l.url}" target="_blank">${l.icon} ${l.name}</a>`).join('')}';document.body.appendChild(b);window.addEventListener('scroll',function(){var h=document.documentElement.scrollHeight;var t=window.scrollY;var c=window.innerHeight;if(t+c>=h-100){b.classList.add('visible')}else{b.classList.remove('visible')}})})();`;
  } else if (variationId === 'social-3') {
    return `(function(){var s=document.createElement('style');s.textContent='#social-btns{position:fixed;bottom:-200px;left:50%;transform:translateX(-50%);display:flex;gap:15px;transition:bottom .3s;z-index:9999}#social-btns.visible{bottom:30px}#social-btns a{width:50px;height:50px;border-radius:50%;color:#fff;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 15px rgba(0,0,0,.2);font-weight:700;font-size:18px}#social-btns a:hover{transform:translateY(-5px)}';document.head.appendChild(s);var b=document.createElement('div');b.id='social-btns';b.innerHTML='${links.map(l => `<a href="${l.url}" target="_blank" style="background:${l.color}">${l.icon}</a>`).join('')}';document.body.appendChild(b);window.addEventListener('scroll',function(){var h=document.documentElement.scrollHeight;var t=window.scrollY;var c=window.innerHeight;if(t+c>=h-100){b.classList.add('visible')}else{b.classList.remove('visible')}})})();`;
  } else if (variationId === 'social-4') {
    return `(function(){var s=document.createElement('style');s.textContent='#social-side{position:fixed;right:-60px;top:50%;transform:translateY(-50%);width:60px;background:#fff;box-shadow:-2px 0 10px rgba(0,0,0,.1);transition:right .3s;z-index:9999;border-radius:8px 0 0 8px}#social-side.visible{right:0}#social-side a{display:block;padding:15px;color:#fff;text-decoration:none;text-align:center;margin-bottom:2px}#social-side a:hover{opacity:.8}';document.head.appendChild(s);var b=document.createElement('div');b.id='social-side';b.innerHTML='${links.map(l => `<a href="${l.url}" target="_blank" style="background:${l.color}">${l.icon}</a>`).join('')}';document.body.appendChild(b);window.addEventListener('scroll',function(){if(window.scrollY>300){b.classList.add('visible')}else{b.classList.remove('visible')}})})();`;
  }
  return '';
}

function generateWelcomeCode(config: any, variationId: string): string {
  const { title, message, buttonText, delay } = config;
  const t = title || 'Welcome';
  const m = message || 'Welcome to our site';
  const btn = buttonText || 'OK';
  const d = delay || 2;

  if (variationId === 'welcome-1') {
    return `(function(){var s=document.createElement('style');s.textContent='#welcome-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);display:none;justify-content:center;align-items:center;z-index:99999}#welcome-overlay.show{display:flex}#welcome-popup{background:#fff;padding:40px;border-radius:12px;max-width:400px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.2)}#welcome-popup h2{margin:0 0 15px;color:#333;font-size:24px}#welcome-popup p{margin:0 0 25px;color:#666;line-height:1.6}#welcome-popup button{background:#4F46E5;color:#fff;border:none;padding:12px 30px;border-radius:6px;cursor:pointer;font-size:16px}#welcome-popup button:hover{background:#4338CA}';document.head.appendChild(s);var o=document.createElement('div');o.id='welcome-overlay';o.innerHTML='<div id="welcome-popup"><h2>${t}</h2><p>${m}</p><button onclick="document.getElementById(\\'welcome-overlay\\').remove()">${btn}</button></div>';document.body.appendChild(o);setTimeout(function(){o.classList.add('show')},${d}*1000)})();`;
  } else if (variationId === 'welcome-2') {
    return `(function(){var s=document.createElement('style');s.textContent='#welcome-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);display:none;justify-content:center;align-items:center;z-index:99999}#welcome-overlay.show{display:flex}#welcome-popup{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px;border-radius:20px;max-width:400px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.3)}#welcome-popup h2{margin:0 0 15px;color:#fff;font-size:28px;font-weight:700}#welcome-popup p{margin:0 0 25px;color:rgba(255,255,255,.9);line-height:1.8;font-size:16px}#welcome-popup button{background:#fff;color:#667eea;border:none;padding:14px 35px;border-radius:25px;cursor:pointer;font-size:16px;font-weight:600;box-shadow:0 4px 15px rgba(0,0,0,.2)}#welcome-popup button:hover{transform:translateY(-2px)}';document.head.appendChild(s);var o=document.createElement('div');o.id='welcome-overlay';o.innerHTML='<div id="welcome-popup"><h2>${t}</h2><p>${m}</p><button onclick="document.getElementById(\\'welcome-overlay\\').remove()">${btn}</button></div>';document.body.appendChild(o);setTimeout(function(){o.classList.add('show')},${d}*1000)})();`;
  } else if (variationId === 'welcome-3') {
    return `(function(){var s=document.createElement('style');s.textContent='#welcome-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);backdrop-filter:blur(10px);display:none;justify-content:center;align-items:center;z-index:99999}#welcome-overlay.show{display:flex}#welcome-popup{background:rgba(255,255,255,.1);backdrop-filter:blur(20px);padding:40px;border-radius:20px;max-width:400px;text-align:center;border:1px solid rgba(255,255,255,.2);box-shadow:0 8px 32px rgba(0,0,0,.1)}#welcome-popup h2{margin:0 0 15px;color:#fff;font-size:26px}#welcome-popup p{margin:0 0 25px;color:rgba(255,255,255,.9);line-height:1.7}#welcome-popup button{background:rgba(255,255,255,.2);color:#fff;border:1px solid rgba(255,255,255,.3);padding:12px 30px;border-radius:25px;cursor:pointer;font-size:16px;backdrop-filter:blur(10px)}#welcome-popup button:hover{background:rgba(255,255,255,.3)}';document.head.appendChild(s);var o=document.createElement('div');o.id='welcome-overlay';o.innerHTML='<div id="welcome-popup"><h2>${t}</h2><p>${m}</p><button onclick="document.getElementById(\\'welcome-overlay\\').remove()">${btn}</button></div>';document.body.appendChild(o);setTimeout(function(){o.classList.add('show')},${d}*1000)})();`;
  } else if (variationId === 'welcome-4') {
    return `(function(){var s=document.createElement('style');s.textContent='#welcome-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.8);display:none;justify-content:center;align-items:center;z-index:99999}#welcome-overlay.show{display:flex}#welcome-popup{background:#1a1a2e;padding:40px;border-radius:15px;max-width:400px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.5);border:2px solid #16213e}#welcome-popup h2{margin:0 0 15px;color:#fff;font-size:28px;font-weight:700}#welcome-popup p{margin:0 0 25px;color:#a8b2d1;line-height:1.7}#welcome-popup button{background:#0f4c75;color:#fff;border:none;padding:14px 35px;border-radius:8px;cursor:pointer;font-size:16px;font-weight:600;box-shadow:0 4px 15px rgba(15,76,117,.4)}#welcome-popup button:hover{background:#1a6fb8}';document.head.appendChild(s);var o=document.createElement('div');o.id='welcome-overlay';o.innerHTML='<div id="welcome-popup"><h2>${t}</h2><p>${m}</p><button onclick="document.getElementById(\\'welcome-overlay\\').remove()">${btn}</button></div>';document.body.appendChild(o);setTimeout(function(){o.classList.add('show')},${d}*1000)})();`;
  }
  return '';
}

function generateCountdownCode(config: any, variationId: string): string {
  const { targetDate, title } = config;
  const t = title || 'Countdown';
  const date = targetDate;

  const baseCode = `var tm=new Date('${date}').getTime();function u(){var n=new Date().getTime();var d=tm-n;if(d<0){document.getElementById('cd-timer').textContent='Finished!';return}var dy=Math.floor(d/(1000*60*60*24));var hr=Math.floor((d%(1000*60*60*24))/(1000*60*60));var mn=Math.floor((d%(1000*60*60))/(1000*60));var sc=Math.floor((d%(1000*60))/1000);`;

  if (variationId === 'countdown-1') {
    return `(function(){var s=document.createElement('style');s.textContent='#cd-widget{position:fixed;top:0;left:0;right:0;background:#EF4444;color:#fff;padding:15px 20px;text-align:center;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,.2)}#cd-title{font-size:16px;font-weight:600;margin-bottom:8px}#cd-timer{display:flex;justify-content:center;gap:20px;font-size:20px;font-weight:700}.cd-part{display:flex;flex-direction:column}.cd-num{font-size:28px}';document.head.appendChild(s);var w=document.createElement('div');w.id='cd-widget';w.innerHTML='<div id="cd-title">${t}</div><div id="cd-timer"></div>';document.body.appendChild(w);${baseCode}document.getElementById('cd-timer').innerHTML='<div class="cd-part"><span class="cd-num">'+dy+'</span>Days</div><div class="cd-part"><span class="cd-num">'+hr+'</span>Hours</div><div class="cd-part"><span class="cd-num">'+mn+'</span>Mins</div><div class="cd-part"><span class="cd-num">'+sc+'</span>Secs</div>'}u();setInterval(u,1000)})();`;
  } else if (variationId === 'countdown-2') {
    return `(function(){var s=document.createElement('style');s.textContent='#cd-widget{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%);color:#fff;padding:40px 60px;border-radius:20px;text-align:center;z-index:9999;box-shadow:0 20px 60px rgba(0,0,0,.3)}#cd-title{font-size:24px;font-weight:700;margin-bottom:20px}#cd-timer{display:flex;justify-content:center;gap:25px}.cd-part{text-align:center}.cd-num{font-size:48px;font-weight:900}.cd-label{font-size:14px;opacity:.9}';document.head.appendChild(s);var w=document.createElement('div');w.id='cd-widget';w.innerHTML='<div id="cd-title">${t}</div><div id="cd-timer"></div>';document.body.appendChild(w);${baseCode}document.getElementById('cd-timer').innerHTML='<div class="cd-part"><div class="cd-num">'+dy+'</div><div class="cd-label">DAYS</div></div><div class="cd-part"><div class="cd-num">'+hr+'</div><div class="cd-label">HOURS</div></div><div class="cd-part"><div class="cd-num">'+mn+'</div><div class="cd-label">MINS</div></div><div class="cd-part"><div class="cd-num">'+sc+'</div><div class="cd-label">SECS</div></div>'}u();setInterval(u,1000)})();`;
  } else if (variationId === 'countdown-3') {
    return `(function(){var s=document.createElement('style');s.textContent='#cd-widget{position:fixed;top:20px;right:20px;background:#fff;color:#333;padding:15px 20px;border-radius:12px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.15);border:2px solid #EF4444}#cd-title{font-size:14px;font-weight:600;margin-bottom:8px;color:#EF4444}#cd-timer{display:flex;gap:10px;font-size:12px}.cd-part{text-align:center}.cd-num{font-size:20px;font-weight:700;color:#EF4444}';document.head.appendChild(s);var w=document.createElement('div');w.id='cd-widget';w.innerHTML='<div id="cd-title">${t}</div><div id="cd-timer"></div>';document.body.appendChild(w);${baseCode}document.getElementById('cd-timer').innerHTML='<div class="cd-part"><div class="cd-num">'+dy+'</div><div>D</div></div><div class="cd-part"><div class="cd-num">'+hr+'</div><div>H</div></div><div class="cd-part"><div class="cd-num">'+mn+'</div><div>M</div></div><div class="cd-part"><div class="cd-num">'+sc+'</div><div>S</div></div>'}u();setInterval(u,1000)})();`;
  } else if (variationId === 'countdown-4') {
    return `(function(){var s=document.createElement('style');s.textContent='#cd-widget{position:fixed;top:0;left:0;right:0;background:#1a1a2e;color:#fff;padding:25px 20px;text-align:center;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.4);border-bottom:4px solid #EF4444}#cd-title{font-size:22px;font-weight:700;margin-bottom:15px;letter-spacing:2px}#cd-timer{display:flex;justify-content:center;gap:30px}.cd-part{background:rgba(239,68,68,.1);padding:10px 20px;border-radius:8px;border:1px solid rgba(239,68,68,.3)}.cd-num{font-size:32px;font-weight:900;color:#EF4444}.cd-label{font-size:12px;opacity:.8}';document.head.appendChild(s);var w=document.createElement('div');w.id='cd-widget';w.innerHTML='<div id="cd-title">${t}</div><div id="cd-timer"></div>';document.body.appendChild(w);${baseCode}document.getElementById('cd-timer').innerHTML='<div class="cd-part"><div class="cd-num">'+dy+'</div><div class="cd-label">DAYS</div></div><div class="cd-part"><div class="cd-num">'+hr+'</div><div class="cd-label">HOURS</div></div><div class="cd-part"><div class="cd-num">'+mn+'</div><div class="cd-label">MINS</div></div><div class="cd-part"><div class="cd-num">'+sc+'</div><div class="cd-label">SECS</div></div>'}u();setInterval(u,1000)})();`;
  }
  return '';
}

function generateScrollCode(config: any, variationId: string): string {
  const { color } = config;
  const c = color || '#3B82F6';

  if (variationId === 'scroll-1') {
    return `(function(){var s=document.createElement('style');s.textContent='#scroll-btn{position:fixed;bottom:30px;right:30px;width:50px;height:50px;border-radius:50%;background:${c};color:#fff;border:none;font-size:24px;cursor:pointer;display:none;box-shadow:0 4px 15px rgba(0,0,0,.2);z-index:9999;transition:all .3s}#scroll-btn.visible{display:flex;align-items:center;justify-content:center}#scroll-btn:hover{transform:translateY(-5px);box-shadow:0 6px 20px rgba(0,0,0,.3)}';document.head.appendChild(s);var b=document.createElement('button');b.id='scroll-btn';b.innerHTML='&uarr;';b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};document.body.appendChild(b);window.addEventListener('scroll',function(){if(window.scrollY>300){b.classList.add('visible')}else{b.classList.remove('visible')}})})();`;
  } else if (variationId === 'scroll-2') {
    return `(function(){var s=document.createElement('style');s.textContent='#scroll-btn{position:fixed;bottom:30px;right:30px;width:50px;height:50px;border-radius:12px;background:#1a1a2e;color:#fff;border:2px solid ${c};font-size:24px;cursor:pointer;display:none;box-shadow:0 4px 15px rgba(0,0,0,.2);z-index:9999;transition:all .3s}#scroll-btn.visible{display:flex;align-items:center;justify-content:center}#scroll-btn:hover{background:${c};border-color:${c}}';document.head.appendChild(s);var b=document.createElement('button');b.id='scroll-btn';b.innerHTML='&uarr;';b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};document.body.appendChild(b);window.addEventListener('scroll',function(){if(window.scrollY>300){b.classList.add('visible')}else{b.classList.remove('visible')}})})();`;
  } else if (variationId === 'scroll-3') {
    return `(function(){var s=document.createElement('style');s.textContent='#scroll-btn{position:fixed;bottom:30px;right:30px;padding:12px 20px;border-radius:25px;background:${c};color:#fff;border:none;font-size:14px;font-weight:600;cursor:pointer;display:none;box-shadow:0 4px 15px rgba(0,0,0,.2);z-index:9999;transition:all .3s;align-items:center;gap:5px}#scroll-btn.visible{display:flex}#scroll-btn:hover{transform:translateY(-3px)}';document.head.appendChild(s);var b=document.createElement('button');b.id='scroll-btn';b.innerHTML='&uarr; TOP';b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};document.body.appendChild(b);window.addEventListener('scroll',function(){if(window.scrollY>300){b.classList.add('visible')}else{b.classList.remove('visible')}})})();`;
  } else if (variationId === 'scroll-4') {
    return `(function(){var s=document.createElement('style');s.textContent='#scroll-btn{position:fixed;bottom:30px;right:30px;width:55px;height:55px;border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;font-size:24px;cursor:pointer;display:none;box-shadow:0 6px 20px rgba(102,126,234,.4);z-index:9999;transition:all .3s}#scroll-btn.visible{display:flex;align-items:center;justify-content:center}#scroll-btn:hover{transform:translateY(-5px) rotate(360deg)}';document.head.appendChild(s);var b=document.createElement('button');b.id='scroll-btn';b.innerHTML='&uarr;';b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};document.body.appendChild(b);window.addEventListener('scroll',function(){if(window.scrollY>300){b.classList.add('visible')}else{b.classList.remove('visible')}})})();`;
  }
  return '';
}

function generateCookieCode(config: any, variationId: string): string {
  const { message, acceptText } = config;
  const msg = message || 'نستخدم ملفات تعريف الارتباط';
  const btn = acceptText || 'قبول';

  if (variationId.startsWith('cookie-')) {
    return `(function(){var s=document.createElement('style');s.textContent='#cookie-bar{position:fixed;bottom:0;left:0;right:0;background:#1a1a2e;color:#fff;padding:20px;z-index:9999;box-shadow:0 -2px 10px rgba(0,0,0,.2)}#cookie-bar .container{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:15px}#cookie-bar p{margin:0;flex:1;min-width:300px}#cookie-bar button{background:#3B82F6;color:#fff;border:none;padding:10px 25px;border-radius:6px;cursor:pointer;font-weight:600}#cookie-bar button:hover{background:#2563EB}';document.head.appendChild(s);var b=document.createElement('div');b.id='cookie-bar';b.innerHTML='<div class="container"><p>${msg}</p><button onclick="document.getElementById(\\'cookie-bar\\').remove()">${btn}</button></div>';document.body.appendChild(b)})();`;
  }
  return '';
}

function generateNewsletterCode(config: any, variationId: string): string {
  const { title, placeholder, buttonText, actionUrl } = config;
  const t = title || 'اشترك في نشرتنا';
  const p = placeholder || 'بريدك';
  const btn = buttonText || 'اشترك';
  const url = actionUrl || '#';

  if (variationId.startsWith('newsletter-')) {
    return `(function(){var s=document.createElement('style');s.textContent='#newsletter{position:fixed;left:20px;bottom:20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:25px;border-radius:12px;max-width:300px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.2)}#newsletter h4{margin:0 0 12px;font-size:18px}#newsletter input{width:100%;padding:10px;border:none;border-radius:6px;margin-bottom:10px;text-align:center}#newsletter button{width:100%;background:#fff;color:#667eea;border:none;padding:10px;border-radius:6px;cursor:pointer;font-weight:600}#newsletter button:hover{transform:scale(1.05)}';document.head.appendChild(s);var f=document.createElement('div');f.id='newsletter';f.innerHTML='<h4>${t}</h4><form action="${url}" method="POST"><input type="email" name="email" placeholder="${p}" required><button type="submit">${btn}</button></form>';document.body.appendChild(f)})();`;
  }
  return '';
}

function generateChatCode(config: any, variationId: string): string {
  const { platform, contact, message } = config;
  const isWhatsApp = platform === 'WhatsApp';
  const msg = message ? encodeURIComponent(message) : '';
  const url = isWhatsApp ? `https://wa.me/${contact}?text=${msg}` : `https://t.me/${contact}`;

  if (variationId.startsWith('chat-')) {
    return `(function(){var s=document.createElement('style');s.textContent='#chat-btn{position:fixed;bottom:25px;left:25px;width:60px;height:60px;border-radius:50%;background:#25D366;color:#fff;border:none;font-size:28px;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,.4);z-index:9999;display:flex;align-items:center;justify-content:center;transition:all .3s}#chat-btn:hover{transform:scale(1.1)}';document.head.appendChild(s);var b=document.createElement('a');b.id='chat-btn';b.href='${url}';b.target='_blank';b.innerHTML='💬';document.body.appendChild(b)})();`;
  }
  return '';
}

function generateAnnouncementCode(config: any, variationId: string): string {
  const { message, link } = config;
  const msg = message || 'إعلان خاص';
  const url = link || '';

  if (variationId.startsWith('announcement-')) {
    const content = url ? `<a href="${url}" style="color:inherit;text-decoration:none">${msg} ✨</a>` : `${msg} ✨`;
    return `(function(){var s=document.createElement('style');s.textContent='#announce-bar{position:fixed;top:0;left:0;right:0;background:#3B82F6;color:#fff;padding:12px 20px;text-align:center;z-index:9999;font-size:14px;font-weight:500}#announce-bar a{color:inherit;text-decoration:none}#announce-bar a:hover{text-decoration:underline}';document.head.appendChild(s);var b=document.createElement('div');b.id='announce-bar';b.innerHTML='${content}';document.body.appendChild(b)})();`;
  }
  return '';
}

function generateWeatherCode(config: any, variationId: string): string {
  const { city, unit } = config;
  const c = city || 'London';
  const u = unit === 'Fahrenheit' ? 'imperial' : 'metric';
  const sym = unit === 'Fahrenheit' ? '°F' : '°C';

  if (variationId.startsWith('weather-')) {
    return `(function(){var s=document.createElement('style');s.textContent='#weather{position:fixed;top:20px;left:20px;background:#fff;padding:20px;border-radius:12px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.1);min-width:200px}#weather .city{font-size:18px;font-weight:600;color:#333;margin-bottom:10px}#weather .temp{font-size:36px;font-weight:700;color:#3B82F6}#weather .desc{font-size:14px;color:#666;margin-top:5px}';document.head.appendChild(s);var w=document.createElement('div');w.id='weather';w.innerHTML='<div class="city">${c}</div><div class="temp">--${sym}</div><div class="desc">جاري التحميل...</div>';document.body.appendChild(w);fetch('https://api.openweathermap.org/data/2.5/weather?q=${c}&units=${u}&appid=439d4b804bc8187953eb36d2a8c26a02').then(r=>r.json()).then(d=>{w.innerHTML='<div class="city">'+d.name+'</div><div class="temp">'+Math.round(d.main.temp)+'${sym}</div><div class="desc">'+d.weather[0].description+'</div>'}).catch(e=>{w.innerHTML='<div class="city">${c}</div><div class="desc">فشل تحميل الطقس</div>'})})();`;
  }
  return '';
}

function generateQuoteCode(config: any, variationId: string): string {
  if (variationId.startsWith('quote-')) {
    return `(function(){var s=document.createElement('style');s.textContent='#quote-widget{position:fixed;top:50%;right:20px;transform:translateY(-50%);background:#fff;padding:25px;border-radius:12px;max-width:300px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.1);border-left:4px solid #3B82F6}#quote-widget p{margin:0;font-size:16px;font-style:italic;color:#333;line-height:1.6}#quote-widget .author{margin-top:10px;font-size:14px;color:#666;font-weight:600;font-style:normal}';document.head.appendChild(s);var q=document.createElement('div');q.id='quote-widget';q.innerHTML='<p>جاري التحميل...</p>';document.body.appendChild(q);fetch('https://api.quotable.io/random').then(r=>r.json()).then(d=>{q.innerHTML='<p>"'+d.content+'"</p><div class="author">— '+d.author+'</div>'}).catch(e=>{q.innerHTML='<p>"النجاح هو القدرة على الانتقال من فشل إلى فشل دون فقدان الحماس"</p><div class="author">— ونستون تشرشل</div>'})})();`;
  }
  return '';
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const path = url.pathname;

    if (req.method === 'GET' && path.endsWith('/templates')) {
      const { data, error } = await supabase
        .from('widget_templates')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      return new Response(JSON.stringify(data), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    if (req.method === 'POST' && path.endsWith('/generate')) {
      const { templateId, config, variationId } = await req.json();

      const { data: template } = await supabase
        .from('widget_templates')
        .select('*')
        .eq('id', templateId)
        .maybeSingle();

      if (!template) {
        throw new Error('Template not found');
      }

      const generatedCode = generateWidgetCode(template.name, config, variationId);

      const { data: widget, error } = await supabase
        .from('widgets')
        .insert({
          template_id: templateId,
          config,
          generated_code: generatedCode,
        })
        .select()
        .maybeSingle();

      if (error) throw error;

      return new Response(JSON.stringify(widget), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
});
