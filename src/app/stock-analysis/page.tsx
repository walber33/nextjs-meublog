import { client } from '@/sanity/client';
import { Heading } from '@/components';
import { StockAnalysisPost } from '@/app/stock-analysis/types';
import { StockPostsList } from '@/app/stock-analysis/stockPostList';
import { mapPostsUrls } from '@/utils/mapPostUrls';
import { SanityDocument } from 'next-sanity';

const POSTS_QUERY = `*[_type == "stock-analysis-post"]{ _id, title, body, slug, publishedAt, type, recommended, image, _type }`;

const options = { next: { revalidate: 300 } };

export default async function StocksPage() {
  const stockPosts = await client.fetch<StockAnalysisPost[]>(
    POSTS_QUERY,
    {},
    options
  );
  const postsWithImages = mapPostsUrls({
    posts: stockPosts as unknown as SanityDocument[],
  });
  return (
    <main className='container mx-auto min-h-screen max-w-screen-xl p-2 md:p-8 '>
      <div className='relative after:content-[""] after:absolute after:top-6 md:after:top-7 after:left-0 md:after:left-[calc(33%+5px)] after:w-[calc(100%)] md:after:w-[calc(40%-10px)]  after:h-[calc(80%-10px)] md:after:h-[calc(100%-10px)] after:bg-cyan-900 after:opacity-20 after:pointer-events-none'>
        <Heading heading='primary' className='mx-auto mb-[5px]'>
          Hi, I&apos;m Walber
        </Heading>
        <p className='mx-auto font-bold  leading-6 text-xl max-w-fit text-center mb-10'>
          Here i write what i think about stocks.
        </p>
      </div>

      <Heading heading='secondary' className='relative'>
        <div className='after:content-[""] after:absolute after:top-4 after:left-6 after:w-[calc(100%-10px)] after:h-[calc(100%-10px)] after:bg-cyan-900 after:opacity-20 after:pointer-events-none'>
          Stock Analysis Posts
        </div>
      </Heading>
      <StockPostsList
        posts={postsWithImages as unknown as StockAnalysisPost[]}
      />
    </main>
  );
}
