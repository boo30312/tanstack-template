# TanStack Chat Template - Developer Guide

## Project Overview

This is a modern AI-powered chat application template built with the TanStack ecosystem and Claude AI integration. It's a production-ready full-stack template designed for Netlify deployment with optional persistent storage via Convex.

**Key Characteristics:**
- Real-time chat interface powered by Claude API
- Client-side state management with TanStack Store
- File-based routing with TanStack Router
- TypeScript strict mode for type safety
- Optional database persistence (Convex)
- Error monitoring with Sentry
- Tailwind CSS for styling
- Optimized for Netlify serverless deployment

## Directory Structure

```
/home/user/tanstack-template/
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── ChatInput.tsx         # Chat message input field
│   │   ├── ChatMessage.tsx       # Individual message display
│   │   ├── LoadingIndicator.tsx  # Loading state indicator
│   │   ├── SettingsDialog.tsx    # Settings/config modal
│   │   ├── Sidebar.tsx           # Navigation sidebar with conversations
│   │   ├── TopBanner.tsx         # Top banner notifications
│   │   ├── WelcomeScreen.tsx     # Initial welcome UI
│   │   └── index.ts              # Component exports
│   │
│   ├── routes/                   # TanStack Router file-based routing
│   │   ├── __root.tsx            # Root layout wrapper component
│   │   └── index.tsx             # Main chat page (core logic)
│   │
│   ├── store/                    # TanStack Store state management
│   │   ├── store.ts              # State definition, actions, selectors
│   │   ├── hooks.ts              # Custom React hooks for store access
│   │   └── index.ts              # Store exports
│   │
│   ├── utils/                    # Utility functions
│   │   └── ai.ts                 # AI message types and utilities
│   │
│   ├── api.ts                    # TanStack React Start API handler
│   ├── client.tsx                # Client-side entry point with Sentry
│   ├── convex.tsx                # Convex client initialization
│   ├── router.tsx                # Router configuration
│   ├── sentry.ts                 # Sentry error monitoring setup
│   ├── ssr.tsx                   # Server-side rendering entry point
│   ├── styles.css                # Global Tailwind CSS
│   └── routeTree.gen.ts          # Auto-generated route tree
│
├── convex/                       # Convex backend (optional)
│   ├── conversations.ts          # Conversation mutations/queries
│   ├── schema.ts                 # Database schema definition
│   ├── convex.json               # Convex project config
│   ├── tsconfig.json             # TypeScript config for Convex
│   ├── README.md
│   └── _generated/               # Auto-generated Convex types
│
├── public/                       # Static assets (favicon, etc.)
├── .github/workflows/            # GitHub Actions configurations
├── .vscode/                      # VS Code settings
│
├── Configuration Files
│   ├── package.json              # Dependencies and npm scripts
│   ├── tsconfig.json             # TypeScript compiler options
│   ├── vite.config.js            # Vite bundler configuration
│   ├── app.config.ts             # TanStack React Start config
│   ├── postcss.config.ts         # PostCSS/Tailwind setup
│   ├── netlify.toml              # Netlify deployment config
│   ├── .env.example              # Environment template
│   ├── .gitignore
│   └── renovate.json             # Automated dependency updates
│
├── README.md                     # User-facing documentation
└── LICENSE
```

## Technology Stack

### Frontend Framework
- **React 19.0.0** - UI library with latest features
- **TypeScript 5.7.2** - Type-safe development
- **TanStack Router 1.114.17** - File-based routing system
- **TanStack React Start 1.114.19** - Full-stack framework
- **TanStack Store 0.7.0** - Lightweight state management

### Styling & UI
- **Tailwind CSS 4.0.6** - Utility-first CSS framework
- **PostCSS 8.5.2** - CSS processing
- **Lucide React 0.475.0** - Icon library

### AI & Backend
- **@anthropic-ai/sdk 0.65.0** - Claude API client
- **Convex 1.20.0** - Optional backend + database (optional)

### Build & Development
- **Vite 6.2.2** - Fast build tool
- **Vinxi 0.5.3** - Full-stack framework
- **@vitejs/plugin-react 4.3.4** - React JSX support

### Code Quality & Monitoring
- **Sentry 9.5.0** - Error tracking (optional)
- **@sentry/vite-plugin 3.2.2** - Sentry integration

### Utilities
- **react-markdown 9.0.1** - Markdown rendering
- **rehype-highlight, rehype-raw, rehype-sanitize** - Markdown processing
- **highlight.js 11.11.1** - Code syntax highlighting
- **uuid 11.1.0** - ID generation

## Development Setup

### Prerequisites
- Node.js 18+ (npm 9+)
- Anthropic API key (get from https://console.anthropic.com)
- (Optional) Convex account for database features
- (Optional) Netlify CLI for local deployment preview

### Getting Started

1. **Clone and install:**
   ```bash
   git clone <repository>
   cd tanstack-template
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   App runs at http://localhost:3000

### Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production with Sentry support |
| `npm run serve` | Preview production build locally |
| `npm start` | Start production server |
| `npx convex dev` | Start Convex dev server (optional) |

### Using Netlify CLI (Recommended for local testing)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Start local dev server
netlify dev
```
Runs on http://localhost:8888 with serverless function simulation

## Code Organization Patterns

### 1. State Management (TanStack Store)

**Location:** `src/store/store.ts`

The store uses a centralized, immutable state pattern with actions and selectors:

```typescript
// State is defined as an interface
export interface State {
  prompts: Prompt[]
  conversations: Conversation[]
  currentConversationId: string | null
  isLoading: boolean
  isBannerVisible: boolean
}

// Actions mutate state
const actions = {
  createPrompt: (name: string, content: string) => {
    store.setState(state => ({
      ...state,
      prompts: [...state.prompts, newPrompt]
    }))
  }
}

// Selectors derive state
const selectors = {
  getActivePrompt: (state: State) => state.prompts.find(p => p.is_active)
}
```

**Pattern:** Use immutable updates with spread operators. Always create new objects/arrays; never mutate existing ones.

### 2. Routing Architecture

**Location:** `src/routes/` (TanStack Router file-based routing)

- `__root.tsx` - Root layout wrapper applied to all routes
- `index.tsx` - Main chat page (most business logic resides here)

Routes are auto-compiled into `src/routeTree.gen.ts`. Create new pages by adding files in `src/routes/`.

**File Structure:**
- `src/routes/index.tsx` = `/` (root)
- `src/routes/settings.tsx` = `/settings`
- `src/routes/about.tsx` = `/about`

### 3. Component Organization

**Location:** `src/components/`

Components are functional, React hooks-based, and use Tailwind CSS for styling:

```typescript
// Pattern: Functional component with hooks
export function ChatMessage({ message }: { message: Message }) {
  const state = useStore(state => state)
  
  return (
    <div className="p-4 bg-white rounded-lg">
      {/* Component JSX */}
    </div>
  )
}
```

**Conventions:**
- Use TypeScript for all components (`.tsx` files)
- Props passed as object with TypeScript interface
- Tailwind classes for styling
- No CSS modules (use Tailwind utilities)
- Import components via `src/components/index.ts` barrel export

### 4. API Integration

**Location:** `src/api.ts`

API routes are handled by TanStack React Start's default handler. The main chat logic uses Claude API for message processing.

**Key Integration Points:**
- Claude API calls happen in `src/routes/index.tsx`
- API key is kept server-side (no `VITE_` prefix)
- Streaming responses for real-time chat

### 5. Environment Variables

**File:** `.env` (never commit) - Template at `.env.example`

| Variable | Purpose | Scope | Required |
|----------|---------|-------|----------|
| `ANTHROPIC_API_KEY` | Claude API authentication | Server-side only | Yes |
| `VITE_CONVEX_URL` | Convex database endpoint | Client + Server | Optional |
| `VITE_SENTRY_DSN` | Sentry error tracking | Client | Optional |
| `SENTRY_AUTH_TOKEN` | Sentry build-time auth | Build-time only | Optional |

**Important:** Variables without `VITE_` prefix stay server-side only. This protects API keys from being exposed in client bundles.

## API Integration

### Claude API Integration

Claude API calls are integrated throughout the application for:
- Message processing and response generation
- Token counting (for usage monitoring)
- Streaming responses for real-time interaction

The Anthropic SDK is used to communicate with Claude:

```typescript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})
```

**Key Features:**
- Streaming support for real-time responses
- Message history context management
- System prompts for behavior control

### Convex Integration (Optional)

If using Convex for persistence:
- Database schema defined in `convex/schema.ts`
- Mutations and queries in `convex/conversations.ts`
- Auto-generated types in `convex/_generated/`
- Initialized in `src/convex.tsx`

To enable: set `VITE_CONVEX_URL` environment variable

## Routing & Navigation

**Framework:** TanStack Router with file-based routing

```typescript
// src/routes/index.tsx - Main chat page
export function Route() {
  const navigate = useNavigate()
  
  return (
    <div>
      {/* Page content */}
    </div>
  )
}
```

**Navigation Pattern:**
```typescript
import { useNavigate } from '@tanstack/react-router'

const navigate = useNavigate()
navigate({ to: '/' }) // Navigate to home
```

## Deployment

### Netlify Deployment

The project is optimized for Netlify:

1. **Configuration:** `netlify.toml`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables configured in Netlify dashboard

2. **Deploy Process:**
   ```bash
   npm run build
   # Netlify CLI auto-deploys on git push
   netlify deploy --prod
   ```

3. **Environment Setup on Netlify:**
   - Add `ANTHROPIC_API_KEY` in Netlify dashboard
   - Add optional variables: `VITE_CONVEX_URL`, `VITE_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`

4. **API Gateway (Optional):**
   - Use Netlify AI Gateway to proxy Claude API requests
   - Provides usage tracking and rate limiting

### GitHub Pages (Alternative)

GitHub Pages deployment configured via `.github/workflows/jekyll-gh-pages.yml`

## Common Development Tasks

### Adding a New Component

1. Create file: `src/components/MyComponent.tsx`
2. Implement component with TypeScript
3. Export in `src/components/index.ts`
4. Use in routes or other components

### Adding a New Page/Route

1. Create file: `src/routes/mypage.tsx`
2. Implement route with `export function Route()`
3. Route tree auto-updates in `src/routeTree.gen.ts`
4. Access at `/mypage`

### Modifying Application State

1. Update types in `src/store/store.ts` (State interface)
2. Add action function in `actions` object
3. (Optional) Add selector in `selectors` object
4. Use in components via `useStore()` hook

### Styling with Tailwind

- Use class names directly: `className="p-4 bg-white rounded-lg"`
- No CSS files needed (Tailwind handles all styling)
- Global styles in `src/styles.css`
- Responsive: `md:text-lg`, `lg:p-8`, etc.

### Adding Error Monitoring

Sentry is optional. To enable:
1. Add `VITE_SENTRY_DSN` to `.env`
2. Build with `SENTRY_AUTH_TOKEN` for source maps
3. Errors automatically captured and sent to Sentry

## Git Workflow

### Branching Strategy
- Work on feature branches: `feature/description`
- Keep main branch production-ready
- Create pull requests for code review

### Commit Conventions
- Clear, descriptive messages
- Reference issues/tickets when applicable
- Keep commits atomic and logical

### Pushing Changes
```bash
git checkout -b feature/my-feature
# Make changes
git add .
git commit -m "Add feature description"
git push -u origin feature/my-feature
# Create pull request on GitHub
```

## Testing & Quality

### Error Monitoring (Sentry)

Optional error tracking configured in `src/sentry.ts`:
- Automatically captures unhandled errors
- Tracks performance metrics
- Integrates with Vite build process

### TypeScript Strict Mode

Project enforces TypeScript strict mode:
- All values must have explicit types
- No `any` types (use unknown if necessary)
- Null/undefined safety required

## Key Files Quick Reference

| File | Purpose | Key Exports |
|------|---------|------------|
| `src/store/store.ts` | State management | `store`, `actions`, `selectors` |
| `src/routes/index.tsx` | Main chat page | `Route` component |
| `src/components/index.ts` | Component barrel export | All components |
| `src/router.tsx` | Router configuration | Router instance |
| `src/client.tsx` | Client entry | Hydration + Sentry |
| `src/api.ts` | API handler | Default API handler |
| `src/sentry.ts` | Error monitoring | Sentry initialization |
| `.env.example` | Env template | Configuration guide |
| `package.json` | Dependencies | Scripts, versions |
| `vite.config.js` | Build config | Build settings |

## Common Issues & Solutions

### API Key Not Working
- Ensure `ANTHROPIC_API_KEY` is set in `.env` (no `VITE_` prefix)
- API key should be server-side only
- Restart dev server after changing `.env`

### State Not Updating
- Check that actions use immutable updates (spread operators)
- Verify selector matches current state shape
- Use `useStore()` hook to subscribe to state changes

### Build Failing
- Clear `.vite` and `node_modules`
- Run `npm install` to ensure dependencies
- Check TypeScript errors: `npx tsc --noEmit`

### Deployment Issues
- Verify all required environment variables on Netlify
- Check build logs for configuration errors
- Ensure API key is set in Netlify dashboard, not in `.env`

## Additional Resources

- [TanStack Router Docs](https://tanstack.com/router/)
- [TanStack Store Docs](https://tanstack.com/store/)
- [Anthropic Claude API Docs](https://docs.anthropic.com/)
- [Convex Documentation](https://docs.convex.dev/) (if using)
- [Netlify Deployment Docs](https://docs.netlify.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated:** 2026-06-07  
**Template Version:** 1.0  
**Node Version Required:** 18+
