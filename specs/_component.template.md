# Component: <Name>

Save a filled copy as `specs/<name>.md`.

## Name

`<PascalCase>`, file `src/components/case-study/<Name>.astro`

## Purpose

<One line: what the reader gets from it.>

## Props

| Name | Type | Required | Notes |
| ---- | ---- | -------- | ----- |
|      |      |          |       |

## Variants

<List each variant (e.g. tone, size) and when to use it. "None" if single.>

## Content rules

- Content comes from the author's MDX only. No invented numbers, claims or quotes.
- <Length limits, required text, image alt rules.>

## Accessibility requirements

- <Semantic element, role, label, keyboard behaviour.>
- Meaning is never conveyed by colour alone. Text contrast aims AAA.
- Works at 320px and 400% zoom without page-level horizontal scroll.

## Example MDX usage

```mdx
import <Name> from "../../components/case-study/<Name>.astro";

<<Name> prop="value">Content</<Name>>
```

## How-to-use text

<2 to 4 lines shown on the /components page: when to use it, when not to, what to watch for.>

## Done-when

- [ ] Renders in every variant on `/components`
- [ ] Tokens only in CSS, zero client JS
- [ ] `npm run check` and `npm run a11y` pass
