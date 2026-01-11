'use server';

/**
 * @fileOverview Summarizes security news articles and identifies potentially unsafe information.
 *
 * - summarizeSecurityNews - A function that summarizes security news articles.
 * - SummarizeSecurityNewsInput - The input type for the summarizeSecurityNews function.
 * - SummarizeSecurityNewsOutput - The return type for the summarizeSecurityNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSecurityNewsInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the security news article to summarize.'),
});

export type SummarizeSecurityNewsInput = z.infer<
  typeof SummarizeSecurityNewsInputSchema
>;

const SummarizeSecurityNewsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the security news article.'),
  safeToShare: z
    .boolean()
    .describe(
      'Whether the information in the article is safe to share, avoiding potential harm or misinformation.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the safeToShare determination, explaining why the article is safe or unsafe to share.'
    ),
});

export type SummarizeSecurityNewsOutput = z.infer<
  typeof SummarizeSecurityNewsOutputSchema
>;

export async function summarizeSecurityNews(
  input: SummarizeSecurityNewsInput
): Promise<SummarizeSecurityNewsOutput> {
  return summarizeSecurityNewsFlow(input);
}

const summarizeSecurityNewsPrompt = ai.definePrompt({
  name: 'summarizeSecurityNewsPrompt',
  input: {schema: SummarizeSecurityNewsInputSchema},
  output: {schema: SummarizeSecurityNewsOutputSchema},
  prompt: `You are an AI assistant specializing in cybersecurity news.

  Your task is to summarize security news articles and determine if the information is safe to share.

  Consider factors such as the source's reliability, the potential for misinformation, and the risk of causing harm by sharing the information.

  Article Content: {{{articleContent}}}

  Summary:
  Safe To Share (true/false):
  Reasoning:`,
});

const summarizeSecurityNewsFlow = ai.defineFlow(
  {
    name: 'summarizeSecurityNewsFlow',
    inputSchema: SummarizeSecurityNewsInputSchema,
    outputSchema: SummarizeSecurityNewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeSecurityNewsPrompt(input);
    return output!;
  }
);
