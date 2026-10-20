# Post homepage development improvements

These are the improvements we need to make on the homepage.

## Begin with

If you are not familiar with the work done, use document `specs/homepage.md` and `specs/_project.md` to familiarize yourself with the project.

If you cannot access images through this md file, they are also available in the design folder of this repository under design/homepage-improvement-images/...

## Things to improve

### General

- I want to use phosphor icon in my designs. All the icons in the screenshot are from phosphor icons. Install phosphor icons as per their updated guidelines and then allow me to select which icon I want. To begin with, follow the screenshots.

- Accessibility issues found through astro accessibility checker indicates:

  - Redundant text in alt attribute: Screen readers already announce img elements as an image. There is no need to use words such as "image", "photo", and/or "picture".

  - Invalid `tabindex` on non-interactive element: main elements should not have tabindex attribute: The tabindex attribute should only be used on interactive elements, as it can be confusing for keyboard-only users to navigate through non-interactive elements. If your element is only conditionally interactive, consider using tabindex="-1" to make it focusable only when it is actually interactive.

- Astro inspector throws `No islands detected` message and does not work.

```
No islands detected.

It looks like there are no interactive component islands on this page. Did you forget to add a client directive to your interactive UI component?
```

- Remove newsreader 400 so that we can reduce the load and improve performance.

- Provide `back to top` button so that folks do not have to scroll through the whole page again.

### Landing section

- The section is set up in 2 columns. In the dev-env, the section is stacked by default. On larger viewports, the section should contain h1 and body+button side by side (image below).

- There is an <hr> or border-bottom (whichever practice we are using) at the bottom of each section which is missing. It separates the section from the skill set section.

![](../design/homepage-improvement-images/2026-10-20-11-58-58-image.png)

### Skill set section

- The icons are from phosphor icons as below:

  - UX design = microscope icon

  - accessibility audits = wheelchair

  - web development = code block

  - LLM workflows = robot

- The skills are in a grid on larger viewports wraps below the <h2> and body-text until the viewport becomes too small which is when the grid collapses into a vertical stack.

![](../design/homepage-improvement-images/2026-10-20-12-15-27-image.png)

### Custom toolkit section

- this section is already in a two column layout but the body text goes above the product icons.

- this section has a white-ish background. In my colour tokens, I have a `primary background` and then I have a colour called `light` and the purpose for having this colour is to create sections.

- this section also has <hr> or margin-bottom. I think margin-bottom works just as well so we should use that for all section separators.

![](../design/homepage-improvement-images/2026-10-20-12-20-34-image.png)

### Projects section

- My case study cards are equal height so that the buttons are aligned to the buttons of the card it is adjacent to. This will become visible when I add more case studies since it's a 2xauto grid on larger viewports. I want to ensure that we correct this before I add more so that it doesn't happen when case studies have different length of title or body text.

- `Read more` button is preceeded by a arrow-right-circle icon with dark background and white text. on hover of the card, the button should get dark border, the arrow-right-circle should get light background and dark arrow colour.

- On hover, the cards should get slight outline and light background in contrast to the cream background of the website to clearly indicate hover state

**Hover state of card:**

![](../design/homepage-improvement-images/2026-10-20-12-32-51-image.png)

## End with

- Ensure that all documentation is up to date with the latest actions that have been done. For e.g. D:\codebase\Repositories\aksh-portfolio\docs\Aksh_Portfolio_Project_Log.md needs to be update with all the infromation taht has created, destroyed (see in physics, information cannot be destroyed haha), added, removed throughout all the phases of building the homepage. In addition, update README.md which is the readme file for github.

- Ensure that the file is cleaned up. Best practices for repository maintanence are implemented.

- Provide a quick explanation on how to update case study image with an example so I understand. I think I understand how to add new case studies, categories and how to select categories for case studies but I didn't quite understand how to update the images. I can place them in the public/images folder but then do I just replace `image: placeholder("Huana"),` under `const projects` or is there something else I need to do. From what I understand, the `const placeholder` just contains url to one image and not per project image.

- When done. Let me know so I can assess the work.

## Done 2026-10-20

Built. Section separators use `border-bottom` on `.section` (main.css), not `margin-bottom` or `<hr>`. This applies to every section, including the toolkit, so the margin-bottom suggestion above was not used. The footer has none. Layout and the remaining deviations are recorded in `specs/homepage.md` under Build notes. Pending human checks are listed there too.
