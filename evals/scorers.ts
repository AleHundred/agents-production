import type { Scorer } from 'autoevals'

// ts-expect-error
export const ToolCallMatch: Scorer<any, {}> = ({ output, expected }) => {
  const score =
    output.role === 'assistant' && // it should be an assistant response
    Array.isArray(output.tool_calls) && // it could be a tool call or a final response
    output.tool_calls.length === 1 && // it should only have one tool call
    output.tool_calls[0].function?.name ===
      expected.tool_calls[0].function?.name
      ? 1
      : 0 // if it matches the expected tool call, score it as 1, otherwise 0

  return {
    name: 'ToolCallMatch',
    score,
  }
}
