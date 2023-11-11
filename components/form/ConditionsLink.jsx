const ConditionsLink = ({ onClick }) => {
  const handleLinkClick = (event) => {
    event.preventDefault();
    onClick();
  };

  return (
    <div>
      <a href='#' onClick={handleLinkClick}>
        Condiciones de uso
      </a>
    </div>
  );
};

export default ConditionsLink;
