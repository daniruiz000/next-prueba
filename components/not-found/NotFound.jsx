import { useNavigate } from 'react-router-dom';
import Calabaza from '@/public/img/calabaza-smile.svg';
import Image from 'next/image';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className='notice'>
      <div className='notice_header'>
        <h2 className='notice_title'> 404 Pagina no encontrada</h2>
        <Image className='container-down_calabaza' alt='calabaza' src={Calabaza} onClick={handleClick} />
      </div>
    </div>
  );
};

export default NotFound;
