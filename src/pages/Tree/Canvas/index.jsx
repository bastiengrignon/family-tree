import React from 'react';

import { useCanvas } from '@hooks/useCanvas';

const Canvas = ({ draw }) => {
  const canvasRef = useCanvas(draw);
  return <canvas ref={canvasRef} width={600} height={600} />;
};

export default Canvas;
