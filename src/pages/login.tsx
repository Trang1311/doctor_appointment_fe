"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          username,
          password,
        }
      );
      Cookies.set("token", response.data.access_token);
      Cookies.set("username", response.data.user.username);
      Cookies.set("email", response.data.user.email);
      Cookies.set("imageURL", response.data.user.imageURL);
      Cookies.set("role", response.data.user.role);
      Cookies.set("userId", response.data.user._id);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = (response: any) => {
    console.log("Google login response:", response);
    if (response && response.credential) {
      axios
        .post("http://localhost:3000/auth/login/google", {
          tokenId: response.credential,
        })
        .then((res) => {
          Cookies.set("token", res.data.access_token);
          Cookies.set("username", res.data.user.username);
          Cookies.set("email", res.data.user.email);
          Cookies.set("imageURL", res.data.user.imageURL);
          Cookies.set("role", res.data.user.role);
          Cookies.set("userId", res.data.user._id);
          router.push("/");
        })
        .catch((error) => {
          console.error("Google login error:", error);
        });
    } else {
      console.error("Google login response error:", response);
    }
  };

  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        callback: handleGoogleLogin,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton")!,
        { theme: "outline", size: "large" }
      );
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => {
        if (window.google && window.google.accounts) {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
            callback: handleGoogleLogin,
          });
          window.google.accounts.id.renderButton(
            document.getElementById("googleSignInButton")!,
            { theme: "outline", size: "large" }
          );
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/content/panel/BG.mp4" type="video/mp4" />
      </video>
      <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-md w-full bg-opacity-80">
        <h1
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "#3474ff" }}
        >
          ĐĂNG NHẬP
        </h1>
        <div className="flex items-center justify-center mb-4">
          <div
            id="googleSignInButton"
            className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg shadow-md py-2 hover:bg-gray-100 cursor-pointer transition"
          >
            <i className="fab fa-google text-red-500 mr-2"></i>
            <span className="text-gray-700 font-semibold">
              Đăng Nhập với Google
            </span>
          </div>
        </div>
        <div className="text-center mb-4">
          <span className="text-gray-500">Hoặc</span>
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tên Đăng Nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mật Khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input className="mr-2" type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe" className="text-gray-600">
              Ghi nhớ
            </label>
          </div>
          <a href="#!" className="text-blue-600 hover:underline">
            Quên mật khẩu?
          </a>
        </div>
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Đăng Nhập
        </button>
        <p className="mt-4 text-center text-gray-600">
          Không có tài khoản?{" "}
          <Link href="/register" passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Đăng Ký Ngay
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
