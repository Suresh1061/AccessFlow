'use client';

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import UserFilter from "@/components/filter-user";
import SearchUser from "@/components/search";
import UserStats from "@/components/user-stats";
import UsersTable from "@/components/users-table";
import PaginationButtons from "@/components/pagination-button";
import Loading from "@/components/loading";
import UserForm from "@/components/user-form";
import { X } from "lucide-react";
import UserCreateModal from "@/components/user-create-modal";

type UsersApiResponse = {
     data: UserData[];
     totalUsers: number;
     totalActiveUsers: number;
     totalInActiveUsers: number;
     currentPage: number;
     totalPages: number;
     message: string;
     success: boolean;
};

const User = () => {
     const [users, setUsers] = useState<UserData[]>([]);
     const [axiosResponse, setAxiosResponse] = useState<UsersApiResponse | null>(null);

     // Filters and Pagination
     const [pageNumber, setPageNumber] = useState<number>(1);
     const [searchValue, setSearchValue] = useState<string>('');
     const [filteredValue, setFilteredValue] = useState<FilterItemType>('all');

     const [editingUser, setEditingUser] = useState<UserData | null>(null);
     const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
     const [isUserCreateModalOpen, setIsUserCreateModalOpen] = useState(false)

     const fetchUsers = async () => {
          try {
               const { data: res } = await axios.get<UsersApiResponse>(
                    `/api/users?page=${pageNumber}&search=${searchValue}&filter=${filteredValue}`
               );
               setUsers(res.data);
               setAxiosResponse(res);
          } catch (error) {
               const axiosError = error as AxiosError<ApiResponse>;
               toast.error(
                    axiosError.response?.data?.message || "Error while fetching users. Please try again later."
               );
          }
     };

     const handleDeleteUser = async (id: string) => {
          try {
               const { data: res } = await axios.delete<ApiResponse>(`/api/users/delete/${id}`);
               if (res.success) {
                    toast.success(res.message);
                    fetchUsers()
               } else {
                    toast.error(res.message);
               }
          } catch (error) {
               const axiosError = error as AxiosError<ApiResponse>;
               toast.error(
                    axiosError.response?.data?.message || "Error while deleting user. Please try again later."
               );
          }
     };

     const handleEditUser = (user: UserData) => {
          setEditingUser(user);
          setIsUserEditModalOpen(true)
     }

     //refresh or fetch user the user when the user is created or updated
     const handleUserCreatedOrUpdated = () => {
          fetchUsers()
     }

     //function for close the modal
     const onClose = () => {
          setIsUserEditModalOpen(false)
     }

     // Trigger data fetching on dependency changes
     useEffect(() => {
          fetchUsers()
     }, [pageNumber, searchValue, filteredValue]);


     if (!axiosResponse) {
          return <Loading />
     }

     return (
          <>
               {/* User Statistics Section */}
               <UserStats
                    totalUsers={axiosResponse.totalUsers}
                    totalActiveUsers={axiosResponse.totalActiveUsers}
                    totalInactiveUsers={axiosResponse.totalInActiveUsers}
                    onModalOpen={setIsUserCreateModalOpen}
               />

               {/* Filters and Search */}
               <div className="flex items-center justify-start gap-8 mb-6">
                    <SearchUser setSearchValue={setSearchValue} />
                    <UserFilter
                         filteredValue={filteredValue}
                         setFilteredValue={setFilteredValue}
                    />
               </div>

               {users.length === 0 ? (
                    <div className="flex justify-center items-center mt-10">
                         <h1 className="text-xl font-semibold text-slate-600">No Users Found</h1>
                    </div>
               ) : (
                    <>
                         <UsersTable
                              users={users}
                              handleDeleteUser={handleDeleteUser}
                              handleEditUser={handleEditUser}
                         />
                         <PaginationButtons
                              totalPages={axiosResponse.totalPages}
                              pageNumber={pageNumber}
                              setPageNumber={setPageNumber}
                         />
                    </>
               )}


               {/* Edit user through modal */}
               {isUserEditModalOpen && editingUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                         <div className="bg-white p-6 rounded-lg shadow-xl relative w-full max-w-lg mx-4">
                              <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />
                              <h2 className="text-xl font-bold mb-4">Edit User</h2>
                              <UserForm
                                   user={editingUser}
                                   onUpdate={handleUserCreatedOrUpdated}
                                   onClose={onClose}
                              />
                         </div>
                    </div>
               )}

               {/* Create user modal */}
               {isUserCreateModalOpen && (
                    <UserCreateModal
                         isOpen={isUserCreateModalOpen}
                         onClose={() => setIsUserCreateModalOpen(false)}
                         onCreateUser={handleUserCreatedOrUpdated}
                    />
               )}
          </>
     );
};

export default User;
