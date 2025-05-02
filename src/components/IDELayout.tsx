import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import CodeEditor from './CodeEditor';
import P5Preview from './P5Preview';

// Default p5.js sketch in global mode syntax
const DEFAULT_SKETCH = `function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 100);
}`;

const IDELayout = () => {
  const [code, setCode] = useState(DEFAULT_SKETCH);
  const [resetCounter, setResetCounter] = useState(0);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleReset = () => {
    setResetCounter(prev => prev + 1);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PanelGroup direction="horizontal" style={{ flex: 1 }}>
        <Panel defaultSize={50} minSize={20}>
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
            <CodeEditor code={code} onChange={handleCodeChange} />
            <button
              onClick={handleReset}
              style={{
                position: 'absolute',
                top: '10px',
                right: '25px',
                zIndex: 10,
                padding: '6px 12px',
                background: '#3a3a3a',
                color: 'white',
                border: '1px solid #555',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold',
                opacity: 0.9,
                transition: 'opacity 0.2s, background 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.background = '#505050';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.background = '#3a3a3a';
              }}
            >
              Reset Sketch
            </button>
          </div>
        </Panel>
        
        <PanelResizeHandle className="resize-handle" />
        
        <Panel defaultSize={50} minSize={20}>
          <div style={{ height: '100%', overflow: 'hidden', background: '#f5f5f5' }}>
            <P5Preview code={code} resetCounter={resetCounter} />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default IDELayout; 