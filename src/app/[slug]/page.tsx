import { PortableText, type SanityDocument } from 'next-sanity';
import { urlFor } from '@/utils';
import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';

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
  const title = '<Post/>';
  return (
    <main className='container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4'>
      <h1 className='text-4xl font-bold mb-8 w-full text-center'>{title}</h1>
      <Link href='/' className='hover:underline'>
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className='aspect-video rounded-xl'
          width='800'
          height='500'
        />
      )}
      <h1 className='text-4xl font-bold mb-8'>{post.title}</h1>
      <div className='prose'>
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}
