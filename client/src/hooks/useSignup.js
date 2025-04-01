import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({
    fullName,
    emailAddress,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputError({
      fullName,
      emailAddress,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          emailAddress,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();
      if(data.error) throw new Error(data.error);
      
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;

function handleInputError({
  fullName,
  emailAddress,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !emailAddress || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  return true;
}
