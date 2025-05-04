import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import OpportunityCard from "@/components/dashboard/OpportunityCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Define Opportunity type
interface Opportunity {
  id: number;
  title: string;
  company: string;
  description: string;
  location: string;
  type: string;
  logoUrl: string | null;
  duration: string | null;
  deadline: string | null;
  // Add other fields as needed
}

export default function Opportunities() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // Fetch opportunities
  const { data: opportunities, isLoading, isError, error } = useQuery<Opportunity[]>({
    queryKey: ['/api/opportunities'],
  });

  // Show error toast if there was an error
  if (isError && error instanceof Error) {
    toast({
      title: "Error",
      description: error.message || "Failed to load opportunities",
      variant: "destructive",
    });
  }

  // Apply filters
  const filteredOpportunities = opportunities?.filter((opportunity: Opportunity) => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = typeFilter === "all" || opportunity.type === typeFilter;
    
    // Location filter
    const matchesLocation = locationFilter === "all" || 
      opportunity.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

  // Get unique locations for filter
  const uniqueLocations = Array.from(new Set(opportunities?.map((o: Opportunity) => o.location) || [])).filter(Boolean);

  return (
    <AppLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Opportunities</h1>
          <p className="text-gray-600">Find internships, volunteering positions, and competitions</p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              placeholder="Search by title, company or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="internship">Internships</SelectItem>
                <SelectItem value="volunteer">Volunteering</SelectItem>
                <SelectItem value="competition">Competitions</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {uniqueLocations.map((location, index) => (
                  <SelectItem key={index} value={String(location)}>{String(location)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="internship">Internships</TabsTrigger>
            <TabsTrigger value="volunteer">Volunteering</TabsTrigger>
            <TabsTrigger value="competition">Competitions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-1" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-10 flex-1 rounded-md" />
                        <Skeleton className="h-10 w-10 rounded-md" />
                      </div>
                    </div>
                  </div>
                ))
              ) : filteredOpportunities && filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((opportunity: Opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No opportunities match your filters</p>
                </div>
              )}
            </div>
          </TabsContent>

          {["internship", "volunteer", "competition"].map((type) => (
            <TabsContent key={type} value={type} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-6 w-3/4 mb-1" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <div className="p-4">
                        <Skeleton className="h-4 w-3/4 mb-3" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="flex space-x-2">
                          <Skeleton className="h-10 flex-1 rounded-md" />
                          <Skeleton className="h-10 w-10 rounded-md" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : filteredOpportunities && filteredOpportunities.filter((o: Opportunity) => o.type === type).length > 0 ? (
                  filteredOpportunities
                    .filter((o: Opportunity) => o.type === type)
                    .map((opportunity: Opportunity) => (
                      <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                    ))
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-gray-500">No {type}s match your filters</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
}
