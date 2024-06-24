'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useToggle } from '@/hooks/useToggle'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import { FormHeaderAction } from '../FormHeaderAction'
import { Combobox } from '@/components/ui/combo-box'

interface CategoryFormProps {
    initialData: Course,
    courseId: string,
    options: { label: string, value: string }[]
}

const formSchema = z.object({
    categoryId: z.string().min(1)
})

export const CategoryForm = ({ initialData, courseId, options }: CategoryFormProps) => {
    const [isEditing, toggleEdit] = useToggle()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { categoryId: initialData?.categoryId || '' }
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
    const selectedOption = options?.find(option => option?.value === initialData?.categoryId)

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <FormHeaderAction
                title='category'
                isEditing={isEditing}
                handleEdit={toggleEdit}
            />
            {!isEditing && (<p className={cn('text-sm mt-2', !initialData.categoryId && 'text-slate-500 italic')}>
                {selectedOption?.label || "No category"}
            </p>)}
            {isEditing && (<Form {...form}>
                <form className='space-y-4 mt-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='categoryId'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Combobox
                                        options={options}
                                        value={field.value}
                                        onChange={field.onChange}
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
