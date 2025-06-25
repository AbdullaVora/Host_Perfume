import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaDatabase,
  FaCog,
  FaBars,
  FaPowerOff,
  FaPlusSquare,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, logout } from "../../redux/slices/auth/userSlice";
import { Link, useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [accesSubAdmin, setAccessSubAdmin] = useState(true);
  const [userId, setuserId] = useState();
  const [name, setName] = useState("Admin");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("AdminId");
    const user = JSON.parse(localStorage.getItem("AdminName"));
    setuserId(userId);
    setName(user);
    dispatch(getUsers());
  }, []);

  const { users } = useSelector((state) => state.user);

  const cleanUserId = String(userId).replace(/[^a-zA-Z0-9]/g, ""); // removes ;, spaces, etc.

  const findUser = users.find((user) => String(user._id) === cleanUserId);
  // console.log(cleanUserId)

  // console.log(users)
  // console.log(findUser)

  useEffect(() => {
    if (users.length > 0 && findUser) {
      if (findUser.role === "sub-admin") {
        setAccessSubAdmin(false);
      } else {
        setAccessSubAdmin(true);
      }
    }
  }, [users, findUser]);

  const logoutButton = () => {
    dispatch(logout());
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-white text-black px-4 py-2 rounded-full shadow-md border border-gray-300"
      >
        <img
          src="https://i.pravatar.cc/40" // Placeholder Avatar
          alt="User"
          className="w-8 h-8 rounded-full"
        />
        <div className="ml-2 text-left">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-500">
            {accesSubAdmin ? "Super Admin" : "Sub Admin"}
          </p>
        </div>
        <span className="ml-2 text-gray-600">&#9662;</span>{" "}
        {/* Dropdown Arrow */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute overflow-hidden right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="overflow-hidden">
            {/* <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
              <FaUser className="text-gray-600" /> <span className="text-gray-600">My Profile</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
              <FaDatabase className="text-gray-600" /> <span className="text-gray-600">Backup</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
              <FaCog className="text-gray-600" /> <span className="text-gray-600">Setting</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
              <FaBars className="text-gray-600" /> <span className="text-gray-600">Sidebar</span>
            </li> */}
            {accesSubAdmin && (
              <Link to="/addSubadmin">
                <li onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 hover:bg-blue-100 flex items-center space-x-2 cursor-pointer text-blue-500">
                  <FaPlusSquare className="text-blue-500" />{" "}
                  <span className="text-gray-600">Add Sub Admin</span>
                </li>
              </Link>
            )}
            {accesSubAdmin && (
              <Link to="/AllSubAdmins">
                <li onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 hover:bg-green-100 flex items-center space-x-2 cursor-pointer text-green-500">
                  <FaUsers className="text-green-500" />{" "}
                  <span className="text-gray-600">Sub Admins</span>
                </li>
              </Link>
            )}
            <li
              onClick={logoutButton}
              className="px-4 py-2 hover:bg-red-100 flex items-center space-x-2 cursor-pointer text-red-500"
            >
              <FaPowerOff className="text-red-500" />{" "}
              <span className="text-gray-600">Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
