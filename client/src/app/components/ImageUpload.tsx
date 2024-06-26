'use client'
import { IconDefinition, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export default function ImageUpload({name,icon}: {name:string, icon:IconDefinition}) {
    const fileInRef = useRef<HTMLInputElement>(null);
    const [url, setUrl] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const session = useSession();

    async function upload(ev: ChangeEvent<HTMLInputElement>) {
        const input = ev.target as HTMLInputElement;
        if (input && input.files?.length && input.files.length > 0) {
            setIsUploading(true);
            const file = input.files[0];
            const data = new FormData;
            data.set('file', file);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/`, data, {
                headers: {
                    Authorization: `Bearer ${session.data.accessToken}`
                }
            
            })
            if (response.data.url) {
                setUrl(response.data.url);
                setIsUploading(false);
            }
        }
    }

    return (
        <div>
            <div className="bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center">
                {isUploading && (
                    <FontAwesomeIcon icon={faSpinner} className='text-gray-400 size-5 animate-spin'/>
                )}
                {!isUploading && url && ( 
                    <Image src={url} alt="Uploaded image" width={1024} height={1024} className='rounded-md w-auto h-auto max-w-24 max-h-24 '/>
                )}
                {!isUploading && !url && (
                    <FontAwesomeIcon icon={icon} className='text-gray-400 size-5'/>  
                    
                )}
            </div>
            <input type="hidden" value={url} name={name} />
            <div className='mt-2'>
                <input 
                    ref={fileInRef} 
                    type="file" 
                    className="hidden"
                    onChange={(ev) => upload(ev)} />
                <Button 
                    type="button"
                    onClick={() => fileInRef.current?.click()}
                    variant='soft'>
                    Select file
                </Button>
            </div>
        </div>
            
        
    )
}