import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  //for while refresh do not remove from localstorage


    const getMyProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
              setLoading(false); //  stop loading even if there's no token
              return;
            }

            const response = await fetch("http://localhost:5000/api/auth/profile", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                   Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                console.log("Failed to fetch profile");
                return;
            }
            
            const responseData = await response.json();
            // console.log(responseData)
            setUser(responseData.data);

            setLoading(false);

        } catch (error) {
            console.log(error)
        }
    };

        useEffect(() => {
            getMyProfile();
        }, [])


    return (
        <AuthContext.Provider
            value={{
                user, setUser, getMyProfile ,loading
                }}>
                {children}
            </AuthContext.Provider>
        )
    
}

export default AuthProvider