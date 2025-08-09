import { Header } from "@/components/Header";
import { EditorHeader } from "@/components/EditorHeader";
import { Editor } from "@/components/Editor";
import { useState } from "react";

const SAMPLE_SCRIPT = `# Simple Color Preference Script

## You are assisting a client.

1. Ask: **What is your favorite color?**
2. As soon as the user responds, <% function xyz98765-wxyz-4321-lmno-pqrstuvwxyza %>
3. If the response is **red**, <% function abc12345-def6-7890-ghij-klmnopqrstuv %>

---

Invalid function id: <% function abc12345-def6-7890-ghij-klmnopqrstuvx %>

- ~strike me~
- <u>underline me</u>
- \`pre\`

\`\`\`javascript
console.log("code block");
\`\`\`
`;

export default function App() {
  const [markdown, setMarkdown] = useState(SAMPLE_SCRIPT);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Header />

      {/* Editor Section */}
      <section className="py-8 px-4 flex flex-row">
        <div className="max-w-4xl mx-auto">
          <EditorHeader />
          <div className="flex flex-row flex-wrap gap-6">
            <div className="flex-1">
              <Editor markdown={markdown} onChange={setMarkdown} />
            </div>

            {/* Show markdown output for demo purposes */}
            <div className="whitespace-pre-wrap min-w-sm min-h-[400px]">
              <textarea
                value={markdown}
                className="border-2 w-full h-full p-2 font-mono"
                disabled
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
