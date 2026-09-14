import React from 'react';

/**
 * A custom utility to split text into animateable lines and words,
 * serving as a free alternative to GSAP's premium SplitText plugin.
 */
export function SplitText({ text, className = '' }) {
  if (!text) return null;

  // Split by manual line breaks or `<br />` (we'll just use \n for simplicity)
  const lines = text.split('\n');

  return (
    <div className={`split-text-wrapper ${className}`}>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');
        return (
          <div 
            key={`line-${lineIndex}`} 
            className="split-line"
            style={{ display: 'block', overflow: 'hidden' }} // Overflow hidden enables the "slide up" reveal effect
          >
            {words.map((word, wordIndex) => (
              <span
                key={`word-${lineIndex}-${wordIndex}`}
                className="split-word"
                style={{ 
                  display: 'inline-block', 
                  whiteSpace: 'pre',
                  willChange: 'transform, opacity' 
                }}
              >
                {word}{wordIndex !== words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}
