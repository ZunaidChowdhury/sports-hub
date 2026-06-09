"use client";

import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { ThemeContext } from '@/context/theme-context'

import { authClient, gitHubSignIn, googleSignIn } from '@/lib/auth-client';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { LuChevronDown } from 'react-icons/lu';

const RegisterPage = () => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const [isHiddenPass, setIsHiddenPass] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
  });
  const [error, setError] = useState(null);

  const validatePassword = (value) => ({
    length: value.length >= 6,
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
  });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValidations(validatePassword(value));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, email, photoUrl } = Object.fromEntries(formData);
    const validations = validatePassword(password);
    setPasswordValidations(validations);

    if (!validations.length || !validations.uppercase || !validations.lowercase) {
      setError({ message: 'Password must be at least 6 characters and include both uppercase and lowercase letters.' });
      return;
    }

    const { data, error: authError } = await authClient.signUp.email({
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

    if (authError) {
      setError(authError);
    }
  }

  return (
    <div className={`flex items-center justify-center px-4 py-12 tablet:py-20 ${isDark ? 'bg-background text-text-white' : 'bg-base-200 text-text-primary'}`}>
      <div className={`card border w-full max-w-md bg-foreground shadow-lg p-8 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <h1 className={`text-xl tablet:text-2xl font-bold ${isDark ? 'text-text-white' : 'text-text-primary'}`}>Create your account</h1>
        <p className={`text-sm mb-6 ${isDark ? 'text-text-secondary' : 'text-base-content/60'}`}>to continue to Sports Hub</p>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => googleSignIn()}
            className={`btn btn-outline w-full normal-case ${isDark ? 'border-zinc-700 hover:bg-zinc-900 hover:text-white shadow-sm shadow-zinc-700' : 'border-zinc-200 hover:bg-zinc-100 hover:text-black shadow-sm shadow-zinc-200'}`}
          >
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

        <div className={`divider  text-xs uppercase  text-text-primary/50 ${isDark ? 'before:bg-white/30 after:bg-white/30' : ''}`} >or</div>

        {/* Registration Form using Server Action */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className={`label-text font-semibold ${isDark ? 'text-text-white' : 'text-text-primary'}`}>Name</span>
            </label>
            <input
              name="name"
              type="text"
              className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent ${isDark ? 'bg-theme-background border-zinc-800 text-text-white placeholder:text-text-secondary' : ''}`}
              required
            />
          </div>

          {/* image url */}
          <div className="form-control">
            <label className="label">
              <span className={`label-text font-semibold ${isDark ? 'text-text-white' : 'text-text-primary'}`}>Photo URL</span>
            </label>
            <input
              name="photoUrl"
              type="text"
              className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent ${isDark ? 'bg-theme-background border-zinc-800 text-text-white placeholder:text-text-secondary' : ''}`}
              required
            />
          </div>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className={`label-text font-semibold ${isDark ? 'text-text-white' : 'text-text-primary'}`}>Email address</span>
            </label>
            <input
              name="email"
              type="email"
              className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent ${isDark ? 'bg-theme-background border-zinc-800 text-text-white placeholder:text-text-secondary' : ''}`}
              required
            />
          </div>

          {/* pass */}
          <div className="form-control">
            <label className="label">
              <span className={`label-text font-semibold ${isDark ? 'text-text-white' : 'text-text-primary'}`}>Password</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={isHiddenPass ? 'password' : 'text'}
                value={password}
                onChange={handlePasswordChange}
                className={`input input-bordered w-full pr-10 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent ${isDark ? 'bg-theme-background border-zinc-800 text-text-white placeholder:text-text-secondary' : ''}`}
                required
              />
              <button type="button" onClick={() => setIsHiddenPass(!isHiddenPass)} className="cursor-pointer absolute right-3 top-3 opacity-50">
                {isHiddenPass ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-3 space-y-2 text-sm">
                {[
                  { key: 'length', label: 'At least 6 characters' },
                  { key: 'uppercase', label: 'One uppercase letter' },
                  { key: 'lowercase', label: 'One lowercase letter' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <span className={passwordValidations[item.key] ? 'text-theme-primary' : 'text-red-400'}>
                      {passwordValidations[item.key] ? '✓' : '✕'}
                    </span>
                    <span className={passwordValidations[item.key] ? 'text-text-primary' : 'text-text-primary/70'}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* submit */}
          <button type="submit" className={`btn bg-green-600 text-white hover:bg-green-700 w-full mt-2 border-none shadow-none`}>
            Register
          </button>

          {
            error && <p className='text-red-500 font-medium text-center'>
              {error?.message}
            </p>
          }
        </form>

        <p className={`text-center text-sm mt-6 ${isDark ? 'text-text-secondary' : 'text-base-content/70'}`}>
          Have an account? <Link href="/log-in" className="text-theme-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage









