'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

interface DescriptionFormProps {
    initialData: Course,
    courseId: string
}

const formSchema = z.object({
    description: z.string().min(1, {
        message: 'Description is required'
    })
})

export const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
    const [isEditing, setIsEditng] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { description: initialData?.description || '' }
    })
    const { isSubmitting, isValid } = form.formState
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
    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course Description
                <Button onClick={toggleEdit} variant='ghost'>
                    {!isEditing ? (
                        <>
                            <Pencil className='w-4 h-4 mr-2' />
                            Edit Description
                        </>
                    ) :
                        <>Cancle</>
                    }

                </Button>
            </div>
            {!isEditing && (<p className={cn('text-sm mt-2', !initialData.description && 'text-slate-500 italic')}>
                {initialData.description || "No Description"}
            </p>)}
            {isEditing && (<Form {...form}>
                <form className='space-y-4 mt-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        disabled={isSubmitting}
                                        placeholder='e.g "This course is about..."'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex items-center gap-x-2'>
                        <Button disabled={isSubmitting || !isValid} type='submit'>Save</Button>
                    </div>
                </form>

            </Form>)
            }
        </div >
    )
}
