"use client"
import Image from "next/image";
import { signIn, } from "next-auth/react";


const Login = () => {
  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/' });
  }

  return (
    <section className="mt-8">
      <h1 className="text-primary font-semibold text-center text-4xl mb-4">
        Login
      </h1>
      <div className="block max-w-xs mx-auto">

        <button onClick={handleGoogleSignIn} type="button" className="flex gap-4 justify-center"><Image src={'/google.png'} alt={''} width={24} height={24}></Image>Login with Google</button>

      </div>

    </section>
  )
}

export default Login;
