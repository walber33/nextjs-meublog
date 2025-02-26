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
  const posts = allposts.filter((post) => post._type === 'post');

  return (
    <main className='container mx-auto min-h-screen max-w-screen-xl p-8'>
      <Heading heading='primary' className='mx-auto mb-[5px]'>
        Hi, I&apos;m Walber
      </Heading>
      <p className='mx-auto font-bold border-b leading-6 text-xl max-w-fit'>
        a frontend software developer from Brazil.
      </p>
      <p className='mx-auto mb-8 font-bold border-b leading-6 text-xl max-w-fit'>
        Here, I write about anything I find interesting to share.
      </p>

      <Heading heading='secondary'>Posts</Heading>
      <ul className='flex flex-wrap gap-4 justify-between list-none'>
        {posts.map((post) => {
          return <PostItem post={post} key={post._id} />;
        })}
      </ul>
    </main>
  );
}
