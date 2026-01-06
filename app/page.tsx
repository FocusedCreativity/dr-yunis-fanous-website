"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Language = "ar" | "en";

const books = {
  ar: [
    {
      id: 1,
      title: "من أجل القضية الوطنية",
      subtitle: "مقالات ومقاربات",
      description: "مجموعة مقالات نُشرت بأسماء مستعارة في الفترة من 2007م إلى 2008م، تُعبّر عن النضال من أجل الكرامة الوطنية والمشاركة الديمقراطية.",
      cover: "/cover.png",
      link: "/book",
      featured: true,
    },
    {
      id: 2,
      title: "شجون وطنية",
      subtitle: "تأملات وخواطر",
      description: "مجموعة من التأملات والخواطر الوطنية التي تعكس رؤية الكاتب لقضايا الوطن والهوية والمستقبل.",
      cover: "/شجون وطنية نهائي.pdf",
      link: "/book2",
      featured: false,
    },
  ],
  en: [
    {
      id: 1,
      title: "For the National Cause",
      subtitle: "Essays & Reflections",
      description: "A collection of articles published under pseudonyms between 2007-2008, expressing the struggle for national dignity and democratic participation.",
      cover: "/cover.png",
      link: "/book",
      featured: true,
    },
    {
      id: 2,
      title: "National Concerns",
      subtitle: "Reflections & Thoughts",
      description: "A collection of national reflections and thoughts that reflect the author's vision on issues of homeland, identity, and the future.",
      cover: "/شجون وطنية نهائي.pdf",
      link: "/book2",
      featured: false,
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
      title: "الكتب",
      readBook: "اقرأ الكتاب",
      viewAll: "جميع الكتب",
    },
    book: {
      title: "من أجل القضية الوطنية",
      subtitle: "مقالات ومقاربات",
      description: "مجموعة مقالات نُشرت بأسماء مستعارة في الفترة من 2007م إلى 2008م، تُعبّر عن النضال من أجل الكرامة الوطنية والمشاركة الديمقراطية.",
      learnMore: "اقرأ المزيد",
      readBook: "اقرأ الكتاب",
      orderLinks: {
        title: "احصل على الكتاب",
        publisher: "الناشر",
        amazon: "أمازون",
        libraries: "المكتبات",
        pdf: "نسخة إلكترونية",
      },
    },
    quote: {
      text: "وُلدت مقالاتي من حب عميق للوطن وإصرار على قول الحقيقة للسلطة، حتى تحت خطر شخصي كبير.",
      source: "— من مقدمة الكتاب",
    },
    about: {
      title: "عن الكاتب",
      bio: [
        "الدكتور يونس عمر فنوش (1944 – ) هو أكاديمي وكاتب ومفكر ليبي، تمتد مسيرته عبر الدراسات الثقافية والتعليق السياسي والمشاركة المدنية. يُعرف بمساهماته العميقة في فهم المجتمع الليبي واللغة والنضال من أجل الكرامة الوطنية والمشاركة الديمقراطية.",
        "شغل الدكتور فنوش منصب أستاذ في اللغة العربية وآدابها، ونُشر له على نطاق واسع في مواضيع تتعلق بالهوية الثقافية الليبية والخطاب العام والمصالحة الوطنية.",
        "هو عضو مؤسس في التكتل المدني الديمقراطي في ليبيا، وكان صوتاً عاماً في قضايا السياسة الوطنية، داعياً للمشاركة الديمقراطية والوضوح الدستوري وسيادة المؤسسات الليبية.",
      ],
      learnMore: "السيرة الكاملة",
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
      title: "Books",
      readBook: "Read Book",
      viewAll: "All Books",
    },
    book: {
      title: "For the National Cause",
      subtitle: "Essays & Reflections",
      description: "A collection of articles published under pseudonyms between 2007-2008, expressing the struggle for national dignity and democratic participation.",
      learnMore: "Learn More",
      readBook: "Read Book",
      orderLinks: {
        title: "Get the Book",
        publisher: "Publisher",
        amazon: "Amazon",
        libraries: "Libraries",
        pdf: "PDF Edition",
      },
    },
    quote: {
      text: "My articles were born from a deep love for the homeland and a determination to speak truth to power, even at great personal risk.",
      source: "— From the Book Preface",
    },
    about: {
      title: "About the Author",
      bio: [
        "Dr. Yunis Omar Fanous (1944 – ) is a Libyan academic, writer, and public intellectual whose career bridges cultural scholarship, political commentary, and civic engagement.",
        "Dr. Fanous served as a professor in Arabic language and literature and has been widely published on topics related to Libyan cultural identity and national reconciliation.",
        "A founding member of the Civil Democratic Party in Libya, he has been a public voice on national policy issues, advocating for democratic participation and constitutional clarity.",
      ],
      learnMore: "Full Biography",
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
  const currentBooks = books[lang];
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
            {/* Language Switcher - Mobile */}
            <div className="flex items-center gap-1 bg-[#EDE8DE] rounded-full px-1">
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  lang === "ar" 
                    ? "bg-[#2F4F3E] text-[#F6F2EA]" 
                    : "text-[#1E1E1E]/70"
                }`}
              >
                عربي
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  lang === "en" 
                    ? "bg-[#2F4F3E] text-[#F6F2EA]" 
                    : "text-[#1E1E1E]/70"
                }`}
              >
                EN
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 border-t border-[#DDD8CE] pt-4">
              <ul className="flex flex-col gap-4 text-base font-medium">
                <li>
                  <Link 
                    href="#about" 
                    className="block text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.about}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#books" 
                    className="block text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.books}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#articles" 
                    className="block text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.articles}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#media" 
                    className="block text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.media}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#contact" 
                    className="block text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Desktop Nav Links - Centered */}
          <ul className="hidden md:flex justify-center gap-8 text-sm font-medium tracking-wide">
            <li>
              <Link href="#about" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link href="#books" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">
                {t.nav.books}
              </Link>
            </li>
            <li>
              <Link href="#articles" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">
                {t.nav.articles}
              </Link>
            </li>
            <li>
              <Link href="#media" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">
                {t.nav.media}
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">
                {t.nav.contact}
              </Link>
            </li>
            {/* Language Switcher - Desktop */}
            <li className="flex items-center gap-1 bg-[#EDE8DE] rounded-full px-1">
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lang === "ar" 
                    ? "bg-[#2F4F3E] text-[#F6F2EA]" 
                    : "text-[#1E1E1E]/70 hover:text-[#1E1E1E]"
                }`}
              >
                عربي
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lang === "en" 
                    ? "bg-[#2F4F3E] text-[#F6F2EA]" 
                    : "text-[#1E1E1E]/70 hover:text-[#1E1E1E]"
                }`}
              >
                EN
              </button>
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

      {/* Books Gallery Section */}
      <section id="books" className="py-12 md:py-20 bg-[#EDE8DE]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            {t.booksSection.title}
          </h2>

          {/* Books Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {currentBooks.map((book) => (
              <Link
                key={book.id}
                href={book.link}
                className="group bg-[#FDFCFA] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Book Cover */}
                  <div className="relative w-full md:w-48 aspect-[3/4] md:aspect-auto md:h-auto flex-shrink-0 bg-[#EDE8DE]">
                    {book.cover.endsWith('.pdf') ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2F4F3E] to-[#1E3328]">
                        <div className="text-center p-4">
                          <svg className="w-12 h-12 text-[#F6F2EA] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <p className="text-[#F6F2EA] font-bold text-lg">{book.title}</p>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={book.cover}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 200px"
                      />
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-bold text-[#1E1E1E] mb-2 group-hover:text-[#2F4F3E] transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-[#8A6F3B] font-medium mb-3">{book.subtitle}</p>
                    <p className="text-[#1E1E1E]/70 text-sm leading-relaxed mb-4">
                      {book.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#2F4F3E] font-semibold text-sm">
                      {t.booksSection.readBook}
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Book Section */}
      <section className="py-12 md:py-20 bg-[#F6F2EA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Book Cover Side */}
            <div className="relative flex justify-center order-1">
              <Link href="/book" className="group relative w-full max-w-sm">
                {/* Real Book Cover Image */}
                <div className="aspect-[3/4] rounded shadow-2xl overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="/cover.png"
                    alt="من أجل القضية الوطنية - Book Cover"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-semibold flex items-center gap-2 bg-[#2F4F3E]/90 px-6 py-3 rounded shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {t.book.readBook}
                    </span>
                  </div>
                </div>
                {/* Shadow */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-[#1E1E1E]/15 blur-xl -z-10"></div>
              </Link>
            </div>

            {/* Book Info Side */}
            <div className="space-y-6 order-2">
              {/* Book Title */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] leading-tight mb-3">
                  {isRTL ? "من أجل القضية الوطنية" : "For the National Cause"}
                </h2>
                <h3 className="text-xl text-[#5A5A5A] font-light">
                  {t.book.subtitle}
                </h3>
              </div>

              {/* Description */}
              <p className="text-lg text-[#1E1E1E]/80 leading-relaxed">
                {t.book.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="/book" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#2F4F3E] text-[#F6F2EA] font-semibold rounded hover:bg-[#243D30] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {t.book.readBook}
                </Link>
              </div>

              {/* Order Links */}
              <div className="pt-6 border-t border-[#DDD8CE]">
                <h4 className="text-xs font-semibold text-[#8A6F3B] uppercase tracking-[0.15em] mb-4">
                  {t.book.orderLinks.title}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Link href="#" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors py-2 border-b border-[#DDD8CE]">
                    {t.book.orderLinks.publisher}
                  </Link>
                  <Link href="#" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors py-2 border-b border-[#DDD8CE]">
                    {t.book.orderLinks.amazon}
                  </Link>
                  <Link href="#" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors py-2 border-b border-[#DDD8CE]">
                    {t.book.orderLinks.libraries}
                  </Link>
                  <Link href="/book" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors py-2 border-b border-[#DDD8CE]">
                    {t.book.orderLinks.pdf}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Section with Photo */}
      <section id="about" className="bg-[#EDE8DE] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 overflow-hidden shadow-xl rounded">
                <Image
                  src="/dryunis.jpeg"
                  alt="د. يونس عمر فنوش - Dr. Yunis Omar Fanous"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-6">
                {t.about.title}
              </h2>
              {t.about.bio.map((paragraph, index) => (
                <p key={index} className="text-lg text-[#1E1E1E]/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <Link 
                href="/about" 
                className="inline-block text-[#2F4F3E] font-semibold hover:underline underline-offset-4 mt-4"
              >
                {t.about.learnMore} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="bg-[#F6F2EA] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E]">
              {t.articles.title}
            </h2>
            
            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button 
                onClick={() => scrollGallery("left")}
                className="w-12 h-12 rounded-full border-2 border-[#2F4F3E]/30 flex items-center justify-center text-[#2F4F3E] hover:bg-[#2F4F3E] hover:text-[#F6F2EA] transition-colors"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                </svg>
              </button>
              <button 
                onClick={() => scrollGallery("right")}
                className="w-12 h-12 rounded-full border-2 border-[#2F4F3E]/30 flex items-center justify-center text-[#2F4F3E] hover:bg-[#2F4F3E] hover:text-[#F6F2EA] transition-colors"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Gallery */}
          <div 
            ref={galleryRef}
            className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {t.articles.items.map((article, index) => (
              <a 
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 w-[280px] md:w-[320px] snap-start"
              >
                <div className="bg-[#FDFCFA] rounded-lg shadow-md p-6 h-full group-hover:shadow-xl transition-all group-hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-full bg-[#2F4F3E]/10 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#2F4F3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#1E1E1E] leading-snug mb-3 group-hover:text-[#2F4F3E] transition-colors">
                    {article.title}
                  </h3>
                  <span className="text-sm text-[#8A6F3B] font-medium flex items-center gap-1">
                    {isRTL ? "اقرأ المقال" : "Read Article"}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-10">
            <a 
              href="https://www.eanlibya.com/author/younis-fanoush"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border-2 border-[#2F4F3E] text-[#2F4F3E] font-semibold rounded hover:bg-[#2F4F3E] hover:text-[#F6F2EA] transition-colors"
            >
              {t.articles.viewAll}
            </a>
          </div>
        </div>
      </section>

      {/* Media/YouTube Section */}
      <section id="media" className="bg-[#EDE8DE] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-2">
              {t.media.title}
            </h2>
            <p className="text-[#5A5A5A]">{t.media.subtitle}</p>
          </div>

          {/* YouTube Video */}
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ONPQ8PWGF1c"
                title="د. يونس فنوش - حوار"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-[#2F4F3E] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-[#F6F2EA] leading-relaxed italic mb-6">
            &ldquo;{t.quote.text}&rdquo;
          </blockquote>
          <p className="text-[#F6F2EA]/60 text-sm tracking-wide">
            {t.quote.source}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#F6F2EA] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-6">
            {t.contact.title}
          </h2>
          <p className="text-lg text-[#1E1E1E]/80 mb-8">
            {t.contact.description}
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <a 
              href={`mailto:${t.contact.email}`}
              className="flex items-center gap-2 text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{t.contact.email}</span>
            </a>
            <a 
              href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors"
              dir="ltr"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">{t.contact.phone}</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`mailto:${t.contact.email}`}
              className="px-8 py-4 bg-[#2F4F3E] text-[#F6F2EA] font-semibold rounded hover:bg-[#243D30] transition-colors"
            >
              {t.contact.contactBtn}
            </Link>
            <Link 
              href="#" 
              className="px-8 py-4 border-2 border-[#2F4F3E] text-[#2F4F3E] font-semibold rounded hover:bg-[#2F4F3E] hover:text-[#F6F2EA] transition-colors"
            >
              {t.contact.mediaKit}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1E1E] py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-[#F6F2EA]/50 hover:text-[#F6F2EA] transition-colors" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-[#F6F2EA]/50 hover:text-[#F6F2EA] transition-colors" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/watch?v=ONPQ8PWGF1c" target="_blank" rel="noopener noreferrer" className="text-[#F6F2EA]/50 hover:text-[#F6F2EA] transition-colors" aria-label="YouTube">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2 text-sm text-[#F6F2EA]/50">
            <p>© {new Date().getFullYear()} {isRTL ? "د. يونس عمر فنوش" : "Dr. Yunis Omar Fanous"}</p>
            <p className="text-xs">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Hide scrollbar */}
      <style jsx global>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
