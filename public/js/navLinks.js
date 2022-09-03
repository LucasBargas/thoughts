const navLinks = () => {
  const links = document.querySelectorAll('.header-navbar ul a');

  links[0].classList.add('active');

  const handleClickOnLinks = ({ target }) => {
    links.forEach((link) => link.classList.remove('active'));
    target.classList.add('active');
  };

  links.forEach((link) => {
    link.addEventListener('click', handleClickOnLinks);
  });
};

export default navLinks;
