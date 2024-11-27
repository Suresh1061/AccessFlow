import React from 'react';
import { Button } from './ui/button';

type UserStatsProps = {
     totalUsers: number;
     totalActiveUsers: number;
     totalInactiveUsers: number;
     onModalOpen: (open: boolean) => void;
};

const UserStats: React.FC<UserStatsProps> = ({ totalUsers, totalActiveUsers, totalInactiveUsers, onModalOpen }) => {

     return (
          <div className="bg-card max-w-2xl mx-auto rounded-lg mb-20 p-6 sm:p-10 flex flex-col sm:flex-row gap-5 sm:gap-8  justify-between items-center">
               <div className='flex flex-1 gap-8 items-center justify-around'>
                    <div className="text-center">
                         <h1 className="text-xl sm:text-2xl font-semibold">{totalUsers}</h1>
                         <p className="text-xs sm:text-sm text-slate-600">Total Users</p>
                    </div>
                    <div className="text-center">
                         <h1 className="text-xl sm:text-2xl font-semibold">{totalActiveUsers}</h1>
                         <p className="text-xs sm:text-sm text-slate-600">Active Users</p>
                    </div>
                    <div className="text-center">
                         <h1 className="text-xl sm:text-2xl font-semibold">{totalInactiveUsers}</h1>
                         <p className="text-xs sm:text-sm text-slate-600">Inactive Users</p>
                    </div>
               </div>
               <Button onClick={() => onModalOpen(true)} className='w-full sm:w-auto'>Add Users</Button>
          </div>
     );
};

export default UserStats;
