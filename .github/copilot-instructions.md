# Copilot Instructions for Modern C++ Learning Platform

## Project Overview
This is a React TypeScript application that serves as an interactive learning platform for modern C++ features (C++14, C++17, C++20, C++23). The platform provides:

- **Learning section**: Detailed explanations of C++ features with code examples
- **Practice section**: Interactive exercises with AI-powered code review
- **Code editor**: Monaco editor integration for C++ code writing
- **AI feedback system**: Simulated code review with suggestions and best practices

## Architecture & Technology Stack

- **Framework**: React 18 with TypeScript
- **Build tool**: Vite
- **Styling**: Tailwind CSS
- **Code editor**: Monaco Editor
- **Icons**: Lucide React
- **Linting**: ESLint with TypeScript support

## Code Standards & Conventions

### TypeScript/React Standards
- Use functional components with hooks
- Prefer `const` over `let` when possible
- Use explicit typing for props interfaces
- Follow PascalCase for component names
- Use camelCase for variables and functions
- Avoid `any` type - use proper TypeScript types
- Remove unused imports and variables

### File Organization
- Components in `src/components/`
- Type definitions in `src/types/`
- Data files in `src/data/`
- Each component should have a clear single responsibility

### C++ Code Examples
When working with C++ code examples in the data files:
- Use modern C++ features appropriately for each standard (C++14, C++17, C++20, C++23)
- Include comprehensive examples showing real-world usage
- Provide clear explanations that help learners understand the "why" not just the "how"
- Include performance considerations where relevant
- Add proper error handling examples
- Use consistent formatting and style

## Data Structure Guidelines

### CppFeature Interface
```typescript
interface CppFeature {
  id: string;           // kebab-case identifier
  title: string;        // Human-readable title
  standard: 'cpp14' | 'cpp17' | 'cpp20' | 'cpp23' | 'performance' | 'templates';
  description: string;  // Brief description
  codeExample: string;  // Complete, runnable C++ code
  explanation: string;  // Detailed explanation
  useCase: string;      // Real-world applications
}
```

### Exercise Interface
```typescript
interface Exercise {
  id: string;           // kebab-case identifier
  title: string;        // Human-readable title
  standard: 'cpp14' | 'cpp17' | 'cpp20' | 'cpp23' | 'performance' | 'templates';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;  // Exercise description
  starterCode: string;  // Template code for students
  expectedOutput: string; // Expected program output
  hints: string[];      // Array of helpful hints
  feature: string;      // Related feature ID
  relatedTheory: string; // Related theory feature ID
}
```

## Component Patterns

### Props Interface Pattern
Always define explicit props interfaces:
```typescript
interface ComponentNameProps {
  prop1: Type1;
  prop2: Type2;
  onAction?: () => void; // Optional callbacks with ? 
}
```

### State Management
- Use `useState` for local component state
- Pass state up to parent components when needed
- Use callback props for child-to-parent communication

### Styling Patterns
- Use Tailwind utility classes
- Follow consistent color schemes:
  - C++14: Orange theme (`orange-100`, `orange-800`, etc.)
  - C++17: Blue theme (`blue-100`, `blue-800`, etc.)
  - C++20: Purple theme (`purple-100`, `purple-800`, etc.)
  - C++23: Green theme (`green-100`, `green-800`, etc.)
  - Performance: Red theme (`red-100`, `red-800`, etc.)
  - Templates: Indigo theme (`indigo-100`, `indigo-800`, etc.)

## Build & Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## When Adding New Features

1. **C++ Features**: Add to `src/data/features.ts` following the CppFeature interface
2. **Exercises**: Add to `src/data/exercises.ts` following the Exercise interface
3. **Components**: Create in `src/components/` with proper TypeScript interfaces
4. **Types**: Add new types to `src/types/index.ts`

## Code Review Guidelines

When reviewing or generating code:
- Ensure all C++ examples are syntactically correct and compile
- Verify TypeScript types are properly defined
- Check that React patterns follow hooks conventions
- Ensure accessibility with proper ARIA labels where needed
- Maintain consistent styling with Tailwind classes
- Remove any unused imports or variables
- Test that new features integrate well with existing navigation

## AI Code Review System

The platform includes a simulated AI code review system in `TopicView.tsx`:
- Provides topic-specific feedback based on exercise type
- Suggests modern C++ best practices
- Identifies common issues and anti-patterns
- Rates code quality on a 1-10 scale

When modifying this system:
- Keep feedback educational and constructive
- Include explanations of why certain patterns are recommended
- Maintain consistency with C++ standards and best practices
- Ensure feedback is relevant to the specific C++ feature being practiced

## Testing Considerations

- Always test build process after changes (`npm run build`)
- Verify linting passes (`npm run lint`) 
- Manually test UI changes in development mode
- Ensure C++ code examples compile and produce expected output
- Test responsive design on different screen sizes

## Common Pitfalls to Avoid

- Don't use `any` type in TypeScript
- Don't leave unused imports or variables
- Don't break existing component interfaces
- Don't add C++ examples that don't compile
- Don't use inconsistent naming conventions
- Don't forget to update related exercises when modifying features
- Don't use deprecated React patterns (class components, etc.)