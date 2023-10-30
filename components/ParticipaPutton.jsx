'use client';

import { useRouter } from 'next/navigation';

const ParticipaButton = () => {
  const router = useRouter();

  const handleGoToForm = () => {
    router.push('/form');
  };
  return (
    <button onClick={handleGoToForm} className='container-down_button'>
      PARTICIPA
    </button>
  );
};

export default ParticipaButton;
