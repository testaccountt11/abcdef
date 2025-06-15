import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  type: string
}

interface ProfileAchievementsProps {
  achievements: Achievement[]
  isLoading?: boolean
}

export default function ProfileAchievements({ achievements, isLoading }: ProfileAchievementsProps) {
  if (isLoading) {
    return <div>Loading achievements...</div>
  }

  if (!achievements.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No achievements yet
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <Card key={achievement.id}>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <div>
              <CardTitle className="text-lg">{achievement.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge>{achievement.type}</Badge>
              <span className="text-sm text-muted-foreground">{achievement.date}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 