import { useLayoutEffect, useState } from "react";
import { Marked } from "marked";
import TurndownService from "turndown";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card, CardContent } from "@/components/ui/card";
import { FunctionBadgeNode } from "@/components/FunctionBadge";

const marked = new Marked();

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  preformattedCode: true,
  hr: "---",
});

const functionRegex = /<% function ([a-z0-9-]+) %>/g;

const functionHTMLRegex = /<span data-fn="([a-z0-9-]+)"><\/span>/g;

// remove paragraphs after list items, inserted by tiptap
turndown.addRule("tightListParagraph", {
  filter: (n) =>
    n.nodeName === "P" &&
    n.parentElement?.nodeName === "LI" &&
    n.parentElement.children.length === 1,
  replacement: (content) => content,
}).addRule('strikethrough', {
  filter: ['s'],
  replacement: (content) => `~${content}~`
}).keep(["u"]);

type EditorProps = {
  markdown: string;
  onChange: (markdown: string) => void;
};

export function Editor({ markdown, onChange }: EditorProps) {
  const [markdownWithFns, setMarkdownWithFns] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your script...",
      }),
      FunctionBadgeNode,
    ],
    content: markdownWithFns,
    onCreate: updateHTML,
    onUpdate: updateMarkdown,
  });

  useLayoutEffect(() => {
    // replace custom function tags with html to be parsed
    // by the FunctionBadgeNode tiptap extension
    setMarkdownWithFns(
      markdown.replace(
        functionRegex,
        (_, id) => `<span data-fn="${id}"></span>`
      )
    );
  }, [markdown]);

  async function updateHTML() {
    // converts current markdown to HTML for the tiptap editor
    const html = marked.parse(markdownWithFns ?? "");
    editor.commands.setContent(html, { emitUpdate: false });
  }

  async function updateMarkdown() {
    // extracts markdown from tiptap using turndown lib
    const html = editor
      .getHTML()
      .replace(functionHTMLRegex, (_, id) => `<% function ${id} %>`);
    const newMd = turndown.turndown(html ?? "");
    onChange(newMd);
  }

  return (
    <Card className="rounded-lg shadow-lg flex-1 min-w-[280px] p-0">
      <CardContent className="p-6">
        <EditorContent editor={editor} className="h-full editor-content" />
      </CardContent>
    </Card>
  );
}
