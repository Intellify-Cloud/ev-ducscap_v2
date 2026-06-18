# Archive Design & Planning Files — Option B

Move design and project-tracking files into grouped subdirectories under `archive/`.

## Steps

1. Create `archive/docs/` directory
2. Create `archive/planning/` directory
3. Move `design-system-reference.md` → `archive/docs/design-system-reference.md`
4. Move `_docs/design.md` → `archive/docs/_docs-design.md` (rename to avoid nested underscore folder confusion)
5. Move `PHASE_3_COMPLETION.md` → `archive/planning/PHASE_3_COMPLETION.md`
6. Move `PHASE_4_COMPLETION.md` → `archive/planning/PHASE_4_COMPLETION.md`

## Rationale

- Keeps reference material and project status out of the build root
- Groups by type (docs vs. planning) for easier navigation
- `_docs/design.md` is renamed to avoid the underscore-prefixed folder being extracted into `archive/docs/_docs/` which Jekyll could misinterpret
