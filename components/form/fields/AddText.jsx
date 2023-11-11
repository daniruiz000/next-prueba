const AddText = ({ name, label, onChange }) => {
  return (
    <div className='formulario_campo-div'>
      <label type='text'>{label}:</label>
      <input type='text' name={name} onChange={onChange} required />
    </div>
  );
};

export default AddText;
