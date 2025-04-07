import Loading from '@/app/[slug]/loading';
import { Heading } from '@/components';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='container mx-auto min-h-screen max-w-screen-xl p-8'>
      <Heading heading='primary'>{'<Post/>'}</Heading>
      <Link href='/' className='hover:underline'>
        ← Voltar a página principal
      </Link>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
