'use client'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/file-uploader'
import { Course } from '@prisma/client'
import axios from 'axios'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import * as z from 'zod'

interface ImageFormProps {
    initialData: Course,
    courseId: string
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: 'Image is required'
    })
})

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
    const [isEditing, setIsEditng] = useState(false)
    const router = useRouter()
    const toggleEdit = () => setIsEditng(!isEditing)

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        console.log(value)
        try {
            const course = await axios.patch(`/api/courses/${courseId}`, value);
            toast.success('Course Updated')
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    const handleFileUpload = (url?: string) => {
        if (url) {
            onSubmit({ imageUrl: url });
        }
    }
    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course Image
                <Button onClick={toggleEdit} variant='ghost'>
                    {isEditing && "Cancle"}
                    {!isEditing && !initialData?.imageUrl &&
                        <>
                            <PlusCircle className='w-4 h-4 mr-2' />
                            Add an Image
                        </>
                    }
                    {!isEditing && initialData?.imageUrl &&
                        <>
                            <Pencil className='w-4 h-4 mr-2' />
                            Edit Image
                        </>
                    }
                </Button>
            </div>
            {!isEditing && (!initialData?.imageUrl ? (
                <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                    <ImageIcon className='w-10 h-10 text-slate-500' />
                </div>
            ) : (
                <div className='relative aspect-video mt-2'>
                    <Image alt='Upload Image' fill className='object-cover rounded-md'
                        src={initialData?.imageUrl}
                    />
                    Current Image
                </div>
            )
            )}
            {isEditing && (
                <div>
                    <FileUploader
                        endpoint='courseImage'
                        onChange={handleFileUpload}
                    />
                    <div className='text-xs text-muted-foreground mt-4'>
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )
            }
        </div >
    )
}
