const ConditionsLink = ({ onClick }) => {
  const handleLinkClick = (event) => {
    event.preventDefault();
    onClick();
  };

  return (
    <div>
      <a href='#' onClick={handleLinkClick}>
        Conditions de uso
      </a>
    </div>
  );
};

export default ConditionsLink;
