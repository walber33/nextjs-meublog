import Link from 'next/link';
import { type SanityDocument } from 'next-sanity';

import { client } from '@/sanity/client';
import Image from 'next/image';
import { urlFor } from '@/utils';

const POSTS_QUERY = `*[
  _type == "post" ||  _type == "review-post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, _type, title, slug, publishedAt, image, rating}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const allposts = await client.fetch<SanityDocument[]>(
    POSTS_QUERY,
    {},
    options
  );
  const reviews = allposts.filter((post) => post._type === 'review-post');
  const posts = allposts.filter((post) => post._type === 'post');

  const title = '<Blog/>';
  return (
    <main className='container mx-auto min-h-screen max-w-7xl p-8'>
      <h1 className='text-4xl font-bold mb-8 w-full text-center'> {title} </h1>

      <h1 className='text-4xl font-bold mb-8 border-b max-w-fit'>Reviews</h1>
      <ul className='flex flex-wrap gap-y-4 justify-between mb-8'>
        {reviews.map((review) => {
          const image = urlFor(review.image)?.width(550).height(310).url();

          return (
            <li className='hover:underline' key={review._id}>
              <Link href={`/${review.slug.current}`}>
                <Image
                  src={image ?? ''}
                  alt={review.title}
                  className='aspect-video rounded-xl'
                  width='550'
                  height='310'
                />
                <h2 className='text-xl font-semibold'>{review.title}</h2>
                <p>{new Date(review.publishedAt).toLocaleDateString()}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      <h1 className='text-4xl font-bold mb-8 border-b max-w-fit'>Posts</h1>
      <ul className='flex flex-wrap gap-y-4 justify-between'>
        {posts.map((post) => {
          const image = urlFor(post.image)?.width(550).height(310).url();

          return (
            <li className='hover:underline' key={post._id}>
              <Link href={`/${post.slug.current}`}>
                <Image
                  src={image ?? ''}
                  alt={post.title}
                  className='aspect-video rounded-xl'
                  width='550'
                  height='310'
                />
                <h2 className='text-xl font-semibold'>{post.title}</h2>
                <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
