import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { languageLevels } from '@/lib/translations/types';

interface LanguageCardProps {
  name: string
  level: (typeof languageLevels)[number]
  certificate?: string
}

export default function LanguageCard({ name, level, certificate }: LanguageCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">{name}</span>
          <Badge>{level}</Badge>
        </div>
        {certificate && (
          <p className="text-sm text-muted-foreground mt-1">{certificate}</p>
        )}
      </CardContent>
    </Card>
  )
} 