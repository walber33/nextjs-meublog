import { Heading, RatingIcon } from '@/components';
import { urlFor } from '@/utils';
import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

export const PostItem = ({ post }: { post: SanityDocument }) => {
  const image = post.image && urlFor(post.image)?.height(310).url();
  return (
    <li
      className='group hover:underline hover:cursor-pointer relative w-full max-w-[550px] z-10'
      key={post._id}
    >
      <Link href={`/${post.slug.current}`} prefetch={true}>
        {post._type === 'review-post' && (
          <RatingIcon className='absolute top-2 right-2 z-10 transition duration-300 ease-in-out'>
            {post.rating}
          </RatingIcon>
        )}
        <div className='aspect-video w-full max-w-[100vw] md:max-w-[550px] max-h-[310px] overflow-hidden rounded-xl flex justify-center'>
          {image ? (
            <Image
              src={image}
              alt={post.title}
              className='rounded-xl group-hover:transform group-hover:scale-105 transition duration-300 ease-in-out w-auto'
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
