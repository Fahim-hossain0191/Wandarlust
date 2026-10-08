"use client";
import { Card } from "@heroui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });
    console.log(user);
    console.log("Data:", data);
    console.log("Error:", error);
    if (data) {
      redirect("/");
    }
    if (error) {
      //toast
      alert("Error");
    }
  };
  
  const handleGoogleSignIn=async()=>{
       await authClient.signIn.social({
    provider: "google",
  });
  }
  return (
    <div className="max-w-7xl flex justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p>Start your adventure journey</p>
      </div>
      di
      <Card className="border rounded-none">
        <Form
          className="flex w-96 flex-col gap-4"
          render={(props) => <form {...props} data-custom="foo" />}
          onSubmit={onSubmit}
        >
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          <TextField isRequired name="image" type="url">
            <Label>Image URL</Label>
            <Input placeholder="Image URL" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex justify-center gap-2">
            <Button type="submit" className={"rounded-none w-full bg-cyan-500"}>
              Create Account
            </Button>
          </div>
        </Form>
        <div className="flex justify-center items-center gap-3">
          <Button onClick={handleGoogleSignIn} variant="outline" className={"w-full rounded-none "}>
            Sign with Google
            <FaGoogle />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
