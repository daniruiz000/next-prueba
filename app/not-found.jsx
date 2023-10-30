'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Calabaza from '@/public/img/calabaza-smile.svg';

const NotFound = () => {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <div className='correct'>
      <div className='correct_header'>
        <h2 className='correct_title'> 404 Pagina no encontrada</h2>
        <Image priority alt='calabaza' className='container-down_calabaza' src={Calabaza} onClick={handleGoToHome} />
      </div>
    </div>
  );
};

export default NotFound;
