import Image from "next/image";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";

export default function Home() {
  return (
    <>
    <Hero />
    {/* <Jobs /> */}
    </>
    
  );
}


// import { getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]/route'
// import Logout from './components/Logout'
// import Login from './components/Login'
// export default async function Home() {
//   const session = await getServerSession(authOptions)
//   if (session) {
//     return <div>
//       <div>Your name is {session.user?.name}</div>
//       <div><Logout /> </div>
//     </div>
//   }
//   return (
//     <div>
//       <Login />
//     </div>
//   )
// }