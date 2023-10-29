const FileUpload = ({ onChange }) => {
  return (
    <div className='campo-div'>
      <label>Foto:</label>
      <label className='file-upload-label' htmlFor='file-upload'>
        Subir Foto
      </label>
      <input type='file' name='photo' id='file-upload' accept='image/*' onChange={onChange} style={{ display: 'none' }} />
    </div>
  );
};
export default FileUpload;
