import { type UserWithIdType } from "~/types";

import { Spinner, Tooltip, Table } from "flowbite-react";

import { MdDelete } from "react-icons/md";

import { api } from "~/utils/api";

interface UsersProps {
  users: UserWithIdType[];
}

function UsersTable({ users = [] }: UsersProps) {
  const apiContext = api.useContext();

  const deleteUser = api.user.deleteUser.useMutation({
    onSuccess: () => {
      void apiContext.user.invalidate();
    },
  });

  const handleDeleteUser = (id: string): void => {
    deleteUser.mutate({ id });
  };

  const renderDelete = (id: string) => {
    if (deleteUser.isLoading && deleteUser.variables?.id === id) {
      return <Spinner size="sm" />;
    }
    return (
      <Tooltip content="Delete User">
        <MdDelete
          onClick={() => {
            handleDeleteUser(id);
          }}
          className="h-5 w-5 cursor-pointer"
        />
      </Tooltip>
    );
  };

  if (!users.length) {
    return (
      <div className="rounded-lg py-10 text-center text-lg dark:border-gray-700 dark:bg-gray-800 dark:text-slate-200">
        No users ☹️
      </div>
    );
  }

  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>First name</Table.HeadCell>
        <Table.HeadCell>Last name</Table.HeadCell>
        <Table.HeadCell>Email Address</Table.HeadCell>
        <Table.HeadCell>Favourite Food</Table.HeadCell>
        {/* <Table.HeadCell>Edit</Table.HeadCell> */}
        <Table.HeadCell>Delete</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {users.map((user) => (
          <Table.Row
            key={user.id}
            className="dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell>{user.firstName}</Table.Cell>
            <Table.Cell>{user.lastName}</Table.Cell>
            <Table.Cell>{user.emailAddress}</Table.Cell>
            <Table.Cell>{user.favouriteFood}</Table.Cell>
            <Table.Cell>{renderDelete(user.id)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default UsersTable;
