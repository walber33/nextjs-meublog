import { Heading, RatingIcon } from '@/components';
import { urlFor } from '@/utils';
import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

export const PostItem = ({ post }: { post: SanityDocument }) => {
  const image =
    post.image && urlFor(post.image)?.width(550)?.height(310)?.url();
  return (
    <li
      className='group hover:underline hover:cursor-pointer relative w-full max-w-[550px] z-10'
      key={post._id}
    >
      <Link href={`/${post.slug.current}`} prefetch={true}>
        {post._type === 'review-post' && (
          <RatingIcon className='absolute top-2 right-2 z-10 group-hover:rotate-6 transition duration-300 ease-in-out'>
            {post.rating}
          </RatingIcon>
        )}
        <div className='aspect-video max-w-[550px] max-h-[310px] overflow-hidden rounded-xl'>
          {image ? (
            <Image
              src={image}
              alt={post.title}
              className='aspect-video rounded-xl group-hover:transform group-hover:scale-150 transition duration-300 ease-in-out group-hover:rotate-3 '
              width='550'
              height='310'
            />
          ) : (
            <div className='aspect-video rounded-xl bg-transparent' />
          )}
        </div>
        <Heading heading='tertiary'>{post.title}</Heading>
        <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
      </Link>
    </li>
  );
};
