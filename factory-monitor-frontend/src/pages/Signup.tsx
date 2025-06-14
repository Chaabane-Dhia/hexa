import { useForm } from 'react-hook-form';
import { signupUser } from '../api/userApi.ts';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await signupUser(data.name, data.email, data.password);
        localStorage.setItem('token', res.token); // Store token in local storage
        // Store the whole user info (without password) as JSON string
        const { token, ...userWithoutToken } = res;
        localStorage.setItem('user', JSON.stringify(userWithoutToken));
      alert('Signup successful!');
      console.log(res);
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name', { required: true })} placeholder="Name" className="w-full border px-3 py-2 rounded" />
        <input {...register('email', { required: true })} placeholder="Email" type="email" className="w-full border px-3 py-2 rounded" />
        <input {...register('password', { required: true })} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;