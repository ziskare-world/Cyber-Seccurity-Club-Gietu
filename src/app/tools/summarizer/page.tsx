
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { summarizeSecurityNews, type SummarizeSecurityNewsOutput } from "@/ai/flows/summarize-security-news";
import { Badge } from "@/components/ui/badge";

const FormSchema = z.object({
  articleContent: z.string().min(100, {
    message: "Article content must be at least 100 characters.",
  }).max(10000, {
    message: "Article content cannot exceed 10,000 characters."
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function SummarizerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SummarizeSecurityNewsOutput | null>(null);

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      articleContent: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const summaryResult = await summarizeSecurityNews(data);
      setResult(summaryResult);
    } catch (error) {
      console.error("Summarization failed:", error);
      toast({
        title: "Analysis Failed",
        description: "Something went wrong while analyzing the article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="mt-4 text-4xl font-bold font-headline tracking-tight sm:text-5xl">Security News Summarizer</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Paste the content of a security news article below. Our AI will summarize it and determine if it's safe to share.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
              <CardTitle>Article Content</CardTitle>
              <CardDescription>Paste the full text of the article here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="articleContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Start pasting your article content here..."
                          className="min-h-[300px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Article"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Analysis Result</CardTitle>
                <CardDescription>The summary and safety assessment will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[360px]">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Loader2 className="h-12 w-12 animate-spin mb-4" />
                        <p>AI is thinking...</p>
                    </div>
                )}

                {!isLoading && !result && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                       <Shield className="h-12 w-12 mb-4" />
                        <p>Awaiting analysis. <br/> The result will be shown here.</p>
                    </div>
                )}
                
                {result && (
                    <div className="space-y-6 animate-in fade-in-50">
                        <div>
                            <h3 className="font-semibold mb-2 text-lg flex items-center">
                                {result.safeToShare ? (
                                    <ShieldCheck className="h-6 w-6 mr-2 text-green-500"/>
                                ) : (
                                    <ShieldAlert className="h-6 w-6 mr-2 text-red-500"/>
                                )}
                                Sharing Safety
                            </h3>
                             <Badge variant={result.safeToShare ? 'default' : 'destructive'} className={result.safeToShare ? 'bg-green-600' : 'bg-red-600'}>
                                {result.safeToShare ? 'Safe to Share' : 'Not Safe to Share'}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-2">{result.reasoning}</p>
                        </div>
                        <div className="border-t border-border/50 pt-4">
                            <h3 className="font-semibold mb-2 text-lg">Summary</h3>
                            <p className="text-sm leading-relaxed">{result.summary}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

