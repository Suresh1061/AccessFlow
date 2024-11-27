'use client'
import { useEffect, useState } from 'react';
import { getSession } from '@/app/lib';
import PermissionDisplay from '@/components/permission-display';
import Loading from '@/components/loading';

export default function StatusPage() {
     const [user, setUser] = useState<UserData | null>(null);

     useEffect(() => {
          const fetchUser = async () => {
               const session = await getSession();
               if (session) {
                    setUser(session.user);
               }
          };
          fetchUser();
     }, []);

     if (!user) {
          return <Loading />
     }

     return (
          <main className="container mx-auto mt-8 p-4">
               <div className="w-full max-w-md mx-auto rounded-lg border bg-card text-card-foreground shadow-sm">
                    <h2 className='flex flex-col space-y-1.5 p-6 text-2xl font-bold'>Your Informations</h2>
                    <div className="space-y-4 p-6 pt-0">
                         <div>
                              <span className="font-medium capitalize">Name:</span> {user.name}
                         </div>
                         <div>
                              <span className="font-medium">Email:</span> {user.email}
                         </div>
                         <div className='flex items-center gap-2'>
                              <span className="font-medium">Status:</span>
                              <div className={`${user.status === "active" ? "text-green-600" : "text-red-600"} capitalize flex items-center gap-2`}>
                                   <span className={`h-2 w-2 rounded-full animate-blink ${user.status === "active" ? "bg-green-600" : "bg-red-600"}`} />{user?.status}
                              </div>
                         </div>
                         <div>
                              <span className={`${user?.role === "hr" ? "uppercase" : "capitalize"}`}>Role:</span> {user.role ? user.role : "No role assigned"}
                         </div>
                         <div>
                              <span className="font-medium">Permissions:</span>
                              <div className="ml-4 mt-2 space-y-2">
                                   <PermissionDisplay label="Create" value={user.permissions.create} />
                                   <PermissionDisplay label="Read" value={user.permissions.read} />
                                   <PermissionDisplay label="Edit" value={user.permissions.edit} />
                                   <PermissionDisplay label="Remove" value={user.permissions.remove} />
                              </div>
                         </div>
                    </div>
               </div>
          </main>
     );
}
