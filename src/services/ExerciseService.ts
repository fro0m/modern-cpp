import { Exercise, CodeReview } from '../types';

export const validateCode = (code: string, exercise: Exercise): boolean => {
    // Simple validation based on exercise features
    switch (exercise.feature) {
        case 'generic-lambdas':
            return code.includes('auto') && code.includes('[');
        case 'structured-bindings':
            return code.includes('auto [');
        case 'std-optional':
            return code.includes('std::optional') || code.includes('std::nullopt');
        case 'concepts':
            return code.includes('concept') || code.includes('requires');
        case 'ranges':
            return code.includes('std::views::') || code.includes('std::ranges::');
        case 'std-expected':
            return code.includes('std::expected');
        case 'memory-layout':
            return code.includes('struct') && (code.includes('SoA') || code.includes('Array'));
        case 'lock-free':
            return code.includes('std::atomic') && code.includes('memory_order');
        case 'simd':
            return code.includes('__m256') || code.includes('_mm256_');
        case 'template-fundamentals':
            return code.includes('template') && code.includes('<');
        case 'sfinae-concepts':
            return code.includes('std::enable_if') || code.includes('concept');
        case 'variadic-templates':
            return code.includes('template<typename...') || code.includes('sizeof...');
        default:
            return true; // Default to success for unknown exercises
    }
};

export const generateAIReview = (code: string, exercise: Exercise | null): CodeReview => {
    const suggestions: string[] = [];
    const issues: string[] = [];
    const bestPractices: string[] = [];
    const modernCppUsage: string[] = [];
    const topicSpecificFeedback: string[] = [];

    // Generic feedback
    if (code.includes('std::endl')) {
        suggestions.push("Consider using '\\n' instead of std::endl for better performance");
    }

    if (code.includes('for (int i = 0; i <') && !code.includes('auto')) {
        suggestions.push("Consider using range-based for loops or auto keyword for type deduction");
    }

    // Topic-specific feedback based on exercise
    if (exercise) {
        switch (exercise.feature) {
            case 'generic-lambdas':
                topicSpecificFeedback.push("Great use of generic lambdas! They provide type flexibility without sacrificing performance.");
                if (code.includes('auto')) {
                    topicSpecificFeedback.push("Excellent use of auto parameters in lambda - this makes your code work with any printable type.");
                }
                modernCppUsage.push("Generic lambdas (C++14) eliminate the need for separate function templates in many cases");
                break;

            case 'structured-bindings':
                if (code.includes('auto [')) {
                    topicSpecificFeedback.push("Perfect use of structured bindings! This makes tuple/pair decomposition much more readable.");
                    modernCppUsage.push("Structured bindings (C++17) eliminate the need for std::get<> or .first/.second");
                } else {
                    issues.push("Consider using structured bindings to decompose tuples/pairs more elegantly");
                }
                break;

            case 'std-optional':
                if (code.includes('std::nullopt')) {
                    topicSpecificFeedback.push("Good use of std::nullopt for representing absent values safely.");
                }
                if (code.includes('.value_or(')) {
                    topicSpecificFeedback.push("Excellent use of value_or() for providing default values!");
                }
                modernCppUsage.push("std::optional (C++17) provides type-safe nullable values without pointer risks");
                break;

            case 'concepts':
                if (code.includes('concept')) {
                    topicSpecificFeedback.push("Excellent concept definition! This makes template constraints self-documenting.");
                    modernCppUsage.push("Concepts (C++20) provide much clearer error messages than SFINAE");
                }
                if (code.includes('requires')) {
                    topicSpecificFeedback.push("Good use of requires clause for specifying template requirements.");
                }
                break;

            case 'ranges':
                if (code.includes('std::views::')) {
                    topicSpecificFeedback.push("Great use of range views! They provide lazy evaluation and composability.");
                    modernCppUsage.push("Range views (C++20) enable functional programming patterns with zero-cost abstractions");
                }
                if (code.includes('|')) {
                    topicSpecificFeedback.push("Excellent use of pipe operator for chaining range operations!");
                }
                break;

            case 'std-expected':
                if (code.includes('std::unexpected')) {
                    topicSpecificFeedback.push("Perfect use of std::unexpected for explicit error handling!");
                }
                if (code.includes('.and_then(')) {
                    topicSpecificFeedback.push("Great use of and_then() for chaining operations that might fail.");
                }
                modernCppUsage.push("std::expected (C++23) provides type-safe error handling without exceptions");
                break;

            case 'memory-layout':
                if (code.includes('alignas')) {
                    topicSpecificFeedback.push("Excellent use of alignas for cache-line alignment!");
                }
                if (code.includes('SoA')) {
                    topicSpecificFeedback.push("Great implementation of Structure of Arrays pattern for better cache performance.");
                }
                modernCppUsage.push("SoA pattern significantly improves cache locality for vectorized operations");
                break;

            case 'lock-free':
                if (code.includes('memory_order_acquire') || code.includes('memory_order_release')) {
                    topicSpecificFeedback.push("Perfect use of acquire-release semantics for lock-free synchronization!");
                }
                if (code.includes('compare_exchange')) {
                    topicSpecificFeedback.push("Excellent use of compare-and-swap for atomic updates.");
                }
                modernCppUsage.push("Lock-free programming eliminates thread contention and improves scalability");
                break;

            case 'simd':
                if (code.includes('_mm256_')) {
                    topicSpecificFeedback.push("Great use of AVX intrinsics for vectorized computation!");
                }
                if (code.includes('_mm256_fmadd')) {
                    topicSpecificFeedback.push("Excellent use of fused multiply-add for optimal performance.");
                }
                modernCppUsage.push("SIMD instructions can provide 4-8x performance improvement for parallel operations");
                break;
        }
    }

    // Best practices
    bestPractices.push("Use const correctness where possible");
    bestPractices.push("Prefer range-based for loops over traditional index-based loops");
    bestPractices.push("Use auto for type deduction when the type is obvious");

    const rating = Math.max(6, 10 - issues.length);

    return {
        suggestions,
        issues,
        bestPractices,
        modernCppUsage,
        topicSpecificFeedback,
        rating
    };
};
