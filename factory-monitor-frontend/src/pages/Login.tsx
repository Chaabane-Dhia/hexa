import { useForm } from 'react-hook-form';
import { loginUser } from '../api/userApi.ts';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await loginUser(data.email, data.password);
        localStorage.setItem('token', res.token); // Store token in local storage
        // Store the whole user info (without password) as JSON string
        const { token, ...userWithoutToken } = res;
        localStorage.setItem('user', JSON.stringify(userWithoutToken));

      alert('Login successful!');
      
      console.log(res);
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('email', { required: true })} placeholder="Email" type="email" className="w-full border px-3 py-2 rounded" />
        <input {...register('password', { required: true })} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
