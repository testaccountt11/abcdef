import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  startDate: string
  endDate?: string
  isPresent?: boolean
  projectUrl?: string
  githubUrl?: string
}

export default function ProjectCard({
  title,
  description,
  technologies,
  startDate,
  endDate,
  isPresent,
  projectUrl,
  githubUrl
}: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </div>
        <p className="text-sm">
          {startDate} - {isPresent ? 'Present' : endDate}
        </p>
        <div className="flex gap-2 mt-2">
          {projectUrl && (
            <a href={projectUrl} target="_blank" rel="noopener noreferrer" 
               className="text-sm text-primary hover:underline">
              View Project
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
               className="text-sm text-primary hover:underline">
              GitHub
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 