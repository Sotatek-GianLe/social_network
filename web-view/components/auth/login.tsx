"use client";

import "@/app/globals.css";
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fieldsLogin, fieldsRegister } from "../auth/form-fields.config";
import Form from "../commons/Form";
// import Register from "./register";
import * as yup from "yup";
import { useMemo } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'

export type FormDataLogin = {
  email: string;
  password: string;
  userName?: string;
  // googleId?: string;
  // facebookId?: string;
  // imageUrl?: string;
};

// userName: yup.string().required("Username is required"),
const Login = () => {
  const pathname = usePathname();
  const isRegister = pathname === "/register";
  const actionName = isRegister ? "Register" : "Login";
  const fields = isRegister ? fieldsRegister : fieldsLogin;
  const toogleName = actionName;
  const endPoint = isRegister ? 'http://localhost:3000/auth/sign-up' : 'http://localhost:3001/api/login'
  const router = useRouter();

  
  const validation = useMemo(()=>({
    email: yup.string().required("Email is required").email("Email is not valid"),
    password: yup.string().required("Password is required"),
    ...(isRegister && {userName: yup.string().required('Username must required!')})
  }),[isRegister]);

  console.log('validation',validation)
  const renderForm = () => {
    return (
      <Form
        actionType="submit"
        action={onSubmit}
        actionName={actionName}
        fields={fields}
        resolver={validation}
      />
    );
  };

  const onSubmit = (userData: FormDataLogin) => {
    
    console.log(userData);
    axios.post(endPoint,{...userData}).then(res => {
      localStorage.setItem('access_token',res.data.access_token);
      
    });
    
  };

  return (
    <>
      <Head>
        <title>Login - Social network</title>
      </Head>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Social network
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {toogleName} to your account
              </h1>
              {renderForm()}
              <Link
                href={!isRegister ? '/register': '/login'}
              >
                {!isRegister ? 'Register': 'Login'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
