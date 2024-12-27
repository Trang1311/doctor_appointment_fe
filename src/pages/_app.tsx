import { AppProps } from "next/app";
import { AuthProvider } from "../components/withAuth";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ThemeProvider } from "@/components/theme-provider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <link rel="icon" href="/favicon.ico" />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
