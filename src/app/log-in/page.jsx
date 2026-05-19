"use client";

import Link from 'next/link';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from "next/navigation";
import { authClient, gitHubSignIn, googleSignIn } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const LogInPage = () => {
  const router = useRouter();
  const [isHiddenPass, setIsHiddenPass] = useState(true);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (data) {
      toast.success("Login successful!", {autoClose: 3000,});
      router.push('/');
    }
    if (error) {
      setError(error);
    }
  }
  return (
    <div className=" flex items-center justify-center bg-base-200 px-4 py-12 tablet:py-20">
      <div className="card border border-zinc-200 w-full max-w-md bg-foreground shadow-lg p-8">
        <h1 className="text-xl tablet:text-2xl font-bold text-base-content">Log in</h1>
        <p className="text-sm text-base-content/60 mb-6">to continue to Sports Hub</p>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button onClick={() => googleSignIn()} className="btn btn-outline border-zinc-200 hover:bg-zinc-100 w-full normal-case">
            {/* <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" /> */}
            <FcGoogle size={24} />

            Continue with Google
          </button>
          {
            // <button onClick={() => gitHubSignIn ()} className="btn btn-outline border-zinc-200 hover:bg-zinc-100 w-full normal-case">
            //   {/* <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5 mr-2" /> */}
            //   <FaGithub size={24} />
            //   Continue with GitHub
            // </button>
          }
        </div>

        <div className="divider text-xs text-base-content/40 uppercase">or</div>

        {/* Registration Form using Server Action */}
        <form onSubmit={handleLogin} className="space-y-4">

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email address</span>
            </label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={isHiddenPass ? 'password' : 'text'}
                className="input input-bordered w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button type="button" onClick={() => setIsHiddenPass(!isHiddenPass)} className="cursor-pointer absolute right-3 top-3 opacity-50">
                {isHiddenPass ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700 w-full mt-2">
            Log in
          </button>
          {
            error && <p className='text-red-500 font-medium text-center'>
              {error?.message}
            </p>
          }
        </form>

        <p className="text-center text-sm mt-6 text-base-content/70">
          No account? <Link href="/register" className="text-theme-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default LogInPage