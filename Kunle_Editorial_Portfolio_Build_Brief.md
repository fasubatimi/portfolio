# Build brief: Kunle's editorial portfolio website

Use this document as the complete instruction for building my portfolio website. The **Editorial** design is my final choice. Build one finished, responsive portfolio around that direction. I want the site to feel professional, memorable, and interactive, while making my work easy for a recruiter or client to understand. Use **solid colors only: no gradients** in backgrounds, buttons, text, illustrations, 3D objects, or overlays.

## 1. Starting point and what already exists

An interactive HTML design prototype called **`Kunle_Portfolio_Interactive_Concepts.html`** has already been created. It contains three design options. I have selected **Editorial**. Open the prototype and inspect the Editorial layout, copy, colors, phone illustration, project strip, and basic interactions before building the final site. The other two designs are references only; do not make the finished site a theme picker.

The prototype already shows:

- An editorial-style header with my name, Work, and Contact.
- A light warm-neutral background, dark ink text, a restrained deep teal accent, and no gradients.
- A hero introducing me as a software developer in Lagos, with a SafeAlert phone illustration that tilts with pointer movement.
- Three project names: SafeAlert, Library Control, and Dansamdolly.
- Project buttons that open short detail panels, a contact panel, and a basic responsive layout.

Treat those as a **design prototype**, not finished production features. Its phone is a CSS illustration, the project descriptions are short, the contact details are plain text in a panel, and the footer's promised scroll effects have not been built. Check the existing implementation before reusing it. Fix any issues rather than copying them into the finished site.

## 2. Final design direction

Build a single website in the Editorial style. It should look like a carefully laid out digital portfolio, with strong typography, plenty of breathing room, clear dividers, and restrained motion. Avoid a generic template full of cards, glowing effects, floating particles, or excessive colors.

### Visual rules

| Purpose | Starting color | Usage |
| --- | --- | --- |
| Main background | `#F0EEE8` | Large page surfaces |
| Main text and primary button | `#203238` | Headings, body text, calls to action |
| Secondary text | `#5D6967` | Captions and metadata |
| Accent | `#2D625F` | Links, small highlights, selected states |
| Divider | `#C9CFCA` | Thin rules between sections |
| Soft feature surface | `#DDE5DC` | Selected small panels, used sparingly |

These are starting values from the chosen prototype. You may adjust them slightly to improve contrast and legibility, but retain the same warm editorial character. The portfolio itself should not borrow SafeAlert's red SOS color as its general brand accent. Use flat fills and deliberate borders; do not use `linear-gradient`, `radial-gradient`, blurred color glows, rainbow effects, or gradient image overlays.

Use a readable sans-serif for navigation and body copy, paired with a restrained serif for major headings and project titles. Keep type sizes comfortable on phones. Use a consistent spacing scale and content width. Avoid tiny labels becoming the only way to understand a section.

### Page structure

Build the page in this order:

1. **Header:** Name or simple lettermark on the left; Work, About, and Contact on the right. On mobile use a simple, accessible menu if links cannot fit. Show the current section if practical. Every link must lead somewhere useful.
2. **Hero:** A short introduction, a clear statement of what I build, a primary “View my work” action, and a scene that introduces **several projects**, not just SafeAlert. The SafeAlert phone can appear first, but Library Control and Dansamdolly must also be visible in the main experience. Keep the headline and work action readable even if 3D fails to load.
3. **Selected work:** Show SafeAlert, Library Control, and Dansamdolly as distinct projects with meaningful space for each. Each needs a visual or honest text treatment, a one-line description, technology or role tags where verified, and a clear link to its case study. Use an editorial list or alternating feature layout rather than identical generic cards. Gather missing Dansamdolly facts and assets before final publication; do not silently remove the project to simplify the design.
4. **Project case studies:** A separate section or page per published project. Each should explain the problem, my role, what I built, important design or engineering choices, technology, current status, and what I learned. Add real screenshots or diagrams with captions. Use honest labels such as “student project,” “prototype,” or “in development” when applicable.
5. **About:** A concise introduction as a Computer Science student and developer, what I enjoy building, and the kinds of work I am seeking. Write naturally, without exaggerated claims or generic traits.
6. **Skills:** Group the actual tools and languages I have used. Prefer short evidence tied to projects over a large icon wall or unverified proficiency percentages.
7. **Contact:** Working email link, working GitHub profile link, and a concise invitation to get in touch. A contact form is optional; if included, it must really send and handle errors. Do not present a form that only pretends to submit.
8. **Footer:** Name, simple navigation, GitHub, email, and a small copyright line.

A CV download may be included only after linking the latest approved CV file. Do not invent a CV link or publish an outdated draft.

## 3. Content and accuracy

Use **Fasuba Olukunle** as the portfolio name and **Kunle** in friendly first-person copy. The known contact details are `fasubatimi@gmail.com` and `https://github.com/fasubatimi`. Keep these as real clickable links in the final site. The location can read “Lagos, Nigeria.” Verify the exact preferred full name and any other profile detail from the approved CV before publication. Do not infer a graduation date, job title, client list, professional experience, awards, certification, user count, or impact metric.

### Projects to feature

**SafeAlert — featured project.** An Android emergency reporting project. The previously supplied technology includes Java 17, Firebase Authentication, Firebase Realtime Database, Firebase Storage, Google Sign-In, and OSMDroid. Describe the features that actually exist in the current app; if a feature is still planned, label it clearly. A case study can cover reporting, alert discovery, evidence photos, map behavior, and safety-focused interface decisions where those are verified. Use actual screenshots if available and approved. Link to the correct project repository or demo only after checking it.

**Library Control — second project.** A planned or developing system for a university research library's shared Windows computers. The intended librarian experience is simple: see terminal status and lock or unlock a single computer or all computers. The proposed architecture includes a browser-based admin interface and a Windows client. Do not describe this as a fully deployed system unless it is. Explain the real problem and the current stage accurately.

**Dansamdolly — school project.** Keep the label “school project.” Gather the actual purpose, stack, screenshots, and contribution before writing detailed claims. This project should have its own moment in the scroll scene and selected-work section. If details are still missing, show only facts we can verify and flag the missing content for completion before final publication. Do not substitute a calculator or simple personal-portfolio exercise merely to fill space.

For each project, include a clear status and working links where appropriate. Never show a “Live demo” button if no live demo exists. Do not use fake testimonials, fabricated results, or placeholder project images on the published site.

### Suggested hero copy

> I build practical software that makes complicated tasks easier.
>
> I’m Kunle, a Computer Science student in Lagos. I build apps and systems around real problems, with clear interfaces and careful implementation.

Refine the wording to sound natural and human. Keep the message specific and modest.

## 4. Interactive behavior to implement

The final site must have meaningful interactions, not just decoration. Every element that looks clickable must perform a clear action. Do not rely on hover for essential information.

### Interactive project objects and 3D

- Give the three projects different visual forms so visitors can tell them apart: a phone for **SafeAlert**, a desktop monitor or terminal panel for **Library Control**, and an appropriate project screen or flat title panel for **Dansamdolly** after its real interface is confirmed. They should feel like parts of one composition, not three copies of the same card. Use carefully layered CSS 3D or a light 3D renderer if it improves the result without slowing the page.
- Use real project screens where available. Mark conceptual illustrations honestly; do not present a mock screen as an actual screenshot.
- On desktop, the project objects can respond subtly to pointer position and return to rest when the pointer leaves. Avoid constant spinning, strong perspective distortion, or motion that competes with the text.
- Every project object or its nearby labeled action must open the corresponding project information. Tap and keyboard activation must work without hover. Do not make only the SafeAlert phone interactive.
- Provide a static layout with all three project names and links when reduced motion is requested, the device is slow, or 3D cannot run. The site content and navigation must work without WebGL.

### Scroll motion

Use the landing page at [save.design](https://save.design/?ref=saaspo.com) as the **motion reference**. Its opening is a scroll-controlled sequence: the central scene stays in view while text changes, separate visual cards move through the space, and the scene gives way to the next section. I want that sense of a story progressing with my scroll. Do not copy its mountain imagery, dark theme, text, assets, or exact layout. Keep my Editorial design and flat professional colors.

Build **one connected scroll-controlled showcase for all three projects** between the hero and the selected-work section. The reference is the way separate pieces move together as the story progresses; my portfolio's pieces should be my different projects, not only features of SafeAlert.

1. **Introduce the collection:** The Editorial hero shows my introduction and working “View my work” link immediately. Show the SafeAlert phone, the Library Control terminal/desktop, and a Dansamdolly project panel in a balanced composition, with readable project names. Do not make visitors scroll through an empty opening before seeing who I am.
2. **SafeAlert moment:** As scrolling begins, SafeAlert moves forward briefly. Show one verified feature or screen and a short statement of the problem it addresses. Keep the other two project objects visible in the composition so the scene still reads as a portfolio of several projects.
3. **Library Control moment:** With further scrolling, the phone moves aside and the library terminal becomes the focus. Show a verified or clearly labeled concept view of the librarian's simple lock/unlock control and one short explanation. The transition should feel connected, with objects moving between positions rather than the page abruptly switching to a different slide.
4. **Dansamdolly moment:** Next, the Dansamdolly panel becomes the focus. Use its real screenshot and verified description once collected; until then, use an honest title treatment marked “school project” in the working preview. Do not invent its interface, technology, or results. Keep the other objects present but quieter.
5. **Gather and reveal:** Bring the three project objects into a clean final arrangement that becomes the **Selected Work** overview. Release the held scene into normal scrolling. Each project has a visible title, status, and direct path to its own case study. The scroll sequence should never end by leading exclusively into SafeAlert.

Tie motion to scroll progress so scrolling back reverses it naturally. Use one concise scroll section rather than three long pinned sections: roughly three to four screen-heights on desktop is a starting point, to be adjusted after testing. Give each project a meaningful share of the sequence, even if SafeAlert remains first in the work list. Use a sticky scene and progress-driven transforms rather than forcing scroll position or blocking wheel and touch input. On phones, shorten the sequence to a clear vertical progression of the three projects, with no overlap that hides titles or actions.

Keep every project's name and link accessible throughout or immediately after its moment. If animation cannot run, display all three projects in normal document order. With `prefers-reduced-motion`, show a static composition or stacked list without pinned or scrubbed movement. Ensure the header, project links, and contact navigation remain usable throughout. Keep the same **solid colors with no gradients**, even while objects move or scale.

### Navigation and project actions

- The primary hero action scrolls or navigates to actual selected work. It must not open an unrelated short modal while saying “View my work.”
- Each project opens its full case study. Give users a clear way back to the project list.
- Header links navigate to their named destinations; Contact opens the actual contact section or a working email link.
- If you use a modal anywhere, provide a close button, Escape support, initial focus, focus containment while open, and focus restoration after closing. Prefer normal pages or sections for the main case studies.
- Give actionable links and buttons visible hover, focus, and active states. External links should have accurate destinations and accessible names.

## 5. Build approach

1. Inspect the current prototype and any available project assets. Confirm which screenshots, repository links, CV, and project descriptions are approved for public use.
2. Set up a maintainable project with reusable components for navigation, projects, case studies, contact, and motion. If there is an existing repository, work within it. If this is a fresh site, use a simple, maintainable frontend setup. Keep content in clearly named data or content files so project details are easy to update.
3. Implement the Editorial visual system and responsive layout first. Then add real project content, working links, 3D, and scroll motion in that order. The site must remain usable before motion is added.
4. Avoid adding a backend just for the portfolio. A normal email link is enough unless a real contact form is requested and can be maintained safely. Never expose credentials or service keys in client-side code.
5. Make images appropriately sized and lazy-load assets outside the first screen. Do not make the main text wait for 3D libraries, heavy images, or animation code.
6. Add meaningful document titles, descriptions, social sharing image, favicon, semantic headings, and accessible image descriptions. Make the site discoverable without stuffing keywords.
7. Document how to run, build, update content, and deploy the site in a short README.

## 6. Responsive and accessibility requirements

Test at least narrow phone widths, standard phone widths, tablet, laptop, and wide desktop. The hero should stack cleanly on phones, with text before the project objects. Every project must remain readable and usable without horizontal scrolling. Do not shrink the whole desktop design to fit a phone.

Use semantic headings and landmarks; maintain readable text contrast; provide clear keyboard focus; label all controls; and make tap targets comfortable. Ensure the 3D scene is either properly described or treated as decorative while the project action remains accessible. Test with a keyboard only, with reduced motion enabled, and with images or JavaScript unavailable enough to confirm the core content still makes sense.

## 7. Quality checks and delivery

Before calling the website finished:

- Confirm every visible button and link works. Check email, GitHub, project pages, back navigation, and CV link if present.
- Verify project claims against the actual projects. Check spelling of my name, project names, and technology.
- Inspect all breakpoints for clipped text, overlap, horizontal overflow, and cards that cannot be tapped.
- Test the 3D pointer interaction, touch action, keyboard action, scroll reveal, and reduced-motion behavior.
- Check loading and interaction performance on a modest phone and a slower connection. Simplify or remove an effect that hurts usability.
- Review contrast, heading order, labels, alt text, and focus behavior.
- Confirm no CSS gradients, gradient assets, fake metrics, dead links, or placeholder claims remain.

Deliver the working source, a preview I can inspect, and a brief README. Include a short checklist of verified interactions and any facts or assets still needed from me. Prepare the site for hosting; do not claim it is publicly live until publication succeeds and the URL has been checked.

## Definition of done

A visitor can open the portfolio on phone or desktop, understand who I am and what I build, encounter **SafeAlert, Library Control, and Dansamdolly** as distinct parts of the main scroll experience, explore complete and accurate case studies, use the project interactions if their device supports them, reach me through working links, and navigate the whole site by keyboard. The final design consistently follows the selected Editorial direction with professional flat colors and **zero gradients**.
