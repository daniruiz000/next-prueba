const HomePage = ({ promotion }) => {
  return (
    <div className='home-page'>
      <div className='home-page_container'>
        <h3>BIENVENIDO AL SERVIDOR DE {promotion}.</h3>
        <p>Necesita logarse para poder tener acceso a los servicios de administrador.</p>
        <a href='/api/login'>Acceso a Login</a>
      </div>
    </div>
  );
};

export default HomePage;
