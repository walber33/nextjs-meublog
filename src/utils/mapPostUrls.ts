import { urlFor } from '@/utils/urlFor';
import { SanityDocument } from 'next-sanity';

export const mapPostsUrls = (
  { posts }: { posts: SanityDocument[] },
): SanityDocument[] => {
  posts.map((post) => {
    post.image = urlFor(post.image)?.height(310).url() || '';
  });
  return posts;
};