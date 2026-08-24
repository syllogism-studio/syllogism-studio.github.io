const fs = require('fs');
const path = require('path');

// 讀取集中文字內容
const contentPath = path.join(__dirname, 'content.json');
const rawData = fs.readFileSync(contentPath, 'utf8');
const c = JSON.parse(rawData);

// 產生 JSON-LD 結構化資料
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${c.meta.canonicalUrl}#application`,
      "name": "Flashleaf",
      "operatingSystem": "Android, iOS",
      "applicationCategory": "EducationalApplication",
      "description": c.meta.description,
      "url": c.meta.canonicalUrl,
      "author": {
        "@type": "Organization",
        "name": c.meta.author,
        "url": c.meta.canonicalUrl,
        "email": c.meta.supportEmail
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Flashleaf 免費基礎版",
          "price": "0",
          "priceCurrency": "TWD",
          "description": "包含每日基礎 AI 課堂錄音轉寫、手動製作記憶閃卡、本地離線儲存與基礎 FSRS 複習功能。"
        },
        {
          "@type": "Offer",
          "name": "Flashleaf Bloom Pro (月訂閱)",
          "price": "150",
          "priceCurrency": "TWD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "150",
            "priceCurrency": "TWD",
            "unitText": "MONTH"
          },
          "description": "解鎖無限量 AI 條列式重點摘要、動態樹狀心智圖生成、無上限閃卡卡組與雲端備份同步。"
        },
        {
          "@type": "Offer",
          "name": "Flashleaf Bloom Pro (年度訂閱方案 - 享7天免費試用)",
          "price": "1080",
          "priceCurrency": "TWD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "1080",
            "priceCurrency": "TWD",
            "unitText": "YEAR"
          },
          "description": "年度訂閱方案平均每月僅需 NT$90（相當於 6 折優惠），全功能無限制存取，支援 7 天無風險免費試用。"
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": `${c.meta.canonicalUrl}#organization`,
      "name": "Summer Flowers Studio",
      "alternateName": "夏花工作室",
      "url": c.meta.canonicalUrl,
      "logo": `${c.meta.canonicalUrl}assets/images/app_icon.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "email": c.meta.supportEmail,
        "contactType": "Customer Support",
        "availableLanguage": ["zh-TW", "en"]
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${c.meta.canonicalUrl}#faq`,
      "mainEntity": c.faq.questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${q.answerDirect} ${q.answerDetail}`
        }
      }))
    }
  ]
};

// 渲染 HTML
const html = `<!DOCTYPE html>
<html lang="zh-TW" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary SEO & AEO Meta Tags -->
  <title>${c.meta.title}</title>
  <meta name="description" content="${c.meta.description}" />
  <meta name="keywords" content="${c.meta.keywords}" />
  <meta name="author" content="${c.meta.author}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="${c.meta.canonicalUrl}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${c.meta.canonicalUrl}" />
  <meta property="og:title" content="${c.meta.title}" />
  <meta property="og:description" content="${c.meta.description}" />
  <meta property="og:image" content="${c.meta.canonicalUrl}assets/images/og_preview.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="${c.meta.canonicalUrl}" />
  <meta property="twitter:title" content="${c.meta.title}" />
  <meta property="twitter:description" content="${c.meta.description}" />
  <meta property="twitter:image" content="${c.meta.canonicalUrl}assets/images/og_preview.png" />

  <!-- Google Fonts & Tailwind CSS -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            maple: {
              50: '#FDF8F6',
              100: '#F9EEEC',
              200: '#F1D7D2',
              300: '#DB9E92',
              400: '#D28779',
              500: '#B85C4E',
              600: '#A65145',
              700: '#8E453B',
              800: '#763A31',
              900: '#3D2E24',
            },
            autumn: {
              cream: '#FAF5F0',
              beige: '#F8EEDF',
              gold: '#E5C07B',
              goldLight: '#F3D99C',
              dark: '#1A1817',
              cardDark: '#24201E',
            }
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', '"Noto Sans TC"', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Structured Data (JSON-LD) for AEO / GEO Search Engines -->
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>

  <style>
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #FAF5F0; }
    ::-webkit-scrollbar-thumb { background: #DB9E92; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #B85C4E; }
    .glass-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(229, 224, 218, 0.7);
    }
    .glass-card-dark {
      background: rgba(30, 26, 24, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .glow-maple { box-shadow: 0 10px 40px -10px rgba(184, 92, 78, 0.3); }
    .glow-gold { box-shadow: 0 10px 40px -10px rgba(229, 192, 123, 0.25); }
  </style>
</head>

<body class="bg-autumn-cream text-maple-900 font-sans antialiased selection:bg-maple-200 selection:text-maple-900">

  <!-- 1. Top Announcement Bar -->
  <div class="bg-maple-500 text-white text-xs sm:text-sm font-medium py-2 px-4 text-center flex items-center justify-center space-x-2">
    <span class="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-semibold">${c.topBanner.badge}</span>
    <span>${c.topBanner.text}</span>
    <a href="#pricing" class="underline hover:text-autumn-gold font-bold ml-1">${c.topBanner.actionText}</a>
  </div>

  <!-- 2. Header & Nav -->
  <header class="sticky top-0 z-50 bg-autumn-cream/80 backdrop-blur-md border-b border-maple-200/60 transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
      <a href="#" class="flex items-center space-x-3 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-maple-500 to-maple-700 flex items-center justify-center text-white shadow-md shadow-maple-500/20 group-hover:scale-105 transition-transform">
          <i data-lucide="leaf" class="w-5 h-5 text-autumn-gold fill-autumn-gold/30"></i>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-black tracking-tight text-maple-900 font-sans">Flashleaf</span>
          <span class="text-[10px] tracking-wider text-maple-500 font-bold uppercase -mt-1">AI 課堂筆記與閃卡</span>
        </div>
      </a>

      <nav class="hidden md:flex items-center space-x-8 text-sm font-semibold text-maple-800">
        <a href="#features" class="hover:text-maple-500 transition-colors">核心功能</a>
        <a href="#fsrs" class="hover:text-maple-500 transition-colors">FSRS 演算法</a>
        <a href="#pricing" class="hover:text-maple-500 transition-colors">方案與定價</a>
        <a href="#faq" class="hover:text-maple-500 transition-colors">常見問題 (FAQ)</a>
        <a href="#privacy" class="hover:text-maple-500 transition-colors">隱私與條款</a>
      </nav>

      <div class="flex items-center space-x-4">
        <a href="${c.meta.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center space-x-2 bg-maple-500 hover:bg-maple-600 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-maple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <i data-lucide="download" class="w-4 h-4"></i>
          <span>免費下載 App</span>
        </a>
      </div>
    </div>
  </header>

  <!-- 3. HERO SECTION -->
  <section class="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-maple-300/30 to-autumn-gold/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
    <div class="absolute top-20 right-10 w-72 h-72 bg-maple-400/10 rounded-full blur-2xl pointer-events-none -z-10"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto space-y-6">
        <div class="inline-flex items-center space-x-2 bg-white/80 border border-maple-200 px-4 py-1.5 rounded-full shadow-sm">
          <i data-lucide="sparkles" class="w-4 h-4 text-maple-500"></i>
          <span class="text-xs sm:text-sm font-bold text-maple-700">${c.hero.badge}</span>
        </div>

        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-maple-900 tracking-tight leading-[1.15]">
          ${c.hero.titleMain}<br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-maple-500 via-maple-600 to-autumn-gold bg-clip-text text-transparent">${c.hero.titleHighlight}</span>
        </h1>

        <p class="text-base sm:text-xl text-maple-800/90 leading-relaxed font-normal">
          ${c.hero.description}
        </p>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="${c.meta.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-maple-500 hover:bg-maple-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-maple-500/30 transition-all hover:scale-105 active:scale-95 text-base">
            <i data-lucide="play" class="w-5 h-5 fill-current"></i>
            <span>${c.hero.primaryCta}</span>
          </a>
          <a href="#features" class="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/90 hover:bg-white text-maple-900 border border-maple-200 font-bold px-7 py-4 rounded-2xl shadow-sm transition-all hover:shadow-md text-base">
            <i data-lucide="compass" class="w-5 h-5 text-maple-500"></i>
            <span>${c.hero.secondaryCta}</span>
          </a>
        </div>

        <div class="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-maple-700/80 font-medium">
          ${c.hero.trustBadges.map((badge, idx) => `
          <div class="flex items-center space-x-1.5">
            <i data-lucide="${idx === 0 ? 'shield-check' : idx === 1 ? 'brain-circuit' : 'gift'}" class="w-4 h-4 ${idx === 0 ? 'text-emerald-600' : idx === 1 ? 'text-maple-500' : 'text-amber-600'}"></i>
            <span>${badge}</span>
          </div>`).join('')}
        </div>
      </div>

      <!-- Preview Cards -->
      <div class="mt-14 max-w-5xl mx-auto">
        <div class="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-white/90 to-white/40 border border-white/80 shadow-2xl shadow-maple-900/10 backdrop-blur-xl">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${c.previewCards.map((card, i) => `
            <div class="bg-white rounded-2xl p-5 border border-maple-100 shadow-sm flex flex-col justify-between space-y-4">
              <div class="space-y-3">
                <div class="w-9 h-9 rounded-lg ${i === 0 ? 'bg-red-100 text-maple-600' : i === 1 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'} flex items-center justify-center">
                  <i data-lucide="${i === 0 ? 'mic' : i === 1 ? 'sparkles' : 'layers'}" class="w-5 h-5"></i>
                </div>
                <h3 class="font-bold text-maple-900 text-base">${card.step}</h3>
                <p class="text-xs text-maple-700 leading-relaxed">${card.description}</p>
              </div>
              <div class="bg-autumn-cream p-3 rounded-xl border border-maple-200/60 text-[11px] text-maple-800 space-y-1 font-mono">
                <div class="flex items-center space-x-2 ${i === 0 ? 'text-maple-500 font-bold' : 'text-maple-900 font-bold'}">
                  ${i === 0 ? '<span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>' : ''}
                  <span>${card.snippetTitle}</span>
                </div>
                <div class="text-maple-600 ${i === 0 ? 'truncate' : 'whitespace-pre-line'}">${card.snippetContent}</div>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. CORE FEATURES -->
  <section id="features" class="py-20 bg-white/70 border-y border-maple-200/70 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <h2 class="text-xs sm:text-sm font-bold tracking-widest text-maple-500 uppercase">${c.features.subtitle}</h2>
        <h3 class="text-2xl sm:text-4xl font-extrabold text-maple-900">${c.features.title}</h3>
        <p class="text-maple-700 text-sm sm:text-base">${c.features.description}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${c.features.list.map((f, i) => `
        <article class="glass-card rounded-3xl p-8 transition-all hover:shadow-xl hover:border-maple-300 space-y-4">
          <div class="w-12 h-12 rounded-2xl ${i === 0 ? 'bg-maple-100 text-maple-600' : i === 1 ? 'bg-amber-100 text-amber-700' : i === 2 ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'} flex items-center justify-center">
            <i data-lucide="${f.icon}" class="w-6 h-6"></i>
          </div>
          <h4 class="text-xl font-bold text-maple-900">${f.title}</h4>
          <p class="text-maple-800 text-sm leading-relaxed">${f.content}</p>
          <ul class="text-xs text-maple-700 space-y-2 pt-2 border-t border-maple-100">
            ${f.highlights.map(h => `
            <li class="flex items-center space-x-2">
              <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i>
              <span>${h}</span>
            </li>`).join('')}
          </ul>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <!-- 5. FSRS SECTION -->
  <section id="fsrs" class="py-20 bg-autumn-beige/50 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-6 space-y-6">
          <div class="inline-flex items-center space-x-2 bg-maple-500/10 text-maple-600 px-3.5 py-1 rounded-full text-xs font-bold">
            <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
            <span>${c.fsrsSection.badge}</span>
          </div>
          <h3 class="text-2xl sm:text-4xl font-extrabold text-maple-900 tracking-tight leading-tight whitespace-pre-line">
            ${c.fsrsSection.title}
          </h3>
          <p class="text-maple-800 text-sm sm:text-base leading-relaxed">${c.fsrsSection.desc1}</p>
          <p class="text-maple-800 text-sm sm:text-base leading-relaxed">${c.fsrsSection.desc2}</p>
          
          <div class="grid grid-cols-3 gap-4 pt-2">
            ${c.fsrsSection.metrics.map(m => `
            <div class="bg-white p-4 rounded-2xl border border-maple-200 text-center space-y-1">
              <div class="text-xs font-bold text-maple-500">${m.name}</div>
              <div class="text-[11px] text-maple-700">${m.desc}</div>
            </div>`).join('')}
          </div>
        </div>

        <div class="lg:col-span-6">
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-maple-200 shadow-xl space-y-6">
            <h4 class="font-bold text-maple-900 text-lg border-b border-maple-100 pb-3">演算法機制客觀對比</h4>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-xs font-bold mb-1">
                  <span class="text-maple-900">Flashleaf FSRS 演算法</span>
                  <span class="text-emerald-600">${c.fsrsSection.fsrsAdvantage}</span>
                </div>
                <div class="w-full bg-maple-100 h-3 rounded-full overflow-hidden">
                  <div class="bg-gradient-to-r from-maple-500 to-emerald-500 h-full rounded-full w-[90%]"></div>
                </div>
                <div class="text-[11px] text-maple-600 mt-1">${c.fsrsSection.fsrsAdvantageDesc}</div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-bold mb-1 text-maple-700">
                  <span>傳統 SM-2 演算法</span>
                  <span>${c.fsrsSection.sm2Disadvantage}</span>
                </div>
                <div class="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
                  <div class="bg-stone-400 h-full rounded-full w-[55%]"></div>
                </div>
                <div class="text-[11px] text-maple-600 mt-1">${c.fsrsSection.sm2DisadvantageDesc}</div>
              </div>
            </div>

            <div class="bg-maple-50 p-4 rounded-2xl border border-maple-200/80 text-xs text-maple-800 leading-relaxed">
              💡 <strong>核心優勢</strong>：${c.fsrsSection.conclusion}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. PRICING -->
  <section id="pricing" class="py-20 bg-autumn-dark text-white relative overflow-hidden">
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-autumn-gold/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <h2 class="text-xs sm:text-sm font-bold tracking-widest text-autumn-gold uppercase">${c.pricing.subtitle}</h2>
        <h3 class="text-2xl sm:text-4xl font-extrabold text-white">${c.pricing.title}</h3>
        <p class="text-white/70 text-sm sm:text-base">${c.pricing.description}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <!-- Free Plan -->
        <div class="glass-card-dark rounded-3xl p-8 flex flex-col justify-between border border-white/10 space-y-6">
          <div class="space-y-4">
            <div class="inline-block bg-white/10 text-white/90 text-xs font-bold px-3 py-1 rounded-full">${c.pricing.plans[0].badge}</div>
            <h4 class="text-2xl font-bold text-white">${c.pricing.plans[0].name}</h4>
            <p class="text-white/60 text-xs leading-relaxed">${c.pricing.plans[0].description}</p>
            <div class="pt-2">
              <span class="text-4xl font-black text-white">${c.pricing.plans[0].price}</span>
              <span class="text-white/50 text-xs">${c.pricing.plans[0].period}</span>
            </div>
            <ul class="space-y-3 pt-4 border-t border-white/10 text-xs text-white/80">
              ${c.pricing.plans[0].features.map(f => `
              <li class="flex items-center space-x-2.5">
                <i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>
                <span>${f}</span>
              </li>`).join('')}
              ${c.pricing.plans[0].excludedFeatures.map(f => `
              <li class="flex items-center space-x-2.5 text-white/30">
                <i data-lucide="x" class="w-4 h-4 text-white/20"></i>
                <span>${f}</span>
              </li>`).join('')}
            </ul>
          </div>
          <a href="${c.meta.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="w-full text-center bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 rounded-2xl transition-all text-sm border border-white/20">
            ${c.pricing.plans[0].cta}
          </a>
        </div>

        <!-- Featured Annual Plan -->
        <div class="relative bg-gradient-to-b from-[#2C2420] to-[#1C1A18] rounded-3xl p-8 flex flex-col justify-between border-2 border-autumn-gold glow-gold space-y-6 transform lg:-translate-y-4">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-autumn-gold to-amber-500 text-maple-900 text-xs font-black px-4 py-1 rounded-full shadow-md uppercase tracking-wider">
            ${c.pricing.plans[1].featuredTag}
          </div>
          <div class="space-y-4 pt-2">
            <div class="inline-block bg-autumn-gold/20 text-autumn-gold text-xs font-bold px-3 py-1 rounded-full border border-autumn-gold/30">
              ${c.pricing.plans[1].badge}
            </div>
            <h4 class="text-2xl font-bold text-white">${c.pricing.plans[1].name}</h4>
            <p class="text-white/70 text-xs leading-relaxed">${c.pricing.plans[1].description}</p>
            <div class="pt-2 flex items-baseline space-x-2">
              <span class="text-4xl font-black text-autumn-gold">${c.pricing.plans[1].price}</span>
              <span class="text-white/60 text-xs">${c.pricing.plans[1].period}</span>
            </div>
            <div class="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
              ${c.pricing.plans[1].discountTip}
            </div>
            <ul class="space-y-3 pt-4 border-t border-white/10 text-xs text-white/90">
              ${c.pricing.plans[1].features.map(f => `
              <li class="flex items-center space-x-2.5">
                <i data-lucide="check-circle-2" class="w-4 h-4 text-autumn-gold"></i>
                <span class="font-bold text-white">${f}</span>
              </li>`).join('')}
            </ul>
          </div>
          <a href="${c.meta.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="w-full text-center bg-gradient-to-r from-autumn-gold via-amber-400 to-autumn-gold text-maple-900 font-extrabold py-4 rounded-2xl shadow-lg shadow-autumn-gold/20 transition-all hover:scale-[1.02] text-sm">
            ${c.pricing.plans[1].cta}
          </a>
        </div>

        <!-- Monthly & 6-Month Plan -->
        <div class="glass-card-dark rounded-3xl p-8 flex flex-col justify-between border border-white/10 space-y-6">
          <div class="space-y-4">
            <div class="inline-block bg-white/10 text-white/90 text-xs font-bold px-3 py-1 rounded-full">${c.pricing.plans[2].badge}</div>
            <h4 class="text-2xl font-bold text-white">${c.pricing.plans[2].name}</h4>
            <p class="text-white/60 text-xs leading-relaxed">${c.pricing.plans[2].description}</p>
            <div class="space-y-3 pt-2">
              ${c.pricing.plans[2].subPlans.map(sp => `
              <div class="bg-white/5 p-3 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <div class="text-xs text-white/70 font-semibold">${sp.name}</div>
                  <div class="text-[11px] ${sp.sub.includes('省') ? 'text-emerald-400' : 'text-white/40'}">${sp.sub}</div>
                </div>
                <div class="text-right">
                  <span class="text-xl font-bold text-white">${sp.price}</span>
                  <span class="text-[10px] text-white/50">${sp.unit}</span>
                </div>
              </div>`).join('')}
            </div>
            <ul class="space-y-3 pt-4 border-t border-white/10 text-xs text-white/80">
              ${c.pricing.plans[2].features.map(f => `
              <li class="flex items-center space-x-2.5">
                <i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>
                <span>${f}</span>
              </li>`).join('')}
            </ul>
          </div>
          <a href="${c.meta.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="w-full text-center bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 rounded-2xl transition-all text-sm border border-white/20">
            ${c.pricing.plans[2].cta}
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. FAQ -->
  <section id="faq" class="py-20 bg-autumn-cream relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center space-y-4 mb-16">
        <h2 class="text-xs sm:text-sm font-bold tracking-widest text-maple-500 uppercase">${c.faq.subtitle}</h2>
        <h3 class="text-2xl sm:text-4xl font-extrabold text-maple-900">${c.faq.title}</h3>
        <p class="text-maple-700 text-sm sm:text-base">${c.faq.description}</p>
      </div>

      <div class="space-y-6">
        ${c.faq.questions.map((item, idx) => `
        <div class="bg-white rounded-2xl p-6 sm:p-8 border border-maple-200/80 shadow-sm space-y-3">
          <h4 class="text-lg font-bold text-maple-900 flex items-start space-x-3">
            <span class="text-maple-500 font-extrabold">Q${idx + 1}.</span>
            <span>${item.q}</span>
          </h4>
          <div class="text-sm text-maple-800 leading-relaxed pl-7 space-y-2">
            <p class="font-semibold text-maple-900">${item.answerDirect}</p>
            <p>${item.answerDetail}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- 8. PRIVACY SUMMARY -->
  <section id="privacy" class="py-16 bg-white border-t border-maple-200/80">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <h3 class="text-2xl font-bold text-maple-900">${c.privacySummary.title}</h3>
        <p class="text-xs sm:text-sm text-maple-700">${c.privacySummary.description}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-maple-800">
        ${c.privacySummary.cards.map((card, idx) => `
        <div class="p-5 rounded-2xl bg-autumn-cream border border-maple-200/70 space-y-2">
          <div class="font-bold text-maple-900 text-sm flex items-center space-x-2">
            <i data-lucide="${idx === 0 ? 'database' : idx === 1 ? 'lock' : 'user-x'}" class="w-4 h-4 ${idx === 0 ? 'text-maple-500' : idx === 1 ? 'text-emerald-600' : 'text-red-600'}"></i>
            <span>${card.title}</span>
          </div>
          <p class="text-maple-700 leading-relaxed">${card.content}</p>
        </div>`).join('')}
      </div>

      <div class="mt-8 pt-6 border-t border-maple-100 flex flex-wrap justify-center gap-6 text-xs text-maple-600">
        <a href="privacy.html" class="hover:text-maple-900 font-semibold underline">完整隱私權政策全文 (Privacy Policy) &rarr;</a>
        <a href="terms.html" class="hover:text-maple-900 font-semibold underline">使用者服務條款 (Terms of Service) &rarr;</a>
      </div>
    </div>
  </section>

  <!-- 9. CTA SECTION -->
  <section class="py-20 bg-gradient-to-br from-maple-600 via-maple-700 to-maple-900 text-white relative overflow-hidden">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
      <div class="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-autumn-gold shadow-xl">
        <i data-lucide="sparkles" class="w-8 h-8"></i>
      </div>
      <div class="space-y-4 max-w-2xl mx-auto">
        <h2 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight whitespace-pre-line">
          ${c.ctaSection.title}
        </h2>
        <p class="text-white/80 text-sm sm:text-base leading-relaxed">${c.ctaSection.description}</p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <a href="${c.meta.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-white text-maple-900 hover:bg-autumn-gold font-extrabold px-9 py-4 rounded-2xl shadow-2xl shadow-black/30 transition-all hover:scale-105 text-base">
          <i data-lucide="download" class="w-5 h-5"></i>
          <span>${c.ctaSection.buttonText}</span>
        </a>
      </div>

      <div class="text-xs text-white/50 pt-4">${c.ctaSection.note}</div>
    </div>
  </section>

  <!-- 10. FOOTER -->
  <footer class="bg-autumn-dark text-white/60 text-xs py-12 border-t border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-lg bg-maple-500 flex items-center justify-center text-white">
            <i data-lucide="leaf" class="w-4 h-4 text-autumn-gold fill-autumn-gold/30"></i>
          </div>
          <div>
            <div class="text-white font-bold text-sm">Flashleaf</div>
            <div class="text-[10px] text-white/40">AI 課堂筆記與記憶閃卡</div>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-6 text-xs text-white/70">
          <a href="#features" class="hover:text-white transition-colors">核心功能</a>
          <a href="#fsrs" class="hover:text-white transition-colors">FSRS 演算法</a>
          <a href="#pricing" class="hover:text-white transition-colors">方案與定價</a>
          <a href="#faq" class="hover:text-white transition-colors">常見問題</a>
          <a href="privacy.html" class="hover:text-white transition-colors">隱私權政策</a>
          <a href="terms.html" class="hover:text-white transition-colors">服務條款</a>
        </div>
      </div>

      <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-white/40">
        <div>${c.footer.copyright}</div>
        <div class="flex items-center space-x-4">
          <span>客服信箱：<a href="mailto:${c.footer.supportEmail}" class="text-white/60 hover:text-white underline">${c.footer.supportEmail}</a></span>
        </div>
      </div>
    </div>
  </footer>

  <script>
    lucide.createIcons();
  </script>
</body>
</html>
`;

// 寫入 index.html
fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('✅ Successfully generated AEO/GEO-optimized index.html from content.json!');
