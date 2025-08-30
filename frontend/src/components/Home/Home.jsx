import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../actions/user";

function Home() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const onSignIn = (e) => {
    e.preventDefault();
    dispatch(handleLogin(form));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[url('./src/assets/SG-1.jpg')] bg-cover bg-center">
      Home
    </div>
  );
}

export default Home;