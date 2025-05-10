import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import MentorCard from "@/components/dashboard/MentorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Define Mentor type
interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  skills: string[] | null;
  rating?: number;
  bio?: string;
  profileImage: string | null;
  contactInfo: string | null;
  // Add other fields as needed
}

export default function Mentors() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");

  // Fetch mentors
  const { data: mentors, isLoading, isError, error } = useQuery<Mentor[]>({
    queryKey: ['/api/mentors'],
  });

  // Show error toast if there was an error
  if (isError && error instanceof Error) {
    toast({
      title: "Error",
      description: error.message || "Failed to load mentors",
      variant: "destructive",
    });
  }

  // Apply filters
  const filteredMentors = mentors?.filter((mentor: Mentor) => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Skill filter
    const matchesSkill = skillFilter === "all" || 
      mentor.skills?.some((skill: string) => skill.toLowerCase() === skillFilter.toLowerCase()) || [];
    
    // Company filter
    const matchesCompany = companyFilter === "all" || 
      mentor.company.toLowerCase() === companyFilter.toLowerCase();
    
    return matchesSearch && matchesSkill && matchesCompany;
  });

  // Get unique skills and companies for filters
  const allSkills = mentors?.flatMap((mentor: Mentor) => mentor.skills) || [];
  const uniqueSkills = Array.from(new Set(allSkills));
  
  const uniqueCompanies = Array.from(new Set(mentors?.map((mentor: Mentor) => mentor.company) || []));

  return (
    <AppLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mentors</h1>
          <p className="text-gray-600">Find mentors to guide you in your educational journey</p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              placeholder="Search by name or title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All skills</SelectItem>
                {uniqueSkills.map((skill, index) => (
                  <SelectItem key={index} value={String(skill)}>{String(skill)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All companies</SelectItem>
                {uniqueCompanies.map((company, index) => (
                  <SelectItem key={index} value={String(company)}>{String(company)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <div className="p-4 text-center">
                  <Skeleton className="h-24 w-24 rounded-full mx-auto mb-3" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-1" />
                  <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
                  <div className="flex justify-center mb-3">
                    <Skeleton className="h-6 w-16 rounded-full mx-1" />
                    <Skeleton className="h-6 w-16 rounded-full mx-1" />
                    <Skeleton className="h-6 w-16 rounded-full mx-1" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
            ))
          ) : filteredMentors && filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))
          ) : (
            <div className="col-span-4 text-center py-8">
              <p className="text-gray-500">No mentors match your filters</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
