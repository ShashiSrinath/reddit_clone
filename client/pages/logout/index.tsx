import React, { useContext, useEffect } from 'react';
import { destroyCookie, setCookie } from 'nookies';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../context/global-state';

const LogoutPage = () => {
  const router = useRouter();
  const {
    auth: { dispatch },
  } = useContext(GlobalContext);

  useEffect(() => {
    dispatch({
      type: 'logout',
    });
    router.back();
  }, []);
  return null;
};

export default LogoutPage;
