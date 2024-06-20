'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import { useTransition } from "react"

const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
})

const CreateCourse = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })
    const router = useRouter()
    const { isSubmitting, isValid } = form.formState
    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('/api/courses', value)
            router.push(`${response.data.id}`)
            toast.success('Course created')
        } catch (error) {
            toast.error('Something went wrong!')
        }
    }
    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl font-semibold">Name your Course</h1>
                <p className="text-sm text-slate-600 font-medium">What would you like to name your course? Don&apos;t worry, you can change this later</p>

                <Form {...form}>
                    <form className='space-y-x mt-8' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel >
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. Advanced web development"
                                            {...field}
                                        />

                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in this course
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <div className="flex items-center gap-x-2 mt-8">
                            <Link href='/'>
                                <Button variant='ghost' type='button'>
                                    Cancle
                                </Button>
                            </Link>
                            <Button
                                disabled={!isValid || isSubmitting}
                                type='submit'
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
export default CreateCourse