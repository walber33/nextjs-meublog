import { Heading } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Página não encontrada',
  description: 'A página que você está procurando não existe.',
};
export default function NotFoundPage() {
  return (
    <div className='mx-auto w-fit my-auto h-[100vh] content-center'>
      <Heading heading='primary'>404</Heading>
      <p>Página não encontrada</p>
    </div>
  );
}
