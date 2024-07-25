import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function UpdateUser() {
  const userData = {
    name: "",
    img: "",
    phone: "",
    email: "",
  };
  const [user, setUser] = useState(userData);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${id}`
        );
        setUser(response.data);
        console.log(user);
      } catch (error) {
        console.log("Error while fetching data", error.message);
      }
    };
    fetchData();
  }, [id]);

  const inputHanlder = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const inputFile = (e) => {
    setUser({ ...user, img: e.target.files[0] });
  };

  //   this is from submit funciton
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("myFile", user.img);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("name", user.name);

    await axios
      .put(`http://localhost:3000/api/update/user/${id}`, formData)
      .then(() => {
        console.log("User update Succesfully");
        navigate("/");
      })
      .catch((err) => {
        console.log("error hoice " + err.message);
      });
    console.log(formData);
  };

  const hanldeChangePath = () => {
    navigate("/");
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className=" bg-stone-100 p-2 rounded-lg shadow-lg w-[500px] ">
        <div className="modalHeading p-2 flex justify-between items-center">
          <h1 className="text-stone-600 text-1xl uppercase font-bold">
            Update User Info
          </h1>
          <button
            className="border rounded px-1  text-stone-500 "
            onClick={hanldeChangePath}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        {/* this is from info */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="put"
        >
          <div className="flex flex-col p-2">
            <label className="text-stone-400" htmlFor="name">
              Name
            </label>
            <input
              className="outline-none rounded p-2 mt-1"
              type="text"
              autoComplete="off"
              placeholder="Enter your name"
              name="name"
              id="name"
              onChange={inputHanlder}
              value={user.name}
              required
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="text-stone-400" htmlFor="phone">
              Phone
            </label>
            <input
              className="outline-none rounded p-2 mt-1"
              type="text"
              autoComplete="off"
              placeholder="Enter you  phone"
              name="phone"
              id="phone"
              onChange={inputHanlder}
              value={user.phone}
              required
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="text-stone-400" htmlFor="email">
              Email
            </label>
            <input
              className="outline-none rounded p-2 mt-1"
              type="email"
              autoComplete="off"
              placeholder="Enter you  email"
              name="email"
              id="email"
              value={user.email}
              onChange={inputHanlder}
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="text-stone-400" htmlFor="phone">
              Picture
            </label>
            <input
              className=" rounded p-2 bg-stone-50 text-stone-400"
              type="file"
              autoComplete="off"
              placeholder="Enter you  phone"
              name="myFile"
              id="file"
              onChange={inputFile}
            />
          </div>
          <div className="p-2">
            <input
              className="bg-stone-800 p-2 text-stone-50 rounded cursor-pointer shadow hover:bg-stone-700"
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
