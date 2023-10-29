const TextInput = ({ label, name, value, onChange, required }) => {
  return (
    <div className='campo-div'>
      <label>{label}:</label>
      <input type='text' name={name} value={value} required={required} onChange={onChange} />
    </div>
  );
};
export default TextInput;
