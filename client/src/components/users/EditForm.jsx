import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";


export default function EditForm() {
  const { authUser } = useAuthContext();
  const [details, setDetails] = useState({
    full_name: authUser.fullName,
    first_name: authUser?.firstName,
    last_name: authUser?.lastName,
    username: authUser?.username,
    gender: authUser?.gender,
    email: authUser.emailAddress,
    phone: authUser?.phone,
    password: ""
  })
  
  console.log(details);
  
  return (
    <div className="w-full mx-auto my-5 border-2 border-gray-700 rounded-lg p-5 flex flex-col gap-5 bg-gray-800">
      <h2 className="text-xl font-bold text-gray-400">Personal Info</h2>
      <form action="" className="flex flex-col gap-3">
        {/* Full Name and Username  */}
        <div className="md:flex gap-3">
          <div className="w-full">
            <label htmlFor="" className="text-gray-400 text-sm">
              Full Name
            </label>
            <input
              title="Full Name"
              placeholder="Enter your full name"
              id="full_name"
              name="full_name"
              type="text"
              className="input input-bordered w-full cursor-not-allowed text-gray-500 input-sm"
              value={details.full_name}
              disabled
            />
          </div>
          <div className="w-full">
            <label htmlFor="" className="text-gray-400 text-sm">
              Username
            </label>
            <input
              title="Edit Username"
              placeholder="Enter your username"
              id="username"
              name="username"
              type="text"
              className="input input-bordered w-full text-gray-500 input-sm"
              value={details.username}
            />
          </div>
        </div>

        {/* Gender  */}
        <div className="flex flex-col w-full">
          <label htmlFor="" className="text-gray-400 text-sm">
            Gender
          </label>
          <select
            title="Edit Gender"
            defaultValue="male"
            name="gender"
            id="gender"
            className="select select-bordered w-full select-sm"
            value={details.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* First and Last Name  */}
        <div className="md:flex gap-3">
          <div className="w-full">
            <label htmlFor="" className="text-gray-400 text-sm">
              First Name
            </label>
            <input
              title="Edit First Name"
              placeholder="Enter your first name"
              id="first_name"
              name="first_name"
              type="text"
              className="input input-bordered w-full text-gray-500 input-sm"
              value={details.first_name}
            />
          </div>
          <div className="w-full">
            <label htmlFor="" className="text-gray-400 text-sm">
              Last Name
            </label>
            <input
              title="Edit Last Name"
              placeholder="Enter your last name"
              id="last_name"
              name="last_name"
              type="text"
              className="input input-bordered w-full text-gray-500 input-sm"
              value={details.last_name}
            />
          </div>
        </div>

        {/* Email and Password  */}
        <div className="md:flex gap-3">
          <div className="w-full">
            <label htmlFor="" className="text-gray-400 text-sm">
              Email
            </label>
            <input
              title="Edit Email"
              placeholder="Enter your email"
              id="email"
              name="email"
              type="email"
              className="input input-bordered w-full text-gray-500 input-sm"
              value={details.email}
            />
          </div>
          <div className="w-full">
            <label htmlFor="" className="text-gray-400 text-sm">
              Password
            </label>
            <input
              title="Edit Password"
              placeholder="Enter your password"
              id="password"
              name="password"
              type="password"
              className="input input-bordered w-full text-gray-500 input-sm"
              value={details.password}
            />
          </div>
        </div>

        <hr className="border-2 border-gray-700 rounded-2xl" />
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-active bg-[#984FD2] hover:text-white text-white border-2 hover:border-white border-gray-600 btn-sm"
            type="submit"
          >
            Edit Profile
          </button>
          <a id="home-back-link" href="/">
            <button
              id="home-back-btn"
              className="btn btn-active btn-primary btn-sm"
              type="button"
            >
              Back
            </button>
          </a>
        </div>
      </form>
    </div>
  );
}
