# Quick Reference for GitHub Copilot

## Project Context
Modern C++ learning platform built with React + TypeScript + Vite.

## Key Patterns
- Functional React components with TypeScript interfaces
- Tailwind CSS for styling with consistent color themes per C++ standard
- Monaco editor integration for C++ code examples
- Data-driven architecture with features and exercises in `/src/data/`

## Standards
- No `any` types, use proper TypeScript
- Remove unused imports/variables  
- Follow React hooks patterns
- C++ examples must be compilable and educational
- Use kebab-case for IDs, PascalCase for components, camelCase for variables

## Color Coding
- C++14: Orange, C++17: Blue, C++20: Purple, C++23: Green
- Performance: Red, Templates: Indigo

## Build
`npm install && npm run build && npm run lint`