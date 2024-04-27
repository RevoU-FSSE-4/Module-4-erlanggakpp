import React, { ReactNode, createContext, useState } from "react";

interface CredentialProviderInterface {
    email: string;
    password: string;
}
interface CredentialContextInterface {
    email: string;
    password: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CredentialProviderContext = createContext<CredentialContextInterface>({
    email: "",
    password: "",
    handleChange: () => {},
});

const CredentialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [credential, setCredential] = useState<CredentialProviderInterface>({
        email: "",
        password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredential((oldCredential) => ({ ...oldCredential, [name]: value }));
    };
    return (
        <CredentialProviderContext.Provider value={{ ...credential, handleChange }}>
            {children}
        </CredentialProviderContext.Provider>
    );
};

export default CredentialProvider;
