"use client";

import Details from "./components/Details";
import UsersTable from "./components/UsersTable";

export default function UserList() {
  return (
    <div
      className="flex flex-col lg:flex-row justify-evenly "
      dir="ltr"
    >
      <UsersTable />
      <Details />
    </div>
  );
}
