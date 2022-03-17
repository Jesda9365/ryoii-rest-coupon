// import Router from "next/router";

// export default function Index() {
//   React.useEffect(() => {
//     Router.push("/auth/login");
//   });

//   return <div />;
// }
import React from "react";
import Router from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Index() {
  const { data: session,status } = useSession()
  const loading = status === "loading"

  React.useEffect(() => {
    if (session) {
     Router.push("/restaurant-admin/dashboard");
      return (
        <>
          Signed in as {session.user.brand_name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
      
    }
  },[session]);


  if(!session&&!loading){
    signIn()
  }

  return (
    <>
     Go to login... <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}