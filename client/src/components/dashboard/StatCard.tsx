import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  isLoading?: boolean;
}

export default function StatCard({ title, value, icon, isLoading = false }: StatCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-10 w-10 rounded-md mb-4" />
          <Skeleton className="h-5 w-28 mb-2" />
          <Skeleton className="h-7 w-16" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-3 bg-primary/10 w-14 h-14 flex items-center justify-center rounded-xl">
            {icon}
          </div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
