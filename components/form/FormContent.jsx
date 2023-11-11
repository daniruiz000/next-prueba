import ConditionsLink from '@/components/form/ConditionsLink';
import SubmitButton from '@/components/form/SubmitButton';
import FormFieldList from '@/components/form/FormFieldList';

import { fieldList } from '@/model/FormModel';

const FormContent = ({ handleSubmit, handleInputChange, isPhotoUploaded, handleShowConditions }) => {
  return (
    <form className='formulario' onSubmit={handleSubmit}>
      <FormFieldList fieldList={fieldList} handleInputChange={handleInputChange} isPhotoUploaded={isPhotoUploaded} />
      <SubmitButton onSubmit={handleSubmit} />
      <ConditionsLink onClick={handleShowConditions} />
    </form>
  );
};

export default FormContent;
