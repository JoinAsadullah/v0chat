"use client"
 
import { signIn, signOut } from "next-auth/react"
 
export default function SignInButton() {
  return <div><button onClick={() => signIn()}>Sign in </button>
  <button onClick={() => signOut()}> Sign out</button></div>
}