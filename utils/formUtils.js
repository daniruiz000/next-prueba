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

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData
  });
  console.log({ response });
  if (response.ok) {
    router.push('/correct');
  } else {
    console.log({ response });
    showAlert({ type: 'alert', message: response.statusText });
  }
};
