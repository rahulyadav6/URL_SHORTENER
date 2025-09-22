import axios from 'axios';
import React, { useState, useRef, useContext } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { UrlContext } from '../context/UrlContext';
const UrlForm = () => {
  
    const shortUrlRef = useRef(null);

    const { url, setUrl } = useContext(UrlContext);
    console.log(url);
    

  // const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [showQr, setShowQr] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const handleSubmit = async () => {
    setError(null);
    setCopied(false);
    try {
      const response = await axios.post(backendUrl + "/api/url/create", { url });
      if (response.data && response.data.shortUrl) {
        setShortUrl(response.data.shortUrl);
        
      } else {
        setError("Failed to retrieve shortened URL.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while shortening the URL.");
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    shortUrlRef.current?.select()
    setCopied(true);
    setTimeout(()=>{
        setCopied(false);
    },2000)
  }
  const handleQr = ()=>{
    setShowQr(!showQr);
    console.log(showQr);
  }

  return (
    <div className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onInput={(event)=>setUrl(event.target.value)}
            placeholder="https://example.com"
            required
            className="w-full text-xl px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
        >Shorten URL
        </button>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}


        {shortUrl && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 p-2 border text-xl font-medium border-gray-300 rounded-l-md bg-gray-50 text-green-500"
              />
               <button
                onClick={handleCopy}
                className={`cursor-pointer px-4 py-2 rounded-r-md transition-colors duration-200 ${
                  copied 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>


            <div className='flex justify-center mt-4'>
            <div className='relative'>
                <button
                    onClick={handleQr}
                    className={`cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 bg-green-500 hover:bg-green-600 text-white font-medium`}
                >{showQr ? 'Hide QR Code' : 'Show QR Code'}
                </button>
                    {
                        showQr &&(
                            <div>
                            <h2 className="text-lg font-semibold mb-2">Or Scan this QR code</h2>
                                <QRCodeSVG
                                    value={url}
                                    size={100}
                                />
                            </div>
                        )
                    }
            </div>
            </div>
          </div>
        )}
        
      </div>
  )
}

export default UrlForm




