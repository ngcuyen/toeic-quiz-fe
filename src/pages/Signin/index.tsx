import { Check, Facebook, Mail } from "lucide-react";
import { useState } from "react";

function Signin() {
  const [remember, setRemember] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-80" style={{
      backgroundImage: "url('/images/signin/signin3.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <div className="bg-white text-gray-900 w-[750px] shadow-lg rounded-lg flex">
        {/* Left Side - Sign In Form */}
        <div className="w-1/2 p-8">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-2xl font-semibold">Sign in</h2>
            <div className="flex justify-center space-x-3">
              <button className="w-9 h-9 bg-orange-600 rounded-full flex items-center justify-center text-white">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 bg-orange-600 rounded-full flex items-center justify-center text-white">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
          <label className="block text-sm font-medium mb-1">USERNAME</label>
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full px-3 py-2 mt-1 bg-gray-100 border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none" />
          <label className="block mt-6 text-sm font-medium mb-1">PASSWORD</label>
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full px-3 py-2 mt-1 bg-gray-100 border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none" />
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setRemember(!remember)}>
              <div className={`w-5 h-5 flex items-center justify-center border ${remember ? 'bg-orange-500 border-orange-500' : 'border-gray-500'}`}>
                {remember && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className="text-sm text-orange-600">Remember Me</span>
            </div>
            <a href="#" className="text-sm text-gray-500">Forgot Password</a>
          </div>
          <button className="w-full bg-orange-600 text-white py-2 rounded-md mt-5 mb-2 hover:bg-orange-700">Sign In</button>
        </div>
        {/* Right Side - Welcome Message */}
        <div className="w-1/2 bg-gradient-to-r from-orange-600 to-yellow-600 text-white flex flex-col justify-center items-center p-6 rounded-r-lg">
          <h2 className="text-2xl font-semibold">Welcome to login</h2>
          <p className="text-sm mt-2">Don't have an account?</p>
          <button className="mt-4 px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-orange-600">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Signin;