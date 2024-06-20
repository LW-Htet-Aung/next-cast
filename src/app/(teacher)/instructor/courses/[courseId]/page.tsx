import { getCourse } from "@/actions/courses"
import IconBadge from "@/components/ui/icon-badge"
import { LayoutDashboard } from "lucide-react"

type CourseDetailProps = {
    params: {
        courseId: string
    }
}
const CourseDetail = async ({ params: { courseId } }: CourseDetailProps) => {
    const course = await getCourse(courseId)
    const requiredField = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]
    const totalField = requiredField.length;
    const completedField = requiredField.filter(Boolean).length
    const completionText = `(${completedField}/${totalField}) `
    return (
        <section className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Course Setup</h1>
                    <span className="text-sm text-slate-700 ">Complete All fields {completionText}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-2">
                        <IconBadge variant='default' icon={LayoutDashboard} />
                        <h2 className="text-xl">Customize your Course</h2>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CourseDetail