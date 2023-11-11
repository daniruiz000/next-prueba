import { useConditions } from '../../model/FormModel';

const Notice = ({ type, message, handleCloseNotice, isConditionsAcepted, handleAceptConditions }) => {
  if (type === 'alert') {
    return (
      <div className='alert-div'>
        <div className='alert-content'>
          <h2>Alerta</h2>
          <h3>{message}</h3>
          <button onClick={handleCloseNotice}>Cerrar</button>
        </div>
      </div>
    );
  } else if (type === 'notice') {
    return (
      <div className='avisoFoto-div'>
        <div className='avisoFoto-content'>
          <h3>{message}</h3>
          <button onClick={handleCloseNotice}>Cerrar</button>
        </div>
      </div>
    );
  } else if (type === 'conditions') {
    return (
      <div className='condiciones'>
        <div className='condiciones_content'>
          <h2>Condiciones de uso</h2>
          <h3>Debes aceptar las condiciones de uso para poder inscribirte.</h3>
          <p>{useConditions}</p>
          <label>
            <input type='checkbox' onChange={handleAceptConditions} checked={isConditionsAcepted} />
            Aceptar
          </label>
          <button onClick={handleCloseNotice}>Cerrar</button>
        </div>
      </div>
    );
  }
};

export default Notice;
