import { useState } from "react";

import { Button, Modal, Label, TextInput, Select } from "flowbite-react";

import { FavouriteFoods, User, type UserType } from "~/types";

import { api } from "~/utils/api";

interface TouchedType {
  firstName: boolean;
  lastName: boolean;
  emailAddress: boolean;
  favouriteFood: boolean;
}

interface ErrorsType {
  firstName?: string[];
  lastName?: string[];
  emailAddress?: string[];
  favouriteFood?: string[];
}

const DEFAULT_USER_STATE: UserType = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  favouriteFood: FavouriteFoods.Mexican,
};

const DEFAULT_TOUCHED_STATE: TouchedType = {
  firstName: false,
  lastName: false,
  emailAddress: false,
  favouriteFood: false,
};

const DEFAULT_ERRORS_STATE: ErrorsType = {};

function NewUserModal() {
  const apiContext = api.useContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(DEFAULT_USER_STATE);
  const [touched, setTouched] = useState(DEFAULT_TOUCHED_STATE);
  const [errors, setErrors] = useState(DEFAULT_ERRORS_STATE);

  const handleOpenModal = (): void => {
    setModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
    setUser(DEFAULT_USER_STATE);
    setTouched(DEFAULT_TOUCHED_STATE);
    setErrors(DEFAULT_ERRORS_STATE);
  };

  const handleValidate = (newUser: UserType, newTouched: TouchedType): void => {
    const validation = User.safeParse(newUser);
    if (!validation.success) {
      const errors = validation.error.formErrors.fieldErrors;
      Object.keys(errors).forEach((field) => {
        if (!newTouched[field as keyof TouchedType]) {
          delete errors[field as keyof typeof errors];
        }
      });
      setErrors(errors);
      return;
    }
    setErrors({});
  };

  const handleChange = (key: string, value: string): void => {
    const newUser = {
      ...user,
      [key]: value,
    };
    setUser(newUser);
    handleValidate(newUser, touched);
  };

  const handleBlur = (key: string): void => {
    const newTouched = {
      ...touched,
      [key]: true,
    };
    setTouched(newTouched);
    handleValidate(user, newTouched);
  };

  const createUser = api.user.createUser.useMutation({
    onSuccess: async () => {
      await apiContext.user.invalidate();
      handleCloseModal();
    },
  });

  const handleSubmit = (): void => {
    createUser.mutate({ user });
  };

  return (
    <>
      <Button onClick={handleOpenModal}>New User</Button>
      <Modal
        size="md"
        dismissible
        popup
        show={modalOpen}
        onClose={handleCloseModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-slate-200">
              Add User
            </h3>
            <div className="flex flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label
                    color={errors.firstName ? "failure" : "default"}
                    htmlFor="firstName"
                    value="First Name"
                  />
                </div>
                <TextInput
                  id="firstName"
                  type="text"
                  placeholder="John"
                  helperText={errors.firstName ?? null}
                  color={errors.firstName ? "failure" : "gray"}
                  value={user.firstName}
                  onChange={(e) => {
                    handleChange("firstName", e.currentTarget.value);
                  }}
                  onBlur={() => {
                    handleBlur("firstName");
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label
                    color={errors.lastName ? "failure" : "default"}
                    htmlFor="lastName"
                    value="Last Name"
                  />
                </div>
                <TextInput
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  helperText={errors.lastName ?? null}
                  color={errors.lastName ? "failure" : "gray"}
                  value={user.lastName}
                  onChange={(e) => {
                    handleChange("lastName", e.currentTarget.value);
                  }}
                  onBlur={() => {
                    handleBlur("lastName");
                  }}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  color={errors.emailAddress ? "failure" : "default"}
                  htmlFor="emailAddress"
                  value="Email Address"
                />
              </div>
              <TextInput
                id="emailAddress"
                type="email"
                placeholder="example@example.com"
                helperText={errors.emailAddress ?? null}
                color={errors.emailAddress ? "failure" : "gray"}
                value={user.emailAddress}
                onChange={(e) => {
                  handleChange("emailAddress", e.currentTarget.value);
                }}
                onBlur={() => {
                  handleBlur("emailAddress");
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  color={errors.favouriteFood ? "failure" : "default"}
                  htmlFor="favouriteFood"
                  value="Favourite Food"
                />
              </div>
              <Select
                id="favouriteFood"
                helperText={errors.favouriteFood ?? null}
                color={errors.favouriteFood ? "failure" : "gray"}
                value={user.favouriteFood}
                onChange={(e) => {
                  handleChange("favouriteFood", e.currentTarget.value);
                }}
                onBlur={() => {
                  handleBlur("favouriteFood");
                }}
              >
                <option></option>
                {Object.values(FavouriteFoods).map((favouriteFood) => (
                  <option key={favouriteFood}>{favouriteFood}</option>
                ))}
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex flex-row justify-end">
          <Button color="gray" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            disabled={!User.safeParse(user).success}
            onClick={handleSubmit}
          >
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewUserModal;
