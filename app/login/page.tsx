"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Heading from "@/components/atoms/Title"; // Use your Heading atom
import Paragraph from "@/components/atoms/Paragraph";
import Button from "@/components/atoms/Button"; // Use your Button atom
import styles from "./Login.module.scss";

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Redirect to the main admin dashboard after successful login
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginBox}>
        <Heading level={1} className={styles.title}>
          Admin Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              required
              className={styles.input}
            />
          </div>

          {error && <Paragraph className={styles.error}>{error}</Paragraph>}

          <Button
            type="submit"
            className={styles.loginButton}
            variant="primary"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
