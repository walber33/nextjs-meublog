import Image from 'next/image';
import { urlFor } from '@/utils';
import { getImageDimensions, ResolvedSanityImage } from '@sanity/asset-utils';
export const ImageHandler = ({
  value: image,
}: {
  value: ResolvedSanityImage;
}) => {
  const { width, height } = getImageDimensions(image);
  const postImageUrl = image
    ? urlFor(image)?.width(width)?.height(height)?.url()
    : null;
  if (!postImageUrl) return null;
  return (
    <Image
      alt={''}
      src={postImageUrl}
      width={width}
      height={height}
      className={`aspect-[${width}/${height}]`}
    />
  );
};
