import { Heading } from '@/components/heading';
import { RatingIcon } from '@/components/ratingIcon';
import { toStandardDate } from '@/utils/dateUtils';
import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

export const PostItem = ({
  post,
  baseURL = '/',
}: {
  post: SanityDocument;
  baseURL?: string;
}) => {
  return (
    <li
      className='group hover:underline hover:cursor-pointer relative w-full max-w-[550px] z-10'
      key={post._id}
    >
      <Link href={`${baseURL}${post.slug.current}`} prefetch={true}>
        {post._type === 'review-post' && (
          <RatingIcon className='absolute top-2 right-2 z-10 transition duration-300 ease-in-out'>
            {post.rating}
          </RatingIcon>
        )}
        {post._type === 'stock-analysis-post' && (
          <>
            <div
              className={`absolute top-2 left-2 z-10 ${post.recommended ? 'text-green-600 border-green-600' : 'text-red-600 border-red-600'} font-bold bg-orange-100 border-l-4 px-2 py-1 border text-sm opacity-90`}
            >
              {post.recommended ? 'Sim' : 'Não'}
            </div>
            <div className='absolute top-2 right-2 z-10 bg-orange-600 border border-l-4 border-blue-600 px-2 py-1 text-sm font-bold text-white '>
              {post.type}
            </div>
          </>
        )}
        <div className='relative aspect-video w-full max-w-[100vw] md:max-w-[550px] max-h-[310px] overflow-hidden rounded-xl flex justify-center'>
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              className='rounded-xl group-hover:transform group-hover:scale-105 transition duration-300 ease-in-out w-auto object-contain'
              fill={true}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          ) : (
            <div className='aspect-video rounded-xl bg-transparent' />
          )}
        </div>
        <Heading heading='tertiary'>{post.title}</Heading>
        <p>{toStandardDate(post.publishedAt)}</p>
      </Link>
    </li>
  );
};
