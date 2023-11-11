const AddFile = ({ name, label, onChange, isFileUploaded }) => {
  if (name === 'foto') {
    return (
      <div className='formulario_campo-div'>
        <label>{label}</label>
        <button type='button' name='file' onClick={() => document.querySelector(`input[name=${name}]`).click()}>
          Subir {label.charAt(0).toUpperCase() + label.slice(1)}
        </button>
        <input type='file' name={name} accept='image/*' onChange={onChange} />
        {isFileUploaded && <p>{label.charAt(0).toUpperCase() + label.slice(1)} subida !!!</p>}
      </div>
    );
  }
};

export default AddFile;
