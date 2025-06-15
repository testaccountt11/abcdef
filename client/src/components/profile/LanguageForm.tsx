import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { languageLevels } from '@shared/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Export the schema
export const languageFormSchema = z.object({
  name: z.string().min(1, "Language name is required"),
  level: z.enum(languageLevels as readonly ["A1", "A2", "B1", "B2", "C1", "C2", "Native"]),
  certificate: z.string().optional(),
});

// Export the type
export type LanguageFormData = z.infer<typeof languageFormSchema>;

export interface LanguageFormProps {
  onSubmit: (data: LanguageFormData) => void;
  onClose: () => void;
  initialData?: LanguageFormData;
  open: boolean;
}

export default function LanguageForm({ onSubmit, onClose, initialData, open }: LanguageFormProps) {
  const form = useForm<LanguageFormData>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: initialData || {
      name: "",
      level: "A1",
      certificate: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languageLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="certificate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificate (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  )
} 