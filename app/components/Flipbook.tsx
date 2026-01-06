"use client";

import { useRef, useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";

interface PageProps {
  number: number;
  content: React.ReactNode;
}

const Page = ({ number, content }: PageProps) => {
  return (
    <div className="page bg-white">
      <div className="page-content p-8 h-full flex flex-col justify-center items-center text-center">
        {content}
      </div>
      <div className="page-footer absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
        {number}
      </div>
    </div>
  );
};

interface FlipbookProps {
  pages: React.ReactNode[];
}

export const Flipbook = ({ pages }: FlipbookProps) => {
  const flipBook = useRef<any>(null);
  const [isBookOpen, setIsBookOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsBookOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <motion.div
        className="book-wrapper"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ 
          opacity: isBookOpen ? 1 : 0,
          scale: isBookOpen ? 1 : 0.8,
          y: isBookOpen ? 0 : 50
        }}
        transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      >
        <div className="book-container">
          <HTMLFlipBook
            ref={flipBook}
            width={600}
            height={800}
            minWidth={400}
            maxWidth={600}
            minHeight={600}
            maxHeight={800}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="flipbook"
            style={{}}
            startPage={0}
            size="fixed"
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={0}
            autoSize={false}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {pages.map((content, index) => (
              <Page key={index} number={index + 1} content={content} />
            ))}
          </HTMLFlipBook>
        </div>
      </motion.div>

      <motion.p
        className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: isBookOpen ? 1 : 0 }}
        transition={{ delay: 1 }}
      >
        Click on the page corners or drag to flip through the book
      </motion.p>
    </div>
  );
};
