const loginFormDom = document.querySelector('.loginForm');
const userNameInput = document.querySelector('.name-input');
const passwordInput = document.querySelector('.password-input');

loginFormDom.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!userNameInput.value || !passwordInput.value) return;
  const name = userNameInput.value;
  const password = passwordInput.value;
  const user = { name, password };
  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.status === 200) {
      console.log('TRUE');
    }
  } catch (error) {
    console.log(error);
  }
});
