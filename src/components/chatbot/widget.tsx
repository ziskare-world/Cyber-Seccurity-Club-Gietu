"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Bot, User, Send, Loader2, X, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cyberSecurityTutor } from "@/ai/flows/chatbot";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FormSchema = z.object({
  message: z.string().min(1, {
    message: "Message cannot be empty.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    if (scrollAreaViewportRef.current) {
      scrollAreaViewportRef.current.scrollTop = scrollAreaViewportRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const userMessage: ChatMessage = { role: "user", content: data.message };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    try {
      const result = await cyberSecurityTutor({ message: data.message });
      const assistantMessage: ChatMessage = { role: "assistant", content: result.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error with chatbot:", error);
      toast({
        title: "Error",
        description: "Failed to get a response from the chatbot. Please try again.",
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-[380px] h-[550px] flex flex-col shadow-2xl rounded-lg animate-in fade-in-50 slide-in-from-bottom-10 duration-500">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-primary">
                    <AvatarFallback><Bot className="h-5 w-5 text-primary"/></AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-base font-headline">Cy - AI Tutor</CardTitle>
                    <p className="text-xs text-muted-foreground">Your cybersecurity guide</p>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col">
              <ScrollArea className="flex-1 p-4" viewportRef={scrollAreaViewportRef} type="auto">
              <div className="space-y-4">
                  {messages.length === 0 && (
                       <div className="text-center text-muted-foreground pt-10">
                          <Bot className="h-10 w-10 mx-auto mb-2"/>
                          <p className="text-sm">Ask me anything about cybersecurity!</p>
                      </div>
                  )}
                  {messages.map((message, index) => (
                  <div key={index} className={cn("flex items-start gap-3", message.role === "user" ? "justify-end" : "")}>
                      {message.role === "assistant" && (
                          <Avatar className="h-8 w-8 border border-primary/50">
                              <AvatarFallback><Bot className="h-4 w-4 text-primary"/></AvatarFallback>
                          </Avatar>
                      )}
                      <div className={cn("max-w-[80%] rounded-lg p-3 text-sm", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary")} style={{overflowWrap: 'break-word'}}>
                          <p>{message.content}</p>
                      </div>
                      {message.role === "user" && (
                          <Avatar className="h-8 w-8">
                              <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
                          </Avatar>
                      )}
                  </div>
                  ))}
                  {isLoading && (
                      <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 border border-primary/50">
                              <AvatarFallback><Bot className="h-4 w-4 text-primary"/></AvatarFallback>
                          </Avatar>
                          <div className="max-w-[80%] rounded-lg p-3 bg-secondary flex items-center">
                              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground"/>
                          </div>
                      </div>
                  )}
              </div>
              </ScrollArea>

              <div className="p-3 border-t">
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
                  <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                      <FormItem className="flex-1">
                          <FormControl>
                          <Input
                              placeholder="Type a message..."
                              autoComplete="off"
                              {...field}
                          />
                          </FormControl>
                      </FormItem>
                      )}
                  />
                  <Button type="submit" disabled={isLoading} size="icon" aria-label="Send message">
                      <Send className="h-4 w-4" />
                  </Button>
                  </form>
              </Form>
              </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setIsOpen(true)} size="lg" className="rounded-full w-16 h-16 shadow-lg">
          <MessageSquare className="h-8 w-8" />
        </Button>
      )}
    </div>
  );
}
