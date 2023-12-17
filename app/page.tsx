import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import Header from './ui/Header';
import MyCard from './ui/card';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto mt-2'>
        {[1, 2, 3, 4, 5].map(t => (
          <MyCard key={t} />
        ))}
      </div>
    </main>
  );
}