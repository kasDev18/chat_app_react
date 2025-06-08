import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { login as loginRoute } from "../utils/api/routes";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (emailAddress, password) => {
    const success = handleInputError(emailAddress, password);
    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch(loginRoute, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress,
          password,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;

function handleInputError(emailAddress, password) {
  if (!emailAddress || !password) {
    toast.error("Please fill all the fields");
    return false;
  }

  return true;
}
