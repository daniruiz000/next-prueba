'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Murcielagos from '@/public/img/murcielagos.svg';
import Calabaza from '@/public/img/calabaza-smile.svg';
import HomeHeader from './HomeHeader';

const Home = () => {
  const router = useRouter();

  const handleGoToForm = () => {
    router.push('/form');
  };
  return (
    <div className='home'>
      <HomeHeader />
      <div className='container_container-up'>
        <h2>No dejes que te asusten...</h2>
        <Image alt='murcielago' src={Murcielagos} className='container_murcielagos' />
      </div>
      <div className='container_container-down'>
        <h2>Manda un selfie realmente aterrador y participa en el sorteo de un regalo espeluznante!!! </h2>
      </div>
      <div className='container_container-button'>
        <button onClick={handleGoToForm}>PARTICIPA</button>
        <Image alt='calabaza' src={Calabaza} className='container_calabaza' />
      </div>
    </div>
  );
};

export default Home;
