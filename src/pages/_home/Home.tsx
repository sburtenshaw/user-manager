"use client";

import { Alert, Spinner, Navbar } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

import NewUserModal from "./NewUserModal";
import UsersTable from "./UsersTable";

import { api } from "~/utils/api";

function Home() {
  const users = api.user.getAllUsers.useQuery();

  const renderUsers = () => {
    if (users.isLoading) {
      return (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      );
    }
    if (users.isError) {
      return (
        <Alert color="failure" icon={HiInformationCircle}>
          <span>
            <p>
              <span className="font-medium">Error loading users.</span>
            </p>
          </span>
        </Alert>
      );
    }
    return <UsersTable users={users.data} />;
  };

  return (
    <main className="min-h-screen dark:bg-gray-900">
      <Navbar fluid>
        <Navbar.Brand>
          <span className="text-xl dark:text-slate-200">User Manager</span>
        </Navbar.Brand>
      </Navbar>
      <div className="mx-auto max-w-screen-lg px-4 py-4">
        <div className="grid gap-4">
          <div className="flex flex-row items-end justify-between">
            <h1 className="text-2xl dark:text-slate-200">Users</h1>
            <NewUserModal />
          </div>
          <div>{renderUsers()}</div>
        </div>
      </div>
    </main>
  );
}

export default Home;
