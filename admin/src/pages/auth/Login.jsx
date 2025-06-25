import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaLock } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import login_image from "/images/login-screen-image.jpeg";
import login_logo from "/images/logo.png";
import { loginUser } from "../../redux/slices/auth/userSlice";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleLogin = async () => {
    const result = await dispatch(loginUser({ email, password }));

    console.log("Login Result:", result);

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Login Successful!", { autoClose: 1000 });
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div className="flex justify-between h-screen bg-gray-100">
      {/* Left Side Image */}
      <img src={login_image} alt="login_banner" className="object-cover" />

      {/* Right Side Login Form */}
      <div className="flex items-center justify-center w-1/2">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
          <img src={login_logo} alt="logo" className="absolute -top-45 left-1/2 transform -translate-x-1/2 w-[200px]" />
          <h2 className="text-xl font-bold mb-2 text-center">Login Now!</h2>
          <p className="text-gray-600 mb-4 text-center">Enter your email and password for login</p>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
              <FaUser className="text-gray-500" />
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 outline-none px-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 relative">
              <FaLock className="text-gray-500" />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="flex-1 outline-none px-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            {/* <div className="text-right mt-1">
              <a href="#" className="text-blue-500 text-sm">Lost Password?</a>
            </div> */}
          </div>

          {/* Sign In Button */}
          <button 
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
