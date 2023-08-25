import { type AppType } from "next/app";

import { useEffect } from "react";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
