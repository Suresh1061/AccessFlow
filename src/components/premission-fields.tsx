import {
     FormControl,
     FormDescription,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";

interface PermissionFieldsProps {
     name: string,
     control: Control<any>;
}


const PermissionFields: React.FC<PermissionFieldsProps> = ({ name, control }) => {
     return (
          <FormField
               control={control}
               name={name}
               render={() => (
                    <FormItem>
                         <div className="mb-4">
                              <FormLabel className="text-base">Permissions</FormLabel>
                              <FormDescription>
                                   Select the permissions for this user.
                              </FormDescription>
                         </div>
                         {["read", "create", "edit", "remove"].map((item) => (
                              <FormField
                                   key={item}
                                   control={control}
                                   name={`permissions.${item}`}
                                   render={({ field }) => {
                                        return (
                                             <FormItem
                                                  key={item}
                                                  className="flex flex-row items-start space-x-3 space-y-0"
                                             >
                                                  <FormControl>
                                                       <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                       />
                                                  </FormControl>
                                                  <FormLabel className="font-normal">
                                                       {item.charAt(0).toUpperCase() + item.slice(1)}
                                                  </FormLabel>
                                             </FormItem>
                                        )
                                   }}
                              />
                         ))}
                         <FormMessage />
                    </FormItem>
               )}
          />
     )
}

export default PermissionFields