import type { APIContext, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../utils/og-image';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { title: post.data.title },
  }));
};

export async function GET({ props }: APIContext) {
  const png = await generateOgImage(props.title as string);
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
}
