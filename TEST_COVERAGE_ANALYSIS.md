# Test Coverage Analysis - TanStack Chat Template

## Executive Summary

**Current Test Coverage: 0%** - The codebase has no automated tests implemented. This document identifies critical areas for improvement and provides a prioritized roadmap for adding test coverage.

## Current State Assessment

### Codebase Overview
- **Total Source Files**: 24 TypeScript/TSX files
- **No Testing Framework**: The project has no test runner (Jest, Vitest, etc.) or test dependencies
- **No Test Files**: Zero test files exist (*.test.ts, *.spec.ts)
- **Testing Packages**: Only basic dependencies; `jsdom` is installed but unused

### Project Structure
```
src/
├── components/        # 7 React components (100% untested)
├── store/            # State management (100% untested)
├── utils/            # AI API logic (100% untested)
├── routes/           # Router pages (100% untested)
└── [other files]     # Config & setup files
convex/
├── conversations.ts  # Backend mutations/queries (100% untested)
└── schema.ts         # Database schema
```

---

## Critical Areas Requiring Test Coverage

### 1. **State Management (HIGH PRIORITY - 8 files)**
**Location**: `src/store/`

**Why it's critical**: The store manages all application state. Bugs here cascade throughout the app.

**Key functions needing tests**:
- `actions.createPrompt()` - Creates prompts and sets them active
- `actions.deletePrompt()` - Removes prompts by ID
- `actions.setPromptActive()` - Toggles prompt active status
- `actions.addConversation()` - Adds conversations and updates current ID
- `actions.deleteConversation()` - Removes conversations, updates current ID
- `actions.addMessage()` - Appends messages to conversations
- `selectors.*` - All selector functions that read state

**Test Coverage Goal**: 100% of store logic

**Example bugs this would catch**:
- Deactivating wrong prompts when creating a new one
- Not cleaning up currentConversationId when deleting active conversation
- Messages added to wrong conversation

**Estimated Effort**: 3-4 hours

---

### 2. **AI API & Streaming Logic (HIGH PRIORITY - 6 functions)**
**Location**: `src/utils/ai.ts`

**Why it's critical**: This is the core chat functionality. API errors and stream handling bugs directly impact user experience.

**Key functions needing tests**:
- `genAIResponse` handler
  - Message filtering logic (`content.trim() !== ''`)
  - Error message filtering
  - System prompt composition
  - Stream transformation to NDJSON format
  - Error handling (rate limits, auth errors, connection errors)
  - Empty message validation

**Test Coverage Goal**: 95%+ (excluding actual API calls)

**Example bugs this would catch**:
- Error messages not properly filtered before sending to API
- Malformed NDJSON output breaking client parsing
- Missing error message for unknown error types
- Rate limit errors not properly categorized

**Estimated Effort**: 4-5 hours

---

### 3. **Backend Database Operations (MEDIUM PRIORITY - 5 functions)**
**Location**: `convex/conversations.ts`

**Why it's important**: Database operations are susceptible to edge cases and data consistency issues.

**Key functions needing tests**:
- `create()` - Conversation creation with optional messages
- `addMessage()` - Message appending with existence check
- `updateTitle()` - Title updates
- `get()` - Single conversation retrieval
- `list()` - All conversations query
- `remove()` - Conversation deletion

**Test Coverage Goal**: 100%

**Example bugs this would catch**:
- Adding message to non-existent conversation (currently throws)
- Title update silently failing
- Conversation not properly created when messages array is omitted

**Estimated Effort**: 2-3 hours

---

### 4. **React Components (MEDIUM PRIORITY - 7 components)**
**Location**: `src/components/`

**Why it's important**: Components contain UI logic, conditional rendering, and user interactions.

**Components needing tests** (in priority order):

1. **SettingsDialog** - Dialog interaction, state management
2. **ChatInput** - User input handling, form submission
3. **ChatMessage** - Markdown rendering, role-based styling
4. **Sidebar** - Conversation list rendering, selection
5. **ChatContainer (routes/index.tsx)** - Main chat flow integration
6. **WelcomeScreen** - Initial state rendering
7. **LoadingIndicator** - State-based visibility

**Test Coverage Goal**: 80%+ (snapshot + interaction tests)

**Example bugs this would catch**:
- Form submission with empty input
- Markdown XSS vulnerabilities in unsanitized content
- Dialog not closing on confirm
- Conversation not switching when selected from sidebar

**Estimated Effort**: 5-6 hours

---

### 5. **Error Handling & Edge Cases (MEDIUM PRIORITY)**

**Critical scenarios with no test coverage**:

| Scenario | Location | Impact |
|----------|----------|--------|
| Empty message list sent to API | `ai.ts` | API call with no content |
| Missing ANTHROPIC_API_KEY | `ai.ts` | Runtime error |
| Stream parsing failure | `ai.ts` | Client hangs or crashes |
| Rate limit hit | `ai.ts` | User sees generic error |
| Network timeout | `ai.ts` | Unhandled promise rejection |
| Add message to deleted conversation | `convex/` | Data corruption |
| Concurrent prompt creation | `store.ts` | Race condition |
| Store state overflow | `store.ts` | Memory leak |

**Estimated Effort**: 2-3 hours (once framework is set up)

---

## Recommended Testing Strategy

### Phase 1: Setup (1-2 hours)
**Goal**: Establish testing infrastructure

1. **Install test framework**
   ```bash
   npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
   ```

2. **Add test scripts to package.json**
   ```json
   {
     "test": "vitest",
     "test:ui": "vitest --ui",
     "test:coverage": "vitest --coverage"
   }
   ```

3. **Create test configuration** (`vite.config.test.ts` or update `vite.config.js`)

4. **Setup test utilities** (helper functions, mocks, fixtures)

### Phase 2: High-Priority Tests (8-10 hours)
**Focus**: Store and AI logic - core business logic

1. **Store tests** (3-4 hours)
   - Unit tests for each action
   - Selector tests
   - State mutation tests

2. **AI API tests** (4-5 hours)
   - Message filtering logic
   - Error handling paths
   - Stream transformation
   - Mock Anthropic API

3. **Backend tests** (2-3 hours)
   - Convex mutation/query handlers
   - Error scenarios
   - Data validation

### Phase 3: Component Tests (5-6 hours)
**Focus**: User-facing component behavior

1. **Integration tests** for main chat flow
2. **Snapshot tests** for static components
3. **Interaction tests** for forms and dialogs

### Phase 4: End-to-End Tests (3-4 hours)
**Focus**: Critical user journeys (optional in Phase 1)

1. Create conversation → send message → receive response
2. Edit conversation title
3. Switch between conversations
4. Apply custom system prompt

---

## Testing Framework Recommendation

**Recommended: Vitest + React Testing Library**

**Why**:
- Fast (uses esbuild/SWC)
- Compatible with Vite (already in project)
- React Testing Library encourages user-centric tests
- Good TypeScript support
- Jest-compatible API (easy to learn)

---

## Minimum Coverage Thresholds

| Category | Target |
|----------|--------|
| Statements | 60% (Phase 1), 80% (Final) |
| Branches | 50% (Phase 1), 75% (Final) |
| Functions | 70% (Phase 1), 85% (Final) |
| Lines | 60% (Phase 1), 80% (Final) |

---

## Quick Wins (Highest ROI)

These tests would catch the most bugs with the least effort:

1. **Store action/selector tests** (2 hours) → Catches 30% of potential bugs
2. **Message filtering & error handling** (2 hours) → Prevents 80% of API failures
3. **Database integrity tests** (1 hour) → Prevents data corruption

**Total: ~5 hours of testing work → ~70% bug prevention**

---

## Files to Prioritize (by impact)

```
Priority 1 (Setup first):
└── src/store/store.ts          (40 lines, high complexity)
└── src/utils/ai.ts             (180 lines, high criticality)
└── convex/conversations.ts      (80 lines, data-critical)

Priority 2 (Component logic):
└── src/routes/index.tsx         (Chat flow orchestration)
└── src/components/ChatInput.tsx (User input handling)

Priority 3 (Supporting):
└── src/store/hooks.ts
└── src/components/SettingsDialog.tsx
└── src/components/Sidebar.tsx
```

---

## Next Steps

1. **Immediate**: Review this analysis and decide which phase to start with
2. **Week 1**: Complete Phase 1 (setup) and Phase 2 (high-priority tests)
3. **Week 2-3**: Complete Phase 3 (component tests)
4. **Ongoing**: Maintain >80% coverage on new code

---

## Questions to Consider

- Should we enforce test coverage requirements in CI/CD?
- Do we need end-to-end tests with real Anthropic API calls (requires API key in CI)?
- Should we test the Convex functions in isolation or with local Convex dev server?
- Do we need performance/load testing for concurrent conversations?

