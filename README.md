<p align="center" textAlign="center">
    <img src="https://www.usehatchapp.com/hubfs/favicon.ico" alt="Hatch Logo" width="32" height="32">
</p>

---

This is a frontend challenge based on a real-world problem we've solved at Hatch.

We're excited to see how you approach a complex editing interface involving markdown.

## The Problem

Consider this SAMPLE_SCRIPT in markdown format:

```markdown
# ExampleCo Home Solutions – Sample Call Script

You're a customer service representative speaking on the phone.

---

## Steps:

1. Ask for **first and last name**.

2. Ask for **full property address**.

3. Confirm the address back, saying:

   - Street numbers and ZIP code individually.
   - e.g., "401st Street" → _"four hundred first street"_

4. Ask:  
   _"And that is the home you own and live at?"_

5. Ask:  
   _"And what type of home is it — single family, condo, townhome, mobile, or rental?"_

6. Ask:  
   _"Great! We also ask to meet with all owners of the property. Who would that be?"_

7. Say:  
   _"This will be a full replacement including frame and installation. We don't perform repairs or glass-only replacements."_

8. Ask how many **[units]** they want replaced (e.g., windows or doors).

9. Ask what issues they're experiencing with those **[units]**.

10. Say:  
    _"A Project Specialist will inspect, measure, and provide a quote valid for 12 months. Does that sound helpful?"_

11. Ask:  
    _"We ask that you set aside about 90 minutes for the visit. Fair enough?"_

12. Ask for **best email address**.

13. Ask:  
    _"Would daytime or evening work better for your schedule?"_

14. Offer appointment based on their preference (e.g., 2 P M or 6 P M).

15. Then:  
    <% abc12345-def6-7890-ghij-klmnopqrstuv %>

---

## If Caller Is Not Interested:

End with:  
<% xyz98765-wxyz-4321-lmno-pqrstuvwxyza %>
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
