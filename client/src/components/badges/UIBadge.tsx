import React from 'react';
import { 
  Trophy, Award, Medal, Crown, Star, 
  Zap, BookOpen, Target, Heart, ThumbsUp, 
  Flame, Shield, Coffee, Globe, Compass 
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UIBadgeProps {
  name: string;
  description: string;
  type: string;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

const UIBadge: React.FC<UIBadgeProps> = ({ 
  name, 
  description, 
  type, 
  size = 'md',
  showTooltip = true 
}) => {
  // Define badge types with their respective colors and icons
  const badgeTypes: Record<string, { 
    bgColor: string,
    iconColor: string,
    icon: React.ReactNode
  }> = {
    'gold': {
      bgColor: 'bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700',
      iconColor: 'text-amber-600 dark:text-amber-400',
      icon: <Trophy />
    },
    'silver': {
      bgColor: 'bg-slate-100 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700',
      iconColor: 'text-slate-600 dark:text-slate-400',
      icon: <Medal />
    },
    'bronze': {
      bgColor: 'bg-orange-100 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800',
      iconColor: 'text-orange-700 dark:text-orange-400',
      icon: <Award />
    },
    'achievement': {
      bgColor: 'bg-blue-100 dark:bg-blue-950/50 border-blue-300 dark:border-blue-800',
      iconColor: 'text-blue-700 dark:text-blue-400',
      icon: <Star />
    },
    'special': {
      bgColor: 'bg-purple-100 dark:bg-purple-950/50 border-purple-300 dark:border-purple-800',
      iconColor: 'text-purple-700 dark:text-purple-400',
      icon: <Crown />
    },
    'streak': {
      bgColor: 'bg-red-100 dark:bg-red-950/50 border-red-300 dark:border-red-800',
      iconColor: 'text-red-700 dark:text-red-400',
      icon: <Flame />
    },
    'beginner': {
      bgColor: 'bg-green-100 dark:bg-green-950/50 border-green-300 dark:border-green-800',
      iconColor: 'text-green-700 dark:text-green-400',
      icon: <Zap />
    },
    'intermediate': {
      bgColor: 'bg-cyan-100 dark:bg-cyan-950/50 border-cyan-300 dark:border-cyan-800',
      iconColor: 'text-cyan-700 dark:text-cyan-400',
      icon: <Shield />
    },
    'advanced': {
      bgColor: 'bg-indigo-100 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-800',
      iconColor: 'text-indigo-700 dark:text-indigo-400',
      icon: <Target />
    },
    'master': {
      bgColor: 'bg-rose-100 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800',
      iconColor: 'text-rose-700 dark:text-rose-400',
      icon: <Globe />
    },
    'helper': {
      bgColor: 'bg-pink-100 dark:bg-pink-950/50 border-pink-300 dark:border-pink-800',
      iconColor: 'text-pink-700 dark:text-pink-400',
      icon: <Heart />
    },
    'social': {
      bgColor: 'bg-teal-100 dark:bg-teal-950/50 border-teal-300 dark:border-teal-800',
      iconColor: 'text-teal-700 dark:text-teal-400',
      icon: <ThumbsUp />
    },
    'explorer': {
      bgColor: 'bg-lime-100 dark:bg-lime-950/50 border-lime-300 dark:border-lime-800',
      iconColor: 'text-lime-700 dark:text-lime-400',
      icon: <Compass />
    },
    'dedicated': {
      bgColor: 'bg-amber-100 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800',
      iconColor: 'text-amber-700 dark:text-amber-400',
      icon: <Coffee />
    },
    'learner': {
      bgColor: 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800',
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      icon: <BookOpen />
    },
    'default': {
      bgColor: 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700',
      iconColor: 'text-gray-700 dark:text-gray-400',
      icon: <Award />
    }
  };

  // Get badge style or use default
  const badge = badgeTypes[type?.toLowerCase()] || badgeTypes.default;
  
  // Size classes
  const sizeClasses = {
    sm: {
      container: 'w-10 h-10',
      icon: 'w-5 h-5'
    },
    md: {
      container: 'w-14 h-14',
      icon: 'w-7 h-7'
    },
    lg: {
      container: 'w-20 h-20',
      icon: 'w-10 h-10'
    }
  };
  
  const selectedSize = sizeClasses[size];
  
  const badgeElement = (
    <div className={`${selectedSize.container} rounded-full ${badge.bgColor} border-2 flex items-center justify-center`}>
      <div className={`${badge.iconColor} ${selectedSize.icon}`}>
        {badge.icon}
      </div>
    </div>
  );
  
  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badgeElement}
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p className="font-semibold">{name}</p>
              <p className="text-xs">{description}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return badgeElement;
};

export default UIBadge;