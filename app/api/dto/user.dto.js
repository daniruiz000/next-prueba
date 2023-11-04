import { PrismaClient } from '@prisma/client';
import { userOdm } from '@/app/api/odm/user.odm';

const prisma = new PrismaClient();

const countUsers = async () => {
  const userCount = await prisma.user.count();
  return userCount;
};

const getAllUser = async () => {
  const userList = await prisma.user.findMany();
  return userList;
};

const createNewUser = async (userDataInsert, foto) => {
  const userSaved = await userOdm.saveUser(userDataInsert, foto);

  return userSaved;
};

const veryfyUserDataInsert = async (userDataInsert) => {
  userOdm.verifyValidProperties(userDataInsert);

  const { nombre, apellido, segundo_apellido, telefono, email } = userDataInsert;

  if (nombre && !userOdm.validateNombre(nombre)) {
    throw new Error('El nombre proporcionado no cumple con los requisitos');
  }

  if (apellido && !userOdm.validateApellido(apellido)) {
    throw new Error('El apellido proporcionado no cumple con los requisitos');
  }

  if (segundo_apellido && !userOdm.validateSegundoApellido(segundo_apellido)) {
    throw new Error('El segundo apellido proporcionado no cumple con los requisitos');
  }

  if (email && !userOdm.validateEmail(email)) {
    throw new Error('El correo electrónico proporcionado no cumple con los requisitos');
  }

  if (telefono && !userOdm.validatePhoneNumber(telefono)) {
    throw new Error('El número de teléfono proporcionado no cumple con los requisitos');
  }
};

export const userDto = {
  countUsers,
  getAllUser,
  createNewUser,
  veryfyUserDataInsert
};
