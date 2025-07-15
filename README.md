<p align="center" textAlign="center">
    <img src="https://www.usehatchapp.com/hubfs/favicon.ico" alt="Hatch Logo" width="32" height="32">
</p>

---

This is a frontend challenge based on a real-world problem we've solved at Hatch.

We're excited to see how you approach a complex editing interface involving markdown.

## The Problem

Consider this SAMPLE_SCRIPT in markdown format:

```markdown
# Simple Color Preference Script

## You are assisting a client.

1. Ask: **What is your favorite color?**
2. As soon as the user responds, <% function xyz98765-wxyz-4321-lmno-pqrstuvwxyza %>
3. If the response is **red**, <% function abc12345-def6-7890-ghij-klmnopqrstuv %>
```

This markdown format works perfectly for LLMs - they understand the structure, can parse the function placeholders, and generate appropriate responses. However, our users don't know markdown syntax. They need a visual, intuitive editor instead

**The challenge**: How can we build a prompt building editor that users can easily use while still producing markdown that LLMs can understand?

## Goal

This project is a **prompt building tool** designed for non-technical users. Here’s what you need to know:

1. **LLMs (Large Language Models) work best with markdown** – Prompts formatted as markdown yield better results and are easier to parse programmatically.
2. **Our users don’t know markdown syntax** – They expect an intuitive, visual editing experience, not raw markdown editing.

**Therefore, our system must:**

- Allow users to create and edit prompts visually, without needing to know markdown.
- Render prompts with rich, interactive visuals (e.g., commands and placeholders appear as badges or widgets within the text, and can include formatting).
- Serialize the visual prompt content to markdown for LLM consumption.

## Repository Structure

```
.
├── src/
│   ├── data/           # Data models and types
│   ├── components/     # React components
│   ├── lib/           # Utility functions and helpers
│   ├── assets/        # Static assets
│   └── App.tsx        # Main application component
├── public/            # Public static files
└── [config files]     # Various configuration files
```

## Tech Stack

You are free to add any dependencies you'd like, but please document why you chose that approach.

## Requirements

### 1. Markdown

- Parsed markdown that we'll send the LLM should include
  - Headings, bold, italic, underline
  - Lists, horizontal rules
  - Inline code / blocks

### 2. Function Badges

- Replace all `<% function UUID %>` placeholders with interactive badges
- Each badge must:
  - Display the function's description on hover (tooltip)
  - Be clickable → opens dropdown or popover
  - Allow choosing another function from the list
  - Support deletion with confirmation

### 3. Serialization

- Your system must convert the editor state back to markdown:
  - Preserve all regular markdown formatting
  - Replace function badges with their correct placeholder syntax: `<% function UUID %>`

#### (stretch) Slash Commands

- Typing `/` inside the editor opens a slash command menu
- The menu must:
  - Show a list of available functions (name + description)
  - Be keyboard accessible
  - Insert a function badge at cursor position when selected
  - (See data files for more details)

## What to Submit

- A GitHub repo (public)
- Your solution with a working local dev setup
- A `SOLUTION.md` that includes:
  - Your editor stack choice and why
  - Trade-offs made
  - How to run the project locally
  - What's working and what's not
  - Anything you'd improve with more time

---

## Final Notes

This is not a test with a single correct solution.
We're looking to understand how you:

- Navigate ambiguity
- Data model
- Reason about trade-offs

We're excited to see what you come up with. Good luck!

— The Hatch Team
