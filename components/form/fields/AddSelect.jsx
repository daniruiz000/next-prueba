const AddSelect = ({ name, nameTarget, options, onChange }) => {
  return (
    <div className='formulario_campo-div'>
      <select name={name} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
      <input type='text' name={nameTarget} onChange={onChange} required />
    </div>
  );
};

export default AddSelect;
