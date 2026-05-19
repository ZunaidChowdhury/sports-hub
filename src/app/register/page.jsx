"use client";

import Link from 'next/link';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { authClient, gitHubSignIn, googleSignIn } from '@/lib/auth-client';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { LuChevronDown } from 'react-icons/lu';

const RegisterPage = () => {
  const router = useRouter();
  const [isHiddenPass, setIsHiddenPass] = useState(true);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, email, photoUrl, password } = Object.fromEntries(formData);

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoUrl,
    });

    if (data) {
      toast.success("Registration successful! Log in to continue.");
      setError(null);
      await authClient.signOut();
      router.push('/log-in');
    }

    if (error) {
      setError(error);
    }
  }

  return (
    <div className=" flex items-center justify-center bg-base-200 px-4 py-12 tablet:py-20">
      <div className="card border-zinc-200 w-full max-w-md bg-foreground shadow-lg p-8">
        <h1 className="text-xl tablet:text-2xl font-bold text-base-content">Create your account</h1>
        <p className="text-sm text-base-content/60 mb-6">to continue to Sports Hub</p>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button onClick={() => googleSignIn()} className="btn btn-outline border-zinc-200 hover:bg-zinc-100 w-full normal-case">
            {/* <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" /> */}
            <FcGoogle size={24} />

            Continue with Google
          </button>

          {
            //   <button onClick={() => gitHubSignIn()} className="btn btn-outline border-zinc-200 hover:bg-zinc-100 w-full normal-case">
            //   {/* <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5 mr-2" /> */}
            //   <FaGithub size={24} />
            //   Continue with GitHub
            // </button>
          }

        </div>

        <div className="divider text-xs text-base-content/40 uppercase">or</div>

        {/* Registration Form using Server Action */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {/* image url */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              name="photoUrl"
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email address</span>
            </label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {/* pass */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={isHiddenPass ? 'password' : 'text'}
                className="input input-bordered w-full pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button type="button" onClick={() => setIsHiddenPass(!isHiddenPass)} className="cursor-pointer absolute right-3 top-3 opacity-50">
                {isHiddenPass ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
          </div>

          {/* submit */}
          <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700 w-full mt-2">
            Register
          </button>

          {
            error && <p className='text-red-500 font-medium text-center'>
              {error?.message}
            </p>
          }
        </form>

        <p className="text-center text-sm mt-6 text-base-content/70">
          Have an account? <Link href="/log-in" className="text-theme-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage









