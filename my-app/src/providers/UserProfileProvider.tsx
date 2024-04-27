import React, { ReactNode, createContext, useState, SetStateAction } from "react";

interface UserProfileProviderInterface {
    email: string;
    name: string;
}
interface UserProfileContextInterface {
    email: string;
    name: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setUserProfile: React.Dispatch<SetStateAction<UserProfileProviderInterface>>;
}

export const UserProfileProviderContext = createContext<UserProfileContextInterface>({
    email: "",
    name: "",
    handleChange: () => {},
    setUserProfile: () => {},
});

const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<UserProfileProviderInterface>({
        email: "",
        name: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserProfile((oldUserProfile) => ({ ...oldUserProfile, [name]: value }));
    };
    return (
        <UserProfileProviderContext.Provider value={{ ...userProfile, setUserProfile, handleChange }}>
            {children}
        </UserProfileProviderContext.Provider>
    );
};

export default UserProfileProvider;
