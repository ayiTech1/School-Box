import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  isEdit: boolean;
  isView: boolean;
}

export default function UserFormModal({
  isOpen,
  onClose,
  user,
  isEdit,
  isView,
}: UserFormModalProps) {
  const { data, setData, post, put, processing, reset } = useForm({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && (isEdit || isView)) {
      setData({
        name: user.name || "",
        email: user.email || "",
        password: "", // do not prefill password
      });
    } else {
      reset();
    }
  }, [user, isEdit, isView]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      put(route("admin.customers.update", user.id), {
        onSuccess: () => onClose(),
      });
    } else {
      post(route("admin.customers.store"), {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {isView ? "View User" : isEdit ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Name</label>
            <input
              type="text"
              value={data.name}
              disabled={isView}
              onChange={(e) => setData("name", e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={data.email}
              disabled={isView}
              onChange={(e) => setData("email", e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          {/* ✅ Only show password when adding */}
          {!isEdit && !isView && (
            <div>
              <label>Password</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                className="border p-2 w-full"
              />
            </div>
          )}

          {!isView && (
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          )}
        </form>

        <button onClick={onClose} className="mt-4 text-gray-600 underline">
          Close
        </button>
      </div>
    </div>
  );
}
