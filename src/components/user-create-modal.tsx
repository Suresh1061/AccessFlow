'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import UsersTable2 from './users-table2';
import UserForm from './user-form';

interface UserCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateUser: () => void;
}

const UserCreateModal: React.FC<UserCreateModalProps> = ({ isOpen, onClose, onCreateUser }) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state

  // Fetch the unassigned users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data: res } = await axios.get('/api/users/unassigned-role');
      setUsers(res.data);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data?.message || 'Error while fetching users. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectUser = (user: UserData) => {
    setSelectedUser(user);
    setIsUserSelected(true);
  };

  useEffect(() => {
    // Fetch users when modal is open
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null; // If modal is not open, don't render

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl relative w-full max-w-lg mx-4">
        <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />
        {isLoading ? (
          <div className=' w-full flex justify-center items-center'>
            <Loader2 className='animate-spin h-8 w-8' />
          </div>
        ) : (
          <div>
            {users.length > 0 ? (
              !isUserSelected ? (
                <>
                  <h2 className="text-xl font-bold mb-4">Select user to add</h2>
                  <UsersTable2 users={users} onSelectUser={handleSelectUser} />
                </>
              ) : (
                selectedUser && (
                  <>
                    <h2 className="text-lg sm:text-xl font-bold mb-4">Create user with role and permissions</h2>
                    <UserForm user={selectedUser} onUpdate={onCreateUser} onClose={onClose} />
                  </>
                )
              )
            ) : (
              <h2>No users are available</h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCreateModal;
