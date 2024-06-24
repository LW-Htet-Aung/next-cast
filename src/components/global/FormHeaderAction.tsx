import { Pencil } from "lucide-react";
import { Button } from "../ui/button";

interface FormHeaderActionProps {
    title: string,
    isEditing: boolean,
    handleEdit: () => void,
}

export const FormHeaderAction = ({ title, isEditing, handleEdit }: FormHeaderActionProps) => {
    return (
        <div className='font-medium flex capitalize items-center justify-between'>
            Course {title}
            <Button className="capitalize" onClick={handleEdit} variant='ghost'>
                {!isEditing ? (
                    <>
                        <Pencil className='w-4 h-4 mr-2' />
                        Edit {title}
                    </>
                ) :
                    "Cancle"
                }
            </Button>
        </div>
    );
};
