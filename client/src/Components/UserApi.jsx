import { ENV } from "../Config/vars";

export const signUp = (userData) => {
    console.log("Sending user data to API:", userData);
    return fetch(`${ENV.apiUrl}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network Response Was Not Ok", Error);
            }
            return response.json();
        })
        .then((data) => {
            console.log("User Was Registered Successfully", data);
            return data;
        })
        .catch((error) => {
            console.log("Error While User Registration", error);
            throw error;
        });
};

  export const signIn = async (userData) => {
    try {
      const response = await fetch(`${ENV.apiUrl}/users/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error("Network Response Was Not Ok");
      }
      const data = await response.json();
      console.log("Login Successful", data);
      return data;
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    }
  };