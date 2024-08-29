import { AppProps } from 'next/app';
import { AuthProvider } from '../components/withAuth'; // Adjust the import path as necessary
import '@fortawesome/fontawesome-free/css/all.min.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
