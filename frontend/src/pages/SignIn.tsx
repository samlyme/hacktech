import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();

    const handleSignIn = async () => {
        // Redirect the user to the backend's login endpoint
        window.location.href = "http://localhost:8000/auth/login";
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6">Sign In</h1>
                <button
                    onClick={handleSignIn}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default SignIn;
