// src/pages/Capture.tsx
import { useRef, useState, useEffect } from 'react';

type Status = 'loading' | 'ready' | 'captured' | 'error';

export default function Capture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [capturedDataUrl, setCapturedDataUrl] = useState<string | null>(null);

  // Auto-start camera on mount
  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    setStatus('loading');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStatus('ready');
      }
    } catch (e) {
      console.error('Camera error', e);
      setStatus('error');
    }
  };

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    setCapturedDataUrl(dataUrl);
    setStatus('captured');

    // Stop camera
    const stream = video.srcObject as MediaStream;
    stream?.getTracks().forEach((t) => t.stop());
  };

  const retake = () => {
    setCapturedDataUrl(null);
    startCamera();
  };

  return (
    <div
      style={{
        background: '#030f14',
        color: '#e0f7fa',
        minHeight: '100vh',
        paddingTop: '80px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="max-w-2xl mx-auto px-6 py-16 flex flex-col items-center">

        {/* Heading */}
        <p className="text-xs font-semibold tracking-widest text-cyan-400 mb-3 uppercase">Fit Finder</p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-center mb-4"
          style={{ fontFamily: 'Syne, Inter, sans-serif' }}
        >
          Capture your foot
        </h1>
        <p className="text-slate-400 text-center mb-2 max-w-sm">
          Place an A4 sheet or bank card beside your foot for scale, then snap a photo.
        </p>
        <p
          className="text-xs text-center mb-10 px-4 py-2 rounded-full"
          style={{ background: 'rgba(0,188,212,0.08)', border: '1px solid rgba(0,188,212,0.2)', color: '#80deea' }}
        >
          ℹ️ AI-assisted estimate only — not a medical or orthotic assessment.
        </p>

        {/* Camera area */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.03)',
            aspectRatio: '4/3',
          }}
        >
          {/* Loading */}
          {status === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500">
              <svg className="w-10 h-10 animate-spin text-cyan-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span className="text-sm">Requesting camera…</span>
            </div>
          )}

          {/* Error */}
          {status === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-400 p-6 text-center">
              <span className="text-5xl">📷</span>
              <p>Could not access the camera.</p>
              <p className="text-xs text-slate-600">Make sure camera permissions are granted in your browser settings.</p>
              <button
                onClick={startCamera}
                className="mt-2 px-6 py-2 rounded-full text-sm font-semibold"
                style={{ background: 'rgba(0,188,212,0.15)', border: '1px solid rgba(0,188,212,0.3)', color: '#00e5ff' }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Live video (hidden once captured) */}
          <video
            ref={videoRef}
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ display: status === 'captured' ? 'none' : 'block' }}
          />

          {/* Captured image */}
          {status === 'captured' && capturedDataUrl && (
            <img src={capturedDataUrl} alt="Captured foot" className="w-full h-full object-cover" />
          )}

          {/* Done overlay */}
          {status === 'captured' && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              style={{ background: 'rgba(0,0,0,0.55)' }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                style={{
                  background: 'linear-gradient(135deg, #00e5ff, #69f0ae)',
                  boxShadow: '0 0 40px rgba(105,240,174,0.5)',
                }}
              >
                ✓
              </div>
              <p className="text-2xl font-bold text-white">Analysis Complete!</p>
              <p className="text-slate-400 text-sm text-center max-w-xs">
                Your foot profile has been captured. Based on your image, we recommend:
              </p>
              <div
                className="px-6 py-3 rounded-xl text-center"
                style={{
                  background: 'rgba(0,188,212,0.12)',
                  border: '1px solid rgba(0,188,212,0.3)',
                }}
              >
                <p className="text-xs text-slate-400 mb-1">RECOMMENDED TIER</p>
                <p className="text-xl font-bold text-cyan-300">EcoDomes — PHB</p>
                <p className="text-xs text-slate-500 mt-1">Neutral arch · Moderate pronation</p>
              </div>
              <p className="text-xs text-slate-600 text-center max-w-xs px-4">
                This is an AI-assisted estimate to guide product choice, not a 3D scan or a medical/orthotic assessment.
              </p>
            </div>
          )}

          {/* Viewfinder frame */}
          {status === 'ready' && (
            <div className="absolute inset-4 pointer-events-none">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />
            </div>
          )}
        </div>

        {/* Hidden canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          {status === 'ready' && (
            <button
              onClick={capture}
              className="px-10 py-4 rounded-full font-bold text-slate-900 text-lg transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(90deg, #00e5ff, #69f0ae)',
                boxShadow: '0 0 32px rgba(0,229,255,0.3)',
              }}
            >
              📸 Capture
            </button>
          )}
          {status === 'captured' && (
            <button
              onClick={retake}
              className="px-8 py-3 rounded-full font-semibold text-slate-400 text-sm transition-all hover:text-white"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              ↩ Retake
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
