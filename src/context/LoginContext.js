import { createContext } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
    // http://localhost:8010/api/user/login
    return (
        <LoginContext.Provider>
            {children}
        </LoginContext.Provider>
    )
}