import { PortableText, type SanityDocument } from 'next-sanity';
import { urlFor } from '@/utils';
import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import { Heading, RatingIcon } from '@/components';

const POST_QUERY = `*[_type == "post" || _type == "review-post"][slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const slug = await params;
  const post = await client.fetch<SanityDocument>(POST_QUERY, slug, options);
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;
  const title = post._type === 'review-post' ? '<Review/>' : '<Post/>';
  return (
    <main className='container mx-auto min-h-screen max-w-7xl p-8'>
      <Heading heading='primary'>{title}</Heading>
      <Link href='/' className='hover:underline'>
        ← Voltar a página principal
      </Link>
      {postImageUrl && (
        <div className='relative w-fit'>
          <RatingIcon className='absolute top-2 right-2'>
            {post.rating}
          </RatingIcon>
          <Image
            src={postImageUrl}
            alt={post.title}
            className='aspect-video rounded-xl'
            width='800'
            height='500'
          />
        </div>
      )}
      <div className='flex gap-2'>
        <h1 className='text-4xl font-bold mb-1'>{post.title}</h1>
      </div>
      <div className='max-w-3xl'>
        <p className='text-sm mb-4'>
          Publicado: {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}
