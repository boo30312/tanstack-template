# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TanStack Chat Template is a modern, full-stack chat application powered by Claude AI. It demonstrates best practices for integrating Anthropic's Claude API with a contemporary React stack, featuring real-time streaming responses, conversation management, and customizable system prompts.

## Essential Commands

### Development
- **`npm run dev`** - Start the development server (runs on port 3000 by default)
- **`npm install`** - Install dependencies
- **`npm run build`** - Create production build
- **`npm run serve`** - Preview production build locally

### With Convex (optional database)
- **`npx convex dev`** - Start Convex development server (required if using Convex features)

## Architecture Overview

### Core Stack
- **Frontend**: React 19 + TanStack Start (full-stack React framework)
- **Routing**: TanStack Router with file-based routing
- **State**: TanStack Store (global state management)
- **Styling**: Tailwind CSS 4
- **AI**: Anthropic Claude API (server-side only)
- **Build**: Vite 6 with Vinxi + TanStack Router plugin for auto code-splitting

### Directory Structure

```
src/
├── routes/              # File-based routing (auto-generated routeTree.gen.ts)
│   ├── __root.tsx       # Root layout, wraps all routes
│   └── index.tsx        # Main chat interface
├── components/          # Reusable UI components
│   ├── ChatMessage.tsx  # Message display with markdown support
│   ├── ChatInput.tsx    # User message input
│   ├── Sidebar.tsx      # Navigation and conversation list
│   ├── SettingsDialog.tsx # System prompt configuration
│   ├── WelcomeScreen.tsx
│   ├── LoadingIndicator.tsx
│   ├── TopBanner.tsx
│   └── index.ts         # Component exports
├── store/               # TanStack Store state management
│   ├── store.ts         # Store definition, actions, selectors
│   ├── hooks.ts         # Custom hooks for store access
│   └── index.ts         # Store exports
├── utils/               # Utility functions
│   ├── ai.ts            # Server-side Anthropic integration (createServerFn)
│   └── index.ts
├── api.ts               # TanStack React Start API handler config
├── router.tsx           # Router initialization with scrollRestoration
├── client.tsx           # Client-side entry point
├── ssr.tsx              # Server-side rendering setup
├── convex.tsx           # Convex client provider
├── sentry.ts            # Error monitoring setup
└── styles.css           # Global Tailwind styles
```

## Key Architecture Patterns

### Server Functions (AI Integration)
The AI integration lives in `src/utils/ai.ts` using `createServerFn` from TanStack React Start. This ensures:
- API key (`ANTHROPIC_API_KEY`) is server-side only — never exposed to the browser
- Streaming responses are transformed to NDJSON format for client consumption
- Error handling includes specific cases: rate limits, auth failures, connection issues

**Important**: The Anthropic client does NOT set `baseURL` — Netlify AI Gateway automatically intercepts requests to `api.anthropic.com` in production.

### State Management (TanStack Store)
`src/store/store.ts` exports:
- **State interface**: Prompts, conversations, UI state
- **Actions**: Mutation functions (createPrompt, addMessage, setLoading, etc.)
- **Selectors**: Pure functions to read state (getActivePrompt, getCurrentConversation, etc.)

Store is accessed via hooks in `src/store/hooks.ts` (typically `useStore(selector)`).

### Routing (TanStack Router)
- File-based routing: files in `src/routes/` automatically generate routes
- `__root.tsx` is the root layout applied to all routes
- Route tree is auto-generated in `src/routeTree.gen.ts` (do not edit manually)
- Use `Link` component from `@tanstack/react-router` for navigation

### Message Streaming
The chat uses streaming responses:
1. Client sends messages + system prompt to server via `genAIResponse` server function
2. Server streams Anthropic response in NDJSON format (one JSON object per line)
3. Client accumulates text chunks from `content_block_delta` events
4. UI updates in real-time as chunks arrive

## Environment Variables

Create a `.env` file at the project root. Example: `.env.example`

**Server-side only (required)**:
- `ANTHROPIC_API_KEY` - Anthropic API key (no `VITE_` prefix to keep server-side)

**Optional**:
- `VITE_CONVEX_URL` - Convex deployment URL for persistent storage
- `VITE_SENTRY_DSN` - Sentry error reporting endpoint
- `SENTRY_AUTH_TOKEN` - Required by Sentry Vite plugin (only for builds with source maps)

The app works without Sentry; if `SENTRY_AUTH_TOKEN` is missing, Sentry plugin is skipped and source maps are not generated.

## Important Patterns & Conventions

### Prompt Layering
Custom system prompts are layered on top of a default system prompt in `genAIResponse`:
- Default prompt instructs Claude to format responses with Markdown
- User's custom prompt is appended: `${DEFAULT_SYSTEM_PROMPT}\n\n${customPrompt}`
- Only applied if `systemPrompt.enabled` is true

### Message Filtering
Before sending to Claude, the code filters:
- Empty messages (whitespace only)
- Error messages starting with "Sorry, I encountered an error"
- This prevents feedback loops from API errors

### Markdown Rendering
Chat messages use `react-markdown` with these plugins:
- `rehype-highlight` - syntax highlighting for code blocks
- `rehype-sanitize` - XSS protection
- `rehype-raw` - preserve HTML structure

## Development Workflow

### Adding a New Route
1. Create a file in `src/routes/` (e.g., `src/routes/about.tsx`)
2. TanStack Router automatically generates the route tree
3. Use `createRoute` and export `Route` object with `component`

### Adding State
1. Define state type in `src/store/store.ts`
2. Add action functions to `actions` object
3. Add selector functions to `selectors` object
4. Create hooks in `src/store/hooks.ts` if needed (e.g., `usePrompts`, `useConversations`)

### Adding a Component
1. Create file in `src/components/` with `.tsx` extension
2. Export from `src/components/index.ts`
3. Import and use in route components

### Modifying AI Behavior
- Change system prompt in `src/utils/ai.ts` (`DEFAULT_SYSTEM_PROMPT`)
- Change model in the `anthropic.messages.stream()` call
- Change `max_tokens` limit for response length
- Add custom message formatting before sending to Anthropic

## Building & Deployment

### Local Production Test
```bash
npm run build
npm run serve
```
Visit `http://localhost:4173` to preview.

### Netlify Deployment
- The repo is configured for Netlify with `preset: 'netlify'` in `app.config.ts`
- Netlify AI Gateway automatically proxies Claude API requests (no configuration needed)
- If using Convex, ensure `VITE_CONVEX_URL` is set in Netlify environment variables

### Sentry (Optional)
- Set `VITE_SENTRY_DSN` to enable client-side error reporting
- Set `SENTRY_AUTH_TOKEN` to enable source map uploads
- Without auth token, builds skip source maps and Sentry plugin

## Testing & Debugging

### Common Issues
- **"Missing API key" error**: Ensure `.env` has `ANTHROPIC_API_KEY`
- **Streaming timeout**: Increase timeout in `src/utils/ai.ts` (currently 30s)
- **CORS errors**: Use server functions (createServerFn) to proxy API calls
- **State not updating**: Verify store action is being called; check selectors in hooks

### Debug Output
`src/utils/ai.ts` logs system prompt configuration to console in development.

## Important Notes for Future Development

1. **API Key Security**: Keep `ANTHROPIC_API_KEY` server-side always. Never add `VITE_` prefix.
2. **Server Functions**: Use TanStack React Start's `createServerFn` for any external API calls.
3. **Streaming Format**: Response stream must be NDJSON (one JSON object per line) for the client parser to work.
4. **Error Messages**: Filter error messages before re-sending to avoid infinite loops.
5. **Model Version**: Currently using `claude-sonnet-4-5-20250929`. Check Anthropic docs for latest models.
6. **Route Generation**: Don't edit `routeTree.gen.ts` — it's auto-generated; edit the actual route files instead.
