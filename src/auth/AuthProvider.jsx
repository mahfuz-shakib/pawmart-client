import React, { useEffect, useState } from 'react';
import {AuthContext} from "./AuthContext"
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
const AuthProvider = ({ children }) => {
  const [theme,setTheme]=useState('');
  // console.log(theme);
  const [user, setUser] = useState({});
  const [userId,setUserId]=useState('');
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const signInUser = ( email, password ) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const createUser = (email, password ) => {
    setLoading(true);
    console.log(email,password);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (user,name,photoURL)=>{
    return updateProfile(auth.currentUser,{...user,displayName:name,photoURL:photoURL})
  }
  const logOut=()=>{
    return signOut(auth);
  }
  const deleteAccount = ()=>{
    return deleteUser(auth.currentUser);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const userInfo = {
    user,
    userId,
    setUserId,
    setUser,
    createUser,
    signInUser,
    signInWithGoogle,
    updateUser,
    logOut,
    deleteAccount,
    loading,
    theme,
    setTheme,
    setLoading
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;