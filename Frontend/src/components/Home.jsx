import React, { useState } from 'react';
import { FaRegFileWord } from "react-icons/fa";
import axios from 'axios';

export default function Home() {

  // .env variable ---
  const backendUrl = import.meta.env.VITE_BACKEND_URL;



  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // setSelectedFile(event.target.value);
  };

  // Button Submit Function
  const buttonSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setConvert('Please Select A File..');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // const response = await axios.post('http://localhost:3000/convertFile', formData, {
      //   responseType: 'blob',
      // });



      const response = await axios.post(`${backendUrl}/convertFile`, formData, {
        responseType: 'blob',
      });


      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      setConvert('File Converted Successfully..');
    } catch (error) {
      console.log(error);
      setDownloadError("Error Occurred: " + (error.response?.data?.message || "Something went wrong."));

    }
  }

  return (
    <>
      <div className='max-w-screen-2xl mx-auto container px-6  md:px-40'>

        <div className='flex h-screen items-center justify-center' >

          <div className='border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg'>
            <h1 className='text-3xl font-bold text-center mb-4'>Convert Word To PDF</h1>
            <p className='text-sm mb-4 text-center'>Convert word file to PDf easily, without download any software</p>


            <div className='flex flex-col items-center space-y-4'>

              <input type='file'
                accept='.doc,.docx'
                className='hidden'
                id='fileInput'
                onChange={handleFileChange}>
              </input>

              <label htmlFor="fileInput" className='flex w-full items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-600 duration-300 hover:text-white'>

                <FaRegFileWord className='text-3xl mr-3 hover:text-white' />

                <span className='text-2xl mr-2'>{selectedFile ? selectedFile.name : 'Chose File'}</span>

              </label>

              <button
                disabled={!selectedFile}
                className='text-white font-bold bg-blue-500 hover:bg-blue-800 duration-300 py-2 disabled:bg-gray-400 disabled:pointer-events-none px-4 rounded-lg'
                onClick={buttonSubmit}
              >Convert File
              </button>

              {convert &&
                (<div className='text-green-600 text-center'>{convert}</div>)
              }

              {downloadError &&
                (<div className='text-red-600 text-center'>{downloadError}</div>)
              }

            </div>

          </div>
        </div>

      </div>
    </>
  )
}
