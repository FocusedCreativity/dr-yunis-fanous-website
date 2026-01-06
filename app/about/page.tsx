"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Language = "ar" | "en";

const content = {
  ar: {
    nav: {
      home: "الرئيسية",
      books: "الكتب",
      articles: "المقالات",
      contact: "تواصل",
    },
    hero: {
      label: "عن الكاتب",
      welcome: "مرحباً.",
      tagline: "أكاديمي، كاتب، ومفكر ليبي قضى عقوداً في الدفاع عن الكرامة الوطنية والديمقراطية والذاكرة الجماعية.",
    },
    intro: {
      born: "مواليد 1944",
      role: "أستاذ اللغة العربية وآدابها",
      founder: "مؤسس مشارك في التكتل المدني الديمقراطي",
    },
    story: {
      title: "قصتي",
      paragraphs: [
        "في كل أمةٍ تمرّ بامتحانات المصير وتنهض من رماد القهر، يبرز رجال لا يطلبون تصفيقاً ولا يلهثون خلف الأضواء، بل يقفون بأقلامهم حرّاسًا للذاكرة، شهودًا للحق، وسفراءً لصوت الوطن حين يخفت.",
        "لم أكن مجرّد شاهد على تحوّلات ليبيا بين الملكية والطغيان والثورة، بل كنت من الذين وثّقوا بصدق، وقاوموا بصبر، ونصحوا بأمانة.",
        "كتبت لا لأنال إعجابًا، بل لأنقذ فكرة، أو أعيد تشكيل سؤال: ما هي ليبيا؟ من نكون حين تتقطع أوصال الحكاية؟",
      ],
    },
    quote: {
      text: "كان قلمي، داخل الوطن وتحت نير الاستبداد، يهمس بما يعجز الصراخ عن قوله، ويكتب بما لا تبلغه خطب المنابر.",
    },
    principles: {
      title: "مبادئي",
      items: [
        { title: "الشرعية الدستورية", desc: "أساس كل حكم رشيد" },
        { title: "وحدة الدولة", desc: "لا تفريط في التراب الوطني" },
        { title: "سيادة الشعب", desc: "الشعب مصدر السلطات" },
        { title: "استقلال القرار", desc: "قرارنا بأيدينا" },
      ],
    },
    questions: {
      title: "أسئلة لم أتردد في طرحها",
      items: [
        "هل يمكن للوطن أن يُبنى في ظلّ ذاكرة مقطوعة؟",
        "أين موقع الشعر الشعبي والتاريخ المحكي في مشروع الدولة؟",
        "ما السبيل إلى دولة تعترف بتعدّدها دون أن تنهار؟",
      ],
    },
    heritage: {
      title: "التراث والهوية",
      text: "في مقالاتي وأبحاثي، أعيد بناء المعنى عبر التراث الليبي الثقافي — من الشعر الشعبي إلى المرويات الشفوية — مؤكّدًا أن الهوية ركيزة السياسة، وأن الدولة بلا ذاكرة عمياء.",
    },
    closing: {
      text: "أن تقرأ كلماتي، هو أن تنهض من غفلة، أن تتأمّل، أن تسمع النبض الخافت لليبيا الحقيقية — تلك التي لا تظهر في الشاشات، بل تسكن السطور.",
      signature: "فلعل كلماتي تُضيء الطريق، حيث أطفأه الرصاص.",
    },
    tribute: {
      label: "كلمة تقدير",
      by: "بقلم السفير إبريك عبد القادر السويّسي",
    },
    cta: {
      books: "تصفح كتبي",
      articles: "اقرأ مقالاتي",
      home: "الرئيسية",
    },
  },
  en: {
    nav: {
      home: "Home",
      books: "Books",
      articles: "Articles",
      contact: "Contact",
    },
    hero: {
      label: "ABOUT THE AUTHOR",
      welcome: "Welcome.",
      tagline: "An academic, writer, and Libyan intellectual who spent decades defending national dignity, democracy, and collective memory.",
    },
    intro: {
      born: "Born 1944",
      role: "Professor of Arabic Language & Literature",
      founder: "Co-founder of the Civil Democratic Alliance",
    },
    story: {
      title: "My Story",
      paragraphs: [
        "In every nation that endures the trials of destiny and rises from the ashes of oppression, there emerge men who seek no applause nor chase the spotlight, but stand with their pens as guardians of memory, witnesses to truth, and ambassadors for the homeland's voice when it fades.",
        "I was not merely a witness to Libya's transformations between monarchy, tyranny, and revolution—I was among those who documented truthfully, resisted patiently, and counseled faithfully.",
        "I wrote not to earn admiration, but to save an idea, to reshape a question: What is Libya? Who are we when our story falls apart?",
      ],
    },
    quote: {
      text: "My pen, within the homeland under the yoke of despotism, whispered what screams could not convey, wrote what pulpit sermons could not reach.",
    },
    principles: {
      title: "My Principles",
      items: [
        { title: "Constitutional Legitimacy", desc: "Foundation of just governance" },
        { title: "State Unity", desc: "No compromise on national territory" },
        { title: "Popular Sovereignty", desc: "Power derives from the people" },
        { title: "Independent Decision", desc: "Our destiny in our hands" },
      ],
    },
    questions: {
      title: "Questions I Never Hesitated to Ask",
      items: [
        "Can a homeland be built upon a severed memory?",
        "Where is the place of folk poetry and oral history in statehood?",
        "What is the path to a state that acknowledges its plurality?",
      ],
    },
    heritage: {
      title: "Heritage & Identity",
      text: "In my articles and research, I rebuild meaning through Libyan cultural heritage—from folk poetry to oral narratives—affirming that identity is the foundation of politics, and that a state without memory is blind.",
    },
    closing: {
      text: "To read my words is to awaken from slumber, to contemplate, to hear the faint pulse of true Libya—the one that does not appear on screens, but dwells in lines.",
      signature: "May my words illuminate the path where bullets have extinguished the light.",
    },
    tribute: {
      label: "A Tribute",
      by: "Written by Ambassador Ebrik Abdulqader Al-Suwaisi",
    },
    cta: {
      books: "Browse My Books",
      articles: "Read My Articles",
      home: "Home",
    },
  },
};

export default function AboutPage() {
  const [lang, setLang] = useState<Language>("ar");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content[lang];
  const isRTL = lang === "ar";

  return (
    <div className={`min-h-screen bg-[#F6F2EA] ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur rounded-full px-1">
              <button onClick={() => setLang("ar")} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${lang === "ar" ? "bg-white text-[#1E1E1E]" : "text-white/80"}`}>عربي</button>
              <button onClick={() => setLang("en")} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${lang === "en" ? "bg-white text-[#1E1E1E]" : "text-white/80"}`}>EN</button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-white hover:text-white/80 transition-colors" aria-label="Toggle menu">
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 bg-[#1E1E1E]/95 backdrop-blur rounded-lg p-4">
              <ul className="flex flex-col gap-4 text-base font-medium">
                <li><Link href="/" className="block text-white hover:text-white/80" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</Link></li>
                <li><Link href="/#books" className="block text-white hover:text-white/80" onClick={() => setMobileMenuOpen(false)}>{t.nav.books}</Link></li>
                <li><Link href="/#articles" className="block text-white hover:text-white/80" onClick={() => setMobileMenuOpen(false)}>{t.nav.articles}</Link></li>
                <li><Link href="/#contact" className="block text-white hover:text-white/80" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</Link></li>
              </ul>
            </div>
          )}

          <ul className="hidden md:flex justify-center gap-8 text-sm font-medium tracking-wide">
            <li><Link href="/" className="text-white/90 hover:text-white transition-colors">{t.nav.home}</Link></li>
            <li><Link href="/#books" className="text-white/90 hover:text-white transition-colors">{t.nav.books}</Link></li>
            <li><Link href="/#articles" className="text-white/90 hover:text-white transition-colors">{t.nav.articles}</Link></li>
            <li><Link href="/#contact" className="text-white/90 hover:text-white transition-colors">{t.nav.contact}</Link></li>
            <li className="flex items-center gap-1 bg-white/10 backdrop-blur rounded-full px-1">
              <button onClick={() => setLang("ar")} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${lang === "ar" ? "bg-white text-[#1E1E1E]" : "text-white/80 hover:text-white"}`}>عربي</button>
              <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${lang === "en" ? "bg-white text-[#1E1E1E]" : "text-white/80 hover:text-white"}`}>EN</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero - Full Width Image */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] bg-[#1E1E1E] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/drysuit.jpeg"
            alt="د. يونس عمر فنوش"
            fill
            className="object-cover object-top opacity-90"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E1E1E]/60 via-transparent to-[#1E1E1E]/80" />
        </div>
      </section>

      {/* Welcome Section */}
      <section className="bg-[#F6F2EA] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-[#5A5A5A] uppercase mb-6">
            {t.hero.label}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#1E1E1E] mb-8">
            {t.hero.welcome}
          </h1>
          <p className="text-xl md:text-2xl text-[#1E1E1E]/80 leading-relaxed max-w-3xl mx-auto">
            {t.hero.tagline}
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-10">
            <a href="#" className="w-12 h-12 rounded-full bg-[#1E1E1E] flex items-center justify-center text-[#F6F2EA] hover:bg-[#2F4F3E] transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.youtube.com/watch?v=ONPQ8PWGF1c" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#1E1E1E] flex items-center justify-center text-[#F6F2EA] hover:bg-[#2F4F3E] transition-colors" aria-label="YouTube">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="mailto:yfannush2@gmail.com" className="w-12 h-12 rounded-full bg-[#1E1E1E] flex items-center justify-center text-[#F6F2EA] hover:bg-[#2F4F3E] transition-colors" aria-label="Email">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-[#2F4F3E] py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-center">
            <div className="text-[#F6F2EA]">
              <p className="text-sm opacity-70 mb-1">{isRTL ? "تاريخ الميلاد" : "Born"}</p>
              <p className="text-lg font-semibold">{t.intro.born}</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/20"></div>
            <div className="text-[#F6F2EA]">
              <p className="text-sm opacity-70 mb-1">{isRTL ? "المهنة" : "Profession"}</p>
              <p className="text-lg font-semibold">{t.intro.role}</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/20"></div>
            <div className="text-[#F6F2EA]">
              <p className="text-sm opacity-70 mb-1">{isRTL ? "النضال" : "Activism"}</p>
              <p className="text-lg font-semibold">{t.intro.founder}</p>
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="bg-[#F6F2EA] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1E1E1E] mb-10 text-center">
            {t.story.title}
          </h2>
          <div className="space-y-8">
            {t.story.paragraphs.map((paragraph, index) => (
              <p key={index} className={`text-lg md:text-xl text-[#1E1E1E]/85 leading-relaxed ${index === 0 ? "text-xl md:text-2xl font-medium text-[#1E1E1E]" : ""}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-[#1E1E1E] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <svg className="w-12 h-12 mx-auto mb-8 text-[#8A6F3B]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#F6F2EA] leading-relaxed italic">
            {t.quote.text}
          </blockquote>
        </div>
      </section>

      {/* Principles Grid */}
      <section className="bg-[#EDE8DE] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1E1E1E] mb-12 text-center">
            {t.principles.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.principles.items.map((item, index) => (
              <div key={index} className="bg-[#F6F2EA] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#2F4F3E] flex items-center justify-center text-[#F6F2EA] font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-[#1E1E1E] mb-2">{item.title}</h3>
                <p className="text-[#5A5A5A] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="bg-[#F6F2EA] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1E1E1E] mb-10 text-center">
            {t.questions.title}
          </h2>
          <div className="space-y-6">
            {t.questions.items.map((question, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-[#EDE8DE] rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8A6F3B] flex items-center justify-center text-white text-sm font-bold">?</span>
                <p className="text-lg md:text-xl text-[#1E1E1E]/90 leading-relaxed">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage & Identity */}
      <section className="bg-[#2F4F3E] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#F6F2EA] mb-8">
            {t.heritage.title}
          </h2>
          <p className="text-xl md:text-2xl text-[#F6F2EA]/90 leading-relaxed">
            {t.heritage.text}
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#F6F2EA] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-[#1E1E1E]/85 leading-relaxed mb-8">
            {t.closing.text}
          </p>
          <p className="text-2xl md:text-3xl font-serif font-bold text-[#2F4F3E] italic">
            {t.closing.signature}
          </p>
        </div>
      </section>

      {/* Tribute Credit */}
      <section className="bg-[#EDE8DE] py-8 border-t border-[#DDD8CE]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-[#8A6F3B] font-medium mb-1">{t.tribute.label}</p>
          <p className="text-[#5A5A5A]">{t.tribute.by}</p>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="bg-[#F6F2EA] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#books" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2F4F3E] text-[#F6F2EA] font-semibold rounded-lg hover:bg-[#243D30] transition-all shadow-lg hover:shadow-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              {t.cta.books}
            </Link>
            <Link href="/#articles" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#2F4F3E] text-[#2F4F3E] font-semibold rounded-lg hover:bg-[#2F4F3E] hover:text-[#F6F2EA] transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              {t.cta.articles}
            </Link>
            <Link href="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[#5A5A5A] font-semibold hover:text-[#1E1E1E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              {t.cta.home}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1E1E] py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#F6F2EA]/50 text-sm">
            © {new Date().getFullYear()} {isRTL ? "د. يونس عمر فنوش" : "Dr. Yunis Omar Fanous"}
          </p>
        </div>
      </footer>
    </div>
  );
}
