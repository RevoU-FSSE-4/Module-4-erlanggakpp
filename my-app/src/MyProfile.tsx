import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

function MyProfile() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        let token = localStorage.getItem("token");
        // token = "c6b2b657-1e3d-4b7b-a681-e43fdc240b11"
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
                // Add any additional headers as needed
            },
        };
        const response = await fetch("https://library-crud-sample.vercel.app/api/user/logout", options);
        const data = await response.json();
        localStorage.removeItem("token");
        navigate("/quotes");
    };

    return (
        <>
            <h1>My email:</h1>
            <h1>My password: </h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default MyProfile;
