import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { siteConfig } from '../config';

export async function generateOgImage(title: string): Promise<Buffer> {
  // Fetch Noto Sans Thai — supports both Thai and Latin glyphs
  const fontBuffer = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-thai@latest/thai-700-normal.ttf'
  ).then((r) => r.arrayBuffer());

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          backgroundColor: '#1A3D2B',
          fontFamily: 'NotoSansThai',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#8BBFAA',
                      display: 'flex',
                    },
                    children: [],
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '28px',
                      color: '#8BBFAA',
                      fontWeight: 700,
                    },
                    children: siteConfig.name,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: title.length > 40 ? '44px' : '52px',
                color: '#F5F5F0',
                lineHeight: 1.3,
                fontWeight: 700,
                maxWidth: '900px',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: '20px',
                color: '#8BBFAA',
                opacity: 0.8,
              },
              children: siteConfig.url.replace('https://', ''),
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'NotoSansThai',
          data: fontBuffer,
          weight: 700,
          style: 'normal' as const,
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width' as const, value: 1200 },
  });

  return Buffer.from(resvg.render().asPng());
}
