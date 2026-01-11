
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from '@/lib/utils';
import type { ToolCategory } from './page';

const iconMap: { [key: string]: React.ReactNode } = {
  Shield: <Shield className="h-8 w-8 text-primary" />,
  Code: <Code className="h-8 w-8 text-primary" />,
};

const DESCRIPTION_CHAR_LIMIT = 150;

export function ToolCard({ tool }: { tool: ToolCategory }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const description = tool.description || "";
  const isLongDescription = description.length > DESCRIPTION_CHAR_LIMIT;
  
  const truncatedDescription = isLongDescription
    ? `${description.substring(0, DESCRIPTION_CHAR_LIMIT)}...`
    : description;

  return (
    <Card className="w-full bg-card/70 hover:bg-card hover:border-primary/50 transition-all duration-300 group flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-secondary rounded-full transition-transform group-hover:scale-110">
            {iconMap[tool.icon] || <Code className="h-8 w-8 text-primary" />}
          </div>
          <div className="flex-1">
            <CardTitle className="font-headline text-xl">{tool.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">
          {isExpanded ? description : truncatedDescription}
        </p>
        {isLongDescription && (
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary text-sm mt-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        )}
      </CardContent>
      <div className="p-6 pt-0 mt-auto">
          <div className="flex flex-row flex-wrap gap-2">
              {tool.links && tool.links.map((link) => (
                 <Button asChild key={link.name} variant="outline" size="sm" className="group/link">
                   <Link href={link.url} target="_blank" rel="noopener noreferrer">
                     <span>{link.name}</span>
                     <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                   </Link>
                 </Button>
              ))}
          </div>
      </div>
    </Card>
  );
}
