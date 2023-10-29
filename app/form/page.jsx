'use client';
import { useState } from 'react';
import { fetchFunction } from '../../utils/fetchFunction';
import { insertDataToForm, checkFormIsCompleteAndCorrect } from '../../utils/dataUtils';

import ConditionsLink from '../../components/ConditionsLink';
import Conditions from '../../components/Conditions';
import TextInput from '../../components/TextInput';
import FileUpload from '../../components/FileUpload';
import Alert from '../../components/Alert';
import PhotoNotice from '../../components/PhotoNotice';
import { useRouter } from 'next/navigation';

const Form = () => {
  const router = useRouter();

  const [data, setData] = useState({
    nombre: '',
    apellido: '',
    segundo_apellido: '',
    email: '',
    telefono: '',
    foto: null
  });

  const [showConditionsNotice, setShowConditionsNotice] = useState(false);
  const [isConditionsAcepted, setIsConditionsAcepted] = useState(false);

  const [isAlert, setIsAlert] = useState(null);

  const [isPhotoUploaded, setPhotoUploaded] = useState(false);
  const [showPhotoUploadedNotice, setShowPhotoUploadedNotice] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleFotoChange = (event) => {
    const foto = event.target.files?.[0] ?? null;
    setData({ ...data, foto });

    if (foto) {
      setPhotoUploaded(true);
      setShowPhotoUploadedNotice('Foto subida !!!');
    } else {
      setPhotoUploaded(false);
      setShowPhotoUploadedNotice(null);
    }
  };

  const handleShowConditions = () => {
    setShowConditionsNotice(true);
  };

  const handleCloseConditions = () => {
    setShowConditionsNotice(false);
  };

  const handleAceptConditions = () => {
    setIsConditionsAcepted(!isConditionsAcepted);
  };

  const showAlert = (message) => {
    setIsAlert({ message });
  };

  const closeAlert = () => {
    setIsAlert(null);
  };

  const closePhotoNotice = () => {
    setShowPhotoUploadedNotice(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isConditionsAcepted) {
      handleShowConditions();
      return;
    }

    const isFormCompleted = checkFormIsCompleteAndCorrect(data, showAlert);

    if (isFormCompleted) {
      const formData = insertDataToForm(data, showAlert);
      const isUserSaveCorrectly = await fetchFunction(formData, showAlert);

      if (isUserSaveCorrectly) {
        router.push('/correct');
      }
    }
  };

  return (
    <div className='formulario-container'>
      <form className='formulario' onSubmit={handleSubmit}>
        <TextInput label='Nombre' name='nombre' value={data.nombre} onChange={handleInputChange} required={true} />
        <TextInput label='Apellido' name='apellido' value={data.apellido} onChange={handleInputChange} required={true} />
        <TextInput
          label='Segundo Apellido'
          name='segundo_apellido'
          value={data.segundo_apellido}
          onChange={handleInputChange}
          required={true}
        />
        <TextInput label='Email' name='email' value={data.email} onChange={handleInputChange} required={true} />
        <TextInput label='Telefono' name='telefono' value={data.telefono} onChange={handleInputChange} required={true} />
        <FileUpload onChange={handleFotoChange} />
        {isPhotoUploaded && <p>Foto subida !!!</p>}
        <div>
          <button type='submit' onClick={handleSubmit}>
            Enviar
          </button>
        </div>
        <ConditionsLink onClick={handleShowConditions} />
      </form>

      {showConditionsNotice && (
        <Conditions
          handleCloseConditions={handleCloseConditions}
          isConditionsAcepted={isConditionsAcepted}
          handleAceptConditions={handleAceptConditions}
        />
      )}

      {showPhotoUploadedNotice && <PhotoNotice message={showPhotoUploadedNotice} onClose={closePhotoNotice} />}

      {isAlert && <Alert message={isAlert.message} onClose={closeAlert} />}
    </div>
  );
};

export default Form;
