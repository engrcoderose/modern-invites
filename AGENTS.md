# Invitation project conventions

Apply these user preferences when creating or updating invitation projects in
this repository:

- Use Tailwind utilities in JSX for simple layout: flex/grid, alignment, gaps,
  spacing, sizing, positioning, and ordinary responsive adjustments.
- Use scoped custom CSS for complex layouts, decorative artwork and shapes,
  pseudo-elements, layered backgrounds, typography/font definitions, and
  animations. Keep animation logic in the existing animation library when useful.
- Avoid competing utility and CSS declarations for the same simple layout rule.
  Do not add CSS classes or `@apply` wrappers solely to hide basic utilities.
- Keep components readable, extract repeated UI when it improves clarity, and
  remove obsolete selectors and superseded overrides during refactors.
- Preserve confirmed event content, design, accessibility, and navigation unless
  a change is requested. Check affected desktop/mobile layouts after styling work.
- Carry this Tailwind-first convention into each new invitation created here.
