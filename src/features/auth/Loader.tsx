import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface LoaderProps {
  show: boolean;
  text?: string;
  durationMs?: number;
  sizePx?: number;
}

const Loader = ({
  show,
  text = '처리 중입니다... ',
  durationMs = 1600,
  sizePx = 28,
}: LoaderProps) => {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('loader:finish'));
    }, durationMs);
    return () => clearTimeout(timer);
  }, [show, durationMs]);

  if (!show) return null;

  const overlay = (
    <div
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[3px]'
      role='status'
      aria-live='polite'
      aria-busy='true'
    >
      <style>{`
        .cr-loader { --size: ${sizePx}px; --duration: 1200ms; --point500: var(--color-point-500); height: calc(var(--size) * 2); width: calc(var(--size) * 3); position: relative; transform-style: preserve-3d; transform-origin: 50% 50%; transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px); }
        .cr-loader .box { width: var(--size); height: var(--size); top: 0; left: 0; position: absolute; transform-style: preserve-3d; }
        .cr-loader .box:nth-child(1) { transform: translate(100%, 0); animation: cr-box1 var(--duration) linear infinite; }
        .cr-loader .box:nth-child(2) { transform: translate(0, 100%); animation: cr-box2 var(--duration) linear infinite; }
        .cr-loader .box:nth-child(3) { transform: translate(100%, 100%); animation: cr-box3 var(--duration) linear infinite; }
        .cr-loader .box:nth-child(4) { transform: translate(200%, 0); animation: cr-box4 var(--duration) linear infinite; }
        .cr-loader .box > div { --background: var(--point500); --top: auto; --right: auto; --bottom: auto; --left: auto; --translateZ: calc(var(--size) / 2); --rotateY: 0deg; --rotateX: 0deg; position: absolute; width: 100%; height: 100%; background: var(--background); top: var(--top); right: var(--right); bottom: var(--bottom); left: var(--left); transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ)); border-radius: 0; }
        .cr-loader .box > div:nth-child(1) { --top: 0; --left: 0; }
        .cr-loader .box > div:nth-child(2) { --background: color-mix(in srgb, var(--point500) 78%, black); --right: 0; --rotateY: 90deg; }
        .cr-loader .box > div:nth-child(3) { --background: color-mix(in srgb, var(--point500) 88%, black); --rotateX: -90deg; }
        .cr-loader .box > div:nth-child(4) { --background: color-mix(in srgb, var(--point500) 30%, white); --top: 0; --left: 0; --translateZ: calc(var(--size) * 3 * -1); }
        @keyframes cr-box1 { 0%, 50% { transform: translate(100%, 0); } 100% { transform: translate(200%, 0); } }
        @keyframes cr-box2 { 0% { transform: translate(0, 100%); } 50% { transform: translate(0, 0); } 100% { transform: translate(100%, 0); } }
        @keyframes cr-box3 { 0%, 50% { transform: translate(100%, 100%); } 100% { transform: translate(0, 100%); } }
        @keyframes cr-box4 { 0% { transform: translate(200%, 0); } 50% { transform: translate(200%, 100%); } 100% { transform: translate(100%, 100%); } }

        /* Text pulse + bouncing dots */
        @keyframes cr-text-pulse { 0%,100% { opacity: .8; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-1px); } }
        .cr-text { animation: cr-text-pulse 1200ms ease-in-out infinite; }
        @keyframes cr-dot { 0%,80%,100% { transform: scale(.7); opacity:.6 } 40% { transform: scale(1); opacity:1 } }
        .cr-dot { display:inline-block; width:6px; height:6px; margin-left:6px; border-radius:9999px; background: rgba(255,255,255,.95); animation: cr-dot 1200ms ease-in-out infinite; }
        .cr-delay-150 { animation-delay: 150ms; }
        .cr-delay-300 { animation-delay: 300ms; }
      `}</style>
      <div className='flex flex-col items-center gap-3'>
        <div className='cr-loader'>
          <div className='box'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className='box'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className='box'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className='box'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {text && (
          <div className='font mt-20 rounded-xl px-3 py-1 text-lg font-semibold text-white'>
            <span className='cr-text'>{text}</span>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};

export default memo(Loader);
