import React from "react";

function Navbar() {
  return (
    <div className="">
      <nav className="bg-purple-800 px-7 py-2">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl text-white font-medium">
              Premium Todo List
            </h1>
          </div>
          <ul className="flex gap-7">
            <li></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
