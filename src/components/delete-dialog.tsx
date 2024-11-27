import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
     AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

type Props = {
     userId: string;
     handleDeleteUser: (id: string) => void
};

const DeleteDialog: React.FC<Props> = ({ userId, handleDeleteUser }) => {

     return (
          <AlertDialog>
               <AlertDialogTrigger asChild>
                    <Trash2 className="h-4 w-4 cursor-pointer text-red-600" />
               </AlertDialogTrigger>
               <AlertDialogContent>
                    <AlertDialogHeader>
                         <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                         <AlertDialogDescription>
                              {`This action cannot be undone. Deleting this user will permanently remove their data.`}
                         </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                         <AlertDialogCancel>Cancel</AlertDialogCancel>
                         <AlertDialogAction
                              onClick={() => handleDeleteUser(userId)}
                         >
                              Confirm
                         </AlertDialogAction>
                    </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     );
};

export default DeleteDialog;
