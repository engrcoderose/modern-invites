# Anjo and Jasmin invitation

- Scope changes to this invitation unless the user asks otherwise.
- Use Tailwind CSS in components for simple formatting: layout, responsive sizing, typography, colors, spacing, borders, shadows, positioning, and hover/focus states.
- Reserve `wedding.css` for complex animations, coordinated playback selectors, masks/textures, and document-level browser behavior. Do not move basic card or image sizing back into that file.
- Keep runtime values (image positions, palette colors, animation progress) in typed props, CSS custom properties, or Motion values. Keep Tailwind class names complete and statically discoverable.
- Preserve the square Polaroids, gallery interactions, responsive text sizes, user-selected media, and reduced-motion behavior during refactors.
- Keep editable wedding details in `data.ts` and image configuration in the media modules. Do not invent confirmed details or enable RSVP submissions; RSVP remains a preview.
- Validate with `npx tsc --noEmit --noUncheckedSideEffectImports` and focused desktop/mobile browser checks when layouts or interactions change.
