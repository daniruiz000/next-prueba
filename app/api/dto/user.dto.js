import { PrismaClient } from '@prisma/client';
import { userOdm } from '@/app/api/odm/user.odm';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const countUsers = async () => {
  const userCount = await prisma.user.count();
  return NextResponse.json(userCount);
};

const getAllUser = async () => {
  const userList = await prisma.user.findMany();
  return NextResponse.json(userList);
};

const createNewUser = async (userDataInsert, foto) => {
  const userSaved = await userOdm.saveUser(userDataInsert, foto);
  return NextResponse.json(userSaved);
};

const veryfyUserDataInsert = async (userDataInsert) => {
  userOdm.verifyValidProperties(userDataInsert);

  const { nombre, apellido, segundo_apellido, telefono, email } = userDataInsert;

  if (nombre && !userOdm.validateNombre(nombre)) {
    NextResponse.json('El nombre proporcionado no cumple con los requisitos');
  }

  if (apellido && !userOdm.validateApellido(apellido)) {
    NextResponse.json('El apellido proporcionado no cumple con los requisitos');
  }

  if (segundo_apellido && !userOdm.validateSegundoApellido(segundo_apellido)) {
    NextResponse.json('El segundo apellido proporcionado no cumple con los requisitos');
  }

  if (email && !userOdm.validateEmail(email)) {
    NextResponse.json('El correo electrónico proporcionado no cumple con los requisitos');
  }

  if (telefono && !userOdm.validatePhoneNumber(telefono)) {
    NextResponse.json('El número de teléfono proporcionado no cumple con los requisitos');
  }
  return true;
};

export const userDto = {
  countUsers,
  getAllUser,
  createNewUser,
  veryfyUserDataInsert
};
