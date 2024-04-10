import G6 from '@antv/g6';
import { useEffect, useRef } from 'react';

import { useWindowDimensions } from '@hooks/useWindowDimensions';

const graphData = {
  nodes: [
    {
      id: 'papa',
      label: 'Dominique Grignon',
      birthDate: '31/12/1968',
      anchorPoints: [
        [1, 0.5],
        // [0.5, 1],
      ],
    },
    {
      id: 'maman',
      label: 'Sabine Grignon',
      birthDate: '07/10/1965',
      anchorPoints: [
        [0, 0.5],
        // [0.5, 1],
      ],
    },
    {
      id: 'papa-maman',
      type: 'diamond',
    },
    {
      id: 'me',
      label: 'Bastien Grignon',
      birthDate: '28/12/1997',
    },
    {
      id: 'sister',
      label: 'Marine Grignon',
      birthDate: '28/12/1997',
    },
  ],
  edges: [
    {
      source: 'papa-maman',
      target: 'me',
    },
    {
      source: 'maman',
      target: 'papa-maman',
    },
    {
      source: 'papa',
      target: 'papa-maman',
    },
    {
      source: 'papa-maman',
      target: 'sister',
    },
  ],
};

/*const treeData = {
  id: 'god',
  label: 'god',
  children: [
    {
      id: 'subTree1',
      label: 'Papa',
      anchorPoints: [
        [1, 0.5],
        [0.5, 1],
      ],
      children: [
        {
          id: 'me',
          label: 'Bastien',
        },
        {
          id: 'sister',
          label: 'Marine',
        },
        {
          id: 'brother',
          label: 'Rémy',
        },
      ],
    },
    {
      id: 'subTree2',
      label: 'Maman',
      anchorPoints: [[0, 0.5]],
      children: [],
    },
  ],
};*/

export const useTreeGraphHooks = () => {
  const graphRef = useRef(null);
  const { width, height } = useWindowDimensions();

  // G6.registerNode('customNodeItem', createNodeFromReact());

  useEffect(() => {
    const toolbar = new G6.ToolBar({
      container: 'toolbarID',
    });
    const graph = new G6.Graph({
      container: graphRef.current,
      width,
      height,
      modes: {
        default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
      },
      defaultNode: {
        type: 'rect',
      },
      defaultEdge: {
        type: 'polyline',
        color: 'pink',
        style: {
          lineWidth: 2,
        },
      },
      layout: {
        type: 'dendrogram',
        direction: 'RL', // H / V / LR / RL / TB / BT
        nodeSep: 50,
        rankSep: 100,
        radial: true,
      },
      linkCenter: true,
      fitCenter: true,
      plugins: [toolbar],
    });

    graph.data(graphData);
    graph.render();

    return () => graph.destroy();
  }, [height, width]);

  return {
    graphRef,
    width,
    height,
  };
};
