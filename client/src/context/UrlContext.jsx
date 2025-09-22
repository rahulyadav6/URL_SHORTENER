/* eslint-disable react-refresh/only-export-components */
import { Children, createContext, useState } from "react";

export const UrlContext = createContext();

export const UrlContextProvider = ({children})=>{
    const [ url, setUrl ] = useState("");

    const value = {
        url,
        setUrl
    }
    return(
        <UrlContext.Provider value={value}>
            {children}
        </UrlContext.Provider>
    )
}


