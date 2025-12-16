import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiCreditCard, FiUser, FiDollarSign } from "react-icons/fi";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/my-account");
  };

  return (
    <div className="flex justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-blue-900 to-blue-700 text-white px-6 sm:px-8 py-5 sm:py-6">
          <h2 className="text-lg sm:text-xl font-semibold">
            Welcome 👋
          </h2>
          <p className="text-sm sm:text-md opacity-90 break-all">
            {user?.login_id}
          </p>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-8 space-y-5 text-gray-700">

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FiUser className="text-blue-700" />
              <span className="font-medium">Account Status</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-700 whitespace-nowrap">
              {user?.status}
            </span>
          </div>

          <div className="border-t pt-4 space-y-3">

            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-500 text-sm sm:text-base">
                Account Number
              </span>
              <span className="font-medium text-sm sm:text-base break-all text-right">
                {user?.account_number}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-500 text-sm sm:text-base">
                Card Number
              </span>
              <span className="font-medium text-sm sm:text-base">
                **** **** **** {user?.card_number?.slice(-4)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-500 flex items-center gap-2 text-sm sm:text-base">
                <FiDollarSign />
                Balance
              </span>
              <span className="text-base sm:text-lg font-semibold text-green-700">
                ₹{user?.balance}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-md transition text-sm sm:text-base"
          >
            <FiLogOut />
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
