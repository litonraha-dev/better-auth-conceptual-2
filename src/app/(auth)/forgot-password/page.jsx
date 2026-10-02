"use client";

import {Button, Description, FieldError, Form, Input, Label, TextField, toast} from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import React from 'react';

const ForgotPasswordPage = () => {
   const handleForgotPassword = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const userData = Object.fromEntries(formData.entries());

  console.log("userdata before submit:", userData);

  const { data, error } = await authClient.requestPasswordReset({
    email: userData.email,
    redirectTo: "/reset-password",
  });

  if (error) {
    console.error("Password reset error:", error);
    toast.error(error.message || "Failed to send reset email");
    return;
  }

  console.log("after sending reset email:", data);

  toast.success("Reset email sent. Please check your email.");
};
    return (
        <div>
            Forgot Password
              <Form className="flex w-96 flex-col gap-4" onSubmit={handleForgotPassword}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      {/* <TextField
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
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField> */}
      <div className="flex gap-2">
        <Button type="submit">
  
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
            
        </div>
    );
};

export default ForgotPasswordPage;