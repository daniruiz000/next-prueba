import { DateTime } from 'luxon';
import dotenv from 'dotenv';

dotenv.config();
console.log('NEXT_PROMOTION_START_DATE:', process.env.NEXT_PROMOTION_START_DATE);
console.log('NEXT_PROMOTION_FINISH_DATE:', process.env.NEXT_PROMOTION_FINISH_DATE);
const timezone = process.env.NEXT_TIME_ZONE;
const maxUsersLimit =
  process.env.NEXT_PROMOTION_MAX_USERS_LIMIT !== undefined ? parseInt(process.env.NEXT_PROMOTION_MAX_USERS_LIMIT) : undefined;
const startDate = process.env.NEXT_PROMOTION_START_DATE !== undefined ? process.env.NEXT_PROMOTION_START_DATE : undefined;
const finishDate = process.env.NEXT_PROMOTION_FINISH_DATE !== undefined ? process.env.NEXT_PROMOTION_FINISH_DATE : undefined;

let startDateParsed, finishDateParsed;

if (startDate) {
  startDateParsed = DateTime.fromFormat(startDate, 'yyyy-MM-dd HH:mm:ss').setZone(timezone, { keepLocalTime: true });
}

if (finishDate) {
  finishDateParsed = DateTime.fromFormat(finishDate, 'yyyy-MM-dd HH:mm:ss').setZone(timezone, { keepLocalTime: true });
}

let isMailSent = false;

export const isPromotionOpened = () => {
  if (!startDateParsed || !startDateParsed.isValid) {
    return false;
  }
  const actualDate = DateTime.local().setZone(timezone);
  return startDateParsed > actualDate;
};

export const isPromotionClosed = () => {
  if (!finishDateParsed || !finishDateParsed.isValid) {
    return false;
  }
  const actualDate = DateTime.local().setZone(timezone);
  return finishDateParsed < actualDate;
};

export const isMaxNumOfUsers = async () => {
  const numberOfUsers = await userDto.countUsers();
  const isMaxNumberOfUsers = maxUsersLimit && numberOfUsers >= maxUsersLimit;
  return isMaxNumberOfUsers;
};

export const checkPromotionIsFinishAndSendEmail = async () => {
  if (isMailSent) {
    return;
  }

  const isAfterFinishDate = isPromotionClosed();
  const isMaxNumberOfUsers = await isMaxNumOfUsers();
  if (!isAfterFinishDate && !isMaxNumberOfUsers) {
    return;
  }

  console.log('Ha finalizado la promoción. ¡Es hora de enviar el correo electrónico!');
  await mailDto.sendExcelWithUsersByMail();
  isMailSent = true;
};
