import React from "react";
import { useState, useEffect } from 'react';

import {useRouter } from "next/router";

import { useSession,signOut } from "next-auth/react"

// layout for this page
const Dashboard = (props) => {
  const { data: session } = useSession()
  const router = useRouter()  

  useEffect(() => {        
    if (session) {
     console.log(session);
    }

    if(!session){
      router.push('/')
    }
  }, []);


  return (
    <>
        <h1>Dashboard</h1>
        <button onClick={signOut}>Logout</button>
    </>
  );
};

//Dashboard.layout = Admin;

// Dashboard.getInitialProps = async ctx => {
//   try {
//         const restName = {name:moomuekkungDb[0].brand_name}
//        return {restName};
//      } catch (error) {
//       return { error };
//      }
// };

export default Dashboard;
