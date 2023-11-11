import Calabaza from '@/public/img/calabaza-smile.svg';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className='calabaza-container'>
      <Image className='calabaza-spinner' src={Calabaza} alt='Calabaza' />
    </div>
  );
};

export default Loading;
