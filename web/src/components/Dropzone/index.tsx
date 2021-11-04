import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { DropzoneProps } from '../../interfaces/interfaces';

import './styles.css';

const Dropzone: React.FC<DropzoneProps> = (props) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    props.onFileUploaded(file);
  }, [props])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop,
      accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
          selectedFileUrl ?
          <img src={selectedFileUrl} alt="Point thumbnail" /> :
            isDragActive ?
            <p>Solte a imagem aqui...</p> :
            <p><FiUpload />Arraste e solte a imagem aqui ou clique para selecionar o arquivo</p>
      }
    </div>
  )
}

export default Dropzone;