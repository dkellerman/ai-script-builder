import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Node } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type ReactNodeViewProps,
} from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type FunctionSpec, functionSpecs } from "@/data";

const CONFIRM_MESSAGE = "Are you sure you want to remove this function?";

type FunctionBadgeProps = {
  defaultSpec: FunctionSpec;
  onChange: (value: FunctionSpec) => void;
  onDelete: () => void;
};

export function FunctionBadge({ defaultSpec, onChange, onDelete}: FunctionBadgeProps) {
  const [spec, setSpec] = useState<FunctionSpec>(defaultSpec);
  const displayName = useMemo(() => spec.function_internal_id.split(".").pop(), [spec]);

  function handleDelete() {
    if (confirm(CONFIRM_MESSAGE)) onDelete();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          title={spec?.description}
          className={cn(
            "bg-blue-100 p-2 rounded-md text-sm hover:cursor-pointer",
            "flex items-center gap-1"
          )}
        >
          {displayName}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={4}>
        {functionSpecs.map(
          (option) =>
            (option.id !== spec.id) && (
              <DropdownMenuItem
                key={option.id}
                className="flex flex-col items-start gap-0.5"
                onSelect={() => {
                  setSpec(option);
                  onChange(option);
                }}
              >
                <div className="text-md">
                  {option.function_internal_id.split(".").pop()}
                </div>
                <div className="text-xs text-gray-400">
                  {option.description}
                </div>
              </DropdownMenuItem>
            )
        )}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleDelete}>
            <X className="w-4 h-4" /> Remove
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// tiptap extension for FunctionBadge
export const FunctionBadgeNode = Node.create({
  name: "functionBadge",
  group: "inline",
  inline: true,
  atom: true,
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).getAttribute("data-fn"),
      },
    };
  },
  parseHTML() {
    return [{ tag: "span[data-fn]" }];
  },
  renderHTML({ HTMLAttributes }) {
    const { id, ...rest } = HTMLAttributes;
    return ["span", { ...rest, "data-fn": id }];
  },
  addKeyboardShortcuts() {
    const confirmAndDelete = () => {
      const { state, view } = this.editor;
      const { selection } = state;

      if (selection instanceof TextSelection && selection.empty) {
        const $pos = selection.$from;
        const before = $pos.nodeBefore;
        if (before && before.type.name === this.name) {
          if (!confirm(CONFIRM_MESSAGE)) return true;
          view.dispatch(state.tr.delete($pos.pos - before.nodeSize, $pos.pos));
          return true;
        }
      }

      return false;
    };

    return {
      Backspace: confirmAndDelete,
      Delete: confirmAndDelete,
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(({ node, updateAttributes }: ReactNodeViewProps) => {
      const id = node.attrs.id as string | null;
      const spec = functionSpecs.find((f) => f.id === id);

      // would be nicer to have the full dropdown here
      if (!spec) return (
        <NodeViewWrapper
          as="span"
          contentEditable={false}
          className="inline-flex"
        >
          <span className="text-red-500">[Invalid function]</span>
        </NodeViewWrapper>
      );

      return (
        <NodeViewWrapper
          as="span"
          contentEditable={false}
          className="inline-flex"
        >
          <FunctionBadge
            defaultSpec={spec}
            onChange={(newSpec) => updateAttributes({ id: newSpec.id })}
            onDelete={() => updateAttributes({ id: undefined })}
          />
        </NodeViewWrapper>
      );
    }, { as: "span" });
  },
});
