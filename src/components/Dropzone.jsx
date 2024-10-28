import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Reorder } from "framer-motion";

function Dropzone({className}) {
  const [files, setFiles] = useState([])

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    acceptedFiles.forEach((file) => {
        if(acceptedFiles?.length){
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, {preview: URL.createObjectURL(file)})
                )
            ])
        }
    })
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps({className: className,})}>
        <input {...getInputProps()} />
        {
            isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      
        

            {files.map(file => (
                    <img src={file.preview} alt='' width={100} height={100} className='m-5'/>        
            ))}
        
    </div>
  )
}

export default Dropzone