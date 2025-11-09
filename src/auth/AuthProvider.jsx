import React, { useEffect, useState } from 'react';
import {AuthContext} from "./AuthContext"
import { deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userId,setUserId]=useState('');
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const signInUser = ({ email, password }) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut=()=>{
    return signOut(auth);
  }
  const deleteAccount = ()=>{
    console.log(auth.currentUser);
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
    signInUser,
    signInWithGoogle,
    logOut,
    deleteAccount,
    loading,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;