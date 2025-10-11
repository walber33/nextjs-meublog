import { PortableText, type SanityDocument } from 'next-sanity';
import { urlFor } from '@/utils';
import { client } from '@/sanity/client';
import Image from 'next/image';
import { ImageHandler, RatingIcon } from '@/components';
import { notFound } from 'next/navigation';

const POST_QUERY = `*[_type == "post" || _type == "review-post"][slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const slug = await params;
  const post = await client.fetch<SanityDocument>(POST_QUERY, slug, options);

  if (!post) {
    notFound();
  }
  const postImageUrl = post.image
    ? urlFor(post.image)?.height(500)?.url()
    : null;

  return (
    <>
      {postImageUrl && (
        <div className='relative aspect-video w-full max-w-[550px] max-h-[310px] overflow-hidden rounded-xl flex justify-center'>
          {post._type === 'review-post' && (
            <RatingIcon className='absolute top-2 right-2'>
              {post.rating}
            </RatingIcon>
          )}
          <Image
            src={postImageUrl}
            alt={post.title}
            // Adjust image size and aspect ratio
            className='rounded-xl w-auto'
            width='800'
            height='500'
          />
        </div>
      )}
      <div className='flex gap-2'>
        <h1 className='text-4xl font-bold mb-1'>{post.title}</h1>
      </div>
      <div className='max-w-3xl [&>img]:max-w-lg [&>img]:w-full'>
        <p className='text-sm mb-4'>
          Publicado: {new Date(post.publishedAt).toLocaleDateString()}
        </p>
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
