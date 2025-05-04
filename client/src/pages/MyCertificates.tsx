import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Award, Download, Plus, Upload } from "lucide-react";
import { Certificate } from "@/types";

// Certificate upload form schema
const certificateFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  issuer: z.string().min(2, "Issuer must be at least 2 characters"),
  issueDate: z.string().min(1, "Issue date is required"),
  certificateUrl: z.string().optional(),
  certificateFile: z.any().optional(),
});

type CertificateFormValues = z.infer<typeof certificateFormSchema>;

export default function MyCertificates() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form for adding new certificate
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      title: "",
      issuer: "",
      issueDate: new Date().toISOString().split('T')[0],
      certificateUrl: "",
      certificateFile: null,
    },
  });

  // Fetch certificates
  const { data: certificates, isLoading } = useQuery<Certificate[]>({
    queryKey: ['/api/certificates'],
  });

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-certificate', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to upload file');

      const data = await response.json();
      return data.fileUrl;
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
      return null;
    }
  };

  // Handle form submission
  const onSubmit = async (values: CertificateFormValues) => {
    try {
      setIsUploading(true);
      
      let certificateFile = null;
      if (values.certificateFile) {
        certificateFile = await handleFileUpload(values.certificateFile);
      }

      await apiRequest('POST', '/api/certificates', {
        ...values,
        certificateFile,
      });
      
      toast({
        title: "Success",
        description: "Certificate added successfully",
      });
      
      // Invalidate certificates query to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/certificates'] });
      
      // Reset form and close dialog
      form.reset();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add certificate",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Certificates</h1>
            <p className="text-gray-600">Store and showcase your achievements</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Certificate</DialogTitle>
                <DialogDescription>
                  Enter the details of your certificate to add it to your portfolio.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificate Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Web Development Bootcamp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="issuer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issuing Organization</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Portfol.IO" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="certificateFile"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Certificate File</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  onChange(file);
                                }
                              }}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                                if (fileInput) fileInput.click();
                              }}
                            >
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="certificateUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificate URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/certificate" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" disabled={isUploading}>
                      {isUploading ? "Uploading..." : "Add Certificate"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow border border-gray-100">
                <div className="p-4">
                  <Skeleton className="h-8 w-8 rounded-full mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : certificates && certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <Card key={certificate.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Award className="h-8 w-8 text-primary-600" />
                    <Badge variant="outline">{new Date(certificate.issueDate).toLocaleDateString()}</Badge>
                  </div>
                  <CardTitle>{certificate.title}</CardTitle>
                  <CardDescription>Issued by {certificate.issuer}</CardDescription>
                </CardHeader>
                <CardFooter>
                  {(certificate.certificateUrl || certificate.certificateFile) ? (
                    <a 
                      href={certificate.certificateUrl || certificate.certificateFile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" /> View Certificate
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      <Download className="mr-2 h-4 w-4" /> No Certificate Available
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
            <Award className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Certificates Yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Complete courses on Portfol.IO or add certificates from other platforms to showcase your achievements.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Your First Certificate
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
