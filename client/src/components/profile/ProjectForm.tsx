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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslations } from "@/hooks/use-translations"

// Define the form schema
const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  technologies: z.array(z.string()),
  startDate: z.string(),
  isPresent: z.boolean(),
  endDate: z.string().optional(),
  projectUrl: z.string().optional(),
  githubUrl: z.string().optional(),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: ProjectFormValues) => void
  initialData?: Partial<ProjectFormValues>
}

export function ProjectForm({ open, onClose, onSubmit, initialData }: ProjectFormProps) {
  const { t } = useTranslations()
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      technologies: initialData?.technologies || [],
      startDate: initialData?.startDate || "",
      isPresent: initialData?.isPresent || false,
      endDate: initialData?.endDate || "",
      projectUrl: initialData?.projectUrl || "",
      githubUrl: initialData?.githubUrl || "",
    },
  })

  const handleTechnologiesChange = (value: string) => {
    const techArray = value.split(",").map(t => t.trim()).filter(Boolean)
    form.setValue("technologies", techArray)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profile.project.title')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profile.project.description')}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profile.project.technologies')}</FormLabel>
              <FormControl>
                <Input 
                  value={field.value.join(", ")} 
                  onChange={(e) => handleTechnologiesChange(e.target.value)}
                />
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
              <FormLabel>{t('profile.project.startDate')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('profile.project.dateFormat')} />
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
              <FormLabel>{t('profile.project.currentlyWorking')}</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {!form.watch("isPresent") && (
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('profile.project.endDate')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('profile.project.dateFormat')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="projectUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profile.project.projectUrl')} ({t('profile.project.optional')})</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profile.project.githubUrl')} ({t('profile.project.optional')})</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{t('profile.project.save')}</Button>
      </form>
    </Form>
  )
} 