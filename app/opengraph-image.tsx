import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Tool × Fibonacci · Patrones matemáticos en la música'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage:
            'radial-gradient(circle at 30% 30%, rgba(234,179,8,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(168,85,247,0.18), transparent 55%)',
          color: '#fff',
          fontFamily: 'sans-serif',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #eab308, #ca8a04)',
              fontSize: 64,
              color: '#000',
              fontWeight: 700,
            }}
          >
            φ
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#9ca3af',
              fontFamily: 'monospace',
              display: 'flex',
            }}
          >
            F(n) = F(n-1) + F(n-2)
          </div>
        </div>

        <div
          style={{
            fontSize: 110,
            fontWeight: 300,
            letterSpacing: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <span>TOOL</span>
          <span style={{ color: '#eab308' }}>×</span>
          <span>FIBONACCI</span>
        </div>

        <div
          style={{
            fontSize: 36,
            color: '#d1d5db',
            marginTop: 32,
            textAlign: 'center',
            maxWidth: 960,
            lineHeight: 1.3,
          }}
        >
          Patrones matemáticos y proporción áurea en la música de Tool
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 24,
            color: '#eab308',
            fontFamily: 'monospace',
          }}
        >
          <span>1</span>
          <span>·</span>
          <span>1</span>
          <span>·</span>
          <span>2</span>
          <span>·</span>
          <span>3</span>
          <span>·</span>
          <span>5</span>
          <span>·</span>
          <span>8</span>
          <span>·</span>
          <span>13</span>
          <span>·</span>
          <span>21</span>
          <span>·</span>
          <span>34</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
