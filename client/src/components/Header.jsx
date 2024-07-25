import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="header bg-stone-900 flex justify-between items-center p-4">
        <div className="logo">
          <h1 className="text-stone-50 font-bold text-2xl">
            <i className="fa-solid fa-book"></i>My PhoneBooks
          </h1>
        </div>
        <div className="addContact">
          <Link
            to="/add"
            className="text-stone-50 border rounded shadow p-2 hover:text-stone-300"
          >
            Add Contact
          </Link>
        </div>
      </div>
    </>
  );
}
