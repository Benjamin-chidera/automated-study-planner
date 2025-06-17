import React from "react";

const DeleteProfile = () => {
  return (
    <main className=" mt-20">
      <h1 className="text-xl font-bold">Danger Zone</h1>

      <button className="bg-red-200 hover:bg-red-700 text-red-700 hover:text-white hover:border-red-700 font-bold py-2 px-4 rounded mt-5 duration-500">
        Delete Account
      </button>
    </main>
  );
};

export default DeleteProfile;
