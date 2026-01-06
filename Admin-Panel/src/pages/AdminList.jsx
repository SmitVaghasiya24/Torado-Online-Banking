import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  const authData = JSON.parse(localStorage.getItem("adminData"));
  const token = authData?.token;

  const fetchAdmins = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/admin/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        setAdmins(res.data.admins || []);
      } else {
        setAdmins([]);
        toast.error("Failed to fetch admins");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching admins");
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="max-w-7xl mx-auto rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Admin List
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading admins...</p>
      ) : admins.length === 0 ? (
        <p className="text-gray-500">No admins found</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Created At
                </th>
              </tr>
            </thead>

            <tbody>
              {admins.map((admin) => (
                <tr
                  key={admin.admin_id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-medium">
                    {admin.admin_id}
                  </td>

                  <td className="px-6 py-5">
                    {admin.name}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {admin.email}
                  </td>

                  <td className="px-6 py-5 capitalize">
                    {admin.role}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-4 py-1.5 text-xs rounded-full font-medium
                        ${
                          admin.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : admin.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {admin.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center text-sm text-gray-600">
                    {new Date(admin.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminList;