// src/components/ModelViewer.tsx
import React, { useEffect } from 'react';
import '@google/model-viewer';


export default function ModelViewer() {
  useEffect(() => {
    // ensure the module is loaded
  }, []);

  return (
    <div className="animate-float">
      <model-viewer
        src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
        alt="Placeholder 3D model for AquaArch insole"
        auto-rotate
        camera-controls
        style={{
          width: '280px',
          height: '280px',
          background: 'transparent',
        }}
      />
    </div>
  );
}
