import { Article } from "@shared/schema";

interface AdviceCardProps {
  article: Article;
}

export default function AdviceCard({ article }: AdviceCardProps) {
  const { title, content, category, imageUrl, authorName, authorImage, readTime } = article;
  
  const getCategoryColor = (category: string) => {
    const categoryMapping: { [key: string]: string } = {
      'Career Advice': 'bg-purple-100 text-purple-800',
      'Admissions': 'bg-blue-100 text-blue-800',
      'Study Tips': 'bg-green-100 text-green-800',
      'Exam Prep': 'bg-yellow-100 text-yellow-800',
      'Technology': 'bg-indigo-100 text-indigo-800'
    };
    
    return categoryMapping[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
      <div className="md:flex"> 
        <div className="md:w-1/3">
          <img 
            src={imageUrl} 
            className="w-full h-full object-cover" 
            alt={title} 
          />
        </div>
        <div className="p-4 md:w-2/3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getCategoryColor(category)} mb-2`}>
            {category}
          </span>
          <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{content}</p>
          <div className="flex items-center text-xs text-gray-500">
            {authorImage && (
              <img 
                src={authorImage} 
                alt={authorName} 
                className="w-6 h-6 rounded-full mr-2" 
              />
            )}
            <span>{authorName}</span>
            {readTime && (
              <>
                <span className="mx-2">•</span>
                <span>{readTime}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
