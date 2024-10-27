import Link from 'next/link';
import { type SanityDocument } from 'next-sanity';

import { client } from '@/sanity/client';
import Image from 'next/image';
import { urlFor } from '@/utils';
import { Heading, RatingIcon } from '@/components';

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
    <main className='container mx-auto min-h-screen max-w-screen-xl p-8'>
      <Heading heading='primary'> {title} </Heading>

      <Heading heading='secondary'>Reviews</Heading>
      <ul className='flex flex-wrap gap-y-4 justify-between mb-8'>
        {reviews.map((review) => {
          const image = urlFor(review.image)?.width(550).height(310).url();
          return (
            <li className='hover:underline relative' key={review._id}>
              <Link href={`/${review.slug.current}`}>
                <RatingIcon className='absolute top-2 right-2'>
                  {review.rating}
                </RatingIcon>
                <Image
                  src={image ?? ''}
                  alt={review.title}
                  className='aspect-video rounded-xl'
                  width='550'
                  height='310'
                />
                <Heading heading='tertiary'>{review.title}</Heading>
                <p>{new Date(review.publishedAt).toLocaleDateString()}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      <Heading heading='secondary'>Posts</Heading>
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
                <Heading heading='tertiary'>{post.title}</Heading>
                <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
