import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../actions/user";
import FloatingNavBar from "./FloatingNavBar";

function Home() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const onSignIn = (e) => {
    e.preventDefault();
    dispatch(handleLogin(form));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <FloatingNavBar />
      Home
    </div>
  );
}

export default Home;