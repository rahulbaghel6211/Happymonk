import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
export const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    return(
        <AuthContext.Provider
        value={{
user,
setUser,
Login:async(email,password)=>{
    try {
     await  auth().signInWithEmailAndPassword(email,password); 
    } catch (error) {
          console.log(error)
    }
},
Register:async(email,password)=>{
    try {
     await  auth().signInWithEmailAndPassword(email,password); 
    } catch (error) {
          console.log(error)
    }   
},
logout:async()=>{
    try {
     await  auth().signOut();
    } catch (error) {
          console.log(error)
    }   
}
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}