import { useNavigate } from 'react-router-dom';

import Calabaza from '../../assets/img/calabaza-smile.svg';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className='notice'>
      <div className='notice_header'>
        <h2 className='notice_title'> 404 Pagina no encontrada</h2>
        <img className='container-down_calabaza' src={Calabaza} onClick={handleClick} />
      </div>
    </div>
  );
};

export default NotFound;
