const isValidateName = (name) => {
  const nameRegex = /^[A-Za-zÁ-ÿ\s]{3,19}$/;
  return nameRegex.test(name);
};

const isValidateNombre = (nombre) => {
  return isValidateName(nombre);
};

const isValidateApellido = (apellido) => {
  return isValidateName(apellido);
};

const isValidateSegundoApellido = (segundo_apellido) => {
  return isValidateName(segundo_apellido);
};

const isValidatePhoneNumber = (telefono) => {
  const phoneRegex = /^(34|\+34|0034)?[6789]\d{8}$/;

  return phoneRegex.test(telefono);
};

const isValidateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

const isValidateDNI = (dni) => {
  const dniRegex = /^\d{8}[A-Za-z]$/i;
  const authLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';

  if (!dniRegex.test(dni.toUpperCase())) {
    return false;
  }

  const letterIndex = parseInt(dni, 10) % 23;
  const validLetter = authLetters.charAt(letterIndex).toUpperCase();

  return validLetter === dni.charAt(8).toUpperCase();
};

const isValidateNIE = (nie) => {
  const nieRegex = /^[XYZ]\d{7}[A-Za-z]$/i;
  const authLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const nieMap = { X: 0, Y: 1, Z: 2 };

  if (!nieRegex.test(nie.toUpperCase())) {
    return false;
  }

  const letterIndex = (nieMap[nie.charAt(0).toUpperCase()] * 7 + parseInt(nie.substring(1, 8), 10)) % 23;
  const validLetter = authLetters.charAt(letterIndex).toUpperCase();
  return validLetter === nie.charAt(8).toUpperCase();
};

export const checkDataInsertIsCompleteAndCorrect = (data, setShowNotice) => {
  const validatedData = {};

  if (!isValidateNombre(data.nombre)) {
    setShowNotice({ type: 'alert', message: 'Los datos introducidos en el campo "nombre" no son válidos' });
    return false;
  }

  if (!isValidateApellido(data.apellido)) {
    setShowNotice({ type: 'alert', message: 'Los datos introducidos en el campo "apellido" no son válidos' });
    return false;
  }

  if (!isValidateSegundoApellido(data.segundo_apellido)) {
    setShowNotice({ type: 'alert', message: 'Los datos introducidos en el campo "segundo apellido" no son válidos' });
    return false;
  }

  if (!isValidatePhoneNumber(data.telefono)) {
    setShowNotice({ type: 'alert', message: 'Los datos introducidos en el campo "telefono" no son válidos' });
    return false;
  }

  if (!isValidateEmail(data.email)) {
    setShowNotice({ type: 'alert', message: 'Los datos introducidos en el campo "email" no son válidos' });
    return false;
  }

  if (data.idType === 'dni') {
    const isValidDni = isValidateDNI(data.idNumber);
    if (!isValidDni) {
      setShowNotice({ type: 'alert', message: 'El DNI introducido no es válido.' });
      return false;
    }
  }

  if (data.idType === 'nie') {
    if (!isValidateNIE(data.idNumber)) {
      setShowNotice({ type: 'alert', message: 'El NIE introducido no es válido.' });
      return false;
    }
  }

  Object.assign(validatedData, data);

  return validatedData;
};
