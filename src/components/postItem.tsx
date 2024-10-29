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
      className='hover:underline hover:cursor-pointer relative w-full max-w-[550px] '
      key={post._id}
    >
      <Link href={`/${post.slug.current}`} prefetch={true}>
        {post._type === 'review-post' && (
          <RatingIcon className='absolute top-2 right-2'>
            {post.rating}
          </RatingIcon>
        )}
        {image ? (
          <Image
            src={image}
            alt={post.title}
            className='aspect-video rounded-xl'
            width='550'
            height='310'
          />
        ) : (
          <div className='aspect-video rounded-xl bg-transparent' />
        )}
        <Heading heading='tertiary'>{post.title}</Heading>
        <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
      </Link>
    </li>
  );
};
