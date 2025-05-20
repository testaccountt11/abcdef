import { Mentor } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/hooks/use-translations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Building2, Mail, Phone, Star, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface MentorCardProps {
  mentor: Mentor;
  onClick?: () => void;
  rating?: number;
  studentsCount?: number;
  sessionsCount?: number;
}

export default function MentorCard({ 
  mentor, 
  onClick,
  rating = 0,
  studentsCount = 0,
  sessionsCount = 0
}: MentorCardProps) {
  const { t, language } = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200 group">
        <CardHeader className="relative p-0">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <img
              src={mentor.profileImage || '/placeholder-mentor.jpg'}
              alt={mentor.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary/90 hover:bg-primary">
                  {mentor.title}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-white/90 text-sm">
                {rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{rating.toFixed(1)}</span>
                  </div>
                )}
                {studentsCount > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{studentsCount}</span>
                  </div>
                )}
                {sessionsCount > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{sessionsCount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {mentor.name}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Building2 className="w-4 h-4 mr-2 text-primary" />
              <span>{mentor.company}</span>
            </div>
            {mentor.contactInfo && (
              <>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2 text-primary" />
                  <span>{mentor.contactInfo}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 mr-2 text-primary" />
                  <span>{mentor.contactInfo}</span>
                </div>
              </>
            )}
          </div>
          {mentor.skills && mentor.skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {mentor.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-primary/10 hover:bg-primary/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-primary hover:bg-primary/90 transition-all duration-200"
            onClick={() => onClick?.()}
            asChild
          >
            <Link href={`/mentors/${mentor.id}`}>
              {language === 'ru' ? 'Связаться' : 'Contact'}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
