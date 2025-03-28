import { Button } from "@/components/ui/button";
import { Article } from "@shared/schema";
import { Link } from "wouter";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { getTranslation } from "@/lib/translations";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { title, content, imageUrl, authorName, readTime, category } = article;
  // Создаем краткое содержание статьи из начала контента, если поле summary отсутствует
  const summary = content.substring(0, 100) + '...';
  const publishDate = null; // Временно убираем, пока не добавим в БД
  const { language } = useTheme();
  
  const articleImage = imageUrl || '/assets/default-article.jpg';
  
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'admission':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'exam':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      case 'career':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'university':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formattedDate = publishDate ? new Date(publishDate).toLocaleDateString() : '';

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <Link href={`/advice/${article.id}`}>
        <div className="relative h-40 cursor-pointer">
          <img 
            src={articleImage} 
            className="w-full h-full object-cover" 
            alt={title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
          <div className="absolute top-0 left-0 p-3">
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getCategoryColor(category)}`}>
              {category}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/advice/${article.id}`}>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400">{title}</h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{summary}</p>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
          <UserIcon className="h-3.5 w-3.5 mr-1" />
          <span>{authorName}</span>
          
          {publishDate && (
            <>
              <span className="mx-2">•</span>
              <CalendarIcon className="h-3.5 w-3.5 mr-1" />
              <span>{formattedDate}</span>
            </>
          )}
          
          {readTime && (
            <>
              <span className="mx-2">•</span>
              <ClockIcon className="h-3.5 w-3.5 mr-1" />
              <span>{readTime} min read</span>
            </>
          )}
        </div>
        
        <Link href={`/advice/${article.id}`}>
          <Button className="w-full">
            {getTranslation('dashboard.viewAllArticles', language)}
          </Button>
        </Link>
      </div>
    </div>
  );
}