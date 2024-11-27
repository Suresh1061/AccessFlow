import { Check, X } from 'lucide-react'

interface PermissionDisplayProps {
     label: string;
     value: boolean;
}

const PermissionDisplay = ({ label, value }: PermissionDisplayProps) => {
     return (
          <div className="flex items-center space-x-2">
               <span className="font-medium">{label}:</span>
               {value ? (
                    <Check className="text-green-500" size={20} />
               ) : (
                    <X className="text-red-500" size={20} />
               )}
          </div>
     )
}

export default PermissionDisplay