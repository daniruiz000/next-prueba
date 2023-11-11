import { DateTime } from 'luxon';
import { isPromotionOpened, isPromotionClosed, isMaxNumOfUsers } from '@/utils/promotionUtils';
import { NextResponse } from 'next/server';

const authEmail = process.env.NEXT_AUTH_EMAIL;
const authPassword = process.env.NEXT_AUTH_PASSWORD;
const timezone = process.env.NEXT_TIME_ZONE;
const maxUsersLimit = parseInt(process.env.NEXT_PROMOTION_MAX_USERS_LIMIT) || undefined;
const startDate = process.env.NEXT_PROMOTION_START_DATE;
const startDateParsed = DateTime.fromFormat(startDate, 'yyyy-MM-dd HH:mm:ss', { zone: timezone }) || undefined;
const finishDate = process.env.NEXT_PROMOTION_FINISH_DATE;
const finishDateParsed = DateTime.fromFormat(finishDate, 'yyyy-MM-dd HH:mm:ss', { zone: timezone }) || undefined;
const formatDate = process.env.NEXT_FORMAT_DATE_MOMENT;

export const verifyIsPromotionActive = async () => {
  const isBeforeStartDate = isPromotionOpened();
  if (isBeforeStartDate) {
    const formattedStartDate = startDateParsed.toFormat(formatDate);
    return NextResponse.json({ message: `Todavía no se pueden añadir usuarios hasta ${formattedStartDate}.`, status: 400 });
  }

  const isAfterFinishDate = isPromotionClosed();
  if (isAfterFinishDate) {
    const formattedFinishDate = finishDateParsed.toFormat(formatDate);
    return NextResponse.json({
      message: `Se ha alcanzado la fecha de finalización ${formattedFinishDate}, no se pueden añadir más usuarios`,
      status: 400
    });
  }

  await verifyLimitOfUsers();
};

export const verifyLimitOfUsers = async () => {
  if (maxUsersLimit) {
    const isMaxNumberOfUsers = await isMaxNumOfUsers();

    if (isMaxNumberOfUsers) {
      return NextResponse.json({ message: 'Se ha alcanzado el límite máximo de usuarios permitidos que se pueden registrar', status: 400 });
    }
  }
};

export const verifyValidCredentials = (req) => {
  if (req.email !== authEmail || req.password !== authPassword) {
    return NextResponse.json({ message: 'No estás autorizado a realizar esta acción.', status: 403 });
  }

  if (!req.email || !req.password) {
    return NextResponse.json({ message: 'Se deben especificar los campos email y password', status: 403 });
  }
};

export const promotionDto = {
  verifyIsPromotionActive,
  verifyLimitOfUsers,
  verifyValidCredentials
};
