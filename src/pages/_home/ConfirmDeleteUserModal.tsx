"use client";

import { useState } from "react";

import { Spinner, Button, Tooltip, Modal } from "flowbite-react";

import { MdDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { type UserWithIdType } from "~/types";

import { api } from "~/utils/api";

interface ConfirmDeleteUserModalProps {
  user: UserWithIdType;
}

function ConfirmDeleteUserModal({ user }: ConfirmDeleteUserModalProps) {
  const apiContext = api.useContext();

  const [modalOpen, setModalOpen] = useState(false);

  const deleteUser = api.user.deleteUser.useMutation({
    onSuccess: () => {
      void apiContext.user.invalidate();
    },
  });

  const handleOpenModal = (): void => {
    setModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };

  const handleDelete = (): void => {
    deleteUser.mutate({ id: user.id });
  };

  const renderActions = () => {
    if (deleteUser.isLoading) {
      return <Spinner size="lg" />;
    }
    return (
      <>
        <Button color="gray" onClick={handleCloseModal}>
          No, cancel
        </Button>
        <Button color="failure" onClick={handleDelete}>
          Yes, I&apos;m sure
        </Button>
      </>
    );
  };

  return (
    <>
      <Tooltip content="Delete User">
        <MdDelete
          onClick={handleOpenModal}
          className="h-5 w-5 cursor-pointer"
        />
      </Tooltip>
      <Modal
        show={modalOpen}
        size="md"
        dismissible
        popup
        onClose={handleCloseModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">{renderActions()}</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmDeleteUserModal;
