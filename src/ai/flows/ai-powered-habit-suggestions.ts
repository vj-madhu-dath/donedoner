'use server';

/**
 * @fileOverview AI-powered habit suggestion flow.
 *
 * This file defines a Genkit flow that suggests new tasks or habits based on the user's existing completed tasks.
 * It exports:
 *   - `suggestHabits` function: The main entry point for the flow.
 *   - `SuggestHabitsInput`: The input type for the `suggestHabits` function.
 *   - `SuggestHabitsOutput`: The output type for the `suggestHabits` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestHabitsInputSchema = z.object({
  completedTasks: z
    .array(z.string())
    .describe('A list of tasks the user has already completed.'),
});
export type SuggestHabitsInput = z.infer<typeof SuggestHabitsInputSchema>;

const SuggestHabitsOutputSchema = z.object({
  suggestedTask: z
    .string()
    .describe('A suggested task or habit based on the completed tasks.'),
});
export type SuggestHabitsOutput = z.infer<typeof SuggestHabitsOutputSchema>;

export async function suggestHabits(input: SuggestHabitsInput): Promise<SuggestHabitsOutput> {
  return suggestHabitsFlow(input);
}

const suggestHabitsPrompt = ai.definePrompt({
  name: 'suggestHabitsPrompt',
  input: {schema: SuggestHabitsInputSchema},
  output: {schema: SuggestHabitsOutputSchema},
  prompt: `Based on the following list of completed tasks:

  {{#each completedTasks}}
  - {{{this}}}
  {{/each}}

  Suggest one new task or habit that the user might want to add to their done list. The task should be related to the existing tasks, and help to reinforce a sense of productivity and accomplishment.`,
});

const suggestHabitsFlow = ai.defineFlow(
  {
    name: 'suggestHabitsFlow',
    inputSchema: SuggestHabitsInputSchema,
    outputSchema: SuggestHabitsOutputSchema,
  },
  async input => {
    const {output} = await suggestHabitsPrompt(input);
    return output!;
  }
);
