import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { insertDataToForm, addUserToDataBaseAndNavigateToCorrectPage, createInitialInsertData } from '@/utils/formUtils';
import { checkDataInsertIsCompleteAndCorrect } from '@/utils/dataUtils';

import FormContent from './FormContent';
import Notice from './Notice';

const Form = () => {
  const router = useRouter();

  const initialInsertData = createInitialInsertData();
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

  const [insertDataByUser, setInsertDataByUser] = useState(initialInsertData);
  const [showNotice, setShowNotice] = useState({ type: null, message: null });
  const [isConditionsAcepted, setIsConditionsAcepted] = useState(false);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { type, name, value, files } = event.target;
    if (type !== 'file') {
      setInsertDataByUser({
        ...insertDataByUser,
        [name]: value
      });
    }

    if (type === 'file') {
      const file = files?.[0] ?? null;
      setInsertDataByUser({
        ...insertDataByUser,
        [name]: file
      });
      if (file) {
        if (name === 'foto') {
          setIsPhotoUploaded(true);
        }
        setShowNotice({ type: 'notice', message: `${name.charAt(0).toUpperCase() + name.slice(1)} subida !!!` });
      }
    }
  };

  const handleCloseNotice = () => {
    setShowNotice({ type: null, message: null });
  };

  const handleAceptConditions = () => {
    setIsConditionsAcepted(!isConditionsAcepted);
  };

  const handleShowConditions = () => {
    setShowNotice({ type: 'conditions' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataChecked = checkDataInsertIsCompleteAndCorrect(insertDataByUser, setShowNotice);
    if (dataChecked) {
      if (!isConditionsAcepted) {
        setShowNotice({ type: 'conditions' });
        return;
      }
      const userFormData = insertDataToForm(dataChecked);
      await addUserToDataBaseAndNavigateToCorrectPage(userFormData, router, setShowNotice);
    }
  };

  return (
    <div className='formulario_container'>
      <FormContent
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleShowConditions={handleShowConditions}
        isPhotoUploaded={isPhotoUploaded}
      />

      {showNotice && (
        <Notice
          type={showNotice.type}
          message={showNotice.message}
          handleCloseNotice={handleCloseNotice}
          handleAceptConditions={handleAceptConditions}
          isConditionsAcepted={isConditionsAcepted}
        />
      )}
    </div>
  );
};

export default Form;
