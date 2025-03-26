import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import AdviceCard from "@/components/dashboard/AdviceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Advice() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch articles
  const { data: articles, isLoading } = useQuery({
    queryKey: ['/api/articles'],
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to load articles",
        variant: "destructive",
      });
    },
  });

  // Apply filters
  const filteredArticles = articles?.filter(article => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === "all" || 
      article.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const uniqueCategories = [...new Set(articles?.map(article => article.category))];

  return (
    <AppLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Advice & Resources</h1>
          <p className="text-gray-600">Tips and guidance for exams, admissions, and career development</p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Search articles"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {uniqueCategories.map((category, index) => (
                  <SelectItem key={index} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <div className="md:flex">
                  <Skeleton className="md:w-1/3 h-40" />
                  <div className="p-4 md:w-2/3">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <div className="flex items-center">
                      <Skeleton className="h-6 w-6 rounded-full mr-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : filteredArticles && filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <AdviceCard key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-500">No articles match your filters</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
