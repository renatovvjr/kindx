# KindX Mobile App Design Specification

## Product Direction

KindX is a mobile-first community platform that connects people who need help with people willing to help nearby. The interface should feel trustworthy, warm, fast, and easy to understand for a broad public audience, including first-time users, volunteers, community organizations, older adults, and people accessing support in stressful moments.

Design benchmark: polished startup quality comparable to Airbnb, Uber, and Duolingo, with a light theme, clear hierarchy, soft depth, rounded surfaces, and accessible tap targets.

Core experience principles:

- Help must always feel one tap away.
- Asking for help should feel safe, simple, and non-intimidating.
- Offering help should feel rewarding and locally relevant.
- Trust signals should appear before commitment points.
- Every screen should work clearly with large text, screen readers, and one-handed use.

## Visual Identity

### Brand

- App name: KindX
- Slogan: Empowering Communities Through Help
- Personality: optimistic, practical, inclusive, community-led
- Visual motif: local connection, nearby support, kindness in motion

### Color System

Primary:

- KindX Turquoise: `#00B8D9`
- Primary Dark: `#008FA8`
- Primary Soft: `#E6F9FC`

Secondary:

- Warm Orange: `#F97316`
- Orange Soft: `#FFF3E8`

Status:

- Success: `#059669`
- Success Soft: `#EAFBF4`
- Warning: `#D97706`
- Error: `#DC2626`
- Info: `#2563EB`

Neutrals:

- Background: `#FFFFFF`
- Surface: `#F8FAFC`
- Card: `#FFFFFF`
- Border: `#E5E7EB`
- Divider: `#EEF2F7`
- Text Primary: `#111827`
- Text Secondary: `#4B5563`
- Text Muted: `#6B7280`
- Disabled: `#9CA3AF`

### Typography

Recommended font stack:

- iOS: SF Pro
- Android: Inter or Roboto
- Fallback: system sans-serif

Type scale:

- Display: 34 / 40, weight 800
- Screen title: 28 / 34, weight 800
- Section title: 20 / 26, weight 700
- Card title: 17 / 23, weight 700
- Body: 16 / 24, weight 400
- Body small: 14 / 20, weight 400
- Caption: 12 / 16, weight 600
- Button: 16 / 20, weight 700

Hierarchy rules:

- Use large headings on onboarding, auth, and key action screens.
- Use compact, scannable headings on feed, map, chat, and settings screens.
- Body copy should be short, practical, and reassuring.

### Layout System

Mobile canvas:

- Primary design target: 390 x 844 px
- Safe area respected on all screens
- Horizontal page padding: 20 px
- Dense list padding: 16 px
- Bottom navigation height: 76 px plus safe area

Spacing:

- 4 px: micro gaps
- 8 px: icon/text pairing
- 12 px: compact component spacing
- 16 px: default component spacing
- 20 px: screen padding
- 24 px: section spacing
- 32 px: major section spacing
- 48 px: hero spacing

Radius:

- Small controls: 10 px
- Inputs and buttons: 14 px
- Cards: 18 px
- Large feature cards: 22 px
- Bottom sheets: 28 px top corners

Shadow:

- Soft card: `0 6 18 rgba(17, 24, 39, 0.08)`
- Floating CTA: `0 10 28 rgba(0, 184, 217, 0.28)`
- Bottom sheet: `0 -8 28 rgba(17, 24, 39, 0.10)`

### Iconography

Use clean outline icons with filled active states.

Recommended icon meanings:

- Home: house
- Feed: message/list
- Map: map pin
- Profile: user
- Notifications: bell
- Ask for Help: hand heart or alert circle
- Offer Help: heart hand or helping hand
- Community Feed: users
- Location: map pin
- Chat: message circle
- Settings: gear

### Accessibility Requirements

- Minimum text contrast: 4.5:1 for normal text.
- Minimum tap target: 44 x 44 px.
- Buttons should include visible labels, not icons only, unless in global navigation.
- Form labels remain visible above fields after input.
- Error messages appear below fields and are announced to screen readers.
- Primary actions must be reachable before scrolling where possible.
- Avoid relying on color alone: request and offer cards include labels plus distinct icon shapes.

## Component System

### Primary Button

- Height: 54 px
- Radius: 14 px
- Background: `#00B8D9`
- Text: white, 16 px, 700
- Shadow: turquoise soft shadow for key CTA only
- Use for: Login, Sign Up, Submit Request, Publish Offer, Confirm Help

### Secondary Button

- Height: 54 px
- Radius: 14 px
- Background: `#FFFFFF`
- Border: `#E5E7EB`
- Text: `#111827`
- Use for: Continue with Google, Continue with Apple, Edit Profile

### Orange Action Button

- Height: 54 px
- Radius: 14 px
- Background: `#F97316`
- Text: white
- Use for: Ask for Help when paired against Offer Help

### Input Field

- Height: 56 px
- Radius: 14 px
- Background: `#F8FAFC`
- Border default: `#E5E7EB`
- Border focused: `#00B8D9`
- Label: 14 px, 600, `#374151`
- Placeholder: `#9CA3AF`
- Helper/error line: 12 px

### Text Area

- Min height: 128 px
- Same styling as input
- Character hint under field where useful

### Help Card

- Background: white
- Radius: 18 px
- Padding: 16 px
- Border: `#EEF2F7`
- Shadow: soft card
- Required content: user name, trust/status badge, category, description, location, distance, CTA

### Category Pill

- Height: 30 px
- Radius: 999 px
- Padding: 10 px horizontal
- Request style: orange soft background, orange text
- Offer style: success soft background, success text
- General category style: primary soft background, primary dark text

### Bottom Navigation

- Four items: Home, Feed, Map, Profile
- Active icon: filled or heavier weight
- Active color: `#00B8D9`
- Inactive color: `#6B7280`
- Background: white
- Top border: `#EEF2F7`
- Center labels: 11-12 px, 600

## Screen Designs

## 1. Welcome Screen

Purpose: establish trust, explain the product in one line, and move users into authentication quickly.

Layout:

- White background with subtle turquoise radial accent near top right.
- Centered KindX logo near upper-middle.
- Large wordmark below logo.
- Slogan: "Empowering Communities Through Help"
- Friendly short copy: "Find help nearby or support someone in your community."
- Primary CTA: Sign Up
- Secondary CTA: Login
- Social buttons: Continue with Google, Continue with Apple
- Footer microcopy: "By continuing, you agree to KindX community guidelines."

Visual details:

- Logo sits inside a 96 px circular turquoise soft container.
- Slogan uses 28 px bold text, centered.
- Sign Up is turquoise primary.
- Login is white with gray border.
- Social buttons include platform icons on the left.

Interaction:

- Sign Up opens account creation mode.
- Login opens authentication mode.
- Social buttons start OAuth.

## 2. Authentication Screen

Purpose: provide a fast and reassuring login/sign-up experience.

Layout:

- Top left back button.
- Title: "Welcome back"
- Subtitle: "Log in to continue helping your community."
- Email input.
- Password input with show/hide control.
- Forgot Password link aligned right.
- Primary CTA: Login
- Divider: "or continue with"
- Social login buttons: Google, Apple
- Bottom prompt: "New to KindX? Create account"

Visual details:

- Form fields use soft gray background and clear labels.
- Primary button becomes enabled only when email and password are valid.
- Error state uses red border and inline message.

Sign-up variant:

- Title: "Create your KindX account"
- Inputs: name, email, password.
- Optional checkbox: "I agree to follow the KindX community guidelines."

## 3. Home Screen

Purpose: give users immediate paths to request help, offer help, or browse the community.

Layout:

- Header row: KindX logo left, notification icon right.
- Greeting: "Hi, Renato"
- Main heading: "How can KindX help today?"
- Three main action cards:
  - Ask for Help
  - Offer Help
  - Community Feed
- Nearby summary strip: "12 opportunities nearby"
- Recent activity preview list with two compact cards.
- Bottom navigation: Home, Feed, Map, Profile.

Action cards:

- Ask for Help: orange accent, hand/help icon, copy "Post a request in under a minute."
- Offer Help: turquoise accent, heart/help icon, copy "Share your availability with people nearby."
- Community Feed: neutral/primary soft, users icon, copy "See what your community needs."

Interaction:

- Tapping each card navigates to its feature screen.
- Notification icon opens Notifications.
- Nearby summary opens Map.

## 4. Ask for Help Screen

Purpose: make requesting help simple, respectful, and low-friction.

Layout:

- Header: back button, title "Ask for Help"
- Supportive subtitle: "Tell nearby helpers what you need. Keep it clear and safe."
- Form fields:
  - Title
  - Description
  - Category
  - Location
- Optional urgency selector: Today, This week, Flexible
- Privacy note: "Your exact address is only shared after you confirm a helper."
- Submit button: Post Request

Category options:

- Groceries
- Transport
- Home tasks
- Companionship
- Translation
- Donations
- Other

Visual details:

- Category uses horizontal pill selector or bottom sheet picker.
- Location field supports current location and manual entry.
- Submit button fixed near bottom when keyboard is hidden.

Validation:

- Title required.
- Description required.
- Category required.
- Location required.

## 5. Offer Help Screen

Purpose: let volunteers publish availability with clarity and confidence.

Layout:

- Header: back button, title "Offer Help"
- Subtitle: "Choose how you can support people nearby."
- Form fields:
  - Type of help
  - Availability
  - Location
  - Short description
- Toggle: "Only show my offer to verified community members"
- Publish button

Type of help examples:

- Grocery pickup
- Ride or transport
- Tutoring
- Translation
- Dog walking
- Check-in call
- Community event support

Availability:

- Quick chips: Now, Today, This weekend, Custom
- Custom opens date/time picker.

Visual details:

- Success green accents show that offering help is positive and volunteer-led.
- Publish button is primary turquoise.

## 6. Community Feed

Purpose: make local requests and offers easy to scan, filter, and act on.

Layout:

- Header: "Community Feed"
- Search field: "Search help nearby"
- Filter chips: All, Requests, Offers, Nearby, Urgent
- Feed cards with modern card layout.
- Floating action button for Ask/Offer quick actions.
- Bottom navigation.

Card structure:

- Top row: avatar, user name, verified/trust badge, time posted.
- Category pill.
- Description/title.
- Location row with distance.
- Footer row:
  - CTA: Offer Help or Message
  - Secondary action: Save

Request card example:

- User name: Maya Chen
- Category: Groceries
- Description: "Need help picking up essentials from the pharmacy this afternoon."
- Location: Newtown, 1.2 km away
- CTA: Offer Help

Offer card example:

- User name: Daniel Smith
- Category: Transport
- Description: "Available for short local rides on Saturday morning."
- Location: Marrickville, 2.4 km away
- CTA: Message

Interaction:

- Pull to refresh.
- Card tap opens details.
- CTA opens chat or confirmation flow.
- Filter chips update without full page reload.

## 7. Interactive Map Screen

Purpose: show nearby help opportunities spatially and support quick discovery.

Layout:

- Full-screen map.
- Top search pill: "Search this area"
- Filter button top right.
- Pins:
  - Orange pins: requests
  - Green pins: offers
  - Turquoise cluster pins: multiple items
- Floating detail card above bottom navigation when a pin is selected.
- Bottom navigation remains visible.

Floating detail card:

- Category pill.
- Title or short description.
- User name and trust badge.
- Distance and approximate area.
- Primary CTA: View Details or Offer Help.

Map behavior:

- Default centers on user location after permission.
- If location is denied, show manual city/suburb search.
- Tapping a pin animates map and opens detail card.
- Swiping detail card horizontally cycles through nearby opportunities.
- "Nearby help opportunities" appears as a bottom sheet from collapsed to half-height.

Accessibility:

- Provide list alternative through a "List" button.
- Pins have accessible labels such as "Request for groceries, 1.2 kilometers away."

## 8. Chat Screen

Purpose: enable safe coordination after a user expresses interest.

Conversation list layout:

- Header: "Messages"
- Search field.
- Conversation rows with avatar, name, latest message, time, unread badge.
- Request/offer context pill in each row.

Message thread layout:

- Header: avatar, name, trust badge, help context.
- Message bubbles:
  - Incoming: light gray bubble, left aligned.
  - Outgoing: turquoise bubble, right aligned, white text.
- Safety banner: "Share exact details only when you feel comfortable."
- Input bar: text field, attachment icon, send button.
- Confirm Help button pinned above input when help is pending.

Interaction:

- Confirm Help opens a confirmation sheet.
- Confirmation sheet summarizes helper, request, date/time, and privacy note.
- After confirmation, button changes to "Help confirmed" with success state.

## 9. User Profile

Purpose: build trust and give users a sense of community contribution.

Layout:

- Header with settings icon.
- Profile photo centered or left-aligned in a hero profile block.
- Name, location, verification badge.
- Bio.
- Statistics:
  - Help offered
  - Help received
- Trust section:
  - Community rating
  - Completed helps
  - Badges
- Edit Profile button.
- Recent activity list.

Visual details:

- Profile photo: 96 px circle.
- Stats displayed as two or three compact cards.
- Help offered uses success accent.
- Help received uses primary accent.

Example stats:

- Help offered: 18
- Help received: 4
- Community rating: 4.9

## 10. Notifications Screen

Purpose: make community activity and nearby opportunities timely without feeling noisy.

Layout:

- Header: "Notifications"
- Segmented control: All, Requests, Messages
- Notification cards grouped by Today, This Week, Earlier.

Notification examples:

- "Maya requested grocery help near Newtown."
- "Daniel offered transport within 2 km of you."
- "Your help request received a new response."
- "Community event starts tomorrow."

Visual details:

- Unread notifications have a turquoise dot and subtle primary soft background.
- Each notification includes icon, title, body, timestamp, and optional CTA.

Interaction:

- Swipe to mark as read.
- Tap opens relevant request, offer, map item, or chat.

## 11. Settings Screen

Purpose: provide clear account, privacy, accessibility, and preference controls.

Layout:

- Header: "Settings"
- Account section:
  - Edit profile
  - Verification
  - Notifications
- Preferences:
  - Language
  - Accessibility
  - Location radius
- Privacy:
  - Location sharing
  - Blocked users
  - Community guidelines
- Support:
  - Help center
  - Report a concern
- Logout button at bottom.

Language:

- English
- Portuguese
- Future: Spanish and other community languages

Privacy:

- Toggle approximate location.
- Toggle profile visibility.
- Clear explanation for location sharing.

Logout:

- Red text button in a white row.
- Confirmation dialog before ending session.

## Key User Flows

### Ask for Help Flow

1. User opens Home.
2. User taps Ask for Help.
3. User completes title, description, category, and location.
4. User submits request.
5. App shows success confirmation.
6. Request appears in Feed and Map.
7. User receives notification when someone offers help.

### Offer Help Flow

1. User opens Home.
2. User taps Offer Help.
3. User selects type of help, availability, and location.
4. User publishes offer.
5. Offer appears in Feed and Map.
6. Nearby people can message the volunteer.

### Nearby Discovery Flow

1. User opens Map.
2. App displays request and offer pins.
3. User taps a pin.
4. Floating detail card appears.
5. User opens details or starts chat.

### Confirm Help Flow

1. User starts chat from a request or offer.
2. Both users coordinate details.
3. User taps Confirm Help.
4. Confirmation sheet appears.
5. App marks the support interaction as confirmed.
6. Notifications and profile stats update after completion.

## Empty, Loading, and Error States

Welcome/auth:

- Loading: button spinner with disabled state.
- Error: inline form message and accessible alert.

Feed:

- Empty: "No help opportunities nearby yet."
- CTA: "Post the first request" or "Offer help nearby."

Map:

- Location denied: show manual suburb search and privacy explanation.
- No pins: show bottom sheet with "Try expanding your radius."

Chat:

- Empty list: "Messages will appear here when you connect with someone."

Notifications:

- Empty: "You are all caught up."

## Microcopy Guidelines

Use direct, kind, action-oriented language.

Preferred:

- "Ask for Help"
- "Offer Help"
- "Post Request"
- "Publish Offer"
- "Confirm Help"
- "Nearby"
- "Approximate location"

Avoid:

- "Submit issue"
- "Create ticket"
- "Beneficiary"
- "Case"
- "User problem"

## Production Readiness Checklist

- Consistent color tokens across React Native theme.
- Shared button, input, card, pill, avatar, and bottom navigation components.
- All screens support safe areas and keyboard avoidance.
- Form validation and error states implemented.
- Map has list fallback for accessibility.
- Social login UI prepared for Google and Apple OAuth.
- Notifications designed for push and in-app activity.
- Profile and chat include trust and safety cues.
- Copy supports English first, with Portuguese localization ready.
- All primary flows tested on small and large mobile screens.

