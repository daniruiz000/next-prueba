import styles from '@/styles/style.scss';
import localFont from 'next/font/local';
import Image from 'next/image';
import fondo from '@/public/img/fondo-halloween.svg';

const myFont = localFont({
  src: '../public/fonts/Grinched/GrinchedRegular.ttf',
  display: 'swap'
});

export const metadata = {
  title: 'Prueba de next',
  description: 'Front end de la prueba de next'
};

const RootLayout = ({ children }) => {
  return (
    <html lang='es'>
      <body className={`${styles} ${myFont.className}`}>
        <Image className='bg-img' alt='fondo' src={fondo} fill priority />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
