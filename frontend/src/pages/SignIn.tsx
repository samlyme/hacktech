import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { signIn } from "@/services/auth";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignInClick = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      return;
    }


    console.log("clicked");

    try {
      const access_token = await signIn(username, password);
      console.log(access_token);

      // Optionally, redirect user to a protected route
      // For example: history.push('/dashboard');
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
          <h1 className="text-3xl font-bold text-white mb-6">Sign in to Nea</h1>
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mb-4 w-64 px-4 py-2 rounded bg-sleep-dark-purple/60 border border-sleep-purple/30 text-white focus:outline-none focus:ring-2 focus:ring-sleep-purple"
              autoComplete="current-password"
            />
            <Button size="lg" className="bg-sleep-purple hover:bg-sleep-light-purple text-white w-64 mb-2" onClick={handleSignInClick}>
              Sign in
            </Button>
          </form>
          <div className="mt-6">
            <span className="text-white/70">Don't have an account? </span>
            <Link to="/sign-up" className="text-sleep-purple hover:underline">Sign up</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;