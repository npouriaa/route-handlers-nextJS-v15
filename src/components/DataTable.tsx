"use client";
import { UserType } from "@/app/data";
import { FormEvent, useEffect, useRef, useState } from "react";

const DataTable = () => {
  const [users, setUsers] = useState<UserType[]>([] as UserType[]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<number>(1);
  const [job, setJob] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api");
      if (!response.ok) throw new Error("Failded to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
      console.log((err as Error).message);
    }
    setLoading(false);
  };

  const searchUsers = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:3000/api?query=${query}`);
      if (!response.ok) throw new Error("Failded to fetch");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
      console.log((err as Error).message);
    }
    setLoading(false);
  };

  const addNewUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const object = JSON.stringify({
      fullName: fullName,
      age: age,
      job: job,
    });

    try {
      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: object,
      });

      if (!response.ok) throw new Error("Failded to post user");
      fetchData();
      setFullName("");
      setAge(1);
      setJob("");
    } catch (err) {
      setError((err as Error).message);
      console.log((err as Error).message);
    }
    setLoading(false);
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failded to delete user");
      fetchData();
    } catch (err) {
      setError((err as Error).message);
      console.log((err as Error).message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex items-start p-2 gap-4 flex-col w-185">
      <form
        onSubmit={(e) => addNewUser(e)}
        className="w-full flex justify-between gap-3 border-b border-gray-200 py-4"
      >
        <input
          className="border p-2 border-gray-200 rounded-md"
          type="text"
          placeholder="Full Name"
          required
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
        <input
          className="border p-2 border-gray-200 rounded-md"
          type="number"
          min={1}
          max={100}
          placeholder="Age"
          required
          onChange={(e) => setAge(+e.target.value)}
          value={age}
        />
        <input
          className="border p-2 border-gray-200 rounded-md"
          type="text"
          placeholder="Job"
          required
          onChange={(e) => setJob(e.target.value)}
          value={job}
        />
        <button className="cursor-pointer bg-green-500 text-white p-1 rounded-md">
          Add user
        </button>
      </form>
      <button
        className="cursor-pointer bg-gray-300 p-1 rounded-md"
        onClick={() => fetchData()}
      >
        Refresh table
      </button>
      <input
        type="text"
        className="border w-full p-2 border-gray-200 rounded-md"
        placeholder="Search...."
        onChange={(e) => searchUsers(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="border-collapse w-full">
          <thead>
            <tr className="*:text-left *:border-1 *:border-[#c8c8c8] *:p-2">
              <th>ID</th>
              <th>Full Name</th>
              <th>Age</th>
              <th>Job</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users?.map((user) => (
                <tr
                  key={user.id}
                  className="*:text-left *:border-1 *:border-[#c8c8c8] *:p-2"
                >
                  <td>{user.id}</td>
                  <td className="capitalize">{user.fullName}</td>
                  <td>{user.age}</td>
                  <td className="capitalize">{user.job}</td>
                  <td>
                    <button className="cursor-pointer bg-yellow-400 text-white p-1 rounded-md mx-2">
                      Update
                    </button>
                    <button
                      onClick={() => deleteUser(user.id + "")}
                      className="cursor-pointer bg-red-500 text-white p-1 rounded-md mx-2 "
                    >
                      Delete
                    </button>
                    <button className="cursor-pointer bg-blue-500 text-white p-1 rounded-md mx-2 ">
                      Update job only
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No data...</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;
