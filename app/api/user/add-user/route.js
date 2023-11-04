import { NextResponse } from 'next/server';
import { userDto } from '@/app/api/dto/user.dto';
import { promotionDto } from '@/app/api/dto/promotion.dto';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('foto');
  let foto = null;

  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    foto = buffer.toString('base64');
  }

  const userDataInsert = Object.fromEntries(formData);

  userDto.veryfyUserDataInsert(userDataInsert);
  await promotionDto.verifyIsPromotionActive();

  await userDto.createNewUser(userDataInsert, foto);

  console.log({ userDataInsert });
  return NextResponse.json(userDataInsert);
}
