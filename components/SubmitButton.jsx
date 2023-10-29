const SubmitButton = ({ onSubmit }) => {
  const handleSubmitClick = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div>
      <button type='submit' onClick={handleSubmitClick}>
        Enviar
      </button>
    </div>
  );
};

export default SubmitButton;
