export const BASE_URL = "http://localhost/PHP/language-exchange-backend/api";

export const registerUser = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/register.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.error || "Registration failed");
  }

  return response;
};

export const loginUser = async (data) => {
  console.log(data);

  const response = await fetch(`${BASE_URL}/auth/login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.error || "login failed");
  }
  const result = await response.json();
  return result;
};
