import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import CodeEditor from './CodeEditor';
import P5Preview from './P5Preview';

// Default p5.js sketch in global mode syntax
const DEFAULT_SKETCH = `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 100, 100);
}`;

const IDELayout = () => {
  const [code, setCode] = useState(DEFAULT_SKETCH);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PanelGroup direction="horizontal" style={{ flex: 1 }}>
        <Panel defaultSize={50} minSize={20}>
          <div style={{ height: '100%', overflow: 'hidden' }}>
            <CodeEditor code={code} onChange={handleCodeChange} />
          </div>
        </Panel>
        
        <PanelResizeHandle className="resize-handle" />
        
        <Panel defaultSize={50} minSize={20}>
          <div style={{ height: '100%', overflow: 'hidden', background: '#f5f5f5' }}>
            <P5Preview code={code} />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default IDELayout; 