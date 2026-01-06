"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Language = "ar" | "en";

// Books for the gallery (excluding the featured hero book)
const galleryBooks = {
  ar: [
    {
      id: 2,
      title: "شجون ليبية",
      cover: "/shojoon-cover.png",
      link: "/book2",
    },
    {
      id: 3,
      title: "الإبل في الشعر الشعبي",
      cover: "/camel cover.jpeg",
      link: "#",
    },
    {
      id: 4,
      title: "الهمالي شعيب العضيري",
      cover: "/book 4.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "حالة إنسانية",
      cover: "/book 3.jpeg",
      link: "#",
    },
  ],
  en: [
    {
      id: 2,
      title: "Libyan Sorrows",
      cover: "/shojoon-cover.png",
      link: "/book2",
    },
    {
      id: 3,
      title: "Camels in Folk Poetry",
      cover: "/camel cover.jpeg",
      link: "#",
    },
    {
      id: 4,
      title: "Al-Himali Shuaib Al-Udhairi",
      cover: "/book 4.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "A Human Condition",
      cover: "/book 3.jpeg",
      link: "#",
    },
  ],
};

const content = {
  ar: {
    nav: {
      about: "عن الكاتب",
      books: "الكتب",
      articles: "المقالات",
      media: "الإعلام",
      contact: "تواصل",
    },
    hero: {
      name: "د. يونس عمر فنوش",
      subtitle: "كاتب ومفكر ليبي",
    },
    booksSection: {
      title: "كتب الدكتور يونس",
      readBook: "اقرأ الكتاب",
    },
    book: {
      title: "من أجل القضية الوطنية",
      subtitle: "مقالات ومقاربات",
      description: "مجموعة مقالات نُشرت بأسماء مستعارة في الفترة من 2007م إلى 2008م، تُعبّر عن النضال من أجل الكرامة الوطنية والمشاركة الديمقراطية. وُلدت هذه المقالات من حب عميق للوطن وإصرار على قول الحقيقة للسلطة، حتى تحت خطر شخصي كبير. تتناول الكتابات قضايا الهوية الوطنية والإصلاح الدستوري والمصالحة المجتمعية.",
      readBook: "اقرأ الكتاب",
    },
    quote: {
      text: "وُلدت مقالاتي من حب عميق للوطن وإصرار على قول الحقيقة للسلطة، حتى تحت خطر شخصي كبير.",
      source: "— من مقدمة الكتاب",
    },
    about: {
      sectionLabel: "تعرّف على الكاتب",
      title: "د. يونس عمر فنوش",
      subtitle: "أكاديمي • كاتب • مفكر سياسي",
      bio: "وُلد عام 1944، وقضى حياته مدافعاً عن الكرامة الوطنية والديمقراطية. أستاذ في اللغة العربية وآدابها، ومؤسس مشارك في التكتل المدني الديمقراطي. قلمه كان ولا يزال صوتاً للحقيقة في وجه الطغيان.",
      highlights: [
        "أستاذ جامعي في اللغة العربية وآدابها",
        "مؤسس مشارك في التكتل المدني الديمقراطي",
        "كاتب ومحلل سياسي",
        "باحث في التراث الليبي والشعر الشعبي",
      ],
      learnMore: "اقرأ السيرة الكاملة",
    },
    articles: {
      title: "آخر مقالات الكاتب",
      viewAll: "جميع المقالات",
      items: [
        { title: "هل نجد في تقنية الإتصالات الحل؟", url: "https://www.eanlibya.com/%d8%af-%d9%8a%d9%88%d9%86%d8%b3-%d9%81%d9%86%d9%88%d8%b4-%d9%87%d9%84-%d9%86%d8%ac%d8%af-%d9%81%d9%8a-%d8%aa%d9%82%d9%86%d9%8a%d8%a9-%d8%a7%d9%84%d8%a7%d8%aa%d8%b5%d8%a7%d9%84%d8%a7%d8%aa-%d8%a7/" },
        { title: "مقترح لجنة فبراير كل لا يتجزأ..", url: "https://www.eanlibya.com/%d9%85%d9%82%d8%aa%d8%b1%d8%ad-%d9%84%d8%ac%d9%86%d8%a9-%d9%81%d8%a8%d8%b1%d8%a7%d9%8a%d8%b1-%d9%83%d9%84-%d9%84%d8%a7-%d9%8a%d8%aa%d8%ac%d8%b2%d8%a3/" },
        { title: "اللعبة التي نسفت مقترح لجنة فبراير", url: "https://www.eanlibya.com/%d8%a7%d9%84%d9%84%d8%b9%d8%a8%d8%a9-%d8%a7%d9%84%d8%aa%d9%8a-%d9%86%d8%b3%d9%81%d8%aa-%d9%85%d9%82%d8%aa%d8%b1%d8%ad-%d9%84%d8%ac%d9%86%d8%a9-%d9%81%d8%a8%d8%b1%d8%a7%d9%8a%d8%b1/" },
        { title: "الثورة المختطفة والحاجة إلى تفجيرها من جديد", url: "https://www.eanlibya.com/%d8%a7%d9%84%d8%ab%d9%88%d8%b1%d8%a9-%d8%a7%d9%84%d9%85%d8%ae%d8%aa%d8%b7%d9%81%d8%a9-%d9%88%d8%a7%d9%84%d8%ad%d8%a7%d8%ac%d8%a9-%d8%a5%d9%84%d9%89-%d8%aa%d9%81%d8%ac%d9%8a%d8%b1%d9%87%d8%a7-%d9%85/" },
        { title: "انتخابات رئيس الدولة… هواجس غير مبررة", url: "https://www.eanlibya.com/%d8%a7%d9%86%d8%aa%d8%ae%d8%a7%d8%a8%d8%a7%d8%aa-%d8%b1%d8%a6%d9%8a%d8%b3-%d8%a7%d9%84%d8%af%d9%88%d9%84%d8%a9-%d9%87%d9%88%d8%a7%d8%ac%d8%b3-%d8%ba%d9%8a%d8%b1-%d9%85%d8%a8%d8%b1%d8%b1%d8%a9/" },
        { title: "أزمة حكومة… أم أزمة حكم؟", url: "https://www.eanlibya.com/%d8%a3%d8%b2%d9%85%d8%a9-%d8%ad%d9%83%d9%88%d9%85%d8%a9-%d8%a3%d9%85-%d8%a3%d8%b2%d9%85%d8%a9-%d8%ad%d9%83%d9%85%d8%9f/" },
      ],
    },
    media: {
      title: "في الإعلام",
      subtitle: "حوارات ومقابلات",
    },
    contact: {
      title: "تواصل معنا",
      description: "للاستفسارات الإعلامية أو الأكاديمية أو الأسئلة العامة",
      contactBtn: "تواصل",
      mediaKit: "الملف الإعلامي",
      email: "yfannush2@gmail.com",
      phone: "+218 946173324",
    },
    footer: {
      copyright: "جميع الحقوق محفوظة",
    },
  },
  en: {
    nav: {
      about: "About",
      books: "Books",
      articles: "Articles",
      media: "Media",
      contact: "Contact",
    },
    hero: {
      name: "Dr. Yunis Omar Fanous",
      subtitle: "Libyan Writer & Intellectual",
    },
    booksSection: {
      title: "Books by Dr. Yunis",
      readBook: "Read Book",
    },
    book: {
      title: "For the National Cause",
      subtitle: "Essays & Reflections",
      description: "A collection of articles published under pseudonyms between 2007-2008, expressing the struggle for national dignity and democratic participation. These articles were born from a deep love for the homeland and a determination to speak truth to power, even at great personal risk. The writings address issues of national identity, constitutional reform, and societal reconciliation.",
      readBook: "Read Book",
    },
    quote: {
      text: "My articles were born from a deep love for the homeland and a determination to speak truth to power, even at great personal risk.",
      source: "— From the Book Preface",
    },
    about: {
      sectionLabel: "Meet the Author",
      title: "Dr. Yunis Omar Fanous",
      subtitle: "Academic • Writer • Political Thinker",
      bio: "Born in 1944, he dedicated his life to defending national dignity and democracy. A professor of Arabic language and literature, and co-founder of the Civil Democratic Alliance. His pen has been and remains a voice of truth against tyranny.",
      highlights: [
        "University Professor of Arabic Language & Literature",
        "Co-founder of the Civil Democratic Alliance",
        "Writer & Political Analyst",
        "Researcher in Libyan Heritage & Folk Poetry",
      ],
      learnMore: "Read Full Biography",
    },
    articles: {
      title: "Latest Articles",
      viewAll: "View All",
      items: [
        { title: "Can Communication Technology Be the Solution?", url: "#" },
        { title: "The February Committee Proposal: An Indivisible Whole", url: "#" },
        { title: "The Game That Destroyed the February Committee Proposal", url: "#" },
        { title: "The Hijacked Revolution: The Need to Reignite It", url: "#" },
        { title: "Presidential Elections: Unjustified Concerns", url: "#" },
        { title: "A Crisis of Government or a Crisis of Governance?", url: "#" },
      ],
    },
    media: {
      title: "In the Media",
      subtitle: "Interviews & Appearances",
    },
    contact: {
      title: "Get in Touch",
      description: "For media inquiries, academic references, or general questions",
      contactBtn: "Contact",
      mediaKit: "Media Kit",
      email: "yfannush2@gmail.com",
      phone: "+218 946173324",
    },
    footer: {
      copyright: "All Rights Reserved",
    },
  },
};

export default function Home() {
  const [lang, setLang] = useState<Language>("ar");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const t = content[lang];
  const books = galleryBooks[lang];
  const isRTL = lang === "ar";

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = 300;
      const actualDirection = isRTL ? (direction === "left" ? "right" : "left") : direction;
      galleryRef.current.scrollBy({
        left: actualDirection === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`min-h-screen bg-[#F6F2EA] ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Navigation */}
      <nav className="bg-[#F6F2EA] border-b border-[#DDD8CE] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center gap-1 bg-[#EDE8DE] rounded-full px-1">
              <button onClick={() => setLang("ar")} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${lang === "ar" ? "bg-[#2F4F3E] text-[#F6F2EA]" : "text-[#1E1E1E]/70"}`}>عربي</button>
              <button onClick={() => setLang("en")} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${lang === "en" ? "bg-[#2F4F3E] text-[#F6F2EA]" : "text-[#1E1E1E]/70"}`}>EN</button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors" aria-label="Toggle menu">
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 border-t border-[#DDD8CE] pt-4">
              <ul className="flex flex-col gap-4 text-base font-medium">
                <li><Link href="#about" className="block text-[#1E1E1E] hover:text-[#2F4F3E]" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</Link></li>
                <li><Link href="#books" className="block text-[#1E1E1E] hover:text-[#2F4F3E]" onClick={() => setMobileMenuOpen(false)}>{t.nav.books}</Link></li>
                <li><Link href="#articles" className="block text-[#1E1E1E] hover:text-[#2F4F3E]" onClick={() => setMobileMenuOpen(false)}>{t.nav.articles}</Link></li>
                <li><Link href="#media" className="block text-[#1E1E1E] hover:text-[#2F4F3E]" onClick={() => setMobileMenuOpen(false)}>{t.nav.media}</Link></li>
                <li><Link href="#contact" className="block text-[#1E1E1E] hover:text-[#2F4F3E]" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</Link></li>
              </ul>
            </div>
          )}

          {/* Desktop Nav */}
          <ul className="hidden md:flex justify-center gap-8 text-sm font-medium tracking-wide">
            <li><Link href="#about" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">{t.nav.about}</Link></li>
            <li><Link href="#books" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">{t.nav.books}</Link></li>
            <li><Link href="#articles" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">{t.nav.articles}</Link></li>
            <li><Link href="#media" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">{t.nav.media}</Link></li>
            <li><Link href="#contact" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">{t.nav.contact}</Link></li>
            <li className="flex items-center gap-1 bg-[#EDE8DE] rounded-full px-1">
              <button onClick={() => setLang("ar")} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${lang === "ar" ? "bg-[#2F4F3E] text-[#F6F2EA]" : "text-[#1E1E1E]/70 hover:text-[#1E1E1E]"}`}>عربي</button>
              <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${lang === "en" ? "bg-[#2F4F3E] text-[#F6F2EA]" : "text-[#1E1E1E]/70 hover:text-[#1E1E1E]"}`}>EN</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero - Author Name */}
      <section className="relative pt-12 pb-8 md:pt-20 md:pb-12 bg-[#F6F2EA]">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-center">
            <span className="block text-[10vw] md:text-[7vw] lg:text-[6vw] font-black text-[#1E1E1E] leading-[1] tracking-tight">
              {isRTL ? "د. يونس عمر فنوش" : "DR. YUNIS OMAR FANOUS"}
            </span>
          </h1>
          <p className="text-center text-[#5A5A5A] text-lg mt-4 tracking-wide">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-16 md:py-24 bg-[#EDE8DE]">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <h2 className="text-3xl md:text-4xl font-serif text-[#1E1E1E] text-center mb-16 md:mb-20">
            {t.booksSection.title}
          </h2>

          {/* Featured Book - Cover Left, Content Right */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-20">
            {/* Book Cover */}
            <div className="flex justify-center">
              <Link href="/book" className="group relative">
                <div className="relative w-[280px] md:w-[320px] aspect-[3/4] rounded shadow-2xl overflow-hidden group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:-translate-y-1">
                  <Image src="/cover.png" alt="من أجل القضية الوطنية" fill className="object-cover" sizes="320px" priority />
                </div>
              </Link>
            </div>

            {/* Book Content */}
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1E1E1E] leading-tight">
                {t.book.title}
              </h3>
              <p className="text-lg md:text-xl text-[#2F4F3E] font-medium">
                {t.book.subtitle}
              </p>
              <p className="text-base md:text-lg text-[#1E1E1E]/75 leading-relaxed">
                {t.book.description}
              </p>
              <Link href="/book" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1E1E1E] text-[#1E1E1E] font-medium rounded-full hover:bg-[#1E1E1E] hover:text-[#F6F2EA] transition-all duration-200">
                {t.book.readBook}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </Link>
            </div>
          </div>

          {/* Books Gallery - Floating Row (excludes hero book) */}
          <div className="flex justify-center gap-4 md:gap-6 overflow-x-auto pb-4 px-4 -mx-4">
            {books.map((book) => (
              <Link key={book.id} href={book.link} className="group flex-shrink-0">
                <div className="relative w-[120px] md:w-[140px] aspect-[3/4] rounded shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <Image src={book.cover} alt={book.title} fill className="object-cover" sizes="140px" />
                </div>
                <p className="text-center text-xs mt-2 text-[#1E1E1E]/60 max-w-[120px] md:max-w-[140px] truncate">{book.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Author Bio Section */}
      <section id="about" className="bg-[#F6F2EA] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Label */}
          <p className="text-center text-[#8A6F3B] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            {t.about.sectionLabel}
          </p>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo Side */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#2F4F3E]/10 to-transparent rounded-2xl -z-10"></div>
                <div className="relative w-[300px] md:w-[340px] aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
                  <Image src="/dryunis.jpeg" alt="د. يونس عمر فنوش" fill className="object-cover" sizes="340px" priority />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1E1E] mb-2">
                  {t.about.title}
                </h2>
                <p className="text-lg text-[#2F4F3E] font-medium">
                  {t.about.subtitle}
                </p>
              </div>

              <p className="text-lg text-[#1E1E1E]/80 leading-relaxed">
                {t.about.bio}
              </p>

              {/* Highlights */}
              <ul className="space-y-3">
                {t.about.highlights.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-[#1E1E1E]/75">
                    <span className="w-2 h-2 rounded-full bg-[#2F4F3E]"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Prominent CTA Button */}
              <Link 
                href="/about" 
                className="inline-flex items-center gap-3 mt-4 px-8 py-4 bg-[#2F4F3E] text-[#F6F2EA] font-semibold rounded-lg hover:bg-[#243D30] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {t.about.learnMore}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="bg-[#EDE8DE] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E]">{t.articles.title}</h2>
            <div className="flex gap-2">
              <button onClick={() => scrollGallery("left")} className="w-12 h-12 rounded-full border-2 border-[#2F4F3E]/30 flex items-center justify-center text-[#2F4F3E] hover:bg-[#2F4F3E] hover:text-[#F6F2EA] transition-colors" aria-label="Scroll left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} /></svg>
              </button>
              <button onClick={() => scrollGallery("right")} className="w-12 h-12 rounded-full border-2 border-[#2F4F3E]/30 flex items-center justify-center text-[#2F4F3E] hover:bg-[#2F4F3E] hover:text-[#F6F2EA] transition-colors" aria-label="Scroll right">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} /></svg>
              </button>
            </div>
          </div>

          <div ref={galleryRef} className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {t.articles.items.map((article, index) => (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="group flex-shrink-0 w-[280px] md:w-[320px] snap-start">
                <div className="bg-[#FDFCFA] rounded-lg shadow-md p-6 h-full group-hover:shadow-xl transition-all group-hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-full bg-[#2F4F3E]/10 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#2F4F3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#1E1E1E] leading-snug mb-3 group-hover:text-[#2F4F3E] transition-colors">{article.title}</h3>
                  <span className="text-sm text-[#8A6F3B] font-medium flex items-center gap-1">
                    {isRTL ? "اقرأ المقال" : "Read Article"}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} /></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="https://www.eanlibya.com/author/younis-fanoush" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 border-2 border-[#2F4F3E] text-[#2F4F3E] font-semibold rounded hover:bg-[#2F4F3E] hover:text-[#F6F2EA] transition-colors">{t.articles.viewAll}</a>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section id="media" className="bg-[#F6F2EA] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-2">{t.media.title}</h2>
            <p className="text-[#5A5A5A]">{t.media.subtitle}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ONPQ8PWGF1c" title="د. يونس فنوش - حوار" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[#2F4F3E] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-[#F6F2EA] leading-relaxed italic mb-6">&ldquo;{t.quote.text}&rdquo;</blockquote>
          <p className="text-[#F6F2EA]/60 text-sm tracking-wide">{t.quote.source}</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#EDE8DE] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-6">{t.contact.title}</h2>
          <p className="text-lg text-[#1E1E1E]/80 mb-8">{t.contact.description}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <a href={`mailto:${t.contact.email}`} className="flex items-center gap-2 text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span className="font-medium">{t.contact.email}</span>
            </a>
            <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors" dir="ltr">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span className="font-medium">{t.contact.phone}</span>
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`mailto:${t.contact.email}`} className="px-8 py-4 bg-[#2F4F3E] text-[#F6F2EA] font-semibold rounded hover:bg-[#243D30] transition-colors">{t.contact.contactBtn}</Link>
            <Link href="#" className="px-8 py-4 border-2 border-[#2F4F3E] text-[#2F4F3E] font-semibold rounded hover:bg-[#2F4F3E] hover:text-[#F6F2EA] transition-colors">{t.contact.mediaKit}</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1E1E] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://www.youtube.com/watch?v=ONPQ8PWGF1c" target="_blank" rel="noopener noreferrer" className="text-[#F6F2EA]/50 hover:text-[#F6F2EA] transition-colors" aria-label="YouTube"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
            <a href="mailto:yfannush2@gmail.com" className="text-[#F6F2EA]/50 hover:text-[#F6F2EA] transition-colors" aria-label="Email"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></a>
          </div>
          <div className="text-center space-y-2 text-sm text-[#F6F2EA]/50">
            <p>© {new Date().getFullYear()} {isRTL ? "د. يونس عمر فنوش" : "Dr. Yunis Omar Fanous"}</p>
            <p className="text-xs">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
