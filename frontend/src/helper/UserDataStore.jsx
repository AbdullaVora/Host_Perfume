'use client';

import { setUserData } from '@/redux/slice/userDataSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function UserDataStore({children}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userPhone = localStorage.getItem("userPhone");
    const token = localStorage.getItem("token");

    if (userId && userName && userEmail && token) {
      dispatch(setUserData({
        userId,
        userName,
        userEmail,
        userPhone,
        token,
      }));
    }
  }, []);

  return children; // no UI needed
}
