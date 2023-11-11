import dotenv from 'dotenv';
import { fieldList } from '../model/FormModel';

dotenv.config();

export const createInitialInsertData = () => {
  const initialInsertData = {};
  for (const field of fieldList) {
    if (field.type === 'select') {
      initialInsertData[field.name] = field.options[0];
      initialInsertData[field.nameTarget] = '';
    } else {
      initialInsertData[field.name] = null;
    }
  }
  return initialInsertData;
};

export const insertDataToForm = (validatedData) => {
  const formData = new FormData();

  for (const field of fieldList) {
    if (field.type === 'file') {
      if (validatedData[field.name]) {
        formData.append(field.name, validatedData[field.name]);
      }
    } else if (field.type === 'select') {
      formData.append(validatedData[field.name], validatedData[field.nameTarget].toUpperCase());
    } else if (field.type === 'text') {
      formData.append(field.name, validatedData[field.name]);
    }
  }

  return formData;
};

export const addUserToDataBaseAndNavigateToCorrectPage = async (formData, router, showAlert) => {
  const API_URL = process.env.NEXT_API_URL;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      navigate('/correct');
    } else {
      const errorText = await response.text();
      const errorTextParsed = errorText.replace('"error":"', '').replace('"', '');
      showAlert({ type: 'alert', message: errorTextParsed });
    }
  } catch (error) {
    showAlert({ type: 'alert', message: 'Error en la comunicación con el Servidor. Por favor, inténtelo de nuevo más tarde.' });
  }
};
