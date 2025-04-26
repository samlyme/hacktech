import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const SignIn = () => {
    const navigate = useNavigate()

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                const decoded = jwtDecode(credentialResponse.credential);
                console.log(decoded);
                localStorage.setItem("user", JSON.stringify(decoded))
            }}
            onError={() => {
                console.log("Login failed");
            }}
            auto_select
        />
    )
};

export default SignIn;
