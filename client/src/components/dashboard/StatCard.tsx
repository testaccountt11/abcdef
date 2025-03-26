import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: string; // Remix icon class name
  color: "primary" | "secondary" | "accent" | "purple";
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  const getColorClasses = (): { bg: string; text: string } => {
    switch (color) {
      case "primary":
        return { bg: "bg-primary-100", text: "text-primary-600" };
      case "secondary":
        return { bg: "bg-secondary-100", text: "text-secondary-600" };
      case "accent":
        return { bg: "bg-accent-100", text: "text-accent-600" };
      case "purple":
        return { bg: "bg-purple-100", text: "text-purple-600" };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
      <div className="flex items-center">
        <div className={`rounded-md ${colorClasses.bg} p-2 mr-3`}>
          <i className={`ri-${icon} ${colorClasses.text}`}></i>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
