import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userApi.ts';
import { Link } from 'react-router-dom';

interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
}

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      alert('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (data: User) => {
    setSaving(true);
    try {
      if (editingUserId) {
        const { name, email } = data;
        await updateUser(editingUserId, { name, email });
        setEditingUserId(null);
      } else {
        await createUser({ name: data.name, email: data.email, password: data.password! });
      }
      reset();
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert('Error saving user');
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (user: User) => {
    setEditingUserId(user.id!);
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('password', '');
  };

  const onDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error(error);
        alert('Error deleting user');
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="flex justify-end space-x-4 mb-4">
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
        <Link to="/signup" className="text-blue-600 hover:underline">
          Signup
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6 bg-white p-4 rounded shadow">
        <div>
          <input
            {...register('name', { required: 'Name is required' })}
            placeholder="Name"
            className="w-full px-4 py-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
            placeholder="Email"
            type="email"
            className="w-full px-4 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {!editingUserId && (
          <div>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
              placeholder="Password"
              type="password"
              className="w-full px-4 py-2 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className={`bg-blue-600 text-white px-4 py-2 rounded ${
              saving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {saving ? 'Saving...' : editingUserId ? 'Update' : 'Create'}
          </button>

          {editingUserId && (
            <button
              type="button"
              onClick={() => {
                reset();
                setEditingUserId(null);
              }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* User List */}
      {loading ? (
        <div className="text-gray-500 italic">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-gray-600">No users found.</div>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id!)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
