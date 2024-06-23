'use client'

import { ourFileRouter } from "@/app/api/uploadthing/core"
import { UploadDropzone } from "@/lib/uploadthing"
import toast from "react-hot-toast"

interface FileUploaderProps {
    onChange: (url?: string) => void,
    endpoint: keyof typeof ourFileRouter
}
export const FileUploader = ({ onChange, endpoint }: FileUploaderProps) => {
    const onClientUploadComplete = (res: { url: string | undefined }[]) => {
        onChange(res?.[0].url)
    }
    const onUploadError = (error: Error) => {
        toast.error('[FileUploader]:' + error?.message)
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={onClientUploadComplete}
            onUploadError={onUploadError}
        />

    )
}
