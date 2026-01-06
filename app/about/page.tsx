"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Language = "ar" | "en";

const content = {
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عن الكاتب",
      books: "الكتب",
      articles: "المقالات",
      contact: "تواصل",
    },
    title: "عن الدكتور يونس عمر فنوش",
    writtenBy: "بقلم: إبريك عبد القادر السويّسي",
    bio: [
      "في كل أمةٍ تمرّ بامتحانات المصير وتنهض من رماد القهر، يبرز رجال لا يطلبون تصفيقاً ولا يلهثون خلف الأضواء، بل يقفون بأقلامهم حرّاسًا للذاكرة، شهودًا للحق، وسفراءً لصوت الوطن حين يخفت. الدكتور يونس عمر فنوش هو أحد هؤلاء.",
      "وُلد عام 1944، ولم يكن مجرّد شاهد على تحوّلات ليبيا بين الملكية والطغيان والثورة، بل كان من الذين وثّقوا بصدق، وقاوموا بصبر، ونصحوا بأمانة. باحث في اللغة العربية وأدبها، لكنه ما لبث أن تجاوز حدود الاختصاص الأكاديمي، ليصبح لسان الضمير الوطني، وحافظ الوجدان الليبي في أحلك اللحظات.",
      "كتب لا لينال إعجابًا، بل لينقذ فكرة، أو يعيد تشكيل سؤال: ما هي ليبيا؟ من نكون حين تتقطع أوصال الحكاية؟",
      "كان قلمه، داخل الوطن وتحت نير الاستبداد، يهمس بما يعجز الصراخ عن قوله، ويكتب بما لا تبلغه خطب المنابر.",
      "أسّس مع رفاقٍ مخلصين التكتل المدني الديمقراطي، وظل ثابتًا على مبادئه: الشرعية الدستورية، وحدة الدولة، سيادة الشعب، واستقلال القرار الوطني. لم يُساوِم، ولم يهادن، بل آمن أن الإصلاح لا يُرجى من أنصاف الحلول ولا تُبنى الدولة على ركام العناوين المزيفة.",
    ],
    questions: {
      title: "لم يتردّد في طرح الأسئلة الصعبة:",
      items: [
        "هل يمكن للوطن أن يُبنى في ظلّ ذاكرة مقطوعة؟",
        "أين موقع الشعر الشعبي، والتاريخ المحكي، والحكمة المتوارثة في مشروع الدولة؟",
        "وما السبيل إلى دولة تعترف بتعدّدها دون أن تنهار تحت وطأته؟",
      ],
    },
    heritage: "في مقالاته، وأبحاثه، ومداخلاته، يُعيد فنوش بناء المعنى عبر التراث الليبي الثقافي، من الشعر الشعبي إلى المرويات الشفوية، مؤكّدًا أن الهوية ركيزة السياسة، وأن الدولة بلا ذاكرة عمياء.",
    conclusion: [
      "أن تقرأ لفنوش، هو أن تنهض من غفلة، أن تتأمّل، أن تتأدّب، أن تسمع النبض الخافت لليبيا الحقيقية، تلك التي لا تظهر في الشاشات، بل تسكن السطور، وتُروى بين السطور.",
      "هذا الموقع لا يُكرّمه فقط، بل يفتح كتابه لمن أراد الفهم، والتأمّل، والعودة إلى الوطن كما يجب أن يكون.",
      "فلعل كلماته تُضيء الطريق، حيث أطفأه الرصاص.",
    ],
    signature: "— إبريك السويّسي",
    backToHome: "العودة للرئيسية",
    viewBooks: "تصفح الكتب",
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      books: "Books",
      articles: "Articles",
      contact: "Contact",
    },
    title: "About Dr. Yunis Omar Fanous",
    writtenBy: "Written by: Ambassador Ebrik Abdulqader Al-Suwaisi",
    bio: [
      "In every nation that endures the trials of destiny and rises from the ashes of oppression, there emerge men who seek no applause nor chase the spotlight, but stand with their pens as guardians of memory, witnesses to truth, and ambassadors for the homeland's voice when it fades. Dr. Yunis Omar Fanous is one of these men.",
      "Born in 1944, he was not merely a witness to Libya's transformations between monarchy, tyranny, and revolution—he was among those who documented truthfully, resisted patiently, and counseled faithfully. A scholar of Arabic language and literature, he soon transcended the boundaries of academic specialization to become the voice of national conscience, the keeper of Libyan sentiment in its darkest moments.",
      "He wrote not to earn admiration, but to save an idea, to reshape a question: What is Libya? Who are we when our story falls apart?",
      "His pen, within the homeland under the yoke of despotism, whispered what screams could not convey, wrote what pulpit sermons could not reach.",
      "He founded, with loyal comrades, the Civil Democratic Alliance, and remained steadfast to his principles: constitutional legitimacy, state unity, popular sovereignty, and the independence of national decision-making. He did not compromise, did not appease, but believed that reform cannot be expected from half-measures, nor can a state be built on the rubble of false slogans.",
    ],
    questions: {
      title: "He never hesitated to ask the difficult questions:",
      items: [
        "Can a homeland be built upon a severed memory?",
        "Where is the place of folk poetry, oral history, and inherited wisdom in the project of statehood?",
        "And what is the path to a state that acknowledges its plurality without collapsing under its weight?",
      ],
    },
    heritage: "In his articles, research, and interventions, Fanous rebuilds meaning through Libyan cultural heritage—from folk poetry to oral narratives—affirming that identity is the foundation of politics, and that a state without memory is blind.",
    conclusion: [
      "To read Fanous is to awaken from slumber, to contemplate, to learn discipline, to hear the faint pulse of true Libya—the one that does not appear on screens, but dwells in lines, and is told between the lines.",
      "This website does not merely honor him; it opens his book to those who seek understanding, reflection, and a return to the homeland as it should be.",
      "May his words illuminate the path where bullets have extinguished the light.",
    ],
    signature: "— Ebrik Al-Suwaisi",
    backToHome: "Back to Home",
    viewBooks: "View Books",
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
      <nav className="bg-[#F6F2EA] border-b border-[#DDD8CE] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center gap-1 bg-[#EDE8DE] rounded-full px-1">
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  lang === "ar" ? "bg-[#2F4F3E] text-[#F6F2EA]" : "text-[#1E1E1E]/70"
                }`}
              >
                عربي
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  lang === "en" ? "bg-[#2F4F3E] text-[#F6F2EA]" : "text-[#1E1E1E]/70"
                }`}
              >
                EN
              </button>
            </div>
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
                <li><Link href="/" className="block text-[#1E1E1E] hover:text-[#2F4F3E]" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</Link></li>
                <li><Link href="/#books" className="block text-[#1E1E1E] hover:text-[#2F4F3E]" onClick={() => setMobileMenuOpen(false)}>{t.nav.books}</Link></li>
                <li><Link href="/#articles" className="block text-[#1E1E1E] hover:text-[#2F4F3E]" onClick={() => setMobileMenuOpen(false)}>{t.nav.articles}</Link></li>
                <li><Link href="/#contact" className="block text-[#1E1E1E] hover:text-[#2F4F3E]" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</Link></li>
              </ul>
            </div>
          )}

          {/* Desktop Nav */}
          <ul className="hidden md:flex justify-center gap-8 text-sm font-medium tracking-wide">
            <li><Link href="/" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">{t.nav.home}</Link></li>
            <li><Link href="/#books" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">{t.nav.books}</Link></li>
            <li><Link href="/#articles" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">{t.nav.articles}</Link></li>
            <li><Link href="/#contact" className="text-[#1E1E1E] hover:text-[#2F4F3E] transition-colors">{t.nav.contact}</Link></li>
            <li className="flex items-center gap-1 bg-[#EDE8DE] rounded-full px-1">
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lang === "ar" ? "bg-[#2F4F3E] text-[#F6F2EA]" : "text-[#1E1E1E]/70 hover:text-[#1E1E1E]"
                }`}
              >
                عربي
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lang === "en" ? "bg-[#2F4F3E] text-[#F6F2EA]" : "text-[#1E1E1E]/70 hover:text-[#1E1E1E]"
                }`}
              >
                EN
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-8 md:pt-16 md:pb-12 bg-[#EDE8DE]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1E1E1E] mb-4">
            {t.title}
          </h1>
          <p className="text-[#8A6F3B] font-medium">{t.writtenBy}</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Author Image */}
        <div className="mb-12 md:mb-16">
          <div className="relative w-full max-w-md mx-auto aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
            <Image
              src="/drysuit.jpeg"
              alt="د. يونس عمر فنوش - Dr. Yunis Omar Fanous"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>
        </div>

        {/* Bio Paragraphs */}
        <article className="prose prose-lg max-w-none">
          {t.bio.map((paragraph, index) => (
            <p
              key={index}
              className="text-xl md:text-2xl text-[#1E1E1E]/85 leading-relaxed mb-8 first:text-2xl first:md:text-3xl first:font-medium first:text-[#1E1E1E]"
            >
              {paragraph}
            </p>
          ))}

          {/* Questions Section */}
          <div className="my-12 p-8 bg-[#EDE8DE] rounded-lg border-r-4 border-[#2F4F3E]">
            <h2 className="text-xl font-bold text-[#2F4F3E] mb-6">{t.questions.title}</h2>
            <ul className="space-y-4">
              {t.questions.items.map((question, index) => (
                <li key={index} className="flex items-start gap-3 text-lg text-[#1E1E1E]/90">
                  <span className="text-[#8A6F3B] mt-1">●</span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Heritage */}
          <p className="text-xl md:text-2xl text-[#1E1E1E]/85 leading-relaxed mb-8 italic border-l-4 border-[#8A6F3B] pl-6">
            {t.heritage}
          </p>

          {/* Conclusion */}
          {t.conclusion.map((paragraph, index) => (
            <p
              key={index}
              className="text-xl md:text-2xl text-[#1E1E1E]/85 leading-relaxed mb-8"
            >
              {paragraph}
            </p>
          ))}

          {/* Signature */}
          <p className="text-right text-xl font-semibold text-[#2F4F3E] mt-12 pt-8 border-t border-[#DDD8CE]">
            {t.signature}
          </p>
        </article>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2F4F3E] text-[#F6F2EA] font-semibold rounded hover:bg-[#243D30] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t.backToHome}
          </Link>
          <Link
            href="/#books"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#2F4F3E] text-[#2F4F3E] font-semibold rounded hover:bg-[#2F4F3E] hover:text-[#F6F2EA] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {t.viewBooks}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E1E1E] py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#F6F2EA]/50 text-sm">
            © {new Date().getFullYear()} {isRTL ? "د. يونس عمر فنوش" : "Dr. Yunis Omar Fanous"}
          </p>
        </div>
      </footer>
    </div>
  );
}
