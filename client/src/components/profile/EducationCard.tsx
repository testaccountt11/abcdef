import { Card, CardContent } from "@/components/ui/card"

interface EducationCardProps {
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate?: string
  isPresent?: boolean
}

export default function EducationCard({ 
  institution, 
  degree, 
  fieldOfStudy,
  startDate,
  endDate,
  isPresent 
}: EducationCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium">{institution}</h3>
        <p>{degree} in {fieldOfStudy}</p>
        <p className="text-sm text-muted-foreground">
          {startDate} - {isPresent ? 'Present' : endDate}
        </p>
      </CardContent>
    </Card>
  )
} 