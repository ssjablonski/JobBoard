"use client"

import federatedLogout from "@/utils/federatedLogout"

export default function Logout() {
  return <button className="bg-gray-200 p-2 rounded-lg" onClick={() => federatedLogout()}>
    Logout
  </button>
}