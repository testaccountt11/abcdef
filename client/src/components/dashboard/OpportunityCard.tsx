import { Opportunity } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/hooks/use-translations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Building2, Calendar, Clock, MapPin, Users, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick?: () => void;
  saved?: boolean;
  applicantsCount?: number;
}

export default function OpportunityCard({ 
  opportunity, 
  onClick,
  saved = false,
  applicantsCount = 0
}: OpportunityCardProps) {
  const { t, language } = useTranslations();
  const [isSaved, setIsSaved] = useState(saved);

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'internship':
        return 'bg-blue-500/90 hover:bg-blue-500';
      case 'volunteer':
        return 'bg-green-500/90 hover:bg-green-500';
      case 'competition':
        return 'bg-purple-500/90 hover:bg-purple-500';
      default:
        return 'bg-primary/90 hover:bg-primary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200 group">
        <CardHeader className="relative p-0">
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img
              src={opportunity.logoUrl || '/placeholder-company.jpg'}
              alt={opportunity.company}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className={cn("text-white", getTypeColor(opportunity.type))}>
                  {opportunity.type}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-full bg-white/10 hover:bg-white/20",
                    isSaved && "text-yellow-400"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSaved(!isSaved);
                  }}
                >
                  <Bookmark className={cn("h-4 w-4", isSaved && "fill-yellow-400")} />
                </Button>
              </div>
              {applicantsCount > 0 && (
                <div className="flex items-center gap-1 text-white/90 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{applicantsCount} {language === 'ru' ? 'заявок' : 'applicants'}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {opportunity.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{opportunity.description}</p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Building2 className="w-4 h-4 mr-2 text-primary" />
              <span>{opportunity.company}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <span>{opportunity.duration}</span>
            </div>
            {opportunity.deadline && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <span>{new Date(opportunity.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className={cn(
              "w-full transition-all duration-200",
              getTypeColor(opportunity.type)
            )}
            onClick={() => onClick?.()}
            asChild
          >
            <Link href={`/opportunities/${opportunity.id}`}>
              {language === 'ru' ? 'Подробнее' : 'Learn More'}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
