# Solution, David Kellerman

**TL;DR**: Kept the stack, shipped the core behaviors (didn't have time for slash menu),
and bumped into a lot of Tiptap quirks— nothing fatal, just time‑eaters. Meets basic
requirements, but needs a lot more testing for UI edge cases, and an
implementation based on existing Tiptap extensions.

## Your editor stack choice and why

- **Tiptap**: I was assuming I needed to work with Tiptap, since it was preinstalled.
This was a little frustrating, because I presume the point of the exercise
wasn't to do a deep dive into the Tiptap ecosystem, and yet at most points
it seemed the correct way to approach the features would have been to install
pre-existing extensions, which I didn't want to do for this app. It would
have been much faster likely if I had just used contenteditable.

- **Marked/turndown**: Again, assuming it would have been incorrect to use the
Tiptap markdown extension, but thinking that a straight regular expression parser
would have missed a lot of edge cases and non-standard markdown forms, I decided
to use a combo of marked and turndown libraries. There was some work digging into the
options here to standardize as much as possible the round-trip.

## Trade-offs made

- Marked/turndown libraries for better compatibility and edge-case handling (nesting, etc.) and
  future customization. This is at the expense of more configuration work and slight
  differences currently in the round trip due to very informal nature of the markdown
  specs.

- I generally made a lot of decisions in the interest of time and getting things at least
  partially working for a demo over getting them production-ready or free from all potential issues.
  There would be a lot more testing/tweaking required to get things solid.

## How to run the project locally

- `npm i`
- `npm run dev`

## What's working and what's not

### Working

- Basic round-trip HTML/markdown
- Support all requested tags (underline is with `<u>...</u>`)
- Basic HTML formatting and output display
- Function display and menu
- Remove with confirmation (browser confirm for demo)
- Remove via backspace with confirmation
- Also: Changed Editor component to use markdown in/out pattern (markdown/onChange)

### Not working

- Didn't have time for slash menu, unless I had just installed an extension
- A bunch of little HTML formatting issues, many related to the fact that ProseMirror
  inserts P tags after list items, which also seems to require an extension to fix properly.
- I didn't check all cases with pasting text/html - I can see that there are some built-in callbacks
  for that, but I didn't get a chance to hook them up

## Anything you'd improve with more time

- I feel I might be slightly misunderstanding the function specs, because I don't see
  what the "availableFunctions" are for. I turned them into a type, but there was a comment
  saying that the functionSpecs were the only functions available to the user in this context,
  so I didn't think it made sense to show any other functions on the menu (especially
  ones we don't have descriptions for).
- For invalid functions it would be really nice to keep displaying the dropdown menu
  so you could choose another function, but didn't get around to it (probably not a common
  scenario?)
- Used "lo-fi" browser options for tooltip/confirm for now - improving this would be fast but
  involve installing more shadcn components.
- This would definitely benefit from a test suite (leaning heavily on react-testing-library).
- I feel there likely was a much better/simpler way to handle the function badge insertion, but
  Tiptap was quite quirky and specific about what it allowed me to do, so I ended up on
  this workaround where I substituted in HTML before the callback and then parsed the HTML
  tag as an extension.
- If I could do it again I'd have spent some more time learning the Tiptap/ProseMirror basics
  before diving in, I wasn't expecting that to be as much of an issue as it was.
