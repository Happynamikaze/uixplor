'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import PageSEO from '@/components/seo/PageSEO';
import { motion } from 'motion/react';

// Dynamically import Sandpack to avoid SSR issues
const SandpackProvider = dynamic(
  () => import('@codesandbox/sandpack-react').then((m) => m.SandpackProvider),
  { ssr: false }
);
const SandpackLayout = dynamic(
  () => import('@codesandbox/sandpack-react').then((m) => m.SandpackLayout),
  { ssr: false }
);
const SandpackCodeEditor = dynamic(
  () => import('@codesandbox/sandpack-react').then((m) => m.SandpackCodeEditor),
  { ssr: false }
);
const SandpackPreview = dynamic(
  () => import('@codesandbox/sandpack-react').then((m) => m.SandpackPreview),
  { ssr: false }
);

const STARTER_TEMPLATES: Record<string, { html: string; css: string; name: string }> = {
  glass_card: {
    name: 'Glass Card',
    html: `<div class="scene">
  <div class="card">
    <div class="card-glow"></div>
    <h2>Glass Card</h2>
    <p>Frosted glass morphism with backdrop blur and subtle border.</p>
    <button class="btn">Explore →</button>
  </div>
</div>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
.scene {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 50%, #0d0d0d 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.card {
  position: relative;
  width: 320px;
  padding: 32px;
  border-radius: 24px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(108,99,255,0.25);
}
.card-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(108,99,255,0.4) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
h2 {
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}
p {
  color: rgba(255,255,255,0.55);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
}
.btn {
  padding: 10px 22px;
  background: #6C63FF;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}
.btn:hover {
  background: #7c74ff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(108,99,255,0.4);
}`,
  },
  gradient_button: {
    name: 'Gradient Button',
    html: `<div class="scene">
  <button class="btn">
    <span class="btn-text">Launch Project</span>
    <div class="btn-glow"></div>
  </button>
  <button class="btn btn-outline">
    <span class="btn-text">View Source</span>
  </button>
</div>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
.scene {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: #0d0d0d;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  flex-wrap: wrap;
}
.btn {
  position: relative;
  padding: 13px 28px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #6C63FF 0%, #8b5cf6 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}
.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(108,99,255,0.45);
}
.btn:active { transform: translateY(-1px); }
.btn-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.btn:hover .btn-glow { opacity: 1; }
.btn.btn-outline {
  background: transparent;
  border: 1px solid rgba(108,99,255,0.6);
  color: #8b8fff;
}
.btn.btn-outline:hover {
  background: rgba(108,99,255,0.1);
  border-color: #6C63FF;
  box-shadow: 0 0 20px rgba(108,99,255,0.2);
}`,
  },
  neon_loader: {
    name: 'Neon Loader',
    html: `<div class="scene">
  <div class="loader-wrap">
    <div class="ring ring1"></div>
    <div class="ring ring2"></div>
    <div class="ring ring3"></div>
    <div class="dot"></div>
  </div>
  <p class="label">Loading...</p>
</div>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
.scene {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: #0d0d0d;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.loader-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
  animation: spin 1.6s linear infinite;
}
.ring1 {
  width: 80px; height: 80px;
  border-top-color: #6C63FF;
  border-right-color: rgba(108,99,255,0.3);
  animation-duration: 1.2s;
}
.ring2 {
  width: 58px; height: 58px;
  border-top-color: #8b5cf6;
  border-left-color: rgba(139,92,246,0.3);
  animation-direction: reverse;
  animation-duration: 0.9s;
}
.ring3 {
  width: 36px; height: 36px;
  border-top-color: #a78bfa;
  border-bottom-color: rgba(167,139,250,0.3);
  animation-duration: 0.7s;
}
.dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #6C63FF;
  box-shadow: 0 0 12px #6C63FF, 0 0 30px rgba(108,99,255,0.5);
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.label {
  color: rgba(255,255,255,0.4);
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
}`,
  },
};

export default function Playground() {
  const [activeTemplate, setActiveTemplate] = useState<keyof typeof STARTER_TEMPLATES>('glass_card');
  const [copied, setCopied] = useState(false);
  const template = STARTER_TEMPLATES[activeTemplate];

  const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${template.name}</title>
<style>
${template.css}
</style>
</head>
<body>
${template.html}
</body>
</html>`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(fullCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [fullCode]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTemplate}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, [fullCode, activeTemplate]);

  const sandpackFiles = {
    '/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${template.name}</title>
<link rel="stylesheet" href="/styles.css" />
</head>
<body>
${template.html}
</body>
</html>`,
      active: false,
    },
    '/styles.css': {
      code: template.css,
      active: true,
    },
  };

  return (
    <>
      <PageSEO
        title="Component Playground — UIXplor"
        description="Edit HTML and CSS live in the browser. Copy, download, or share your components instantly."
        path="/playground"
        keywords={['component playground', 'CSS editor', 'HTML editor', 'live preview', 'code editor']}
      />
      <main className="min-h-screen" style={{ background: '#0D0D0D' }}>
        {/* Header bar */}
        <div className="border-b pt-20" style={{ borderColor: '#2A2A2A' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#6C63FF]">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </span>
                Component Playground
              </h1>
              <p className="text-white/40 text-xs mt-0.5">Edit HTML &amp; CSS — see changes instantly</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                style={{ background: copied ? 'rgba(108,99,255,0.15)' : 'rgba(255,255,255,0.05)', borderColor: copied ? '#6C63FF' : '#2A2A2A', color: copied ? '#a78bfa' : 'rgba(255,255,255,0.7)' }}
              >
                {copied ? (
                  <><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</>
                ) : (
                  <><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy Code</>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: '#2A2A2A', color: 'rgba(255,255,255,0.7)' }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download
              </button>
            </div>
          </div>

          {/* Template Selector */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 flex gap-2 flex-wrap">
            {(Object.entries(STARTER_TEMPLATES) as [keyof typeof STARTER_TEMPLATES, typeof STARTER_TEMPLATES[keyof typeof STARTER_TEMPLATES]][]).map(([key, tmpl]) => (
              <button
                key={key}
                onClick={() => setActiveTemplate(key)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border"
                style={{
                  background: activeTemplate === key ? '#6C63FF' : 'rgba(255,255,255,0.04)',
                  borderColor: activeTemplate === key ? '#6C63FF' : '#2A2A2A',
                  color: activeTemplate === key ? '#fff' : 'rgba(255,255,255,0.5)',
                }}
              >
                {tmpl.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sandpack Editor */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <SandpackProvider
            key={activeTemplate}
            template="static"
            files={sandpackFiles}
            theme={{
              colors: {
                surface1: '#151515',
                surface2: '#1a1a1a',
                surface3: '#202020',
                clickable: 'rgba(255,255,255,0.4)',
                base: 'rgba(255,255,255,0.8)',
                disabled: 'rgba(255,255,255,0.2)',
                hover: 'rgba(108,99,255,0.15)',
                accent: '#6C63FF',
                error: '#ff5555',
                errorSurface: 'rgba(255,85,85,0.1)',
              },
              syntax: {
                plain: '#e2e8f0',
                comment: { color: '#718096', fontStyle: 'italic' },
                keyword: '#a78bfa',
                tag: '#f472b6',
                punctuation: '#64748b',
                definition: '#60a5fa',
                property: '#34d399',
                static: '#fbbf24',
                string: '#f59e0b',
              },
              font: {
                body: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                mono: '"Fira Code", "JetBrains Mono", monospace',
                size: '13px',
                lineHeight: '1.65',
              },
            }}
          >
            <SandpackLayout style={{ borderRadius: '16px', border: '1px solid #2A2A2A', minHeight: '560px' }}>
              <SandpackCodeEditor
                showLineNumbers
                showInlineErrors
                wrapContent
                style={{ height: '560px', flex: 1 }}
              />
              <SandpackPreview
                showNavigator={false}
                showOpenInCodeSandbox={false}
                style={{ height: '560px', flex: 1 }}
              />
            </SandpackLayout>
          </SandpackProvider>

          <p className="text-center text-white/20 text-xs mt-4">
            Edit the CSS or HTML tab — changes reflect live in the preview panel →
          </p>
        </div>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 border"
            style={{ background: 'rgba(108,99,255,0.06)', borderColor: 'rgba(108,99,255,0.2)' }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">Explore more components</h2>
            <p className="text-white/40 text-sm mb-6">Browse 200+ curated UI elements ready to copy-paste</p>
            <a
              href="/collections"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
              style={{ background: '#6C63FF' }}
            >
              Browse Collections
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </motion.div>
        </section>
      </main>
    </>
  );
}
