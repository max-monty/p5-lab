import { useRef, useMemo } from 'react';

interface P5PreviewProps {
  code: string;
  resetCounter?: number;
}

const P5Preview = ({ code, resetCounter = 0 }: P5PreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
    </div>
  );
};

export default P5Preview; 