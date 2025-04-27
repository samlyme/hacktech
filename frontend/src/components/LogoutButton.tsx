import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();              // Clear token and user
        navigate("/sign-in");   // Redirect to login page
    };

    return (
        <button onClick={handleLogout} className="p-2 rounded bg-red-500 text-white hover:bg-red-600">
            Logout
        </button>
    );
};

export default LogoutButton;
