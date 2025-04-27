import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { createUserUsersPost } from "@/client";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUpClick = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      return;
    }

    if (password != confirmPassword) {
      return;
    }

    console.log("clicked");

    try {
      const res = await createUserUsersPost({
        body: {
          email: email,
          username: username,
          password: password
        }
      })
      console.log(res);


      navigate("/sign-in")
    } catch (err) {
      console.error(err)
    } finally {
      console.log('done');
    }
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-sleep-dark-purple">
        <div className="bg-sleep-dark-purple/80 border border-sleep-purple/20 rounded-xl shadow-lg p-10 flex flex-col items-center w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-6">Sign up for Nea</h1>
          <form className="w-full flex flex-col items-center">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="mb-3 w-64 px-4 py-2 rounded bg-sleep-dark-purple/60 border border-sleep-purple/30 text-white focus:outline-none focus:ring-2 focus:ring-sleep-purple"
              autoComplete="username"
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mb-3 w-64 px-4 py-2 rounded bg-sleep-dark-purple/60 border border-sleep-purple/30 text-white focus:outline-none focus:ring-2 focus:ring-sleep-purple"
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mb-3 w-64 px-4 py-2 rounded bg-sleep-dark-purple/60 border border-sleep-purple/30 text-white focus:outline-none focus:ring-2 focus:ring-sleep-purple"
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mb-4 w-64 px-4 py-2 rounded bg-sleep-dark-purple/60 border border-sleep-purple/30 text-white focus:outline-none focus:ring-2 focus:ring-sleep-purple"
              autoComplete="new-password"
            />
            <Button size="lg" className="bg-sleep-purple hover:bg-sleep-light-purple text-white w-64 mb-2" onClick={handleSignUpClick}>
              Sign up
            </Button>
          </form>
          <div className="mt-6">
            <span className="text-white/70">Already have an account? </span>
            <Link to="/sign-in" className="text-sleep-purple hover:underline">Sign in</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp; 