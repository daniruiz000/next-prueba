'use client';

import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login/do-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.status === 200) {
        const data = await response.json();
        const { token } = data;
        setToken(token);
        setIsLoggedIn(true);
      } else {
        setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleGenerateExcel = async () => {
    try {
      const response = await fetch('/api/generate-excel', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        // Obtén el nombre del archivo del encabezado Content-Disposition
        const contentDisposition = response.headers.get('Content-Disposition');
        const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);

        if (filenameMatch && filenameMatch[1]) {
          const filename = filenameMatch[1];
          // Convierte la respuesta en un blob
          const blob = await response.blob();

          // Crea una URL del objeto blob
          const url = window.URL.createObjectURL(blob);

          // Crea un elemento de enlace para descargar el archivo
          const a = document.createElement('a');
          a.href = url;
          a.download = filename; // Utiliza el nombre original del archivo
          a.style.display = 'none';

          // Simula un clic en el enlace para descargar el archivo
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          // Limpia la URL
          window.URL.revokeObjectURL(url);
        } else {
          console.error('No se encontró el nombre del archivo en el encabezado Content-Disposition.');
        }
      } else {
        console.error('Error al generar el archivo Excel. Código de estado:', response.status);
      }
    } catch (error) {
      console.error('Error al generar el archivo Excel:', error);
    }
  };

  return (
    <div className='login-page-container'>
      <h1>Login</h1>
      <p className='login-text'>Ingresa tus credenciales para iniciar sesión:</p>
      <form className='login-page-container_form'>
        <label htmlFor='email' id='email_label'>
          Email:
        </label>
        <input type='email' id='email' name='email' required value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor='password' id='password_label'>
          Contraseña:
        </label>
        <input type='password' id='password' name='password' required value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type='button' id='loginButton' onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </form>
      {error && <div className='error-message'>{error}</div>}
      {isLoggedIn && (
        <div>
          <button id='generateExcelButton' className='generate-excel-button' onClick={handleGenerateExcel}>
            Generar Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
