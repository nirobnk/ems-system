import { useEffect, useState } from "react";
import axios from "axios";
import type { Employee } from "../types/Employee";



export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get<Employee[]>("http://localhost:3000/employees");
        setEmployees(res.data);
      } catch (err) {
        setError("❌ Failed to load employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading employees...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Employee List</h1>

      {employees.length === 0 ? (
        <p className="text-gray-600">No employees found. Try adding one.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="text-center hover:bg-gray-100">
                  <td className="px-4 py-2 border">{emp.id}</td>
                  <td className="px-4 py-2 border">{emp.name}</td>
                  <td className="px-4 py-2 border">{emp.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}