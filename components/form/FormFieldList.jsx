import InputField from './fields/InputField';

const FormFieldList = ({ fieldList, handleInputChange, isPhotoUploaded }) => {
  return (
    <div>
      {fieldList.map((field) => (
        <InputField
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.name}
          options={field.options}
          nameTarget={field.nameTarget}
          onChange={handleInputChange}
          isPhotoUploaded={isPhotoUploaded}
        />
      ))}
    </div>
  );
};

export default FormFieldList;
