import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash, ExternalLink } from "lucide-react";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";

export interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  isOwner: boolean;
}

export default function ProjectCard({ project, onEdit, onDelete, isOwner }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base">{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </div>
        <div className="flex space-x-2">
          {project.url && (
            <Button variant="ghost" size="sm" asChild>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          {isOwner && (
            <>
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onDelete}>
                <Trash className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">{tech}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 