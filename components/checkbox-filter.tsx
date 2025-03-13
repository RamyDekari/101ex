"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Props for the CheckboxFilter component
interface CheckboxFilterProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function CheckboxFilter({ id, label, checked, onChange }: CheckboxFilterProps) {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id} className="text-sm text-white cursor-pointer">
        {label}
      </Label>
    </div>
  )
}

