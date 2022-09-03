const showPasswords = () => {
  const check = document.querySelector('#check');
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confirmpassword');

  const checkPassowrd = () => {
    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  };

  const checkConfirmPassword = () => {
    if (confirmPassword.type === 'password') {
      confirmPassword.type = 'text';
    } else {
      confirmPassword.type = 'password';
    }
  };

  const handleClick = () => {
    checkPassowrd();
    checkConfirmPassword();
  };

  if (password || confirmPassword) {
    check.addEventListener('click', handleClick);
  }
};

export default showPasswords;
