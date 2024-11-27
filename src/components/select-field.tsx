import {
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from "@/components/ui/form";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";

interface SelectFieldProps {
     name: string;
     label: string;
     placeholder?: string;
     control: Control<any>;
     selectOptions: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({
     name,
     label,
     placeholder,
     control,
     selectOptions,
}) => {
     return (
          <FormField
               name={name}
               control={control}
               render={({ field }) => (
                    <FormItem>
                         <FormLabel>{label}</FormLabel>
                         <Select
                              onValueChange={(value) => {
                                   field.onChange(value);
                              }}
                              value={field.value || ""}
                         >
                              <FormControl className="capitalize">
                                   <SelectTrigger>
                                        <SelectValue placeholder={placeholder}/>
                                   </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                   {selectOptions.map((option) => (
                                        <SelectItem
                                             key={option}
                                             value={option}
                                             className={`${option === "hr" ? "uppercase" : "capitalize"
                                                  }`}
                                        >
                                             {option}
                                        </SelectItem>
                                   ))}
                              </SelectContent>
                         </Select>
                         <FormMessage />
                    </FormItem>
               )}
          />
     );
};

export default SelectField;
