This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Overview

This is a modern, full-stack collaboration platform built with Next.js, React, TypeScript, Zustand, Tailwind CSS, and Socket.IO. It features authentication, real-time chat, workspace management, and a responsive UI.

### Key Features

- **Authentication**: Secure login/register flows using custom hooks and state management.
- **Workspaces & Channels**: Organize conversations and users into workspaces and channels.
- **Real-time Chat**: Powered by Socket.IO for instant messaging and presence.
- **User Presence**: See who is online and typing.
- **File Attachments**: Upload and preview files in chat.
- **Responsive UI**: Built with Tailwind CSS and Radix UI components.

---

## Project Structure

- `src/app/`: Next.js app directory (routing, layouts, pages)
  - `(auth)/`: Authentication pages (login, register)
  - `(dashboard)/`: Main dashboard, workspace, and channel pages
- `src/components/`: Reusable React components
  - `chat/`: Chat UI components
  - `navigation/`: Sidebar and top bar
  - `presence/`: User avatars, typing indicators
  - `workspace/`: Workspace management (e.g., invite modal)
  - `ui/`: Shared UI primitives (button, input)
- `src/hooks/`: Custom React hooks (auth, workspaces, channels, etc.)
- `src/lib/`: Utility libraries (API, auth, socket, file utils)
- `src/stores/`: Zustand stores for state management
- `styles/`: Global styles (Tailwind CSS)
- `public/`: Static assets

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm, npm, yarn, or bun

### Installation

```zsh
# Install dependencies
pnpm install
# or
npm install
# or
yarn install
# or
bun install
```

### Development

```zsh
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```zsh
pnpm build
pnpm start
```

---

## Code Style & Linting

- TypeScript strict mode is enabled.
- Lint with: `pnpm lint` (or `npm run lint`, etc.)
- Follow the existing folder and file naming conventions.

---

## Contributing

1. Fork the repository and create a new branch.
2. Make your changes with clear commit messages.
3. Ensure code passes linting and builds successfully.
4. Submit a pull request with a description of your changes.

### Tips

- Use hooks and stores from `src/hooks/` and `src/stores/` for state management.
- UI components should be placed in `src/components/`.
- For new features, consider writing reusable hooks and components.
- Keep styles in Tailwind CSS and avoid inline styles where possible.

---

## Environment Variables

- Create a `.env.local` file for local development.
- Common variables: API endpoints, secrets, etc.

---

## Deployment

- The app is ready for deployment on Vercel or any Node.js server.
- See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

---
