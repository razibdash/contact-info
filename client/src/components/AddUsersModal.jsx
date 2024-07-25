import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddUsersModal() {
  const userData = {
    name: "",
    img: "",
    phone: "",
    email: "",
  };
  const [user, setUser] = useState(userData);
  const navigate = useNavigate();
  const inputHanlder = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const inputFile = (e) => {
    setUser({ ...user, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("myFile", user.img, user.img.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("name", user.name);

    await axios
      .post("http://localhost:3000/api/user", formData)
      .then(() => {
        console.log("User Create Succesfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="w-3/12 m-auto mt-36 p-3 shadow-lg rounded bg-stone-200">
      <h3 className="p-2 bg-stone-800 text-stone-50 text-center rounded shadow">
        Add New User
      </h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
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
            name="myFile"
            id="file"
            onChange={inputFile}
          />
        </div>
        <div className="p-2">
          <input
            className="bg-stone-800 p-2 text-stone-50 rounded cursor-pointer shadow hover:bg-stone-700"
            type="submit"
            value="Add User"
          />
        </div>
      </form>
    </div>
  );
}

export default AddUsersModal;
