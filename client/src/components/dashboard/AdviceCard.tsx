import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/hooks/use-translations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";

interface AdviceCardProps {
  advice: {
    id: string;
    title: string;
    content: string;
    summary: string;
    category: string;
    imageUrl: string;
    authorName: string;
    authorImage: string;
    readTime: number;
    publishDate: string;
  };
  onClick?: () => void;
}

export default function AdviceCard({ advice, onClick }: AdviceCardProps) {
  const { language } = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="relative">
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img
              src={advice.imageUrl || '/placeholder-advice.jpg'}
              alt={advice.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge className="absolute top-2 right-2">
              {advice.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{advice.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{advice.summary}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{advice.authorName}</span>
        </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{advice.readTime} {language === 'ru' ? 'мин' : 'min'}</span>
      </div>
    </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={() => onClick?.()}
            asChild
          >
            <Link href={`/advice/${advice.id}`}>
              {language === 'ru' ? 'Читать' : 'Read'}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
