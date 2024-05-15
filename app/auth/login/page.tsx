import {
  GithubSignInButton,
  GoogleSignInButton,
} from "@/app/components/authButtons";
import LoginForm from "@/app/components/forms/LoginForm";

const LoginPage = () => {
  return (
    // Verwenden Sie `calc(100vh - 4rem)` um die Mindesthöhe ohne Navbar-Höhe zu berechnen
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl text-center text-black font-semibold mb-6">
          Melde dich an
        </h2>

        <LoginForm />
        <p className="text-gray-900 text-sm font-bold mb-4 text-center">oder</p>
        <div className="flex flex-col space-y-4">
          <GoogleSignInButton />
          <GithubSignInButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
