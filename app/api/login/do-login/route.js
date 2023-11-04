import { NextResponse } from 'next/server';

export const GET = async (req) => {
  try {
    promotionDto.verifyValidCredentials(req.body);
    const { email, password } = req.body;
    const jwtToken = generateToken(email, password);
    console.log('Usuario logado correctamente');
    return NextResponse.json({ token: jwtToken, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
};
