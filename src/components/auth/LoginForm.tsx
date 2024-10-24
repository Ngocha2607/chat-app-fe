"use client";
import { RegisterUser } from "@/models/auth";
import authService from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string({
      required_error: "Required Field",
    })
    .min(1, "Required Field"),
  password: z
    .string({
      required_error: "Required Field",
    })
    .min(1, "Required Field"),
});

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const form = useForm<RegisterUser>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<RegisterUser> = async (data) => {
    try {
      const response = await authService.login(data);

      if (response?.status === 200) {
        setMessage("User login successfully");
        console.log(response.data);

        router.push("/");
      } else {
        setMessage(`User login failed`);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const onError: SubmitErrorHandler<RegisterUser> = (e) => {
    console.log(e);
  };
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Login Form</h2>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            {...form.register("username")}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...form.register("password")}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default LoginForm;
