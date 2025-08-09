// availableFunctions: A static list of all possible function types that could be used in prompts.
// These represent the universe of callable functions in the system, regardless of which are currently in use.
export const availableFunctions = {
  end: "Functions.EndConversation",
  transfer: "Functions.TransferCall",
  knowledge: "Functions.Knowledge",
  calendar: "Functions.Calendar",
};

type FunctionType =
  (typeof availableFunctions)[keyof typeof availableFunctions];

// FunctionSpec: The contract for a function specification.
// This mimics a response from a database or API that fetches the available function specs for a given user or context.
// Each function spec 'id' is unique upon creation and should be treated as a unique identifier for that function instance.
// You are free to modify this contract if your solution requires additional fields or changes.
export interface FunctionSpec {
  id: string;
  description: string;
  function_internal_id: FunctionType;
}

export const functionSpecs: FunctionSpec[] = [
  {
    id: "abc12345-def6-7890-ghij-klmnopqrstuv",
    description: "Ends the conversation with a successful outcome",
    function_internal_id: "Functions.EndConversation",
  },
  {
    id: "xyz98765-wxyz-4321-lmno-pqrstuvwxyza",
    description: "Transfers the call to a human representative",
    function_internal_id: "Functions.TransferCall",
  },
];
