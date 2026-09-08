// src/pages/Capture.tsx
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OriginButton } from '../components/ui/origin-button';

const ACCENT = '#10B981';

type Status = 'loading' | 'ready' | 'captured' | 'error';

export default function Capture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [capturedDataUrl, setCapturedDataUrl] = useState<string | null>(null);
  const navigate = useNavigate();

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
    setCapturedDataUrl(canvas.toDataURL('image/png'));
    setStatus('captured');
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
        background: '#000000',
        color: '#ffffff',
        minHeight: '100vh',
        paddingTop: '80px',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div className="max-w-2xl mx-auto px-6 py-16 flex flex-col items-center">

        <p className="text-xs font-mono tracking-widest mb-3 uppercase" style={{ color: ACCENT }}>
          Fit Finder
        </p>
        <h1
          className="text-4xl sm:text-6xl font-heading text-white text-center mb-4"
          style={{ lineHeight: 1.1 }}
        >
          Capture<br />your foot.
        </h1>
        <p className="text-white/50 text-center mb-2 max-w-sm font-mono text-xs leading-relaxed">
          Place an A4 sheet or bank card beside your foot for scale, then snap a photo.
        </p>
        <p
          className="text-xs text-center mb-10 px-4 py-2 rounded-full font-mono"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: 'rgba(16,185,129,0.7)' }}
        >
          ℹ AI-assisted estimate only — not a medical or orthotic assessment.
        </p>

        {/* Camera area */}
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.03)',
            aspectRatio: '4/3',
          }}
        >
          {/* Loading */}
          {status === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/40">
              <svg className="w-10 h-10 animate-spin" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span className="text-xs font-mono uppercase tracking-widest">Requesting camera…</span>
            </div>
          )}

          {/* Error */}
          {status === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/50 p-6 text-center">
              <span className="text-5xl">📷</span>
              <p className="font-mono text-xs">Could not access the camera.</p>
              <p className="text-xs text-white/30 font-mono">Grant camera permissions in your browser settings.</p>
              <OriginButton
                onClick={startCamera}
              >
                Retry
              </OriginButton>
            </div>
          )}

          {/* Live video */}
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
              className="absolute inset-0 flex flex-col items-center justify-center gap-5"
              style={{ background: 'rgba(0,0,0,0.72)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-heading text-2xl text-black"
                style={{ background: ACCENT }}
              >
                ✓
              </div>
              <p className="text-2xl font-heading text-white">Analysis Complete.</p>
              <p className="text-white/50 text-xs text-center max-w-xs font-mono">
                Your foot profile has been captured. Based on your image, we recommend:
              </p>
              <div
                className="px-6 py-4 text-center rounded-xl"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                <p className="text-[10px] text-white/30 mb-1 font-mono uppercase tracking-widest">Recommended Tier</p>
                <p className="text-xl font-heading" style={{ color: ACCENT }}>EcoDomes — PHB</p>
                <p className="text-xs text-white/30 mt-1 font-mono">Neutral arch · Moderate pronation</p>
              </div>
              <p className="text-xs text-white/30 text-center max-w-xs px-4 font-mono">
                AI-assisted estimate — not a 3D scan or medical assessment.
              </p>
            </div>
          )}

          {/* Viewfinder frame */}
          {status === 'ready' && (
            <div className="absolute inset-4 pointer-events-none">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: ACCENT }} />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: ACCENT }} />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: ACCENT }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: ACCENT }} />
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest" style={{ color: 'rgba(16,185,129,0.6)' }}>
                Align foot within frame
              </p>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {/* Buttons */}
        <div className="mt-8 flex gap-4 w-full justify-center flex-wrap">
          {status === 'ready' && (
            <OriginButton
              onClick={capture}
            >
              📸 Capture
            </OriginButton>
          )}
          {status === 'captured' && (
            <>
              <OriginButton
                onClick={retake}
              >
                ↩ Retake
              </OriginButton>
              <OriginButton
                onClick={() => navigate('/pricing')}
              >
                Buy Now →
              </OriginButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
