"use client";

import Link from "next/link";
import { useState, useEffect, useRef, forwardRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure PDF.js worker - use cdnjs which is more reliable
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

// Single PDF Page Component
interface PDFPageProps {
  pageNumber: number;
  width: number;
}

const PDFPage = forwardRef<HTMLDivElement, PDFPageProps>(({ pageNumber, width }, ref) => {
  return (
    <div ref={ref} className="demoPage">
      <Page
        pageNumber={pageNumber}
        width={width}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    </div>
  );
});
PDFPage.displayName = "PDFPage";


export default function Book2Page() {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(500);
  const [isMobile, setIsMobile] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const flipBookRef = useRef<any>(null);

  // Zoom controls (in percentage)
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 15, 150));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 15, 70));
  const resetZoom = () => setZoomLevel(100);

  // Calculate page dimensions based on screen size and zoom
  useEffect(() => {
    const updateDimensions = () => {
      const mobile = window.innerWidth < 768;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      setIsMobile(mobile);
      
      if (mobile) {
        // Mobile: Single page view - fill most of the screen width
        const availableHeight = windowHeight - 208;
        const widthFromHeight = availableHeight / 1.4;
        const widthFromScreen = windowWidth - 32;
        const baseWidth = Math.min(widthFromHeight, widthFromScreen);
        setPageWidth(Math.max(280, Math.min(baseWidth, 400)));
      } else {
        // Desktop: Make the book BIG - fill most of the screen
        const availableHeight = windowHeight - 220;
        const widthFromHeight = availableHeight / 1.4;
        const widthFromScreen = windowWidth * 0.45;
        const baseWidth = Math.min(widthFromHeight, widthFromScreen);
        const finalWidth = Math.max(400, Math.round(baseWidth * (zoomLevel / 100)));
        setPageWidth(finalWidth);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [zoomLevel]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    // Limit to first 30 pages for performance
    setNumPages(Math.min(numPages, 30));
    setIsLoading(false);
  };

  const handleFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const nextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") nextPage();
      if (e.key === "ArrowRight") prevPage();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-" || e.key === "_") zoomOut();
      if (e.key === "0") resetZoom();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const totalDisplayPages = numPages;
  const pageHeight = pageWidth * 1.4;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2F4F3E] to-[#1E3328] flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-[#2F4F3E]/95 backdrop-blur border-b border-[#F6F2EA]/20 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="text-[#F6F2EA]/80 hover:text-[#F6F2EA] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">العودة</span>
          </Link>
          <div className="h-6 w-px bg-[#F6F2EA]/20"></div>
          <div>
            <h1 className="text-[#F6F2EA] font-semibold text-sm sm:text-base">
              شجون ليبية
            </h1>
            <p className="text-[#F6F2EA]/50 text-xs hidden sm:block">د. يونس عمر فنوش</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="hidden md:flex items-center gap-1 bg-[#F6F2EA]/10 rounded-full px-2 py-1">
            <button
              onClick={zoomOut}
              disabled={zoomLevel <= 70}
              className="text-[#F6F2EA]/70 hover:text-[#F6F2EA] disabled:opacity-30 p-1.5 rounded-full hover:bg-[#F6F2EA]/10 transition-colors"
              aria-label="تصغير"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            <button
              onClick={resetZoom}
              className="text-[#F6F2EA]/70 hover:text-[#F6F2EA] text-xs font-medium px-2 py-1 rounded hover:bg-[#F6F2EA]/10 transition-colors min-w-[50px]"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={zoomIn}
              disabled={zoomLevel >= 150}
              className="text-[#F6F2EA]/70 hover:text-[#F6F2EA] disabled:opacity-30 p-1.5 rounded-full hover:bg-[#F6F2EA]/10 transition-colors"
              aria-label="تكبير"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
          </div>

          <a
            href="/شجون وطنية نهائي.pdf"
            download="شجون_ليبية.pdf"
            className="flex items-center gap-2 text-[#F6F2EA]/70 hover:text-[#F6F2EA] px-4 py-2 hover:bg-[#F6F2EA]/10 rounded transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden sm:inline">تحميل PDF</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-4 border-[#8A6F3B]/30 border-t-[#8A6F3B] rounded-full animate-spin"></div>
            <p className="text-[#F6F2EA]/80 text-lg">جاري تحميل الكتاب...</p>
          </div>
        )}

        {/* Document loader */}
        <Document
          file="/شجون وطنية نهائي.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={null}
          className="hidden"
        >
          <Page pageNumber={1} width={1} />
        </Document>

        {/* Flipbook */}
        {!isLoading && numPages > 0 && (
          <Document file="/شجون وطنية نهائي.pdf" loading={null}>
            <div className="flipbook-wrapper">
              {/* @ts-ignore */}
              <HTMLFlipBook
                ref={flipBookRef}
                width={pageWidth}
                height={pageHeight}
                size="fixed"
                minWidth={300}
                maxWidth={1200}
                minHeight={420}
                maxHeight={1680}
                drawShadow={true}
                flippingTime={600}
                usePortrait={isMobile}
                startZIndex={0}
                autoSize={false}
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
                onFlip={handleFlip}
                className="flipbook-main"
                style={{}}
                startPage={0}
              >
                {Array.from({ length: numPages }, (_, i) => (
                  <PDFPage key={i} pageNumber={i + 1} width={pageWidth} />
                ))}
              </HTMLFlipBook>
            </div>
          </Document>
        )}

        {/* Instructions */}
        {!isLoading && (
          <p className="mt-8 text-[#F6F2EA]/50 text-sm text-center max-w-lg">
            انقر على أطراف الصفحات أو اسحب للقلب • استخدم الأسهم للتنقل • اضغط + / - للتكبير والتصغير
          </p>
        )}
      </main>

      {/* Footer Navigation */}
      {!isLoading && (
        <footer className="bg-[#2F4F3E]/95 backdrop-blur border-t border-[#F6F2EA]/20 px-4 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-center gap-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-[#F6F2EA]/70 hover:text-[#F6F2EA] disabled:opacity-30 disabled:cursor-not-allowed p-3 hover:bg-[#F6F2EA]/10 rounded-full transition-colors"
              aria-label="الصفحة السابقة"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex items-center gap-2 text-[#F6F2EA]/70 bg-[#F6F2EA]/10 px-5 py-2 rounded-full">
              <span className="text-sm">صفحة</span>
              <span className="font-bold text-[#F6F2EA] text-lg">{currentPage + 1}</span>
              <span className="text-sm">من {totalDisplayPages}</span>
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage >= totalDisplayPages - 1}
              className="text-[#F6F2EA]/70 hover:text-[#F6F2EA] disabled:opacity-30 disabled:cursor-not-allowed p-3 hover:bg-[#F6F2EA]/10 rounded-full transition-colors"
              aria-label="الصفحة التالية"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Progress */}
          <div className="mt-4 max-w-md mx-auto">
            <div className="h-1 bg-[#F6F2EA]/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#8A6F3B] to-[#A88F5B] rounded-full transition-all duration-300"
                style={{ width: `${((currentPage + 1) / totalDisplayPages) * 100}%` }}
              />
            </div>
          </div>
        </footer>
      )}

      {/* Styles */}
      <style jsx global>{`
        .flipbook-wrapper {
          perspective: 2500px;
        }
        
        .flipbook-main {
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
        }
        
        .demoPage {
          background: #faf8f5;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .demoPage canvas {
          max-width: 100% !important;
          height: auto !important;
        }
        
        .stf__wrapper {
          margin: 0 auto;
        }
        
        .stf__parent {
          perspective: 2500px !important;
        }
        
        .stf__block {
          box-shadow: 
            0 0 20px rgba(0, 0, 0, 0.15),
            inset 0 0 40px rgba(0, 0, 0, 0.05);
        }
        
        .--left .stf__block,
        .--right .stf__block {
          transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        
        .stf__wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 6px;
          transform: translateX(-50%);
          background: linear-gradient(to right, 
            rgba(0,0,0,0.2), 
            rgba(0,0,0,0.1) 20%, 
            transparent 50%, 
            rgba(0,0,0,0.1) 80%, 
            rgba(0,0,0,0.2)
          );
          z-index: 100;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
