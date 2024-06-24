'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToggle } from '@/hooks/useToggle'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import { FormHeaderAction } from '../FormHeaderAction'

interface TitleFormProps {
    initialData: {
        title: string
    },
    courseId: string
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    })
})

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
    const [isEditing, toggleEdit] = useToggle()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })
    const { isSubmitting, isValid } = form.formState
    const router = useRouter()

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
            <FormHeaderAction
                title='title'
                isEditing={isEditing}
                handleEdit={toggleEdit}
            />
            {!isEditing && (<p className='text-sm mt-2'>
                {initialData.title}
            </p>)}
            {isEditing && (<Form {...form}>
                <form className='space-y-4 mt-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder='e.g "Advanced Web Development"'
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
