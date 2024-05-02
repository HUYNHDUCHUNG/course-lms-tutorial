import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectCategoryProps{
    options: {label:string; value: string }[];
    value?: string;
    onChange?: (value : string) => void;
  }
  

export const SelectCategory = ({
    options,
    value,
    onChange
}:SelectCategoryProps) => {
  return (
    <Select defaultValue={value} onValueChange={onChange}>
        
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {options.map((option) =>{
                return(
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                )
              
            })}
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
