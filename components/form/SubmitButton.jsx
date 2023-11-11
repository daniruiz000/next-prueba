const SubmitButton = ({ onSubmit }) => {
  return (
    <div>
      <button type='submit' onClick={onSubmit}>
        Enviar
      </button>
    </div>
  );
};

export default SubmitButton;
