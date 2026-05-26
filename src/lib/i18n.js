import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        archive: "Public Archive",
        dashboard: "Dashboard"
      },
      hero: {
        title: "THUNA | തുണ",
        subtitle: "Empowering Citizens through Transparent Digital Policing. Access public records, file reports, and track cases in real-time.",
        searchPlaceholder: "Search case files, public circulars, or nearby stations...",
        searchButton: "Search"
      },
      common: {
        viewAll: "View all",
        readMore: "Read More",
        downloadPdf: "Download PDF"
      }
    }
  },
  ml: {
    translation: {
      nav: {
        home: "പ്രധാന താൾ",
        archive: "പൊതു രേഖകൾ",
        dashboard: "ഡാഷ്‌ബോർഡ്"
      },
      hero: {
        title: "THUNA | തുണ",
        subtitle: "സുതാര്യമായ ഡിജിറ്റൽ പോലീസിംഗിലൂടെ പൗരന്മാരെ ശാക്തീകരിക്കുന്നു. പൊതു രേഖകൾ ആക്സസ് ചെയ്യുക, റിപ്പോർട്ടുകൾ ഫയൽ ചെയ്യുക, കേസുകൾ ട്രാക്ക് ചെയ്യുക.",
        searchPlaceholder: "കേസ് ഫയലുകളോ, സർക്കുലറുകളോ, അടുത്തുള്ള സ്റ്റേഷനുകളോ തിരയുക...",
        searchButton: "തിരയുക"
      },
      common: {
        viewAll: "എല്ലാം കാണുക",
        readMore: "കൂടുതൽ വായിക്കുക",
        downloadPdf: "PDF ഡൗൺലോഡ് ചെയ്യുക"
      }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use
    fallbackLng: "en", // use en if detected lng is not available
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
