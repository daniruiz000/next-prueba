import Calabaza from '@/public/img/calabaza-smile.svg';
import Image from 'next/image';

const Correct = () => {
  return (
    <div className='notice'>
      <div className='notice_header'>
        <h2 className='notice_title'> Usuario registrado!</h2>
        <h2 className='notice_title'> Muchas gracias!!!</h2>
        <Image alt='calabaza' className='container-down_calabaza' src={Calabaza} />
      </div>
    </div>
  );
};

export default Correct;
