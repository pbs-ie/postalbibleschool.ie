# Changelog

## 1.3.4 (2024-10-18)

- Lesson Planner Tool updated with admin features
  - Projections details for a school now include their classroom divisions. FM data has been removed from views.
- Changed loader to full page loader that is more prominent during loading times

## 1.3.3 (2024-10-07)

- Lesson Planner Tool updated for teachers to start using digital lessons
  - New schools will now start with a default Paper only classroom with numbers set from PBS database
  - Existing schools with no classrooms will need a one time action to create a new classroom with the above information
  - School information is now available in the Profile section for user

## 1.3.2 (2024-06-10)

- BACKEND - Refactor for Bonus assembly videos storage to DB instead of JSON files
- Refactor of assembly videos to DB instead of JSON files

## 1.3.1 (2024-05-30)

- Disabled student related functionality for first release
  - Teachers can create classrooms and modify participation numbers
  - One default curriculum that cannot be changed
- Dashboard updated to show school contact information and old order details

## 1.3.0 (2024-02-01)

- New Hub for teachers with added functionality
  - Teachers can now view their student list from internal database
  - Teachers can create classrooms to add order numbers based on classrooms
  - They can allocate a curriculum to classrooms
  - Separates school related actions from additional resources on The Hub
- Admin functionality
  - CRUD new curriculum
  - Update internal database with current student-curriculum status

## 1.2.2 (2024-05-27)

- iTeam 2024 event update

## 1.2.1 (2024-05-27)

- STEP event changes
  - Settings page for setting current event details
  - Admin panel for managing past events

## 1.2.0 (2024-05-10)

- Updated vite.config.ts with base path for better build
- Github Actions build processes made

## 1.1.6 (2024-01-04)

- UI changes for buttons and links
- Codebase refactor to follow atomic design (design inspiration - [Bold Design system](https://boltdesignsystem.com/pattern-lab/))

## 1.1.5 (2023-12-18)

- School Assembly page changes
  - JSON file now saves with new line formatting for human readability
  - Loading the right links for default 2 videos fixed.
- STEP Events page updates
  - Additional files section below video for download
  - Editing function for created events

## 1.1.4 (2023-12-06)

- STEP Events page updates
  - Past events now show up as a gallery with an admin panel for managing CRUD operations.
  - Signups for January 2024 added

## 1.1.3 (2023-11-03)

- Bug fixes
  - Form Submissions not working on production - Environment variable being directly used instead of from config

## 1.1.2 (2023-10-18)

- New Assembly for October B10
- Change SHED logo
- Change background image of Bibletime lessons to the new lessons

## 1.1.1 (2023-10-10)

- Updated STEP information and signup for November 2023
  - Paypal payment page for STEP November 2023
- Minor improvements to UI and backend refactoring
  - Added 'Skip to content' button
  - Navbar refactor and dark mode friendly
  - Secondary Navbar made exclusive to STEP event
  - Refactored Buttons inside Inertia Links to styled links to follow HTML5 standard

## 1.1.0 (2023-10-06)

- Added functionality for Bonus videos in School Assembly view - Big Bible words and Bible Books (#5535f67)
- Paypal integration using default buttons and custom price

## 1.0.0 (2023-09-18)

- Created Changelog file
- Current status:
  - Website is live with basic static layout of information [Website](https://www.postalbibleschool.ie)
  - Some big features include login, video gallery and signup pages
- Last big update - School assembly videos can be CRUD through an admin interface.
