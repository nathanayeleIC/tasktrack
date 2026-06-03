---
name: TaskTrack
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#784b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#996100'
  on-tertiary-container: '#ffeedd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin: 32px
  max-width: 1280px
---

## Brand & Style
The brand personality is rooted in high-performance utility and cognitive clarity. It is designed for students and professionals who require a tool that fades into the background, allowing their work to take center stage. The emotional response is one of "organized calm"—reducing the anxiety of a heavy workload through structured visual order.

The design style is **Corporate Modern with a Minimalist focus**. It prioritizes heavy whitespace, a disciplined color application, and precise typography. By avoiding unnecessary decoration, the design system ensures that the user's focus remains entirely on task completion and deadline management.

## Colors
The palette is engineered for functional signaling and professional reliability.
- **Primary (TaskTrack Blue):** A deep, focused blue used for primary actions, active states, and brand presence.
- **Success (Green):** Reserved for "Completed" statuses and positive confirmation loops.
- **Warning (Amber):** Used for "In Progress" indicators or approaching deadlines.
- **Neutral (Slate):** A scale of grays used to establish hierarchy in text and UI borders, ensuring the interface feels grounded.
- **Surface:** The background utilizes a very subtle cool white to reduce eye strain during long working sessions.

## Typography
This design system utilizes **Geist** for its technical precision and exceptional legibility. The typeface’s monospaced influences in its kerning make it ideal for data-heavy task lists and time tracking.

- **Headlines:** Use SemiBold (600) weights with slight negative letter spacing to create a compact, authoritative look for project titles.
- **Body:** Standardized at 16px for optimal reading speed across documentation and task descriptions.
- **Labels:** Used for status badges and metadata (dates, tags). These should often be set in Medium (500) or SemiBold (600) at smaller sizes to differentiate them from body content.

## Layout & Spacing
The layout follows a **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile devices. 

- **Sidebar:** A fixed 280px navigation sidebar is used on desktop to provide constant access to "Inbox," "Today," and "Projects." 
- **Content Area:** On desktop, the main content area has a max-width of 1280px to prevent line lengths from becoming unreadable.
- **Rhythm:** An 8px linear scale governs all padding and margins. Vertical rhythm is strictly maintained to ensure that lists of tasks feel aligned and scannable.
- **Gaps:** Use 16px (md) for spacing between related items in a list and 24px (lg) for spacing between major sections or cards.

## Elevation & Depth
Depth is signaled through **Tonal Layering** and **Ambient Shadows**. This design system avoids heavy shadows to maintain a clean aesthetic.

- **Level 0 (Background):** The base layer (#F8FAFC).
- **Level 1 (Cards/Sidebar):** Pure white (#FFFFFF) with a 1px border (#E2E8F0).
- **Level 2 (Hover/Active):** A soft, diffused shadow (0px 4px 6px -1px rgba(0, 0, 0, 0.05)) to indicate interactivity or an "elevated" task being edited.
- **Overlays (Modals):** A darker backdrop blur (4px) with a more pronounced shadow to pull focus to the task creation form.

## Shapes
The shape language is **Soft**. A 0.25rem (4px) base radius provides a modern, approachable feel while maintaining the professional "squareness" expected of a productivity tool. 

- **Standard Elements:** 4px radius for input fields and small buttons.
- **Large Elements:** 8px (rounded-lg) for task cards and modal containers to soften the overall interface.
- **Full Radius:** Reserved exclusively for status tags and profile avatars to create a visual distinction from functional UI components.

## Components
- **Task Cards:** White background, 1px slate border, 8px corner radius. Title uses `body-md` in SemiBold. Metadata (due date, priority) uses `label-sm`.
- **Primary Button:** TaskTrack Blue background, white text, 4px radius. Uses a subtle scale-down transform on tap/click for tactile feedback.
- **Status Badges:** Use a "tinted" style—Success Green text on a 10% opacity Success Green background. This ensures the badge is visible without overwhelming the text.
- **Input Fields:** 1px border (#CBD5E1). On focus, the border changes to Primary Blue with a 2px "glow" (soft shadow).
- **Navigation Sidebar:** Uses high-contrast icons (20px) paired with `label-md` text. The active state is indicated by a Primary Blue vertical bar (4px wide) on the left edge of the menu item.
- **Progress Bars:** Thin (4px height) tracks using a light gray background with a Primary Blue fill to show project completion percentage.