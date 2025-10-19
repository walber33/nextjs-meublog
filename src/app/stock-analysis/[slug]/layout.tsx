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
      <Heading heading='primary'>{'<Stocks/>'}</Heading>
      <Suspense fallback={<Loading />}>
        <div className='min-h-[80vh]'>{children}</div>
      </Suspense>
      <Link
        href='/stock-analysis'
        className='relative hover:underline mt-2 p-3 block w-fit after:content-[""] after:absolute after:top-2 md:after:top-[0.955rem] after:left-0 md:after:left-[calc(18%+5px)] after:w-[calc(100%)] md:after:w-[calc(82%-10px)]  after:h-[calc(80%-10px)] md:after:h-[calc(70%-10px)] after:bg-cyan-900 after:opacity-20'
      >
        ← Voltar a página principal
      </Link>
    </main>
  );
}
