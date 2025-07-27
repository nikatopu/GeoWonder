"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/admin/new-article");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register("username")}
            required
            style={{ display: "block", width: "300px" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            required
            style={{ display: "block", width: "300px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="contact-button">
          Login
        </button>
      </form>
    </div>
  );
}
