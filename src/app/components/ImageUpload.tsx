import { useDropzone } from 'react-dropzone';

import React, {useCallback, useState} from "react";
import Image from 'next/image';

interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean
}

const ImageUpload : React.FC<ImageUploadProps> = ({
    onChange,
    label,
    value,
    disabled
}) => {
    const [base64, setBase64] = useState<string | undefined>(value);
    const handleChange = useCallback((base64: string) => {
      onChange(base64);  
    }, [onChange])

    const handleDrop = useCallback((files: File[]) => {
        const file = files[0];
        const reader = new FileReader();

         reader.onload = (event: ProgressEvent<FileReader>) => {
            const result = event.target?.result as string;
            setBase64(result);
            handleChange(result);
        };

        reader.readAsDataURL(file);
    }, [handleChange]);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        }
    })


  return (
    <div
        {
            ...getRootProps({
                className: "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700"
            })
        }
    >
        <input {...getInputProps()} />
        {
            base64 ? (
                <div className='flex items-center justify-center'>
                    <Image
                        src={base64}
                        height='100'
                        width='100'
                        alt='Uploaded Image'
                    />
                </div>
            ) : (
                <p className='text-white'>{label}</p>
            )
        }
    </div>
  )
}

export default ImageUpload