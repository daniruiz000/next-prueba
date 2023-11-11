import AddFile from './AddFile';
import AddSelect from './AddSelect';
import AddText from './AddText';

const InputField = ({ type, name, label, options, nameTarget, onChange, isPhotoUploaded }) => {
  if (type === 'select') {
    return <AddSelect name={name} options={options} onChange={onChange} nameTarget={nameTarget} />;
  }

  if (type === 'file') {
    if (name === 'foto') {
      return <AddFile name={name} label={label} onChange={onChange} isFileUploaded={isPhotoUploaded} />;
    }
  }

  if (type === 'text') {
    return <AddText name={name} label={label} onChange={onChange} />;
  }
};

export default InputField;
