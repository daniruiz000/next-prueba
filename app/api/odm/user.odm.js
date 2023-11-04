import { PrismaClient } from '@prisma/client';
import { validUserPropertiesUser } from '@/app/api/user/userModel';

const prisma = new PrismaClient();

const validateNombre = (nombre) => {
  const nameRegex = /^[A-Za-zÁ-ÿ\s]{3,19}$/;
  return nameRegex.test(nombre.trim());
};

const validateApellido = (apellido) => {
  const nameRegex = /^[A-Za-zÁ-ÿ\s]{3,19}$/;
  return nameRegex.test(apellido.trim());
};

const validateSegundoApellido = (segundo_apellido) => {
  const nameRegex = /^[A-Za-zÁ-ÿ\s]{3,19}$/;
  return nameRegex.test(segundo_apellido.trim());
};

const validatePhoneNumber = (telefono) => {
  const phoneRegex = /^(34|\+34|0034)?[6789]\d{8}$/;
  return phoneRegex.test(telefono);
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const countUsers = async () => {
  const userCount = await prisma.user.count();
  return userCount;
};

const getAllUser = async () => {
  const userList = await prisma.user.findMany();
  return userList;
};

const saveUser = async (userDataInsert, foto) => {
  const userSaved = await prisma.user.create({
    data: {
      nombre: userDataInsert.nombre,
      apellido: userDataInsert.apellido,
      segundo_apellido: userDataInsert.segundo_apellido,
      telefono: userDataInsert.telefono,
      email: userDataInsert.email,
      foto: foto
    }
  });

  return userSaved;
};

const verifyValidProperties = (userDataInsert) => {
  const invalidProperties = Object.keys(userDataInsert).filter((property) => !validUserPropertiesUser.includes(property));
  const isInvalidProperties = invalidProperties.length > 0;

  if (isInvalidProperties) {
    throw new Error(`Actualización de usuario cancelada. Propiedades no válidas: ${invalidProperties.join(', ')}`);
  }
};

export const userOdm = {
  validateNombre,
  validateApellido,
  validateSegundoApellido,
  validatePhoneNumber,
  validateEmail,
  verifyValidProperties,
  countUsers,
  getAllUser,
  saveUser
};
