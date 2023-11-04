import { NextResponse } from 'next/server';
import { promotionDto } from '@/app/api/dto/promotion.dto';
import { excelDto } from '@/app/api/dto/excel.dto';

import fs from 'fs';
import path from 'path';

export async function GET(req, res) {
  try {
    promotionDto.verifyValidCredentials(req);
    const workbook = await excelDto.createExcelWithUsers();

    const fileName = `users_${SQL_DATABASE}.xlsx`;
    const filePath = path.join(__dirname, fileName);

    await workbook.xlsx.writeFile(filePath);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    const fileStream = fs.createReadStream(filePath);

    fileStream.pipe(res);

    fileStream.on('end', () => {
      fs.unlinkSync(filePath);
      res.json({ filePath, status: 200 });
    });

    console.log('Excel enviado correctamente.');
  } catch (error) {
    console.error('Error al generar y enviar el archivo Excel:', error);

    res.status(500).send('Error al generar el archivo Excel');
  }
}
