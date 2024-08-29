import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      Cookies.set('token', response.data.access_token);
      Cookies.set('username', username);

      router.push( '/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          <img
            src="content/logo/DisplayFileFormFileName.png"
            className={styles.image}
            alt="Login"
          />
        </div>
        <div className={styles.formContainer}>
          <form>
            <div className={styles.socialLogin}>
              <p className={styles.signInText}>Sign in with</p>
              <button type="button" className={`${styles.socialButton} ${styles.facebookButton}`}>
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className={`${styles.socialButton} ${styles.googleButton}`}>
                <i className="fab fa-google"></i>
              </button>
            </div>

            <div className={styles.divider}>
              <p className={styles.orText}>Or</p>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                id="username"
                className={styles.input}
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username" className={styles.inputLabel}>
                Username
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className={styles.inputLabel}>Password </label>
            </div>

            <div className={styles.footer}>
              <div className={styles.checkboxGroup}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id="rememberMe"
                />
                <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                  Remember me
                </label>
              </div>
              <a href="#!" className={styles.forgotPassword}>Forgot password?</a>
            </div>

            <div className={styles.submitContainer}>
              <button
                type="button"
                className={styles.submitButton}
                onClick={handleLogin}
              >
                Login
              </button>
              <p className={styles.registerText}>
                Don't have an account? <a href="#!" className={styles.registerLink}>Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
