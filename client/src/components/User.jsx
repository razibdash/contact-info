import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

import { Link, useNavigate } from "react-router-dom";

function User() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error.message);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:3000/api/delete/user/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="userTable w-full">
        <table className="table-auto w-full text-center border-b-2">
          <thead>
            <tr className="bg-stone-100 text-stone-700">
              <th className="p-4">#</th>
              <th className="p-4">Picture</th>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const imgUrl = "http://localhost:3000/uploads/";
              return (
                <tr
                  className="border-b-2 text-stone-500  hover:bg-stone-100"
                  key={index}
                >
                  <td className="p-4 ">{index + 1}</td>
                  <td className="p-4 ">
                    <img
                      className="w-10 h-10 m-auto border rounded-full"
                      src={`${imgUrl}${user.img}`}
                      alt="not"
                    />
                  </td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 flex items-center justify-center">
                    <Link
                      to={`update/${user._id}`}
                      className="bg-stone-900 px-2 p-1 mr-1 rounded shadow text-white"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-700 px-2 p-1 rounded shadow text-white"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default User;
