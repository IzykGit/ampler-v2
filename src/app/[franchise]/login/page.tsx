"use client"
import React from 'react'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const Login = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("")

  const handleSubmit = (e: any) => {
    e.prevent.default()

    signIn('credentials', {
      firstName,
      lastName,
      password,
      callbackUrl: "/"
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Clock In Pin" />
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default Login