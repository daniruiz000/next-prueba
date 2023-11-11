'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Murcielagos from '@/public/img/murcielagos.svg';
import Calabaza from '@/public/img/calabaza-smile.svg';

const HomeContent = () => {
  const router = useRouter();

  const handleGoToForm = () => {
    router.push('/form');
  };

  return (
    <div>
      <div className='container'>
        <div className='container_up'>
          <h2 className='container_texto-no-dejes'>No dejes que te asusten...</h2>
          <Image alt='murcielago' src={Murcielagos} className='container_murcielagos' />
        </div>
        <h2 className='container_texto-manda-selfi'>
          Manda un selfie realmente aterrador y participa en el sorteo de un regalo espeluznante!!!{' '}
        </h2>
      </div>
      <div className='container-down'>
        <button onClick={handleGoToForm} className='container-down_button'>
          PARTICIPA
        </button>
        <Image alt='calabaza' src={Calabaza} className='container-down_calabaza' />
      </div>
    </div>
  );
};

export default HomeContent;
