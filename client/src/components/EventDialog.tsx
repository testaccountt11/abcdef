import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface EventDialogProps {
  event: TimePadEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: string;
}

export const EventDialog: React.FC<EventDialogProps> = ({
  event,
  open,
  onOpenChange,
  language,
}) => {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {event.name.text}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="aspect-video rounded-lg overflow-hidden mb-6">
            <img
              src={event.poster_image?.default_url || event.organization.logo_image?.default_url}
              alt={event.name.text}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: event.description.html }} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">
                      {language === 'ru' ? 'Дата и время' :
                       language === 'kz' ? 'Күні мен уақыты' :
                       'Date and Time'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(event.starts_at, language)}
                    </div>
                  </div>
                </div>

                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">
                        {language === 'ru' ? 'Место проведения' :
                         language === 'kz' ? 'Өткізу орны' :
                         'Location'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {`${event.location.city}${event.location.address ? `, ${event.location.address}` : ''}`}
                      </div>
                    </div>
                  </div>
                )}

                {event.registration_data && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">
                        {language === 'ru' ? 'Количество мест' :
                         language === 'kz' ? 'Орындар саны' :
                         'Available Spots'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.registration_data.tickets_limit}
                      </div>
                    </div>
                  </div>
                )}

                {event.registration_data?.price_min >= 0 && (
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {event.registration_data.price_min === 0 ? 
                        (language === 'ru' ? 'Бесплатно' :
                         language === 'kz' ? 'Тегін' :
                         'Free') :
                        `${event.registration_data.price_min} ₸`}
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full mt-4"
                  onClick={() => window.open(event.url, '_blank')}
                >
                  {language === 'ru' ? 'Зарегистрироваться' :
                   language === 'kz' ? 'Тіркелу' :
                   'Register'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="space-y-2">
                {event.categories?.map(category => (
                  <Badge key={category.id} variant="outline" className="mr-2">
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 