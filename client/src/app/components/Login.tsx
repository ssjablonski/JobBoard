"use client"
import { signIn } from "next-auth/react";
export default function Login() {
  return <button className="bg-gray-200 p-2 rounded-lg" onClick={() => signIn("keycloak")}>
    Login
  </button>
}