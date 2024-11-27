import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"

type Props = {
     users: UserData[]
     onSelectUser: (user: UserData) => void
}

const UsersTable2: React.FC<Props> = ({ users, onSelectUser }) => {
     return (
          <Table>
               <TableHeader>
                    <TableRow>
                         <TableHead>Name</TableHead>
                         <TableHead>Email</TableHead>
                         <TableHead>Action</TableHead>
                    </TableRow>
               </TableHeader>
               <TableBody>
                    {users.map((user) => (
                         <TableRow key={user._id}>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                   <Button onClick={() => onSelectUser(user)}>
                                        Select
                                   </Button>
                              </TableCell>
                         </TableRow>
                    ))}
               </TableBody>
          </Table>
     );
};


export default UsersTable2