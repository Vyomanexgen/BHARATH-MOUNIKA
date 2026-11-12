import React, { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages?: string;
              layout?: number;
              autoDisplay?: boolean;
            },
            elementId: string
          ): unknown;
          InlineLayout?: {
            SIMPLE: number;
          };
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

function getCurrentLang(): 'en' | 'te' {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (match && match[1]?.endsWith('/te')) {
    return 'te';
  }
  return 'en';
}

export const GoogleTranslateToggle: React.FC<{ compact?: boolean }> = ({
  compact = false,
}) => {
  const [lang, setLang] = useState<'en' | 'te'>(() => getCurrentLang());

  useEffect(() => {
    const initTranslate = () => {
      const container = document.getElementById('google_translate_element');
      if (!container || !window.google?.translate?.TranslateElement) return;
      if (container.childElementCount > 0) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,te',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    window.googleTranslateElementInit = initTranslate;

    if (window.google?.translate?.TranslateElement) {
      initTranslate();
    } else if (
      !document.querySelector(
        'script[src*="translate.google.com/translate_a/element.js"]'
      )
    ) {
      const script = document.createElement('script');
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const switchLanguage = (target: 'en' | 'te') => {
    setLang(target);
    const cookieVal = target === 'te' ? '/en/te' : '/en/en';
    document.cookie = `googtrans=${cookieVal}; path=/`;
    if (window.location.hostname) {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname}`;
    }

    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = target;
      select.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  const nextLang = lang === 'en' ? 'te' : 'en';

  return (
    <div className="inline-flex items-center">
      {/* Hidden official Google Translate widget mount */}
      <div
        id="google_translate_element"
        className="sr-only"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => switchLanguage(nextLang)}
        aria-label={
          lang === 'en'
            ? 'Translate website to Telugu'
            : 'Switch website back to English'
        }
        title={
          lang === 'en'
            ? 'Translate to Telugu (Google Translate)'
            : 'Switch to English'
        }
        className="notranslate inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#F7F0E5] hover:bg-[#E8D8C5]/75 border border-[#C5A15A]/55 text-[#762D3C] text-xs tracking-[0.12em] font-semibold cursor-pointer transition-colors shadow-xs"
      >
        <Languages className="w-3.5 h-3.5 text-[#A98950]" />
        {compact ? (
          <span>{lang === 'en' ? 'తెలుగు' : 'EN'}</span>
        ) : (
          <span>{lang === 'en' ? 'తెలుగు' : 'English'}</span>
        )}
      </button>
    </div>
  );
};

