import type { APIContext } from 'astro';
import { generateOgImage } from '../utils/og-image';

export async function GET(_ctx: APIContext) {
  const png = await generateOgImage('VerdeX — Read Then Write');
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
}
