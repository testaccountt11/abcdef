import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslations } from "@/hooks/use-translations"

const educationFormSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isPresent: z.boolean().default(false),
})

type EducationFormValues = z.infer<typeof educationFormSchema>

interface EducationFormProps {
  onSubmit: (data: EducationFormValues) => void
  onClose: () => void
  initialData?: EducationFormValues
  open: boolean
}

export default function EducationForm({ onSubmit, onClose, initialData, open }: EducationFormProps) {
  const { t } = useTranslations();
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: initialData || {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      isPresent: false,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profile.education.institution')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profile.education.degree')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profile.education.fieldOfStudy')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profile.education.startDate')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('profile.education.startDate.placeholder')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPresent"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t('profile.education.currentlyStudying')}</FormLabel>
            </FormItem>
          )}
        />

        {!form.watch('isPresent') && (
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('profile.education.endDate')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('profile.education.endDate.placeholder')} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full">
          {t('profile.education.save')}
        </Button>
      </form>
    </Form>
  )
} 