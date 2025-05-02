import { useRef, useMemo, useState } from 'react';

interface P5PreviewProps {
  code: string;
}

const P5Preview = ({ code }: P5PreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [resetCounter, setResetCounter] = useState(0);

  // Create the HTML content as a data URI
  const htmlSrc = useMemo(() => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>p5.js Sketch</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            html, body {
              width: 100%;
              height: 100%;
            }
            canvas {
              display: block;
            }
          </style>
          <script src="https://cdn.jsdelivr.net/npm/p5@2.0.1/lib/p5.js"></script>
        </head>
        <body>
          <script>
            // User's sketch code
            ${code}
            
            // Support for windowResized if not defined by user
            if (typeof windowResized !== 'function') {
              function windowResized() {
                resizeCanvas(windowWidth, windowHeight);
              }
            }
          </script>
        </body>
      </html>
    `;

    // Convert to a data URI
    return `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
  }, [code]);

  const handleReset = () => {
    setResetCounter(prev => prev + 1);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <iframe 
        key={`iframe-${resetCounter}`}
        ref={iframeRef} 
        src={htmlSrc}
        title="p5.js Sketch" 
        style={{ 
          width: '100%', 
          height: '100%',
          border: 'none',
          background: 'white'
        }}
        sandbox="allow-scripts"
      />
      <button
        onClick={handleReset}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 10,
          padding: '6px 12px',
          background: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          opacity: 0.8,
          transition: 'opacity 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
      >
        Reset Sketch
      </button>
    </div>
  );
};

export default P5Preview; 