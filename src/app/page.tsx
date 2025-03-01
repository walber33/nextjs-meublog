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
    <main className='container mx-auto min-h-screen max-w-screen-xl p-2 md:p-8 '>
      <div className='relative after:content-[""] after:absolute after:top-6 md:after:top-7 after:left-0 md:after:left-[calc(33%+5px)] after:w-[calc(100%)] md:after:w-[calc(40%-10px)]  after:h-[calc(80%-10px)] md:after:h-[calc(100%-10px)] after:bg-cyan-900 after:opacity-20 after:pointer-events-none'>
        <Heading heading='primary' className='mx-auto mb-[5px]'>
          Hi, I&apos;m Walber
        </Heading>
        <p className='mx-auto font-bold  leading-6 text-xl max-w-fit text-center'>
          a frontend software developer from Brazil.
          <br /> Here, I write about anything I find interesting to share.
        </p>
      </div>

      <Heading heading='secondary' className='relative'>
        <div className='after:content-[""] after:absolute after:top-4 after:left-6 after:w-[calc(100%-10px)] after:h-[calc(100%-10px)] after:bg-cyan-900 after:opacity-20 after:pointer-events-none'>
          Posts
        </div>
      </Heading>
      <ul className='flex flex-wrap gap-4 justify-between list-none'>
        {posts.map((post) => {
          return <PostItem post={post} key={post._id} />;
        })}
      </ul>
    </main>
  );
}
