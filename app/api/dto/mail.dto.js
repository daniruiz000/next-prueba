import nodemailer from 'nodemailer';
import moment from 'moment-timezone';
import { NextResponse } from 'next/server';

import { excelDto } from './excel.dto';

const emailService = process.env.EMAIL_SERVICE;
const emailSender = process.env.EMAIL_SENDER;
const emailSenderPassword = process.env.EMAIL_SENDER_PASSWORD;
const emailReciver = process.env.EMAIL_RECIVER;
const database = process.env.SQL_DATABASE;
const promotion = process.env.PROMOCION_NAME;
const timezone = process.env.TIME_ZONE;

const sendExcelByEmail = async (workbook) => {
  try {
    const actualDate = moment.tz(timezone);
    const actualDateParsed = actualDate.toLocaleString();

    const excelBuffer = await workbook.xlsx.writeBuffer();

    const transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailSender,
        pass: emailSenderPassword
      }
    });

    const mailOptions = {
      from: emailSender,
      to: emailReciver,
      subject: `Excel de usuarios de la promoción: ${database}.`,
      text: `
      Hola, buenas.
      Adjunto encontrarás el archivo Excel con la información de los usuarios inscritos en la promoción de ${promotion}.
      Muchas gracias.
      Un saludo.
      `,
      attachments: [{ filename: `usuarios-${promotion}.xlsx`, content: Buffer.from(excelBuffer) }]
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return NextResponse.json(`Error al enviar el correo ${error}`, 400);
      }
      console.log(`Correo electrónico enviado a: ${emailReciver} con fecha: ${actualDateParsed}`);
    });
  } catch (error) {
    return NextResponse.json('Error al crear el correo', 500);
  }
};

export const sendExcelWithUsersByMail = async () => {
  const workbook = await excelDto.createExcelWithUsers();
  await mailDto.sendExcelByEmail(workbook);
};

export const mailDto = {
  sendExcelByEmail,
  sendExcelWithUsersByMail
};
