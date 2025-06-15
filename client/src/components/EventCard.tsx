import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface EventCardProps {
  event: TimePadEvent;
  onClick: () => void;
  language: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick, language }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-card border rounded-xl overflow-hidden shadow-md group hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-[500px]"
    >
      <div className="h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        <img 
          src={event.poster_image?.default_url || event.organization.logo_image?.default_url} 
          alt={event.name.text}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const gradientDiv = document.createElement('div');
              gradientDiv.className = "absolute inset-0 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center";
              const text = document.createElement('span');
              text.className = "text-white text-2xl font-bold text-center px-4";
              text.textContent = event.organization.name.split(' ').map(word => word[0]).join('');
              gradientDiv.appendChild(text);
              parent.appendChild(gradientDiv);
            }
          }}
        />
        
        {/* Category badge */}
        {event.categories?.[0] && (
          <Badge className="absolute top-4 left-4 z-20 bg-primary text-white border-none">
            {event.categories[0].name}
          </Badge>
        )}
        
        {/* Organization name */}
        <div className="absolute bottom-4 left-4 z-20">
          <Badge variant="outline" className="bg-black/70 text-white border-white/30">
            {event.organization.name}
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-semibold mb-3 line-clamp-2">
          {event.name.text}
        </h3>
        
        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.starts_at, language)}</span>
          </div>
          
          {event.location?.city && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{`${event.location.city}${event.location.address ? `, ${event.location.address}` : ''}`}</span>
            </div>
          )}
          
          {event.registration_data?.tickets_limit > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>
                {language === 'ru' ? 'Мест: ' :
                 language === 'kz' ? 'Орындар: ' :
                 'Spots: '}
                {event.registration_data.tickets_limit}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto">
          {event.registration_data?.price_min >= 0 && (
            <div className="text-lg font-semibold text-primary">
              {event.registration_data.price_min === 0 ? 
                (language === 'ru' ? 'Бесплатно' :
                 language === 'kz' ? 'Тегін' :
                 'Free') :
                `${event.registration_data.price_min} ₸`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 