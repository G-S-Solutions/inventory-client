import { LoginForm } from "@/features/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Bienvenido</h1>
            <p className="text-gray-600">Ingresa tus credenciales para continuar</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;