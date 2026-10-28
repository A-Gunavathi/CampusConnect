# CampusConnect — Campus Issue Tracker

## One-line pitch
CampusConnect gives students and faculty one transparent place to report campus problems and lets administrators show progress until each issue is resolved.

## Problem
Campus issues such as broken classroom equipment, Wi-Fi problems, cleanliness concerns, and faulty facilities can be reported through scattered channels. Reporters may not know whether their issue was received or acted on.

## Solution
CampusConnect provides:
- A clear issue-reporting form with category and location.
- A public-style issue board with status filters.
- Three visible workflow states: Submitted, In progress, and Resolved.
- A role demo for Student, Faculty, and Admin.
- Admin status updates that are immediately reflected on the board.
- Responsive design for phones, tablets, and computers.

## Tech stack
HTML, CSS, and vanilla JavaScript. The prototype stores demo reports in the browser's `localStorage`; it does not have a shared cloud database or production authentication.

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a browser, or use the VS Code **Live Server** extension.
3. Select **Role sign in** and choose Admin to test status updates.
4. Submit a new issue using the form.

## Deploy a live public URL
### GitHub Pages
1. Create a new GitHub repository, for example `campusconnect-hackathon`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under build/deployment, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site. Copy the public URL shown in the Pages section and test it in a private/incognito browser window.
6. Add that public URL to the hackathon submission form.

## Important prototype limitations
- This is a functional front-end demo, not a production multi-user system.
- Reports are saved only in the current browser on the current device. They do not sync between users or devices.
- The role chooser is a demo, not secure authentication. Anyone can select Admin. Do not use it for real campus complaints or sensitive information.
- For a production version, add a cloud database and proper authentication/authorization (for example, Supabase or Firebase), validate input on the server, and add moderation and audit logs.

## Suggested hackathon submission fields
**Project name:** CampusConnect — Campus Issue Tracker

**One-line pitch:** A transparent campus issue tracker where students and faculty report problems and admins update progress from submission to resolution.

**Problem it solves:** Campus complaints are often scattered across messages and in-person conversations, leaving reporters unsure whether action is being taken.

**Live URL:** Add your published GitHub Pages URL after deployment.

**GitHub repository:** Add your repository URL after creating and uploading the project.

## Make it your own
Before submitting, customize the design, wording, issue categories, sample data, and at least one feature based on your own idea. Understand the code and test the complete flow. Follow the hackathon's rule that the submitted work must be your own.
