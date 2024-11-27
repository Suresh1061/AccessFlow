import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, Edit, X } from "lucide-react"
import DeleteDialog from "./delete-dialog"

type Props = {
  users: UserData[]
  handleDeleteUser: (id: string) => void
  handleEditUser: (user: UserData) => void
}

const UsersTable: React.FC<Props> = ({ users, handleDeleteUser, handleEditUser }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead colSpan={4} className="text-center">Permissions</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
        <TableRow>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead>Create</TableHead>
          <TableHead>Read</TableHead>
          <TableHead>Update</TableHead>
          <TableHead>Delete</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell
              className={`${user.status === "active" ? "text-green-600" : "text-red-600"} capitalize flex items-center gap-2`}
            >
              <div
                className={`h-2 w-2 rounded-full animate-blink ${user.status === "active" ? "bg-green-600" : "bg-red-600"}`}
              />
              {user.status}
            </TableCell>

            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className={`${user.role === "hr" ? "uppercase" : "capitalize"}`}>{user.role}</TableCell>
            <TableCell>{user.permissions.create ? <Check className="text-green-600" /> : <X className="text-red-600" />}</TableCell>
            <TableCell>{user.permissions.read ? <Check className="text-green-600" /> : <X className="text-red-600" />}</TableCell>
            <TableCell>{user.permissions.edit ? <Check className="text-green-600" /> : <X className="text-red-600" />}</TableCell>
            <TableCell>{user.permissions.remove ? <Check className="text-green-600" /> : <X className="text-red-600" />}</TableCell>
            <TableCell className="flex flex-row gap-4">
              <Edit
                className="h-4 w-4 cursor-pointer text-green-600"
                onClick={() => handleEditUser(user)}
              />
              <DeleteDialog
                userId={user._id}
                handleDeleteUser={handleDeleteUser}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};


export default UsersTable