import { PortableText } from 'next-sanity';
import { client } from '@/sanity/client';
import { ImageHandler } from '@/components';
import { notFound } from 'next/navigation';
import { StockAnalysisPost } from '@/app/stock-analysis/types';

const POST_QUERY = `*[_type == "stock-analysis-post"][slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export default async function StockPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const slug = await params;
  const post = await client.fetch<StockAnalysisPost>(POST_QUERY, slug, options);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className='flex gap-2'>
        <h1 className='text-4xl font-bold mb-1'>{post.title}</h1>
      </div>
      <div className='max-w-3xl [&>img]:max-w-lg [&>img]:w-full'>
        <div className='flex gap-2 text-sm'>
          <p className='mb-4'>
            Publicado: {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
          </p>
          <p
            className={`${post.recommended ? 'text-green-600 border-green-600' : 'text-red-600 border-red-600'} font-bold bg-orange-100 border-l-4  px-1 mb-4`}
          >
            Recomendado: {post.recommended ? 'Sim' : 'Não'}
          </p>
          <p className='bg-orange-600 border border-l-4 border-blue-600 px-1 mb-4 text-sm font-bold text-white '>
            {post.type}
          </p>
        </div>
        {Array.isArray(post.body) && (
          <PortableText
            value={post.body}
            components={{ types: { image: ImageHandler } }}
          />
        )}
      </div>
    </>
  );
}
