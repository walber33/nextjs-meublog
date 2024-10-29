import { type SanityDocument } from 'next-sanity';

import { client } from '@/sanity/client';
import { Heading, PostItem } from '@/components';

const POSTS_QUERY = `*[
  _type == "post" ||  _type == "review-post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, _type, title, slug, publishedAt, image, rating}`;

const options = { next: { revalidate: 300 } };

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
      <ul className='flex flex-wrap gap-4 justify-between mb-8 list-none'>
        {reviews.map((review) => {
          return <PostItem post={review} key={review._id} />;
        })}
      </ul>

      <Heading heading='secondary'>Posts</Heading>
      <ul className='flex flex-wrap gap-4 justify-between list-none'>
        {posts.map((post) => {
          return <PostItem post={post} key={post._id} />;
        })}
      </ul>
    </main>
  );
}
