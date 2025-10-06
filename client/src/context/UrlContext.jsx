/* eslint-disable react-refresh/only-export-components */
import { Children, createContext, useState } from "react";

export const UrlContext = createContext();

export const UrlContextProvider = ({children})=>{
    const [ url, setUrl ] = useState("");
    const [shortUrl, setShortUrl] = useState()
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState(null)
    const [showQr, setShowQr] = useState(false);
    
    

    const value = {
        url, setUrl,
        shortUrl, setShortUrl,
        copied, setCopied,
        error, setError,
        showQr, setShowQr,
        
    }
    return(
        <UrlContext.Provider value={value}>
            {children}
        </UrlContext.Provider>
    )
}


