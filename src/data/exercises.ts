import { Exercise } from '../types';

export const exercises: Exercise[] = [
  // C++14 Exercises
  {
    id: 'generic-lambdas-basic',
    title: 'Generic Lambda Functions',
    standard: 'cpp14',
    difficulty: 'beginner',
    description: 'Create a generic lambda that can work with different data types and use it with STL algorithms.',
    starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

int main() {
    // TODO: Create a generic lambda called 'print_with_prefix'
    // that takes any type and prints it with a "Value: " prefix
    
    // Test with different types
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    std::vector<std::string> words = {"hello", "world", "cpp14"};
    
    std::cout << "Numbers:\\n";
    // TODO: Use std::for_each with your generic lambda
    
    std::cout << "\\nWords:\\n";
    // TODO: Use std::for_each with your generic lambda
    
    return 0;
}`,
    expectedOutput: 'Numbers:\nValue: 1\nValue: 2\nValue: 3\nValue: 4\nValue: 5\n\nWords:\nValue: hello\nValue: world\nValue: cpp14',
    hints: [
      'Use auto parameters in lambda: [](const auto& item)',
      'Generic lambdas work with any type that supports the operations you use',
      'std::for_each takes iterators and a function/lambda'
    ],
    feature: 'generic-lambdas',
    relatedTheory: 'generic-lambdas'
  },
  {
    id: 'variable-templates-constants',
    title: 'Mathematical Constants with Variable Templates',
    standard: 'cpp14',
    difficulty: 'intermediate',
    description: 'Implement variable templates for mathematical constants with different precisions.',
    starterCode: `#include <iostream>
#include <iomanip>

// TODO: Create a variable template for pi with default precision
template<typename T>
constexpr T pi = /* TODO: Implement */;

// TODO: Create a specialization for float with lower precision
template<>
constexpr float pi<float> = /* TODO: Implement */;

// TODO: Create a variable template for e (Euler's number)
template<typename T>
constexpr T euler_e = /* TODO: Implement */;

int main() {
    std::cout << std::fixed << std::setprecision(10);
    
    std::cout << "Pi as double: " << pi<double> << "\\n";
    std::cout << "Pi as float: " << pi<float> << "\\n";
    std::cout << "Pi as long double: " << pi<long double> << "\\n";
    
    std::cout << "e as double: " << euler_e<double> << "\\n";
    std::cout << "e as float: " << euler_e<float> << "\\n";
    
    return 0;
}`,
    expectedOutput: 'Pi as double: 3.1415926536\nPi as float: 3.1415927410\nPi as long double: 3.1415926536\ne as double: 2.7182818285\ne as float: 2.7182817459',
    hints: [
      'Use constexpr for compile-time constants',
      'Pi ≈ 3.1415926535897932385, e ≈ 2.7182818284590452354',
      'Template specialization uses template<> syntax',
      'Cast the value to the appropriate type: T(3.14159...)'
    ],
    feature: 'variable-templates',
    relatedTheory: 'variable-templates'
  },

  // C++17 Exercises
  {
    id: 'structured-bindings-advanced',
    title: 'Advanced Structured Bindings',
    standard: 'cpp17',
    difficulty: 'intermediate',
    description: 'Use structured bindings with custom structs and complex data structures.',
    starterCode: `#include <iostream>
#include <map>
#include <tuple>
#include <string>

struct Student {
    std::string name;
    int age;
    double gpa;
};

// Function that returns multiple values
std::tuple<int, int, double> analyze_grades(const std::vector<int>& grades) {
    // TODO: Calculate min, max, and average
    // Return as tuple
}

int main() {
    // TODO: Create a map of student ID to Student struct
    std::map<int, Student> students = {
        // Add at least 3 students
    };
    
    std::cout << "=== Student Information ===\\n";
    // TODO: Use structured bindings to iterate over the map
    // Print: "ID [id]: [name], Age: [age], GPA: [gpa]"
    
    std::cout << "\\n=== Grade Analysis ===\\n";
    std::vector<int> grades = {85, 92, 78, 96, 88, 91, 83};
    
    // TODO: Use structured bindings to get min, max, average from analyze_grades
    // Print the results
    
    return 0;
}`,
    expectedOutput: '=== Student Information ===\nID 1: Alice Johnson, Age: 20, GPA: 3.8\nID 2: Bob Smith, Age: 19, GPA: 3.6\nID 3: Carol Davis, Age: 21, GPA: 3.9\n\n=== Grade Analysis ===\nMin: 78, Max: 96, Average: 87.6',
    hints: [
      'Use auto [key, value] for map iteration',
      'For structs: auto [member1, member2, member3] = struct_instance',
      'std::minmax_element returns iterators to min and max',
      'Calculate average using std::accumulate or a loop'
    ],
    feature: 'structured-bindings',
    relatedTheory: 'structured-bindings'
  },
  {
    id: 'optional-error-handling',
    title: 'Robust Error Handling with Optional',
    standard: 'cpp17',
    difficulty: 'advanced',
    description: 'Create a chain of operations using std::optional for safe error handling.',
    starterCode: `#include <optional>
#include <iostream>
#include <string>
#include <vector>
#include <cmath>

// TODO: Implement safe_parse_int that returns std::optional<int>
// Return nullopt for invalid strings
std::optional<int> safe_parse_int(const std::string& str) {
    // TODO: Implement safe parsing
}

// TODO: Implement safe_sqrt that returns std::optional<double>
// Return nullopt for negative numbers
std::optional<double> safe_sqrt(int value) {
    // TODO: Implement safe square root
}

// TODO: Implement safe_divide that returns std::optional<double>
// Return nullopt for division by zero
std::optional<double> safe_divide(double a, double b) {
    // TODO: Implement safe division
}

// Chain operations: parse -> sqrt -> divide by 2
std::optional<double> process_input(const std::string& input) {
    // TODO: Chain the operations using optional
    // 1. Parse string to int
    // 2. Calculate square root
    // 3. Divide by 2
    // Return nullopt if any step fails
}

int main() {
    std::vector<std::string> test_inputs = {
        "16",    // Should work: sqrt(16)/2 = 2
        "25",    // Should work: sqrt(25)/2 = 2.5
        "-4",    // Should fail: negative sqrt
        "abc",   // Should fail: invalid parse
        "0"      // Should work: sqrt(0)/2 = 0
    };
    
    for (const auto& input : test_inputs) {
        auto result = process_input(input);
        
        std::cout << "Input: " << input << " -> ";
        if (result) {
            std::cout << "Result: " << *result << "\\n";
        } else {
            std::cout << "Failed\\n";
        }
    }
    
    return 0;
}`,
    expectedOutput: 'Input: 16 -> Result: 2\nInput: 25 -> Result: 2.5\nInput: -4 -> Failed\nInput: abc -> Failed\nInput: 0 -> Result: 0',
    hints: [
      'Use try-catch in safe_parse_int with std::stoi',
      'Check for negative values in safe_sqrt',
      'Check for zero denominator in safe_divide',
      'Chain operations: if (auto opt1 = func1()) { if (auto opt2 = func2(*opt1)) { ... } }',
      'Or use and_then if available in your compiler'
    ],
    feature: 'std-optional',
    relatedTheory: 'std-optional'
  },

  // C++20 Exercises
  {
    id: 'concepts-container',
    title: 'Container Concepts',
    standard: 'cpp20',
    difficulty: 'intermediate',
    description: 'Define and use concepts to constrain template functions for different container types.',
    starterCode: `#include <iostream>
#include <concepts>
#include <vector>
#include <list>
#include <string>
#include <type_traits>

// TODO: Define a concept for containers that have size() method
template<typename T>
concept Sizable = /* TODO: Implement */;

// TODO: Define a concept for containers with random access (operator[])
template<typename T>
concept RandomAccess = /* TODO: Implement */;

// TODO: Define a concept for numeric containers (elements are arithmetic)
template<typename T>
concept NumericContainer = /* TODO: Implement */;

// TODO: Implement print_container for any sizable container
template<Sizable Container>
void print_container(const Container& c) {
    // TODO: Print size and elements
}

// TODO: Implement get_middle_element for random access containers
template<RandomAccess Container>
auto get_middle_element(const Container& c) {
    // TODO: Return middle element using operator[]
}

// TODO: Implement calculate_sum for numeric containers
template<NumericContainer Container>
auto calculate_sum(const Container& c) {
    // TODO: Calculate and return sum of all elements
}

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7};
    std::list<double> lst = {1.1, 2.2, 3.3, 4.4};
    std::string str = "Hello";
    
    std::cout << "=== Container Analysis ===\\n";
    print_container(vec);
    print_container(lst);
    print_container(str);
    
    std::cout << "\\n=== Random Access ===\\n";
    std::cout << "Middle of vector: " << get_middle_element(vec) << "\\n";
    std::cout << "Middle of string: " << get_middle_element(str) << "\\n";
    
    std::cout << "\\n=== Numeric Operations ===\\n";
    std::cout << "Sum of vector: " << calculate_sum(vec) << "\\n";
    std::cout << "Sum of list: " << calculate_sum(lst) << "\\n";
    
    return 0;
}`,
    expectedOutput: '=== Container Analysis ===\nContainer size: 7\nContainer size: 4\nContainer size: 5\n\n=== Random Access ===\nMiddle of vector: 4\nMiddle of string: l\n\n=== Numeric Operations ===\nSum of vector: 28\nSum of list: 11',
    hints: [
      'Use requires expression: requires(T t) { t.size(); }',
      'Random access: requires(T t) { t[0]; }',
      'Numeric container: check both container requirements and std::is_arithmetic_v<typename T::value_type>',
      'Use range-based for loops for iteration',
      'Middle element: container[container.size() / 2]'
    ],
    feature: 'concepts',
    relatedTheory: 'concepts'
  },
  {
    id: 'ranges-data-processing',
    title: 'Advanced Data Processing Pipeline',
    standard: 'cpp20',
    difficulty: 'advanced',
    description: 'Create a complex data processing pipeline using ranges to analyze student data.',
    starterCode: `#include <iostream>
#include <ranges>
#include <vector>
#include <string>
#include <algorithm>

struct Student {
    std::string name;
    int age;
    double gpa;
    std::string major;
};

int main() {
    std::vector<Student> students = {
        {"Alice", 20, 3.8, "Computer Science"},
        {"Bob", 19, 3.2, "Mathematics"},
        {"Carol", 21, 3.9, "Computer Science"},
        {"David", 20, 2.8, "Physics"},
        {"Eve", 22, 3.7, "Mathematics"},
        {"Frank", 19, 3.1, "Computer Science"},
        {"Grace", 21, 3.6, "Physics"}
    };
    
    std::cout << "=== All Students ===\\n";
    for (const auto& s : students) {
        std::cout << s.name << " (" << s.age << ", GPA: " << s.gpa << ", " << s.major << ")\\n";
    }
    
    std::cout << "\\n=== High-Performing CS Students ===\\n";
    // TODO: Create a pipeline that:
    // 1. Filters students with GPA > 3.5
    // 2. Filters Computer Science majors
    // 3. Transforms to just names
    // 4. Prints each name
    
    std::cout << "\\n=== Top 3 Students by GPA ===\\n";
    // TODO: Create a pipeline that:
    // 1. Sorts students by GPA (descending)
    // 2. Takes first 3
    // 3. Prints name and GPA
    
    std::cout << "\\n=== Average Age by Major ===\\n";
    // TODO: For each unique major, calculate average age
    // Hint: You might need to group manually or use traditional algorithms
    
    return 0;
}`,
    expectedOutput: '=== All Students ===\nAlice (20, GPA: 3.8, Computer Science)\nBob (19, GPA: 3.2, Mathematics)\nCarol (21, GPA: 3.9, Computer Science)\nDavid (20, GPA: 2.8, Physics)\nEve (22, GPA: 3.7, Mathematics)\nFrank (19, GPA: 3.1, Computer Science)\nGrace (21, GPA: 3.6, Physics)\n\n=== High-Performing CS Students ===\nAlice\nCarol\n\n=== Top 3 Students by GPA ===\nCarol: 3.9\nAlice: 3.8\nEve: 3.7\n\n=== Average Age by Major ===\nComputer Science: 20\nMathematics: 20.5\nPhysics: 20.5',
    hints: [
      'Use std::views::filter for filtering conditions',
      'Chain multiple filters with | operator',
      'Use std::views::transform to extract specific fields',
      'For sorting, you might need to copy to a vector first',
      'std::ranges::sort can sort containers in-place',
      'For grouping, consider using std::map or manual iteration'
    ],
    feature: 'ranges',
    relatedTheory: 'ranges'
  },

  // C++23 Exercises
  {
    id: 'expected-file-processing',
    title: 'File Processing with Expected',
    standard: 'cpp23',
    difficulty: 'advanced',
    description: 'Implement a file processing system using std::expected for comprehensive error handling.',
    starterCode: `#include <expected>
#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <sstream>

enum class FileError {
    NotFound,
    PermissionDenied,
    ReadError,
    EmptyFile
};

enum class ParseError {
    InvalidFormat,
    InvalidNumber,
    MissingData
};

// TODO: Implement read_file_content
std::expected<std::string, FileError> read_file_content(const std::string& filename) {
    // Simulate different file scenarios based on filename
    if (filename == "missing.txt") {
        return std::unexpected(FileError::NotFound);
    }
    if (filename == "protected.txt") {
        return std::unexpected(FileError::PermissionDenied);
    }
    if (filename == "empty.txt") {
        return std::unexpected(FileError::EmptyFile);
    }
    if (filename == "corrupted.txt") {
        return std::unexpected(FileError::ReadError);
    }
    
    // Simulate successful read
    return "10,20,30,40,50";
}

// TODO: Implement parse_numbers
std::expected<std::vector<int>, ParseError> parse_numbers(const std::string& content) {
    // TODO: Parse comma-separated numbers
    // Return ParseError::InvalidFormat for malformed input
    // Return ParseError::InvalidNumber for non-numeric values
    // Return ParseError::MissingData for empty content
}

// TODO: Implement calculate_statistics
std::expected<std::tuple<double, int, int>, std::string> calculate_statistics(const std::vector<int>& numbers) {
    // TODO: Calculate average, min, max
    // Return error string if vector is empty
    // Return tuple of (average, min, max) on success
}

// TODO: Implement process_file - chain all operations
std::expected<std::string, std::string> process_file(const std::string& filename) {
    // TODO: Chain read_file_content -> parse_numbers -> calculate_statistics
    // Convert all errors to string for unified error handling
    // Return formatted result string on success
}

std::string error_to_string(FileError error) {
    switch (error) {
        case FileError::NotFound: return "File not found";
        case FileError::PermissionDenied: return "Permission denied";
        case FileError::ReadError: return "Read error";
        case FileError::EmptyFile: return "File is empty";
    }
    return "Unknown file error";
}

std::string error_to_string(ParseError error) {
    switch (error) {
        case ParseError::InvalidFormat: return "Invalid format";
        case ParseError::InvalidNumber: return "Invalid number";
        case ParseError::MissingData: return "Missing data";
    }
    return "Unknown parse error";
}

int main() {
    std::vector<std::string> test_files = {
        "data.txt",      // Success case
        "missing.txt",   // File not found
        "protected.txt", // Permission denied
        "empty.txt",     // Empty file
        "corrupted.txt"  // Read error
    };
    
    for (const auto& filename : test_files) {
        std::cout << "Processing " << filename << ":\\n";
        auto result = process_file(filename);
        
        if (result) {
            std::cout << "SUCCESS: " << *result << "\\n";
        } else {
            std::cout << "ERROR: " << result.error() << "\\n";
        }
        std::cout << "\\n";
    }
    
    return 0;
}`,
    expectedOutput: 'Processing data.txt:\nSUCCESS: Average: 30, Min: 10, Max: 50\n\nProcessing missing.txt:\nERROR: File not found\n\nProcessing protected.txt:\nERROR: Permission denied\n\nProcessing empty.txt:\nERROR: File is empty\n\nProcessing corrupted.txt:\nERROR: Read error',
    hints: [
      'Use std::stringstream for parsing comma-separated values',
      'Chain operations with and_then() or manual checking',
      'Convert different error types to strings for unified handling',
      'Use std::getline with comma delimiter for parsing',
      'Check for empty vectors before calculating statistics',
      'Use std::minmax_element for min/max calculation'
    ],
    feature: 'std-expected',
    relatedTheory: 'std-expected'
  },
  {
    id: 'ranges-to-advanced',
    title: 'Advanced Container Conversion',
    standard: 'cpp23',
    difficulty: 'advanced',
    description: 'Use std::ranges::to for complex data transformations and container conversions.',
    starterCode: `#include <iostream>
#include <ranges>
#include <vector>
#include <set>
#include <map>
#include <string>
#include <algorithm>

struct Product {
    std::string name;
    double price;
    std::string category;
    int stock;
};

int main() {
    std::vector<Product> inventory = {
        {"Laptop", 999.99, "Electronics", 5},
        {"Mouse", 29.99, "Electronics", 20},
        {"Desk", 199.99, "Furniture", 3},
        {"Chair", 149.99, "Furniture", 8},
        {"Phone", 699.99, "Electronics", 12},
        {"Table", 299.99, "Furniture", 2},
        {"Keyboard", 79.99, "Electronics", 15}
    };
    
    std::cout << "=== Original Inventory ===\\n";
    for (const auto& p : inventory) {
        std::cout << p.name << " ($" << p.price << ", " << p.category << ", Stock: " << p.stock << ")\\n";
    }
    
    std::cout << "\\n=== Expensive Electronics (>$50) ===\\n";
    // TODO: Create a pipeline that:
    // 1. Filters Electronics category
    // 2. Filters price > 50
    // 3. Transforms to product names
    // 4. Converts to std::set (for sorting)
    // 5. Prints each name
    
    std::cout << "\\n=== Low Stock Items (<=5) ===\\n";
    // TODO: Create a pipeline that:
    // 1. Filters stock <= 5
    // 2. Transforms to pairs of (name, stock)
    // 3. Converts to std::vector
    // 4. Prints name and stock count
    
    std::cout << "\\n=== Price Categories ===\\n";
    // TODO: Create a pipeline that:
    // 1. Transforms products to price ranges: "Budget" (<100), "Mid" (100-500), "Premium" (>500)
    // 2. Converts to std::set to get unique categories
    // 3. Prints each category
    
    std::cout << "\\n=== Category Summary ===\\n";
    // TODO: Group products by category and show count
    // Use ranges to transform and convert appropriately
    
    return 0;
}`,
    expectedOutput: '=== Original Inventory ===\nLaptop ($999.99, Electronics, Stock: 5)\nMouse ($29.99, Electronics, Stock: 20)\nDesk ($199.99, Furniture, Stock: 3)\nChair ($149.99, Furniture, Stock: 8)\nPhone ($699.99, Electronics, Stock: 12)\nTable ($299.99, Furniture, Stock: 2)\nKeyboard ($79.99, Electronics, Stock: 15)\n\n=== Expensive Electronics (>$50) ===\nKeyboard\nLaptop\nPhone\n\n=== Low Stock Items (<=5) ===\nLaptop: 5\nDesk: 3\nTable: 2\n\n=== Price Categories ===\nBudget\nMid\nPremium\n\n=== Category Summary ===\nElectronics: 4 items\nFurniture: 3 items',
    hints: [
      'Use std::views::filter for category and price filtering',
      'Use std::views::transform to extract names or create pairs',
      'std::ranges::to<std::set>() automatically sorts and removes duplicates',
      'For price categories, use conditional logic in transform',
      'For grouping, you might need std::map and traditional algorithms',
      'std::make_pair() can create pairs in transform operations'
    ],
    feature: 'ranges-to',
    relatedTheory: 'ranges-to'
  },

  // Advanced Performance Optimization Exercises
  {
    id: 'memory-layout-optimization-exercise',
    title: 'Cache-Friendly Data Structure Design',
    standard: 'performance',
    difficulty: 'advanced',
    description: 'Optimize a particle system by converting from Array of Structures to Structure of Arrays for better cache performance.',
    starterCode: `#include <iostream>
#include <vector>
#include <chrono>
#include <random>

// Current implementation: Array of Structures (AoS)
struct Particle {
    float x, y, z;        // Position
    float vx, vy, vz;     // Velocity
    float mass;
    int id;
};

// TODO: Implement Structure of Arrays (SoA) version
struct ParticleSystem {
    // TODO: Create separate vectors for each component
    // std::vector<float> positions_x, positions_y, positions_z;
    // std::vector<float> velocities_x, velocities_y, velocities_z;
    // std::vector<float> masses;
    // std::vector<int> ids;
    
    void resize(size_t count) {
        // TODO: Resize all vectors
    }
    
    void update_positions(float dt) {
        // TODO: Update positions using velocities
        // This should be cache-friendly by processing each component separately
    }
    
    float calculate_total_kinetic_energy() {
        // TODO: Calculate kinetic energy for all particles
        // KE = 0.5 * mass * (vx² + vy² + vz²)
        return 0.0f;
    }
};

// Benchmark function to compare performance
void benchmark_particle_systems() {
    const size_t num_particles = 100000;
    const float dt = 0.016f;  // 60 FPS
    
    // TODO: Create and initialize both AoS and SoA versions
    // TODO: Benchmark position updates for both approaches
    // TODO: Compare cache performance
    
    std::cout << "Benchmark results:\\n";
    std::cout << "AoS time: [implement benchmark]\\n";
    std::cout << "SoA time: [implement benchmark]\\n";
}

int main() {
    benchmark_particle_systems();
    return 0;
}`,
    expectedOutput: 'Benchmark results:\nAoS time: 1250 μs\nSoA time: 850 μs\nSoA speedup: 1.47x\nTotal kinetic energy (SoA): 2.5e+08',
    hints: [
      'Create separate std::vector for each particle component (x, y, z, vx, vy, vz, mass, id)',
      'In update_positions(), process all x coordinates first, then all y, then all z',
      'Use std::chrono::high_resolution_clock for benchmarking',
      'Initialize particles with random values using std::random_device',
      'SoA should show better cache performance due to spatial locality'
    ],
    feature: 'memory-layout-optimization',
    relatedTheory: 'memory-layout-optimization'
  },
  {
    id: 'lock-free-queue-exercise',
    title: 'Implement Lock-Free SPSC Queue',
    standard: 'performance',
    difficulty: 'advanced',
    description: 'Create a high-performance Single Producer Single Consumer (SPSC) lock-free queue using atomic operations.',
    starterCode: `#include <atomic>
#include <memory>
#include <iostream>
#include <thread>
#include <chrono>

template<typename T, size_t Size>
class SPSCQueue {
private:
    // TODO: Create a circular buffer using std::array
    // TODO: Use atomic head and tail pointers
    // std::array<T, Size> buffer_;
    // std::atomic<size_t> head_{0};
    // std::atomic<size_t> tail_{0};
    
    static constexpr size_t buffer_mask = Size - 1;
    static_assert((Size & buffer_mask) == 0, "Size must be power of 2");
    
public:
    // TODO: Implement enqueue (producer side)
    bool enqueue(const T& item) {
        // TODO: Check if queue is full
        // TODO: Store item and update tail atomically
        // Use memory_order_release for tail update
        return false;
    }
    
    // TODO: Implement dequeue (consumer side)
    bool dequeue(T& item) {
        // TODO: Check if queue is empty
        // TODO: Load item and update head atomically
        // Use memory_order_acquire for head load
        return false;
    }
    
    // TODO: Implement size calculation
    size_t size() const {
        // TODO: Calculate current queue size
        // Be careful with wrap-around
        return 0;
    }
    
    bool empty() const {
        // TODO: Check if queue is empty
        return true;
    }
    
    bool full() const {
        // TODO: Check if queue is full
        return false;
    }
};

// Test the queue with producer/consumer threads
void test_spsc_queue() {
    SPSCQueue<int, 1024> queue;
    const int num_items = 1000000;
    std::atomic<int> items_consumed{0};
    
    // TODO: Create producer thread that enqueues numbers 0 to num_items-1
    
    // TODO: Create consumer thread that dequeues and counts items
    
    // TODO: Measure throughput and verify correctness
    
    std::cout << "SPSC Queue Test Results:\\n";
    std::cout << "Items produced: " << num_items << "\\n";
    std::cout << "Items consumed: " << items_consumed.load() << "\\n";
    std::cout << "Test " << (items_consumed.load() == num_items ? "PASSED" : "FAILED") << "\\n";
}

int main() {
    test_spsc_queue();
    return 0;
}`,
    expectedOutput: 'SPSC Queue Test Results:\nItems produced: 1000000\nItems consumed: 1000000\nTest PASSED\nThroughput: 125.5 million ops/sec',
    hints: [
      'Use std::array<T, Size> for the circular buffer',
      'Head and tail should be std::atomic<size_t>',
      'For enqueue: check (tail + 1) & buffer_mask != head for full condition',
      'For dequeue: check head != tail for empty condition',
      'Use memory_order_acquire/release for proper synchronization',
      'Size must be power of 2 for efficient modulo using bitwise AND'
    ],
    feature: 'lock-free-programming',
    relatedTheory: 'lock-free-programming'
  },
  {
    id: 'simd-vectorization-exercise',
    title: 'SIMD-Optimized Financial Calculations',
    standard: 'performance',
    difficulty: 'advanced',
    description: 'Implement SIMD-optimized functions for calculating moving averages and volatility of financial data.',
    starterCode: `#include <immintrin.h>
#include <iostream>
#include <vector>
#include <chrono>
#include <random>
#include <cmath>

class FinancialSIMD {
public:
    // TODO: Implement SIMD-optimized moving average calculation
    static void moving_average_simd(const float* prices, float* averages, 
                                   size_t size, int window) {
        // TODO: Use AVX instructions to process 8 floats at once
        // TODO: Handle window calculation with SIMD horizontal sum
        // Hint: Use _mm256_load_ps, _mm256_add_ps, _mm256_store_ps
    }
    
    // TODO: Implement scalar version for comparison
    static void moving_average_scalar(const float* prices, float* averages,
                                     size_t size, int window) {
        // TODO: Traditional loop-based implementation
    }
    
    // TODO: Implement SIMD-optimized standard deviation calculation
    static void calculate_volatility_simd(const float* prices, float* volatility,
                                         size_t size, int window) {
        // TODO: Calculate rolling standard deviation using SIMD
        // 1. Calculate returns: (price[i+1] / price[i]) - 1
        // 2. Calculate rolling mean of returns
        // 3. Calculate rolling standard deviation
    }
    
    // TODO: Helper function for horizontal sum of AVX vector
    static float horizontal_sum(__m256 vec) {
        // TODO: Sum all 8 elements in the vector
        // Hint: Use _mm256_hadd_ps or extract and add manually
        return 0.0f;
    }
};

// Benchmark SIMD vs scalar performance
void benchmark_financial_simd() {
    const size_t size = 100000;
    const int window = 20;
    
    // TODO: Create aligned arrays for SIMD operations
    // Use alignas(32) or _mm_malloc for proper alignment
    
    // TODO: Initialize with realistic stock price data
    std::random_device rd;
    std::mt19937 gen(rd());
    std::normal_distribution<float> price_dist(100.0f, 5.0f);
    
    // TODO: Benchmark scalar moving average
    
    // TODO: Benchmark SIMD moving average
    
    // TODO: Verify results are approximately equal
    
    std::cout << "Financial SIMD Benchmark Results:\\n";
    std::cout << "Scalar moving average: [implement] μs\\n";
    std::cout << "SIMD moving average: [implement] μs\\n";
    std::cout << "SIMD speedup: [implement]x\\n";
}

int main() {
    // TODO: Check for AVX support
    std::cout << "SIMD Financial Calculations Demo\\n";
    std::cout << "Note: This demo assumes AVX support\\n\\n";
    
    benchmark_financial_simd();
    return 0;
}`,
    expectedOutput: 'Financial SIMD Benchmark Results:\nScalar moving average: 2150 μs\nSIMD moving average: 580 μs\nSIMD speedup: 3.71x\nResults verification: PASSED',
    hints: [
      'Use alignas(32) for proper AVX alignment',
      'Process 8 floats at once with _mm256_load_ps/_mm256_store_ps',
      'For moving average, accumulate sums using _mm256_add_ps',
      'Implement horizontal sum by extracting high/low 128-bit lanes',
      'Handle remaining elements with scalar code',
      'Use _mm256_div_ps for vectorized division by window size'
    ],
    feature: 'simd-vectorization',
    relatedTheory: 'simd-vectorization'
  },
  {
    id: 'branch-prediction-exercise',
    title: 'CPU Branch Prediction Optimization',
    standard: 'performance',
    difficulty: 'advanced',
    description: 'Optimize algorithms using branch prediction hints, memory access patterns, and CPU-friendly code structures.',
    starterCode: `#include <iostream>
#include <vector>
#include <chrono>
#include <random>
#include <algorithm>
#include <cstring>

// Branch prediction hints (compiler-specific)
#ifdef __GNUC__
    #define LIKELY(x)   __builtin_expect(!!(x), 1)
    #define UNLIKELY(x) __builtin_expect(!!(x), 0)
#else
    #define LIKELY(x)   (x)
    #define UNLIKELY(x) (x)
#endif

// TODO: Implement optimized binary search with branch prediction
template<typename T>
int optimized_binary_search(const std::vector<T>& data, const T& target) {
    // TODO: Use branch prediction hints to optimize the search
    // Hint: Most searches will continue (not find the target immediately)
    return -1; // TODO: Implement
}

// TODO: Implement cache-friendly matrix transpose
void cache_friendly_transpose(const float* input, float* output, size_t rows, size_t cols) {
    // TODO: Use blocking/tiling to improve cache performance
    // Standard approach would be: output[j*rows + i] = input[i*cols + j]
    // But this has poor cache locality for large matrices
}

// TODO: Implement branch-optimized data processing
class DataProcessor {
public:
    // TODO: Process array with branch prediction optimization
    static long long process_array(const std::vector<int>& data) {
        long long result = 0;
        
        for (const auto& value : data) {
            // TODO: Optimize these branches based on expected frequency
            // Most values are expected to be positive (common case)
            // Zero values are uncommon
            // Negative values are rare and should trigger error handling
            
            if (value > 0) {
                result += value * 2;
            } else if (value == 0) {
                result += 1;
            } else {
                // Rare case - negative values
                result -= value;
            }
        }
        
        return result;
    }
    
    // TODO: Implement memory prefetching for large data processing
    static void prefetch_optimized_sum(const std::vector<double>& data, double& result) {
        // TODO: Use memory prefetching to improve performance
        // Hint: __builtin_prefetch on GCC/Clang
        result = 0.0;
        // TODO: Implement with prefetching
    }
};

// TODO: Implement benchmark infrastructure
template<typename Func>
double benchmark_function(Func&& func, int iterations = 1000) {
    // TODO: Implement accurate benchmarking
    // Use high_resolution_clock and return average time in microseconds
    return 0.0;
}

// TODO: Create test data generator
std::vector<int> generate_test_data(size_t size, double positive_ratio = 0.8) {
    // TODO: Generate test data with specified positive ratio
    // This allows testing branch prediction with different data distributions
    std::vector<int> data;
    // TODO: Implement
    return data;
}

int main() {
    std::cout << "=== CPU Optimization Benchmark ===" << std::endl;
    
    // TODO: Test binary search optimization
    std::vector<int> sorted_data = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    int index = optimized_binary_search(sorted_data, 7);
    std::cout << "Found 7 at index: " << index << std::endl;
    
    // TODO: Test matrix transpose performance
    const size_t matrix_size = 512;
    std::vector<float> input_matrix(matrix_size * matrix_size);
    std::vector<float> output_matrix(matrix_size * matrix_size);
    
    // Initialize matrix
    for (size_t i = 0; i < input_matrix.size(); ++i) {
        input_matrix[i] = static_cast<float>(i);
    }
    
    // TODO: Benchmark matrix transpose
    auto transpose_time = benchmark_function([&]() {
        cache_friendly_transpose(input_matrix.data(), output_matrix.data(), 
                                matrix_size, matrix_size);
    }, 10);
    
    std::cout << "Matrix transpose time: " << transpose_time << " μs" << std::endl;
    
    // TODO: Test branch prediction optimization
    auto test_data_good = generate_test_data(100000, 0.9);  // 90% positive
    auto test_data_bad = generate_test_data(100000, 0.5);   // 50% positive (unpredictable)
    
    auto good_branch_time = benchmark_function([&]() {
        volatile auto result = DataProcessor::process_array(test_data_good);
    }, 100);
    
    auto bad_branch_time = benchmark_function([&]() {
        volatile auto result = DataProcessor::process_array(test_data_bad);
    }, 100);
    
    std::cout << "Predictable branches time: " << good_branch_time << " μs" << std::endl;
    std::cout << "Unpredictable branches time: " << bad_branch_time << " μs" << std::endl;
    std::cout << "Branch misprediction penalty: " << (bad_branch_time / good_branch_time) << "x" << std::endl;
    
    return 0;
}`,
    expectedOutput: 'Found 7 at index: 3\nMatrix transpose time: 1250 μs\nPredictable branches time: 850 μs\nUnpredictable branches time: 1420 μs\nBranch misprediction penalty: 1.67x',
    hints: [
      'Use LIKELY/UNLIKELY macros around branch conditions based on expected frequency',
      'For binary search, the "not found yet" condition is most common',
      'Matrix transpose: use blocking with cache-line sized blocks (64 bytes = 16 floats)',
      'Memory prefetching: __builtin_prefetch(ptr, 0, 3) for read-ahead',
      'Generate test data with std::random_device and control positive/negative ratio',
      'Use std::chrono::high_resolution_clock for accurate benchmarking'
    ],
    feature: 'branch-prediction-optimization',
    relatedTheory: 'branch-prediction-optimization'
  },

  {
    id: 'zero-cost-abstractions-exercise',
    title: 'High-Performance Trading System',
    standard: 'performance',
    difficulty: 'advanced',
    description: 'Design a zero-cost abstraction trading system with strong types, compile-time polymorphism, and optimal performance.',
    starterCode: `#include <iostream>
#include <chrono>
#include <concepts>
#include <type_traits>

// === STRONG TYPE SYSTEM ===

// TODO: Create strong type wrapper
template<typename T, typename Tag>
class StrongType {
    // TODO: Implement zero-cost wrapper with type safety
    // Should support arithmetic operations when T supports them
};

// TODO: Define financial strong types
struct PriceTag {};
struct QuantityTag {};
struct OrderIdTag {};

// TODO: Create type aliases
// using Price = StrongType<double, PriceTag>;
// using Quantity = StrongType<int64_t, QuantityTag>;
// using OrderId = StrongType<uint64_t, OrderIdTag>;

// === TRADING STRATEGIES (COMPILE-TIME POLYMORPHISM) ===

// TODO: Define strategy concept
template<typename T>
concept TradingStrategy = requires(T strategy, Price price, Quantity qty) {
    { strategy.calculate_order_value(price, qty) } -> std::convertible_to<double>;
    { strategy.assess_risk(price, qty) } -> std::convertible_to<double>;
    { strategy.get_strategy_name() } -> std::convertible_to<std::string>;
};

// TODO: Implement different trading strategies
struct MarketMakerStrategy {
    // TODO: Implement market making logic
    // Typically provides liquidity with bid-ask spread
};

struct MomentumStrategy {
    // TODO: Implement momentum trading logic
    // Follows price trends with higher risk/reward
};

struct ArbitrageStrategy {
    // TODO: Implement arbitrage logic
    // Exploits price differences with minimal risk
};

// === ZERO-COST TRADING ENGINE ===

template<TradingStrategy Strategy>
class TradingEngine {
private:
    Strategy strategy_;
    uint64_t next_order_id_ = 1;
    
public:
    // TODO: Implement constructor
    explicit TradingEngine(Strategy strategy) : strategy_(strategy) {}
    
    // TODO: Implement order execution (should inline completely)
    auto execute_order(Price price, Quantity quantity) {
        // TODO: Calculate order value using strategy
        // TODO: Assess risk
        // TODO: Return order result
    }
    
    // TODO: Implement batch order processing
    template<typename Container>
    auto process_orders(const Container& orders) {
        // TODO: Process multiple orders efficiently
        // Should leverage zero-cost abstractions
    }
    
    // TODO: Get strategy information
    std::string get_strategy_info() const {
        return strategy_.get_strategy_name();
    }
};

// === ORDER BOOK (CRTP FOR ZERO-COST INHERITANCE) ===

template<typename Derived>
class OrderBookBase {
public:
    // TODO: Implement CRTP pattern for zero-cost polymorphism
    void add_order(Price price, Quantity quantity, bool is_buy) {
        static_cast<Derived*>(this)->add_order_impl(price, quantity, is_buy);
    }
    
    Price get_best_bid() const {
        return static_cast<const Derived*>(this)->get_best_bid_impl();
    }
    
    Price get_best_ask() const {
        return static_cast<const Derived*>(this)->get_best_ask_impl();
    }
    
    // TODO: Template method with zero virtual call overhead
    double calculate_spread() const {
        // TODO: Calculate bid-ask spread
    }
};

// TODO: Implement concrete order book
class FastOrderBook : public OrderBookBase<FastOrderBook> {
    // TODO: Implement fast order book operations
    // Should be optimized for low latency
};

// === PERFORMANCE BENCHMARKING ===

void benchmark_trading_system() {
    const int num_orders = 1000000;
    
    std::cout << "=== Trading System Benchmark ===" << std::endl;
    
    // TODO: Create different trading engines
    // TradingEngine market_maker{MarketMakerStrategy{}};
    // TradingEngine momentum{MomentumStrategy{}};
    // TradingEngine arbitrage{ArbitrageStrategy{}};
    
    // TODO: Benchmark order processing
    // Should show zero overhead from abstractions
    
    // TODO: Compare with raw calculations to prove zero cost
    
    std::cout << "Orders processed: " << num_orders << std::endl;
    std::cout << "Market Maker time: [implement] μs" << std::endl;
    std::cout << "Momentum time: [implement] μs" << std::endl;
    std::cout << "Arbitrage time: [implement] μs" << std::endl;
    std::cout << "Raw calculation time: [implement] μs" << std::endl;
    std::cout << "Abstraction overhead: [should be ~0%]" << std::endl;
}

int main() {
    std::cout << "=== Zero-Cost Trading System Demo ===" << std::endl << std::endl;
    
    // TODO: Demonstrate type safety
    // Price price{100.50};
    // Quantity qty{1000};
    // This should prevent: Price + Quantity (type error)
    
    // TODO: Demonstrate strategy polymorphism
    
    // TODO: Run performance benchmark
    benchmark_trading_system();
    
    return 0;
}`,
    expectedOutput: 'Orders processed: 1000000\nMarket Maker time: 1250 μs\nMomentum time: 1180 μs\nArbitrage time: 1320 μs\nRaw calculation time: 1200 μs\nAbstraction overhead: 2.1%\nType safety: ENFORCED\nStrategy dispatch: ZERO-COST',
    hints: [
      'StrongType should store T value_ and provide get() method',
      'Use explicit constructors to prevent implicit conversions',
      'CRTP eliminates virtual function overhead',
      'Strategy pattern with templates enables compile-time dispatch',
      'All abstractions should compile to same assembly as raw code',
      'Use concepts to constrain template parameters',
      'Benchmark with -O3 optimization to see zero-cost benefits'
    ],
    feature: 'zero-cost-abstractions',
    relatedTheory: 'zero-cost-abstractions'
  },

  // === TEMPLATE METAPROGRAMMING EXERCISES ===
  {
    id: 'template-basics-exercise',
    title: 'Generic Container with Specialization',
    standard: 'templates',
    difficulty: 'intermediate',
    description: 'Create a generic container template with specializations and demonstrate template argument deduction.',
    starterCode: `#include <iostream>
#include <vector>
#include <memory>
#include <type_traits>

// TODO: Create a generic Stack template
template<typename T, size_t N = 100>
class Stack {
    // TODO: Implement stack with fixed capacity N
    // Should have push, pop, top, empty, size methods
};

// TODO: Create specialization for bool (bit-packed storage)
template<size_t N>
class Stack<bool, N> {
    // TODO: Implement space-efficient bool stack
    // Use bit manipulation for storage
};

// TODO: Create specialization for pointers (with null checking)
template<typename T, size_t N>
class Stack<T*, N> {
    // TODO: Implement pointer stack with automatic null checking
};

// TODO: Function template with type deduction
template<typename T>
auto make_stack(std::initializer_list<T> init) {
    // TODO: Create and return appropriate stack type
    // Deduce size from initializer list
}

// TODO: Variadic template function to create stack from arguments
template<typename... Args>
auto make_stack_from_args(Args&&... args) {
    // TODO: Create stack and push all arguments
    // Use perfect forwarding
}

// TODO: Template alias for common stack types
template<typename T>
using SmallStack = Stack<T, 10>;

template<typename T>
using LargeStack = Stack<T, 1000>;

// TODO: Concept to check if type is stackable
template<typename T>
concept Stackable = std::is_copy_constructible_v<T> && std::is_destructible_v<T>;

// TODO: Function template with concept constraint
template<Stackable T>
void print_stack_info(const Stack<T>& stack) {
    // TODO: Print stack information
}

int main() {
    std::cout << "=== Generic Stack Template Demo ===" << std::endl;
    
    // TODO: Test basic stack operations
    Stack<int, 5> int_stack;
    // TODO: Push some values and test operations
    
    // TODO: Test bool specialization
    Stack<bool, 8> bool_stack;
    // TODO: Test bit-packed storage
    
    // TODO: Test pointer specialization
    Stack<int*, 5> ptr_stack;
    int value = 42;
    // TODO: Test null checking
    
    // TODO: Test type deduction
    auto deduced_stack = make_stack({1, 2, 3, 4, 5});
    
    // TODO: Test variadic template
    auto variadic_stack = make_stack_from_args(10, 20, 30);
    
    // TODO: Test template aliases
    SmallStack<std::string> small_string_stack;
    
    std::cout << "All stack operations completed successfully!" << std::endl;
    
    return 0;
}
    expectedOutput: 'Generic Stack Template Demo\nInt stack size: 3\nBool stack uses 1 bytes for 8 bools\nPointer stack prevents null pointers\nDeduced stack type: Stack<int, 5>\nVariadic stack size: 3\nAll stack operations completed successfully!',
    hints: [
      'Use std::array or C-array for fixed-size storage',
      'Bool specialization: use std::bitset or manual bit manipulation',
      'Pointer specialization: check for nullptr in push()',
      'Type deduction: use decltype and auto return type',
      'Perfect forwarding: std::forward<Args>(args)...',
      'Template aliases are just type synonyms',
      'Concepts provide compile-time type checking'
    ],
    feature: 'template-basics',
    relatedTheory: 'template-basics'
  },

  {
    id: 'sfinae-concepts-exercise',
    title: 'Type Detection and Concept Constraints',
    standard: 'templates',
    difficulty: 'advanced',
    description: 'Implement SFINAE-based type detection and convert to modern concepts for cleaner template constraints.',
    starterCode: \`#include <iostream>
#include <type_traits>
#include <concepts>
#include <vector>
#include <string>
#include <iterator>

// === SFINAE TYPE DETECTION ===

// TODO: Implement has_begin detection using SFINAE
template<typename T>
struct has_begin {
    // TODO: Use SFINAE to detect if T has begin() method
    // Hint: Use decltype and std::declval
    static constexpr bool value = false; // TODO: Implement
};

// TODO: Implement has_size detection
template<typename T>
struct has_size {
    // TODO: Detect if T has size() method returning size_t-convertible type
    static constexpr bool value = false; // TODO: Implement
};

// TODO: Implement is_iterable detection (has begin and end)
template<typename T>
struct is_iterable {
    // TODO: Combine begin/end detection
    static constexpr bool value = false; // TODO: Implement
};

// TODO: SFINAE-based function overloading
template<typename T>
auto print_container_sfinae(const T& container) 
    -> std::enable_if_t<has_size<T>::value && is_iterable<T>::value> {
    // TODO: Print container with size information
}

template<typename T>
auto print_container_sfinae(const T& item)
    -> std::enable_if_t<!has_size<T>::value || !is_iterable<T>::value> {
    // TODO: Print single item
}

// === MODERN CONCEPTS (C++20) ===

// TODO: Define basic concepts
template<typename T>
concept HasBegin = requires(T t) {
    // TODO: Require begin() method
};

template<typename T>
concept HasSize = requires(T t) {
    // TODO: Require size() method returning size_t-convertible
};

template<typename T>
concept Iterable = requires(T t) {
    // TODO: Require both begin() and end()
};

template<typename T>
concept Container = HasSize<T> && Iterable<T>;

// TODO: More advanced concepts
template<typename T>
concept RandomAccessContainer = Container<T> && requires(T t, size_t i) {
    // TODO: Require operator[] for random access
};

template<typename T>
concept Printable = requires(T t) {
    // TODO: Require that T can be printed to std::cout
};

// TODO: Concept composition
template<typename T>
concept PrintableContainer = Container<T> && Printable<T>;

// === CONCEPT-CONSTRAINED FUNCTIONS ===

// TODO: Function using concepts
template<Container T>
void print_container_modern(const T& container) {
    // TODO: Print container using modern concepts
}

template<Printable T>
requires (!Container<T>)
void print_container_modern(const T& item) {
    // TODO: Print single item
}

// TODO: Advanced concept usage
template<RandomAccessContainer T>
auto get_middle_element(const T& container) {
    // TODO: Return middle element using operator[]
}

template<Container T>
requires (!RandomAccessContainer<T>)
auto get_middle_element(const T& container) {
    // TODO: Return middle element using iterators (slower)
}

// === CONCEPT-BASED ALGORITHMS ===

// TODO: Generic algorithm with concept constraints
template<Container T, typename Predicate>
requires std::predicate<Predicate, typename T::value_type>
size_t count_if_modern(const T& container, Predicate pred) {
    // TODO: Count elements satisfying predicate
    return 0; // TODO: Implement
}

// TODO: Type-safe numeric operations
template<typename T>
concept Numeric = std::is_arithmetic_v<T>;

template<Container T>
requires Numeric<typename T::value_type>
auto sum_container(const T& container) {
    // TODO: Sum all elements in container
}

// === TEST FRAMEWORK ===

void test_sfinae_detection() {
    std::cout << "=== SFINAE Type Detection ===" << std::endl;
    
    // TODO: Test type detection
    std::cout << "vector<int> has_begin: " << has_begin<std::vector<int>>::value << std::endl;
    std::cout << "vector<int> has_size: " << has_size<std::vector<int>>::value << std::endl;
    std::cout << "int has_begin: " << has_begin<int>::value << std::endl;
    
    // TODO: Test SFINAE function overloading
    std::vector<int> vec = {1, 2, 3, 4, 5};
    std::string str = "hello";
    int number = 42;
    
    print_container_sfinae(vec);
    print_container_sfinae(str);
    print_container_sfinae(number);
}

void test_modern_concepts() {
    std::cout << "\\n=== Modern Concepts ===" << std::endl;
    
    // TODO: Test concept constraints
    std::vector<int> vec = {1, 2, 3, 4, 5};
    std::string str = "hello";
    
    print_container_modern(vec);
    print_container_modern(str);
    
    // TODO: Test advanced concepts
    auto middle_vec = get_middle_element(vec);
    std::cout << "Middle element: " << middle_vec << std::endl;
    
    // TODO: Test concept-based algorithms
    auto count = count_if_modern(vec, [](int x) { return x > 2; });
    std::cout << "Elements > 2: " << count << std::endl;
    
    auto sum = sum_container(vec);
    std::cout << "Sum: " << sum << std::endl;
}

int main() {
    test_sfinae_detection();
    test_modern_concepts();
    
    return 0;
}`,
    expectedOutput: 'SFINAE Type Detection\nvector<int> has_begin: 1\nvector<int> has_size: 1\nint has_begin: 0\nContainer: [1, 2, 3, 4, 5] (size: 5)\nContainer: hello (size: 5)\nSingle item: 42\n\nModern Concepts\nContainer: [1, 2, 3, 4, 5] (size: 5)\nContainer: hello (size: 5)\nMiddle element: 3\nElements > 2: 3\nSum: 15',
    hints: [
      'SFINAE detection: use decltype(std::declval<T>().begin()) in private helper',
      'Use std::true_type and std::false_type for SFINAE return types',
      'Concepts use requires expressions: requires(T t) { t.begin(); }',
      'Combine concepts with && and || operators',
      'Use typename T::value_type to access container element type',
      'std::predicate concept checks if callable returns bool-convertible',
      'Enable_if goes in return type or template parameter'
    ],
    feature: 'sfinae-concepts',
    relatedTheory: 'sfinae-concepts'
  },

  {
    id: 'variadic-templates-exercise',
    title: 'Advanced Variadic Template System',
    standard: 'templates',
    difficulty: 'advanced',
    description: 'Build a comprehensive logging and serialization system using variadic templates and perfect forwarding.',
    starterCode: `#include <iostream>
#include <sstream>
#include <fstream>
#include <memory>
#include <utility>
#include <type_traits>
#include <tuple>
#include <string>

// === VARIADIC LOGGING SYSTEM ===

enum class LogLevel {
    DEBUG, INFO, WARNING, ERROR
};

// TODO: Implement variadic logger
class Logger {
private:
    LogLevel min_level_ = LogLevel::INFO;
    std::ostream* output_ = &std::cout;
    
    // TODO: Helper to convert log level to string
    const char* level_to_string(LogLevel level) {
        // TODO: Implement level conversion
        return "UNKNOWN";
    }
    
public:
    Logger(LogLevel min_level = LogLevel::INFO, std::ostream* output = &std::cout)
        : min_level_(min_level), output_(output) {}
    
    // TODO: Variadic template log function
    template<typename... Args>
    void log(LogLevel level, Args&&... args) {
        // TODO: Check if level is enabled
        // TODO: Format and output message with perfect forwarding
    }
    
    // TODO: Convenience functions for different log levels
    template<typename... Args>
    void debug(Args&&... args) {
        // TODO: Log at DEBUG level
    }
    
    template<typename... Args>
    void info(Args&&... args) {
        // TODO: Log at INFO level
    }
    
    template<typename... Args>
    void warning(Args&&... args) {
        // TODO: Log at WARNING level
    }
    
    template<typename... Args>
    void error(Args&&... args) {
        // TODO: Log at ERROR level
    }
    
private:
    // TODO: Helper function to format arguments
    template<typename T>
    void format_arg(std::ostream& os, T&& arg) {
        // TODO: Format single argument
    }
    
    template<typename T, typename... Args>
    void format_args(std::ostream& os, T&& first, Args&&... rest) {
        // TODO: Format all arguments recursively
    }
};

// === VARIADIC FACTORY SYSTEM ===

// TODO: Generic factory with perfect forwarding
template<typename T, typename... Args>
std::unique_ptr<T> make_unique_advanced(Args&&... args) {
    // TODO: Create unique_ptr with perfect forwarding
    // Handle both direct construction and aggregate initialization
}

// TODO: Variadic tuple factory
template<typename... Args>
auto make_tuple_advanced(Args&&... args) {
    // TODO: Create tuple with perfect forwarding
}

// === VARIADIC SERIALIZATION ===

// TODO: Serialization trait
template<typename T>
struct is_serializable : std::false_type {};

// TODO: Specialize for basic types
template<>
struct is_serializable<int> : std::true_type {};

template<>
struct is_serializable<double> : std::true_type {};

template<>
struct is_serializable<std::string> : std::true_type {};

// TODO: Variadic serializer
class Serializer {
private:
    std::ostringstream buffer_;
    
public:
    // TODO: Serialize single value
    template<typename T>
    void serialize_one(const T& value) {
        static_assert(is_serializable<T>::value, "Type is not serializable");
        // TODO: Implement serialization
    }
    
    // TODO: Variadic serialize function
    template<typename... Args>
    void serialize(const Args&... args) {
        // TODO: Serialize all arguments
        // Use fold expression or recursion
    }
    
    std::string get_result() const {
        return buffer_.str();
    }
    
    void clear() {
        buffer_.str("");
        buffer_.clear();
    }
};

// === VARIADIC FUNCTION COMPOSITION ===

// TODO: Function composition with variadic templates
template<typename F>
auto compose(F&& f) {
    // TODO: Base case - single function
}

template<typename F, typename... Fs>
auto compose(F&& f, Fs&&... fs) {
    // TODO: Compose multiple functions
    // Return lambda that applies functions in sequence
}

// === TYPE LIST OPERATIONS ===

// TODO: Variadic type list
template<typename... Types>
struct TypeList {
    static constexpr size_t size = sizeof...(Types);
};

// TODO: Type list operations
template<typename List>
struct TypeListSize;

template<typename... Types>
struct TypeListSize<TypeList<Types...>> {
    static constexpr size_t value = sizeof...(Types);
};

// TODO: Get type at index
template<size_t Index, typename List>
struct TypeAt;

template<size_t Index, typename Head, typename... Tail>
struct TypeAt<Index, TypeList<Head, Tail...>> {
    using type = typename TypeAt<Index - 1, TypeList<Tail...>>::type;
};

template<typename Head, typename... Tail>
struct TypeAt<0, TypeList<Head, Tail...>> {
    using type = Head;
};

// === TEST CLASSES ===

struct Point {
    double x, y;
    Point(double x, double y) : x(x), y(y) {}
};

struct Person {
    std::string name;
    int age;
    Person(std::string n, int a) : name(std::move(n)), age(a) {}
};

// === TEST FUNCTIONS ===

int add_one(int x) { return x + 1; }
int multiply_two(int x) { return x * 2; }
int square(int x) { return x * x; }

int main() {
    std::cout << "=== Variadic Template System Demo ===" << std::endl;
    
    // TODO: Test logging system
    Logger logger(LogLevel::DEBUG);
    logger.info("Application started with", 3, "parameters");
    logger.warning("Memory usage:", 85.5, "%");
    logger.error("Failed to connect to", "database", "after", 5, "attempts");
    
    // TODO: Test factory system
    auto point = make_unique_advanced<Point>(3.14, 2.71);
    auto person = make_unique_advanced<Person>("Alice", 30);
    
    std::cout << "\\nCreated point: (" << point->x << ", " << point->y << ")" << std::endl;
    std::cout << "Created person: " << person->name << ", age " << person->age << std::endl;
    
    // TODO: Test tuple factory
    auto tuple_data = make_tuple_advanced(42, "hello", 3.14, true);
    std::cout << "Tuple size: " << std::tuple_size_v<decltype(tuple_data)> << std::endl;
    
    // TODO: Test serialization
    Serializer serializer;
    serializer.serialize(42, 3.14, std::string("hello"), 100);
    std::cout << "Serialized: " << serializer.get_result() << std::endl;
    
    // TODO: Test function composition
    auto composed = compose(add_one, multiply_two, square);
    int result = composed(3);  // ((3+1)*2)^2 = 64
    std::cout << "Composed function result: " << result << std::endl;
    
    // TODO: Test type list
    using MyTypes = TypeList<int, double, std::string, bool>;
    std::cout << "Type list size: " << TypeListSize<MyTypes>::value << std::endl;
    
    return 0;
}`,
    expectedOutput: '[INFO] Application started with 3 parameters\n[WARNING] Memory usage: 85.5 %\n[ERROR] Failed to connect to database after 5 attempts\n\nCreated point: (3.14, 2.71)\nCreated person: Alice, age 30\nTuple size: 4\nSerialized: 42|3.14|hello|100|\nComposed function result: 64\nType list size: 4',
    hints: [
      'Use fold expressions: (format_arg(os, args), ...) for C++17',
      'Perfect forwarding: std::forward<Args>(args)...',
      'Recursive variadic: process first arg, then recurse with rest',
      'Factory: return std::make_unique<T>(std::forward<Args>(args)...)',
      'Function composition: return [=](auto x) { return f(fs...(x)); }',
      'Serialization: use operator<< and separate with delimiters',
      'Type list indexing: use template recursion with specialization'
    ],
    feature: 'variadic-templates',
    relatedTheory: 'variadic-templates'
  },

  // === C++20 MODULES EXERCISES ===
  {
    id: 'modules-basic-exercise',
    title: 'Basic Module Creation and Usage',
    standard: 'cpp20',
    difficulty: 'beginner',
    description: 'Create a simple module with exported functions and use it in a main program.',
    starterCode: `// File: math_operations.cppm (Module Interface)
export module math_operations;

import <iostream>;

// TODO: Export a function called 'add' that takes two integers and returns their sum

// TODO: Export a function called 'multiply' that takes two doubles and returns their product

// TODO: Export a class called 'Calculator' with methods for basic arithmetic
// Include: add(double, double), subtract(double, double), multiply(double, double), divide(double, double)

// TODO: Create a non-exported helper function called 'validate_input' that checks if a number is finite

// File: main.cpp (Module User)
import math_operations;
import <iostream>;

int main() {
    // TODO: Use the exported add function
    std::cout << "5 + 3 = " << /* TODO: call add function */ << std::endl;
    
    // TODO: Use the exported multiply function  
    std::cout << "2.5 * 4.0 = " << /* TODO: call multiply function */ << std::endl;
    
    // TODO: Create a Calculator instance and perform operations
    // Calculator calc;
    // std::cout << "Calculator: 10 + 5 = " << calc.add(10, 5) << std::endl;
    // std::cout << "Calculator: 15 - 3 = " << calc.subtract(15, 3) << std::endl;
    // std::cout << "Calculator: 4 * 7 = " << calc.multiply(4, 7) << std::endl;
    // std::cout << "Calculator: 20 / 4 = " << calc.divide(20, 4) << std::endl;
    
    return 0;
}`,
    expectedOutput: '5 + 3 = 8\n2.5 * 4.0 = 10\nCalculator: 10 + 5 = 15\nCalculator: 15 - 3 = 12\nCalculator: 4 * 7 = 28\nCalculator: 20 / 4 = 5',
    hints: [
      'Use "export" keyword before functions/classes you want to make available',
      'Module interface file typically has .cppm extension', 
      'Import standard library modules with import <header>',
      'Functions without export keyword are internal to the module',
      'Calculator class should validate division by zero',
      'Use the validate_input helper for input checking'
    ],
    feature: 'modules',
    relatedTheory: 'modules'
  },
  
  {
    id: 'modules-advanced-exercise',
    title: 'Module Partitions and Complex Exports',
    standard: 'cpp20', 
    difficulty: 'advanced',
    description: 'Create a graphics module with partitions for shapes, colors, and rendering, then use them together.',
    starterCode: `// File: graphics.cppm (Main module interface)
export module graphics;

// TODO: Export import partitions for shapes, colors, and rendering
// export import :shapes;
// export import :colors; 
// export import :rendering;

// TODO: Export a Scene class that uses components from all partitions

// File: graphics-shapes.cppm (Shapes partition)
export module graphics:shapes;

import <memory>;
import <vector>;

// TODO: Export Point class with x, y coordinates
// TODO: Export abstract Shape base class with virtual area() and draw() methods
// TODO: Export Circle class inheriting from Shape
// TODO: Export Rectangle class inheriting from Shape
// TODO: Export a ShapeFactory class with static methods to create shapes

// File: graphics-colors.cppm (Colors partition) 
export module graphics:colors;

// TODO: Export Color class with RGB values
// TODO: Export predefined color constants (RED, GREEN, BLUE, WHITE, BLACK)
// TODO: Export ColorPalette class to manage color schemes

// File: graphics-rendering.cppm (Rendering partition)
export module graphics:rendering;

import :shapes;
import :colors;
import <vector>;

// TODO: Export Renderer class that can render shapes with colors
// TODO: Export RenderTarget class for different output targets

// File: main.cpp (Using the complete graphics module)
import graphics;
import <iostream>;

int main() {
    // TODO: Create a Scene with various shapes and colors
    // TODO: Add circles and rectangles with different colors
    // TODO: Render the complete scene
    // TODO: Display total area of all shapes
    
    std::cout << "Graphics module demo completed!" << std::endl;
    return 0;
}`,
    expectedOutput: 'Created scene with 3 shapes\nRendering circle at (10, 20) with color RGB(255, 0, 0)\nRendering rectangle at (0, 0) with color RGB(0, 255, 0)\nRendering circle at (30, 40) with color RGB(0, 0, 255)\nTotal scene area: 628.32\nGraphics module demo completed!',
    hints: [
      'Module partitions use "module name:partition" syntax',
      'Export import partitions in the main module interface',
      'Partitions can import other partitions with "import :partition"',
      'Scene should manage a collection of shape-color pairs',
      'Use std::unique_ptr for shape polymorphism',
      'ShapeFactory can use make_unique for type-safe creation',
      'Color class should support RGB values and comparison'
    ],
    feature: 'modules', 
    relatedTheory: 'modules'
  },

  // === C++20 COROUTINES EXERCISES ===
  {
    id: 'coroutines-generator-exercise',
    title: 'Create a Fibonacci Generator',
    standard: 'cpp20',
    difficulty: 'intermediate', 
    description: 'Implement a coroutine-based Fibonacci generator that can produce infinite Fibonacci numbers lazily.',
    starterCode: `#include <coroutine>
#include <iostream>

// TODO: Define a Generator class template
// It should have:
// - promise_type with get_return_object(), initial_suspend(), final_suspend(), yield_value()
// - Iterator support for range-based loops
// - RAII destructor that calls destroy() on the coroutine handle

template<typename T>
class Generator {
    // TODO: Implement promise_type
    
    // TODO: Implement iterator for range-based for loops
    
public:
    // TODO: Constructor taking coroutine_handle
    
    // TODO: Destructor
    
    // TODO: Move semantics (delete copy, implement move)
    
    // TODO: begin() and end() methods for iteration
};

// TODO: Implement fibonacci() coroutine that yields Fibonacci numbers
// Generator<long long> fibonacci() {
//     long long a = 0, b = 1;
//     while (true) {
//         co_yield a;
//         auto next = a + b;
//         a = b;
//         b = next;
//     }
// }

// TODO: Implement prime_numbers() coroutine that yields prime numbers
// Generator<int> prime_numbers() {
//     auto is_prime = [](int n) {
//         if (n < 2) return false;
//         for (int i = 2; i * i <= n; ++i) {
//             if (n % i == 0) return false;
//         }
//         return true;
//     };
//     
//     for (int n = 2; ; ++n) {
//         if (is_prime(n)) {
//             co_yield n;
//         }
//     }
// }

int main() {
    std::cout << "First 10 Fibonacci numbers: ";
    auto fib = fibonacci();
    int count = 0;
    for (auto value : fib) {
        std::cout << value << " ";
        if (++count >= 10) break;
    }
    std::cout << std::endl;
    
    std::cout << "First 10 prime numbers: ";  
    auto primes = prime_numbers();
    count = 0;
    for (auto value : primes) {
        std::cout << value << " ";
        if (++count >= 10) break;
    }
    std::cout << std::endl;
    
    return 0;
}`,
    expectedOutput: 'First 10 Fibonacci numbers: 0 1 1 2 3 5 8 13 21 34 \nFirst 10 prime numbers: 2 3 5 7 11 13 17 19 23 29 ',
    hints: [
      'promise_type needs get_return_object(), initial_suspend(), final_suspend(), unhandled_exception()',
      'yield_value() should store the value and return suspend_always{}',
      'initial_suspend() typically returns suspend_always{} for generators',
      'final_suspend() should return suspend_always{} for cleanup safety',
      'Iterator needs operator*(), operator++(), and operator!=',
      'Use coroutine_handle<promise_type> to manage the coroutine state',
      'Remember to call destroy() in the destructor if handle is valid'
    ],
    feature: 'coroutines',
    relatedTheory: 'coroutines'
  },

  {
    id: 'coroutines-async-task-exercise', 
    title: 'Async Task Processing Pipeline',
    standard: 'cpp20',
    difficulty: 'advanced',
    description: 'Create an async task system with co_await for processing data through multiple stages.',
    starterCode: `#include <coroutine>
#include <iostream>
#include <thread>
#include <chrono>
#include <string>
#include <vector>

// TODO: Implement Task<T> coroutine type for async operations
// Should support:
// - promise_type with appropriate suspend/resume behavior
// - get() method to retrieve result (blocking if not ready)
// - is_ready() method to check completion status

template<typename T>
class Task {
    // TODO: Implement promise_type
    
    // TODO: Implement Task management
};

// TODO: Implement AsyncProcessor class with the following async methods:
// - Task<std::string> fetch_data(int id) - simulates fetching data
// - Task<std::string> transform_data(const std::string& data) - transforms the data  
// - Task<bool> save_data(const std::string& data) - saves processed data

class AsyncProcessor {
public:
    // TODO: Async method to fetch data (simulate 100ms delay)
    // Task<std::string> fetch_data(int id) {
    //     co_await std::suspend_for(100ms); // Simulate network delay
    //     co_return "Data_" + std::to_string(id);
    // }
    
    // TODO: Async method to transform data (simulate 50ms processing)
    // Task<std::string> transform_data(const std::string& data) {
    //     co_await std::suspend_for(50ms); // Simulate processing time
    //     co_return "Processed_" + data;
    // }
    
    // TODO: Async method to save data (simulate 75ms I/O)
    // Task<bool> save_data(const std::string& data) {
    //     co_await std::suspend_for(75ms); // Simulate I/O delay
    //     std::cout << "Saved: " << data << std::endl;
    //     co_return true;
    // }
    
    // TODO: High-level async pipeline method
    // Task<bool> process_pipeline(int id) {
    //     auto raw_data = co_await fetch_data(id);
    //     auto processed_data = co_await transform_data(raw_data);
    //     auto success = co_await save_data(processed_data);
    //     co_return success;
    // }
};

// TODO: Implement a suspend_for awaitable for time delays
// struct suspend_for {
//     std::chrono::milliseconds duration;
//     
//     bool await_ready() const { return duration.count() <= 0; }
//     
//     void await_suspend(std::coroutine_handle<> handle) const {
//         std::thread([handle, this]() {
//             std::this_thread::sleep_for(duration);
//             handle.resume();
//         }).detach();
//     }
//     
//     void await_resume() const {}
// };

int main() {
    AsyncProcessor processor;
    
    std::cout << "Starting async processing pipeline..." << std::endl;
    
    // TODO: Process multiple items concurrently
    std::vector<Task<bool>> tasks;
    for (int i = 1; i <= 3; ++i) {
        tasks.push_back(processor.process_pipeline(i));
    }
    
    // TODO: Wait for all tasks to complete
    std::cout << "Processing " << tasks.size() << " items..." << std::endl;
    
    for (auto& task : tasks) {
        bool success = task.get(); // This should block until ready
        std::cout << "Task completed: " << (success ? "Success" : "Failed") << std::endl;
    }
    
    std::cout << "All processing completed!" << std::endl;
    return 0;
}`,
    expectedOutput: 'Starting async processing pipeline...\nProcessing 3 items...\nSaved: Processed_Data_1\nTask completed: Success\nSaved: Processed_Data_2\nTask completed: Success\nSaved: Processed_Data_3\nTask completed: Success\nAll processing completed!',
    hints: [
      'Task promise_type should handle return_value() and store the result',
      'Use std::suspend_never for initial_suspend() to start immediately',
      'get() method should block until coroutine is done(), then return the result',
      'suspend_for needs to resume the handle after the specified duration',
      'co_await can be used to chain async operations sequentially',
      'Each async method simulates work with different delay times',
      'Tasks can run concurrently when created but await sequentially'
    ],
    feature: 'coroutines',
    relatedTheory: 'coroutines'
  },

  // === EXECUTION POLICIES EXERCISES ===
  {
    id: 'execution-policies-basic-exercise',
    title: 'Parallel STL Algorithms Performance Comparison',
    standard: 'cpp17',
    difficulty: 'beginner', 
    description: 'Compare performance of sequential vs parallel execution policies on large datasets.',
    starterCode: `#include <execution>
#include <algorithm>
#include <numeric>
#include <vector>
#include <chrono>
#include <iostream>
#include <random>

class PerformanceComparator {
private:
    std::vector<int> large_dataset_;
    
public:
    PerformanceComparator(size_t size = 10000000) {
        // TODO: Initialize large_dataset_ with random integers
        // Use std::random_device, std::mt19937, and std::uniform_int_distribution<int>
    }
    
    void compare_sort_performance() {
        std::cout << "=== Sort Performance Comparison ===" << std::endl;
        
        // TODO: Compare std::sort with different execution policies
        // 1. Sequential: std::execution::seq
        // 2. Parallel: std::execution::par  
        // 3. Parallel unsequenced: std::execution::par_unseq
        
        // Measure and print time for each version
        // Make copies of data for each test to ensure fair comparison
    }
    
    void compare_transform_performance() {
        std::cout << "\\n=== Transform Performance Comparison ===" << std::endl;
        
        std::vector<double> results(large_dataset_.size());
        
        // TODO: Create a complex transformation function (e.g., mathematical computation)
        auto expensive_function = [](int x) {
            // Simulate expensive computation
            double result = x;
            for (int i = 0; i < 100; ++i) {
                result = std::sin(result) * std::cos(result) + std::sqrt(std::abs(result));
            }
            return result;
        };
        
        // TODO: Compare std::transform with different execution policies
        // Time each version and display results
    }
    
    void compare_reduce_performance() {
        std::cout << "\\n=== Reduce Performance Comparison ===" << std::endl;
        
        // TODO: Compare std::reduce vs std::accumulate
        // 1. std::accumulate (always sequential)
        // 2. std::reduce with seq policy
        // 3. std::reduce with par policy
        // 4. std::reduce with par_unseq policy
        
        // Print results and verify they're all equal
    }
    
    // TODO: Implement benchmark_function template
    template<typename Func>
    double benchmark_function(const std::string& name, Func&& func) {
        // Measure execution time of func and return duration in milliseconds
        // Print the benchmark name and time
    }
};

// TODO: Implement financial calculations using parallel algorithms
class FinancialCalculator {
public:
    // TODO: Calculate portfolio value using parallel transform_reduce
    static double calculate_portfolio_value(const std::vector<double>& prices, 
                                          const std::vector<int>& quantities) {
        // Use std::transform_reduce with parallel execution policy
        // Multiply each price by quantity and sum the results
    }
    
    // TODO: Calculate moving average using parallel algorithms
    static std::vector<double> calculate_moving_average(const std::vector<double>& prices, 
                                                       int window_size) {
        // Use parallel algorithms to compute moving averages efficiently
        // Return vector of moving averages
    }
    
    // TODO: Find outliers using parallel algorithms  
    static std::vector<size_t> find_outliers(const std::vector<double>& data, 
                                            double threshold = 2.0) {
        // Use parallel algorithms to find indices of outliers
        // Outlier: data point more than threshold standard deviations from mean
    }
};

int main() {
    std::cout << "Hardware concurrency: " << std::thread::hardware_concurrency() << " threads" << std::endl;
    
    // TODO: Create PerformanceComparator and run benchmarks
    
    // TODO: Test financial calculations
    std::vector<double> stock_prices = {100.0, 150.0, 75.0, 200.0, 125.0};
    std::vector<int> quantities = {100, 200, 300, 50, 150};
    
    // Calculate and display portfolio value
    
    // TODO: Generate sample price data and calculate moving averages
    
    // TODO: Find outliers in sample data
    
    return 0;
}`,
    expectedOutput: 'Hardware concurrency: 8 threads\n=== Sort Performance Comparison ===\nSequential sort: 1250ms\nParallel sort: 425ms\nParallel unsequenced sort: 380ms\n\n=== Transform Performance Comparison ===\nSequential transform: 850ms\nParallel transform: 285ms\nParallel unsequenced transform: 260ms\n\n=== Reduce Performance Comparison ===\nAccumulate: 45ms\nSequential reduce: 42ms\nParallel reduce: 15ms\nParallel unsequenced reduce: 12ms\n\nPortfolio value: $43750.00\nMoving average calculated for 1000 data points\nFound 25 outliers in dataset',
    hints: [
      'Use std::execution::seq, std::execution::par, and std::execution::par_unseq',
      'std::chrono::high_resolution_clock for timing measurements', 
      'Make data copies before each sort to ensure fair comparison',
      'std::transform_reduce can multiply and sum in one operation',
      'Use std::generate to create test data with random number generators',
      'Moving average needs std::transform with index-based access',
      'Outlier detection: calculate mean and standard deviation first'
    ],
    feature: 'execution-policies',
    relatedTheory: 'execution-policies'
  },

  // === CTAD EXERCISES ===  
  {
    id: 'ctad-basic-exercise',
    title: 'Class Template Argument Deduction Basics',
    standard: 'cpp17',
    difficulty: 'beginner',
    description: 'Practice CTAD with standard library containers and custom classes.',
    starterCode: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <pair>
#include <optional>
#include <array>

// TODO: Create a custom Pair class that works with CTAD
template<typename T, typename U>
class Pair {
private:
    T first_;
    U second_;
    
public:
    // TODO: Add constructors that enable CTAD
    
    // TODO: Add getters
    const T& first() const { return first_; }
    const U& second() const { return second_; }
    
    void print() const {
        std::cout << "(" << first_ << ", " << second_ << ")";
    }
};

// TODO: Add deduction guide if needed

// TODO: Create a custom Container class with CTAD support
template<typename T, typename Allocator = std::allocator<T>>
class Container {
private:
    std::vector<T, Allocator> data_;
    
public:
    // TODO: Add constructors that work with CTAD
    // Support: default, initializer_list, range construction
    
    void push_back(const T& value) { data_.push_back(value); }
    size_t size() const { return data_.size(); }
    
    void print() const {
        std::cout << "[";
        for (size_t i = 0; i < data_.size(); ++i) {
            if (i > 0) std::cout << ", ";
            std::cout << data_[i];
        }
        std::cout << "]";
    }
};

// TODO: Add deduction guides for Container

// TODO: Create a Point class for 2D/3D points with CTAD
template<typename T, size_t Dimensions = 2>  
class Point {
private:
    std::array<T, Dimensions> coordinates_;
    
public:
    // TODO: Add constructor for CTAD
    
    T& operator[](size_t index) { return coordinates_[index]; }
    const T& operator[](size_t index) const { return coordinates_[index]; }
    
    constexpr size_t dimensions() const { return Dimensions; }
    
    void print() const {
        std::cout << "(";
        for (size_t i = 0; i < Dimensions; ++i) {
            if (i > 0) std::cout << ", ";
            std::cout << coordinates_[i];
        }
        std::cout << ")";
    }
};

// TODO: Add deduction guides for Point

int main() {
    std::cout << "=== Standard Library CTAD ===" << std::endl;
    
    // TODO: Use CTAD with standard library containers
    // std::vector numbers{1, 2, 3, 4, 5};  // Should deduce vector<int>
    // std::pair coordinates{3.14, 2.71};   // Should deduce pair<double, double>
    // std::optional value{42};             // Should deduce optional<int>
    
    std::cout << "\\n=== Custom Class CTAD ===" << std::endl;
    
    // TODO: Use CTAD with custom Pair class
    // Pair p1{10, 20};           // Should deduce Pair<int, int>
    // Pair p2{"hello", 3.14};    // Should deduce Pair<const char*, double>
    
    // TODO: Use CTAD with custom Container class  
    // Container c1{1, 2, 3, 4, 5};           // Should deduce Container<int>
    // Container c2{1.1, 2.2, 3.3};           // Should deduce Container<double>
    
    // TODO: Use CTAD with Point class
    // Point p2d{1.0, 2.0};           // Should deduce Point<double, 2>
    // Point p3d{1.0, 2.0, 3.0};      // Should deduce Point<double, 3>
    
    // TODO: Print all created objects to verify types and values
    
    std::cout << "\\nCTAD Demo completed!" << std::endl;
    return 0;
}`,
    expectedOutput: '=== Standard Library CTAD ===\nvector<int> size: 5\npair: (3.14, 2.71)\noptional has value: 42\n\n=== Custom Class CTAD ===\nPair p1: (10, 20)\nPair p2: (hello, 3.14)\nContainer c1: [1, 2, 3, 4, 5]\nContainer c2: [1.1, 2.2, 3.3]\nPoint p2d (2D): (1, 2)\nPoint p3d (3D): (1, 2, 3)\n\nCTAD Demo completed!',
    hints: [
      'CTAD works automatically for many standard library types',
      'Custom classes need constructors that can deduce template parameters',
      'Deduction guides use: template<...> ClassName(...) -> ClassName<...>',
      'Initializer list constructors enable CTAD with braced initialization',
      'Range constructors need iterator-based deduction guides',
      'Point class needs variadic constructor for different dimensions'
    ],
    feature: 'ctad',
    relatedTheory: 'ctad'
  },

  // === FOLD EXPRESSIONS EXERCISES ===
  {
    id: 'fold-expressions-basic-exercise',
    title: 'Variadic Template Operations with Fold Expressions',
    standard: 'cpp17',
    difficulty: 'intermediate',
    description: 'Use fold expressions to implement various operations on parameter packs.',
    starterCode: `#include <iostream>
#include <string>
#include <vector>
#include <type_traits>

// TODO: Implement sum function using fold expressions
template<typename... Args>
auto sum(Args... args) {
    // Use unary right fold: (args + ...)
}

// TODO: Implement all_true function using fold expressions  
template<typename... Args>
bool all_true(Args... args) {
    // Use fold expression with && operator
}

// TODO: Implement print_all function using fold expressions
template<typename... Args>
void print_all(Args... args) {
    // Use fold expression with comma operator
    // Print each argument followed by a space
}

// TODO: Implement count_positive function
template<typename... Args>
size_t count_positive(Args... args) {
    // Use fold expression to count positive numbers
    // Hint: use conditional expression (arg > 0 ? 1 : 0)
}

// TODO: Implement push_all function
template<typename Container, typename... Args>
void push_all(Container& container, Args... args) {
    // Use fold expression to push all arguments to container
}

// TODO: Implement are_all_same function
template<typename T, typename... Args>
constexpr bool are_all_same() {
    // Use fold expression with && and std::is_same_v
}

// TODO: Implement min_value function
template<typename T, typename... Args>
T min_value(T first, Args... args) {
    // Use fold expression to find minimum value
    // Hint: use binary left fold with custom comparison
}

// TODO: Implement string_concat function
template<typename... Args>
std::string string_concat(Args... args) {
    std::string result;
    // Use fold expression to concatenate all string arguments
}

// TODO: Implement multiply_all function with initial value
template<typename T, typename... Args>  
T multiply_all(T initial, Args... args) {
    // Use binary fold expression: (initial * ... * args)
}

// === TEST CLASS FOR TYPE OPERATIONS ===
class TestClass {
    int value_;
public:
    TestClass(int v) : value_(v) {}
    int value() const { return value_; }
    bool operator>(const TestClass& other) const { return value_ > other.value_; }
    bool operator<(const TestClass& other) const { return value_ < other.value_; }
};

int main() {
    std::cout << "=== Fold Expressions Demo ===" << std::endl;
    
    // TODO: Test sum function
    std::cout << "sum(1, 2, 3, 4, 5) = " << /* TODO */ << std::endl;
    std::cout << "sum(1.5, 2.5, 3.0) = " << /* TODO */ << std::endl;
    
    // TODO: Test all_true function  
    std::cout << "all_true(true, true, true) = " << /* TODO */ << std::endl;
    std::cout << "all_true(true, false, true) = " << /* TODO */ << std::endl;
    
    // TODO: Test print_all function
    std::cout << "print_all output: ";
    // TODO: call print_all with various arguments
    
    // TODO: Test count_positive function
    std::cout << "count_positive(1, -2, 3, -4, 5, 0) = " << /* TODO */ << std::endl;
    
    // TODO: Test push_all function
    std::vector<int> vec;
    // TODO: use push_all to add elements
    std::cout << "Vector after push_all: ";
    for (const auto& v : vec) {
        std::cout << v << " ";
    }
    std::cout << std::endl;
    
    // TODO: Test are_all_same function
    std::cout << "are_all_same<int, int, int>() = " << /* TODO */ << std::endl;
    std::cout << "are_all_same<int, double, int>() = " << /* TODO */ << std::endl;
    
    // TODO: Test min_value function
    std::cout << "min_value(5, 2, 8, 1, 9) = " << /* TODO */ << std::endl;
    
    // TODO: Test string_concat function
    std::cout << "string_concat result: " << /* TODO */ << std::endl;
    
    // TODO: Test multiply_all function
    std::cout << "multiply_all(2, 3, 4, 5) = " << /* TODO */ << std::endl;
    
    return 0;
}`,
    expectedOutput: '=== Fold Expressions Demo ===\nsum(1, 2, 3, 4, 5) = 15\nsum(1.5, 2.5, 3.0) = 7\nall_true(true, true, true) = 1\nall_true(true, false, true) = 0\nprint_all output: Hello world from fold expressions \ncount_positive(1, -2, 3, -4, 5, 0) = 3\nVector after push_all: 10 20 30 40 50 \nare_all_same<int, int, int>() = 1\nare_all_same<int, double, int>() = 0\nmin_value(5, 2, 8, 1, 9) = 1\nstring_concat result: C++17 fold expressions are awesome!\nmultiply_all(2, 3, 4, 5) = 120',
    hints: [
      'Unary right fold: (pack op ...) expands to: a op (b op (c op ...))',
      'Unary left fold: (... op pack) expands to: ((... op a) op b) op c',
      'Binary right fold: (pack op ... op init) includes initial value',
      'Use comma operator for side effects: ((std::cout << args << " "), ...)',
      'Conditional in fold: ((args > 0 ? 1 : 0) + ...) counts conditions',
      'Type traits work with fold: (std::is_same_v<T, Args> && ...)',
      'Custom comparison: (first = (first < args ? first : args), ...)'
    ],
    feature: 'fold-expressions',  
    relatedTheory: 'fold-expressions'
  },

  // === TEMPLATE SPECIALIZATION EXERCISES ===
  {
    id: 'template-specialization-exercise',
    title: 'Custom Container with Template Specialization',
    standard: 'templates',
    difficulty: 'advanced',
    description: 'Create a generic container with specialized versions for bool, pointers, and strings.',
    starterCode: `#include <iostream>
#include <vector>
#include <bitset>
#include <string>
#include <memory>

// TODO: Implement primary template for SpecializedContainer
template<typename T, size_t N>
class SpecializedContainer {
private:
    // TODO: Use appropriate storage for general types
    
public:
    // TODO: Implement basic container interface
    // - Default constructor
    // - void set(size_t index, const T& value) 
    // - T get(size_t index) const
    // - size_t size() const
    // - void print() const
};

// TODO: Create partial specialization for bool (bit-packed storage)
template<size_t N>
class SpecializedContainer<bool, N> {
private:
    // TODO: Use std::bitset for efficient bool storage
    
public:
    // TODO: Implement specialized interface for bool
    // Include additional methods:
    // - void flip(size_t index)
    // - size_t count() const - count true values
};

// TODO: Create partial specialization for pointer types  
template<typename T, size_t N>
class SpecializedContainer<T*, N> {
private:
    // TODO: Use array of pointers with null checking
    
public:
    // TODO: Implement specialized interface for pointers
    // Include additional methods:
    // - size_t null_count() const
    // - bool is_valid(size_t index) const
    // - void reset(size_t index) - set to nullptr
};

// TODO: Create full specialization for std::string
template<size_t N>
class SpecializedContainer<std::string, N> {
private:
    // TODO: Use vector of strings with length tracking
    
public:
    // TODO: Implement specialized interface for strings
    // Include additional methods:
    // - size_t total_length() const
    // - std::string concatenate_all() const
    // - void append_to_all(const std::string& suffix)
};

// TODO: Create a TypeInfo template with specializations
template<typename T>
struct TypeInfo {
    static const char* name() { return "unknown"; }
    static constexpr bool is_numeric() { return false; }
    static constexpr bool is_container() { return false; }
};

// TODO: Add specializations for TypeInfo
// - Numeric types (int, float, double): is_numeric = true
// - Container types (std::vector, std::string): is_container = true  
// - Pointer types: name = "pointer"

// TODO: Implement function template print_type_info with specializations
template<typename T>
void print_type_info(const T& value) {
    // TODO: Print general type information
}

// TODO: Add function template specializations for different categories

int main() {
    std::cout << "=== Template Specialization Demo ===" << std::endl;
    
    // TODO: Test general container (int)
    std::cout << "\\n=== General Container (int) ===" << std::endl;
    SpecializedContainer<int, 5> int_container;
    // TODO: Set some values and print
    
    // TODO: Test bool specialization
    std::cout << "\\n=== Bool Specialization ===" << std::endl;  
    SpecializedContainer<bool, 8> bool_container;
    // TODO: Set some bool values, flip some, count true values
    
    // TODO: Test pointer specialization
    std::cout << "\\n=== Pointer Specialization ===" << std::endl;
    SpecializedContainer<int*, 4> pointer_container;
    // TODO: Set some pointers (including nullptrs), check validity
    
    // TODO: Test string specialization
    std::cout << "\\n=== String Specialization ===" << std::endl;
    SpecializedContainer<std::string, 3> string_container;
    // TODO: Set some strings, get total length, concatenate
    
    // TODO: Test TypeInfo specializations
    std::cout << "\\n=== Type Information ===" << std::endl;
    print_type_info(42);
    print_type_info(3.14);
    print_type_info(std::string("hello"));
    print_type_info(std::vector<int>{1, 2, 3});
    
    return 0;
}`,
    expectedOutput: '=== Template Specialization Demo ===\n\n=== General Container (int) ===\nGeneral container: [10, 20, 30, 0, 0]\nContainer size: 5\n\n=== Bool Specialization ===\nBool container: [1, 0, 1, 1, 0, 0, 0, 0]\nTrue count: 3\nAfter flipping index 1: [1, 1, 1, 1, 0, 0, 0, 0]\nTrue count: 4\n\n=== Pointer Specialization ===\nPointer container validity: [1, 0, 1, 0]\nNull count: 2\nValid pointers: 2\n\n=== String Specialization ===\nString container: [hello, world, cpp]\nTotal length: 13\nConcatenated: helloworldcpp\nAfter appending "!": [hello!, world!, cpp!]\n\n=== Type Information ===\nType: int, numeric: true, container: false\nType: double, numeric: true, container: false\nType: string, numeric: false, container: true\nType: vector, numeric: false, container: true',
    hints: [
      'Primary template should use T data_[N] for storage',
      'Bool specialization: use std::bitset<N> for bit-packed storage',
      'Pointer specialization: check for nullptr in operations',
      'String specialization: track total character count efficiently',
      'TypeInfo needs template<> for full specializations',
      'Use std::enable_if or concepts for conditional specializations',
      'Function template specializations need template<> syntax'
    ],
    feature: 'template-specialization',
    relatedTheory: 'template-specialization'
  },

  // === DEDUCING THIS EXERCISES ===
  {
    id: 'deducing-this-exercise',
    title: 'Fluent Interface with Deducing This',
    standard: 'cpp23',
    difficulty: 'intermediate', 
    description: 'Create a fluent interface builder using deducing this to eliminate const/non-const overload duplication.',
    starterCode: `#include <iostream>
#include <string>
#include <vector>
#include <memory>

// TODO: Implement a ConfigBuilder class using deducing this
// It should build a configuration object with fluent interface
class ConfigBuilder {
private:
    std::string name_;
    int port_ = 8080;
    bool debug_mode_ = false;
    std::vector<std::string> features_;
    double timeout_ = 30.0;
    
public:
    // TODO: Implement set_name using deducing this
    // template<typename Self>
    // auto&& set_name(this Self&& self, std::string name) {
    //     self.name_ = std::move(name);
    //     return std::forward<Self>(self);
    // }
    
    // TODO: Implement set_port using deducing this
    
    // TODO: Implement enable_debug using deducing this
    
    // TODO: Implement add_feature using deducing this
    
    // TODO: Implement set_timeout using deducing this
    
    // TODO: Implement build method that returns a Config object
    // Should work with both const and non-const, lvalue and rvalue
    
    // TODO: Add a print method using deducing this for const/non-const
};

// TODO: Create a simple Config struct to hold the built configuration
struct Config {
    std::string name;
    int port;
    bool debug_mode;
    std::vector<std::string> features;
    double timeout;
    
    void print() const {
        std::cout << "Config: " << name << ", port: " << port 
                  << ", debug: " << debug_mode << ", timeout: " << timeout << "s\\n";
        std::cout << "Features: ";
        for (const auto& feature : features) {
            std::cout << feature << " ";
        }
        std::cout << "\\n";
    }
};

// TODO: Implement a DataProcessor class using deducing this
template<typename T>
class DataProcessor {
private:
    std::vector<T> data_;
    std::string processor_name_;
    
public:
    DataProcessor(std::string name) : processor_name_(std::move(name)) {}
    
    // TODO: Implement add_data using deducing this
    template<typename Self>
    auto&& add_data(this Self&& self, T value) {
        // TODO: Add value to data_ and return forwarded self
    }
    
    // TODO: Implement transform using deducing this
    template<typename Self, typename Func>
    auto&& transform(this Self&& self, Func func) {
        // TODO: Apply func to each element in data_
    }
    
    // TODO: Implement filter using deducing this  
    template<typename Self, typename Predicate>
    auto&& filter(this Self&& self, Predicate pred) {
        // TODO: Keep only elements that satisfy pred
    }
    
    // TODO: Implement get_data using deducing this (const/non-const access)
    template<typename Self>
    auto&& get_data(this Self&& self) {
        // TODO: Return reference to data_ with proper forwarding
    }
    
    void print() const {
        std::cout << processor_name_ << " data: ";
        for (const auto& item : data_) {
            std::cout << item << " ";
        }
        std::cout << "\\n";
    }
};

// TODO: Implement a Tree class using deducing this for navigation
template<typename T>
class Tree {
private:
    T value_;
    std::vector<std::unique_ptr<Tree<T>>> children_;
    
public:
    Tree(T value) : value_(std::move(value)) {}
    
    // TODO: Implement add_child using deducing this
    template<typename Self>
    auto&& add_child(this Self&& self, T child_value) {
        // TODO: Add new child and return forwarded self
    }
    
    // TODO: Implement visit using deducing this
    template<typename Self, typename Visitor>
    void visit(this Self&& self, Visitor&& visitor) {
        // TODO: Apply visitor to this node and all children recursively
    }
    
    const T& value() const { return value_; }
    size_t child_count() const { return children_.size(); }
};

int main() {
    std::cout << "=== Deducing This Demo ===" << std::endl;
    
    // TODO: Test ConfigBuilder with method chaining
    std::cout << "\\n=== Config Builder ===" << std::endl;
    
    // Test lvalue chaining
    ConfigBuilder builder;
    // TODO: Chain multiple setter calls
    auto config1 = /* TODO: build config with chaining */;
    config1.print();
    
    // Test rvalue chaining  
    auto config2 = ConfigBuilder{}
        /* TODO: chain methods here */
        .build();
    config2.print();
    
    // TODO: Test DataProcessor with method chaining
    std::cout << "\\n=== Data Processor ===" << std::endl;
    DataProcessor<int> processor("NumberProcessor");
    
    // TODO: Chain add_data, transform, and filter operations
    processor.add_data(1).add_data(2).add_data(3).add_data(4).add_data(5);
    processor.print();
    
    processor.transform([](int& x) { x *= 2; }).filter([](const int& x) { return x > 4; });
    processor.print();
    
    // TODO: Test Tree with method chaining  
    std::cout << "\\n=== Tree Building ===" << std::endl;
    Tree<std::string> root("root");
    root.add_child("child1").add_child("child2").add_child("child3");
    
    std::cout << "Tree traversal: ";
    root.visit([](const std::string& value) {
        std::cout << value << " ";
    });
    std::cout << "\\n";
    
    std::cout << "Root has " << root.child_count() << " children\\n";
    
    return 0;
}`,
    expectedOutput: '=== Deducing This Demo ===\n\n=== Config Builder ===\nConfig: WebServer, port: 8080, debug: 1, timeout: 45s\nFeatures: logging auth ssl \nConfig: APIServer, port: 9000, debug: 0, timeout: 60s\nFeatures: caching monitoring \n\n=== Data Processor ===\nNumberProcessor data: 1 2 3 4 5 \nNumberProcessor data: 6 8 10 \n\n=== Tree Building ===\nTree traversal: root child1 child2 child3 \nRoot has 3 children',
    hints: [
      'Deducing this parameter: template<typename Self> auto&& func(this Self&& self)',
      'Perfect forwarding: return std::forward<Self>(self) for chaining',
      'Works with const/non-const, lvalue/rvalue automatically',
      'build() method can be overloaded for different value categories',
      'DataProcessor transform should modify elements in-place',
      'Tree visit should be recursive on children',
      'Use make_unique for child node creation'
    ],
    feature: 'deducing-this',
    relatedTheory: 'deducing-this'
  },

  // === std::filesystem EXERCISES ===
  {
    id: 'filesystem-exercise',
    title: 'Project File Organizer',
    standard: 'cpp17',
    difficulty: 'intermediate',
    description: 'Create a file organizer that scans directories, categorizes files, and creates organized structure.',
    starterCode: `#include <filesystem>
#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <fstream>

namespace fs = std::filesystem;

class ProjectOrganizer {
private:
    fs::path base_path_;
    std::map<std::string, std::vector<fs::path>> categorized_files_;
    
public:
    ProjectOrganizer(const fs::path& base_path) : base_path_(base_path) {}
    
    // TODO: Implement scan_directory method
    void scan_directory(const fs::path& dir_path) {
        // TODO: Use fs::recursive_directory_iterator to scan all files
        // Categorize files by extension into categorized_files_ map
        // Categories: "cpp" (.cpp, .cc, .cxx), "headers" (.h, .hpp), 
        //           "text" (.txt, .md), "data" (.json, .xml, .csv), "other"
    }
    
    // TODO: Implement create_organized_structure method  
    void create_organized_structure() {
        // TODO: Create organized directory structure:
        // base_path_/organized/cpp/
        // base_path_/organized/headers/
        // base_path_/organized/text/  
        // base_path_/organized/data/
        // base_path_/organized/other/
        
        // Use fs::create_directories for nested directory creation
    }
    
    // TODO: Implement copy_files method
    void copy_files() {
        // TODO: Copy files to their respective organized directories
        // Use fs::copy_file with appropriate copy options
        // Handle potential errors with try-catch
    }
    
    // TODO: Implement generate_report method
    void generate_report() const {
        // TODO: Create a report file with:
        // - Total files processed
        // - Files per category
        // - Largest files in each category
        // - Directory structure summary
    }
    
    // TODO: Implement get_file_info method
    void get_file_info(const fs::path& file_path) const {
        // TODO: Display detailed file information:
        // - File size in bytes
        // - Last modification time
        // - File permissions
        // - File type (regular file, directory, symlink, etc.)
    }
    
    void print_statistics() const {
        std::cout << "\\n=== File Statistics ===" << std::endl;
        for (const auto& [category, files] : categorized_files_) {
            std::cout << category << ": " << files.size() << " files" << std::endl;
        }
    }
};

// TODO: Implement utility functions
class FileUtils {
public:
    // TODO: Calculate directory size recursively
    static std::uintmax_t calculate_directory_size(const fs::path& dir_path) {
        // Use fs::recursive_directory_iterator and fs::file_size
    }
    
    // TODO: Find files by pattern (e.g., "*.cpp")
    static std::vector<fs::path> find_files_by_pattern(const fs::path& dir_path, 
                                                       const std::string& pattern) {
        // Find files matching the given pattern
        // For simplicity, just check if filename contains the pattern
    }
    
    // TODO: Get directory space information
    static void print_space_info(const fs::path& dir_path) {
        // Use fs::space to get capacity, free, and available space
        // Display in human-readable format (GB, MB, KB)
    }
    
    // TODO: Create backup of important files
    static void backup_files(const std::vector<fs::path>& files, 
                           const fs::path& backup_dir) {
        // Create backup directory and copy files with timestamp suffix
    }
};

// TODO: Create sample files for testing
void create_sample_files(const fs::path& test_dir) {
    // TODO: Create directory structure with sample files
    // test_dir/src/main.cpp
    // test_dir/src/utils.cpp  
    // test_dir/include/app.h
    // test_dir/include/utils.hpp
    // test_dir/docs/readme.txt
    // test_dir/docs/manual.md
    // test_dir/data/config.json
    // test_dir/data/users.xml
    // test_dir/misc/notes.txt
    
    // Use fs::create_directories and std::ofstream to create files
}

void cleanup_test_files(const fs::path& test_dir) {
    // TODO: Remove all created test files and directories
    // Use fs::remove_all for recursive removal
}

int main() {
    std::cout << "=== Project File Organizer ===" << std::endl;
    
    // TODO: Set up test environment
    fs::path test_directory = fs::current_path() / "test_project";
    
    try {
        // TODO: Create sample file structure
        std::cout << "Creating sample file structure..." << std::endl;
        create_sample_files(test_directory);
        
        // TODO: Initialize organizer and scan files
        ProjectOrganizer organizer(test_directory);
        std::cout << "\\nScanning directory: " << test_directory << std::endl;
        organizer.scan_directory(test_directory);
        organizer.print_statistics();
        
        // TODO: Create organized structure
        std::cout << "\\nCreating organized structure..." << std::endl;
        organizer.create_organized_structure();
        
        // TODO: Copy files to organized structure
        std::cout << "Copying files..." << std::endl;
        organizer.copy_files();
        
        // TODO: Generate report
        std::cout << "Generating report..." << std::endl;
        organizer.generate_report();
        
        // TODO: Test utility functions
        std::cout << "\\n=== Utility Functions ===" << std::endl;
        
        auto dir_size = FileUtils::calculate_directory_size(test_directory);
        std::cout << "Directory size: " << dir_size << " bytes" << std::endl;
        
        auto cpp_files = FileUtils::find_files_by_pattern(test_directory, ".cpp");
        std::cout << "Found " << cpp_files.size() << " C++ files" << std::endl;
        
        FileUtils::print_space_info(fs::current_path());
        
        // TODO: Display file information for a sample file
        if (!cpp_files.empty()) {
            std::cout << "\\nFile information for: " << cpp_files[0] << std::endl;
            organizer.get_file_info(cpp_files[0]);
        }
        
    } catch (const fs::filesystem_error& e) {
        std::cout << "Filesystem error: " << e.what() << std::endl;
    }
    
    // TODO: Cleanup test files
    std::cout << "\\nCleaning up test files..." << std::endl;
    cleanup_test_files(test_directory);
    
    std::cout << "File organization completed!" << std::endl;
    return 0;
}`,
    expectedOutput: '=== Project File Organizer ===\nCreating sample file structure...\nCreated test_project with sample files\n\nScanning directory: test_project\nScanned 8 files total\n\n=== File Statistics ===\ncpp: 2 files\nheaders: 2 files\ntext: 3 files\ndata: 2 files\nother: 0 files\n\nCreating organized structure...\nCreated organized directories\n\nCopying files...\nCopied 8 files to organized structure\n\nGenerating report...\nReport generated: file_organization_report.txt\n\n=== Utility Functions ===\nDirectory size: 2048 bytes\nFound 2 C++ files\nSpace info - Total: 500GB, Free: 250GB, Available: 240GB\n\nFile information for: test_project/src/main.cpp\nFile size: 156 bytes\nLast modified: 2024-01-15 10:30:45\nPermissions: rw-r--r--\nFile type: regular file\n\nCleaning up test files...\nRemoved test_project directory\nFile organization completed!',
    hints: [
      'Use fs::recursive_directory_iterator for scanning all subdirectories',
      'fs::path::extension() returns file extension including the dot',
      'fs::create_directories creates parent directories if they don\'t exist',
      'fs::copy_file needs copy_options for overwrite behavior',
      'fs::file_size returns std::uintmax_t, handle errors with error_code',
      'fs::last_write_time returns file_time_type, convert for display',
      'Use fs::status() to get file permissions and type information'
    ],
    feature: 'filesystem',
    relatedTheory: 'filesystem'
  },

  // === constinit EXERCISES ===
  {
    id: 'constinit-exercise',
    title: 'Configuration System with constinit',
    standard: 'cpp20',
    difficulty: 'intermediate',
    description: 'Create a compile-time initialized configuration system using constinit for zero-overhead globals.',
    starterCode: `#include <iostream>
#include <atomic>
#include <array>
#include <string_view>
#include <chrono>

// TODO: Define application constants using constinit
// constinit const char* APP_NAME = "MyApp";
// constinit const char* APP_VERSION = "1.0.0";
// constinit int APP_BUILD_NUMBER = 1001;

// TODO: Define mathematical constants using constinit
// constinit double PI = 3.141592653589793;
// constinit double E = 2.718281828459045;

// TODO: Define system limits using constinit
// constinit int MAX_CONNECTIONS = 1000;
// constinit size_t BUFFER_SIZE = 8192;
// constinit double TIMEOUT_SECONDS = 30.0;

// TODO: Create compile-time lookup table using constinit
constexpr std::array<int, 10> generate_squares() {
    std::array<int, 10> squares{};
    for (int i = 0; i < 10; ++i) {
        squares[i] = i * i;
    }
    return squares;
}

// TODO: Use constinit for the lookup table
// constinit auto SQUARE_LOOKUP = generate_squares();

// TODO: Create atomic counters with constinit
// constinit std::atomic<int> request_counter{0};
// constinit std::atomic<size_t> bytes_processed{0};
// constinit std::atomic<bool> system_ready{false};

// TODO: Thread-local variables with constinit
// thread_local constinit int thread_id = 0;
// thread_local constinit double thread_workload = 0.0;

// TODO: Create a Logger class with constinit static members
class Logger {
private:
    // TODO: Add constinit static members
    // static constinit std::atomic<int> log_count_{0};
    // static constinit bool initialized_{false};
    
public:
    static void initialize() {
        // TODO: Set initialized_ to true and log initialization
    }
    
    static void log(std::string_view message) {
        // TODO: Increment counter and print log with count
    }
    
    static bool is_initialized() {
        // TODO: Return initialization status
    }
    
    static int get_count() {
        // TODO: Return current log count
    }
};

// TODO: Define the static constinit members outside the class

// TODO: Create a Performance class for benchmarking
class Performance {
private:
    // TODO: Add constinit static timing variables
    // static constinit std::atomic<uint64_t> total_operations_{0};
    // static constinit std::atomic<uint64_t> total_time_ns_{0};
    
public:
    // TODO: Implement record_operation method
    static void record_operation(uint64_t duration_ns) {
        // TODO: Update atomic counters
    }
    
    // TODO: Implement print_stats method  
    static void print_stats() {
        // TODO: Calculate and print average operation time
    }
    
    // TODO: Implement reset_stats method
    static void reset_stats() {
        // TODO: Reset all counters to zero
    }
};

// TODO: Define Performance static members

// TODO: Create ConfigManager template with constinit defaults
template<typename T>
class ConfigManager {
public:
    // TODO: Add constinit static default values for different types
    // For T=int: default_value = 0
    // For T=double: default_value = 0.0  
    // For T=bool: default_value = false
    // static constinit T default_value;
    
    static T get_default() {
        // TODO: Return default_value
    }
    
    static void print_default() {
        // TODO: Print the default value with type information
    }
};

// TODO: Define template specializations for ConfigManager

// TODO: Create a compile-time string hash function
constexpr uint64_t hash_string(std::string_view str) {
    // TODO: Implement simple hash function (FNV or similar)
    uint64_t hash = 14695981039346656037ULL; // FNV offset basis
    for (char c : str) {
        hash ^= static_cast<uint64_t>(c);
        hash *= 1099511628211ULL; // FNV prime
    }
    return hash;
}

// TODO: Create constinit hash values for common strings
// constinit auto HASH_ERROR = hash_string("ERROR");
// constinit auto HASH_WARNING = hash_string("WARNING");
// constinit auto HASH_INFO = hash_string("INFO");

void simulate_work(int thread_num) {
    // TODO: Set thread-local variables
    // TODO: Simulate work and update thread workload
    // TODO: Use Performance::record_operation to track timing
    
    std::cout << "Thread " << thread_num << " completed work" << std::endl;
}

int main() {
    std::cout << "=== constinit Demo ===" << std::endl;
    
    // TODO: Print application constants
    std::cout << "\\n=== Application Constants ===" << std::endl;
    // Print APP_NAME, APP_VERSION, APP_BUILD_NUMBER
    
    // TODO: Print mathematical constants
    std::cout << "\\n=== Mathematical Constants ===" << std::endl;
    // Print PI and E values
    
    // TODO: Print system limits
    std::cout << "\\n=== System Configuration ===" << std::endl;
    // Print MAX_CONNECTIONS, BUFFER_SIZE, TIMEOUT_SECONDS
    
    // TODO: Test lookup table
    std::cout << "\\n=== Lookup Table ===" << std::endl;
    std::cout << "Squares: ";
    // Print first 5 values from SQUARE_LOOKUP
    
    // TODO: Test atomic operations
    std::cout << "\\n=== Atomic Operations ===" << std::endl;
    // Increment request_counter, add to bytes_processed, set system_ready
    // Print the values
    
    // TODO: Test Logger
    std::cout << "\\n=== Logger Test ===" << std::endl;
    Logger::initialize();
    Logger::log("Application started");
    Logger::log("Processing data");  
    Logger::log("Operation completed");
    std::cout << "Log count: " << Logger::get_count() << std::endl;
    
    // TODO: Test Performance tracking
    std::cout << "\\n=== Performance Tracking ===" << std::endl;
    for (int i = 0; i < 100; ++i) {
        auto start = std::chrono::high_resolution_clock::now();
        // Simulate work
        volatile int sum = 0;
        for (int j = 0; j < 1000; ++j) {
            sum += j;
        }
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        Performance::record_operation(duration.count());
    }
    Performance::print_stats();
    
    // TODO: Test ConfigManager defaults
    std::cout << "\\n=== Config Manager Defaults ===" << std::endl;
    ConfigManager<int>::print_default();
    ConfigManager<double>::print_default();
    ConfigManager<bool>::print_default();
    
    // TODO: Print compile-time hash values
    std::cout << "\\n=== Compile-time Hashes ===" << std::endl;
    // Print HASH_ERROR, HASH_WARNING, HASH_INFO
    
    std::cout << "\\nconstinit demo completed!" << std::endl;
    return 0;
}`,
    expectedOutput: '=== constinit Demo ===\n\n=== Application Constants ===\nApp: MyApp v1.0.0 (build 1001)\n\n=== Mathematical Constants ===\nPI = 3.14159\nE = 2.71828\n\n=== System Configuration ===\nMax connections: 1000\nBuffer size: 8192 bytes\nTimeout: 30 seconds\n\n=== Lookup Table ===\nSquares: 0 1 4 9 16\n\n=== Atomic Operations ===\nRequest counter: 5\nBytes processed: 1024\nSystem ready: true\n\n=== Logger Test ===\nLogger initialized\n[1] Application started\n[2] Processing data\n[3] Operation completed\nLog count: 3\n\n=== Performance Tracking ===\nOperations: 100\nAverage time: 1250 ns\n\n=== Config Manager Defaults ===\nint default: 0\ndouble default: 0\nbool default: false\n\n=== Compile-time Hashes ===\nERROR hash: 0x1234567890ABCDEF\nWARNING hash: 0xFEDCBA0987654321\nINFO hash: 0x1111222233334444\n\nconstinit demo completed!',
    hints: [
      'constinit ensures compile-time initialization, preventing runtime overhead',
      'Atomic types can be constinit initialized with braced initialization',
      'Thread-local constinit variables are initialized per thread',
      'Static constinit members need definition outside the class',
      'Lookup tables should use constexpr functions for generation',
      'Template specializations for ConfigManager need explicit values',
      'Hash functions should be constexpr to work with constinit'
    ],
    feature: 'constinit',
    relatedTheory: 'constinit'
  },

  // === SPACESHIP OPERATOR EXERCISES ===
  {
    id: 'spaceship-operator-exercise',
    title: 'Financial Instrument Comparison System',
    standard: 'cpp20',
    difficulty: 'advanced',
    description: 'Create a comprehensive comparison system for financial instruments using the spaceship operator.',
    starterCode: `#include <compare>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

// TODO: Create enum for asset classes
enum class AssetClass {
    Stock, Bond, Commodity, Currency, Derivative
};

// TODO: Implement Money class with spaceship operator
class Money {
private:
    double amount_;
    std::string currency_;
    
public:
    Money(double amount, std::string currency) 
        : amount_(amount), currency_(std::move(currency)) {}
    
    // TODO: Implement spaceship operator
    // Compare by currency first (alphabetical), then by amount
    auto operator<=>(const Money& other) const {
        // TODO: Implement comparison logic
    }
    
    // TODO: Implement equality operator
    bool operator==(const Money& other) const = default;
    
    double amount() const { return amount_; }
    const std::string& currency() const { return currency_; }
};

// TODO: Implement StockPrice class with partial ordering (handles NaN prices)
class StockPrice {
private:
    double price_;
    std::string symbol_;
    
public:
    StockPrice(std::string symbol, double price)
        : price_(price), symbol_(std::move(symbol)) {}
    
    // TODO: Implement spaceship operator with partial ordering
    // Handle NaN prices (invalid/suspended stocks)
    std::partial_ordering operator<=>(const StockPrice& other) const {
        // TODO: First compare by symbol, then handle NaN in price comparison
    }
    
    bool operator==(const StockPrice& other) const {
        // TODO: Handle NaN equality properly
    }
    
    const std::string& symbol() const { return symbol_; }
    double price() const { return price_; }
    bool is_valid() const { return !std::isnan(price_); }
};

// TODO: Implement FinancialInstrument class with complex ordering
class FinancialInstrument {
private:
    std::string symbol_;
    AssetClass asset_class_;
    Money market_value_;
    double risk_rating_; // 1.0 = low risk, 10.0 = high risk
    
public:
    FinancialInstrument(std::string symbol, AssetClass asset_class,
                       Money market_value, double risk_rating)
        : symbol_(std::move(symbol)), asset_class_(asset_class),
          market_value_(std::move(market_value)), risk_rating_(risk_rating) {}
    
    // TODO: Implement complex multi-criteria spaceship operator
    // Priority order: 1) Asset class, 2) Market value (descending), 3) Risk (ascending), 4) Symbol
    std::strong_ordering operator<=>(const FinancialInstrument& other) const {
        // TODO: Implement multi-level comparison
    }
    
    bool operator==(const FinancialInstrument& other) const = default;
    
    // Getters
    const std::string& symbol() const { return symbol_; }
    AssetClass asset_class() const { return asset_class_; }
    const Money& market_value() const { return market_value_; }
    double risk_rating() const { return risk_rating_; }
    
    void print() const {
        const char* class_names[] = {"Stock", "Bond", "Commodity", "Currency", "Derivative"};
        std::cout << symbol_ << " (" << class_names[static_cast<int>(asset_class_)] 
                  << ") - Value: " << market_value_.amount() << " " << market_value_.currency()
                  << ", Risk: " << risk_rating_;
    }
};

// TODO: Implement Portfolio class that can be compared
class Portfolio {
private:
    std::string name_;
    std::vector<FinancialInstrument> instruments_;
    
public:
    Portfolio(std::string name) : name_(std::move(name)) {}
    
    void add_instrument(FinancialInstrument instrument) {
        instruments_.push_back(std::move(instrument));
    }
    
    // TODO: Implement spaceship operator for portfolios
    // Compare by total value, then by number of instruments, then by name
    auto operator<=>(const Portfolio& other) const {
        // TODO: Calculate total values and compare
    }
    
    bool operator==(const Portfolio& other) const = default;
    
    double total_value() const {
        // TODO: Sum all instrument values (assume same currency for simplicity)
        double total = 0.0;
        for (const auto& instr : instruments_) {
            total += instr.market_value().amount();
        }
        return total;
    }
    
    size_t size() const { return instruments_.size(); }
    const std::string& name() const { return name_; }
    
    void sort_instruments() {
        // TODO: Sort instruments using their spaceship operator
        std::sort(instruments_.begin(), instruments_.end());
    }
    
    void print() const {
        std::cout << "Portfolio: " << name_ << " (Value: $" << total_value() 
                  << ", Instruments: " << instruments_.size() << ")\\n";
        for (const auto& instr : instruments_) {
            std::cout << "  ";
            instr.print();
            std::cout << "\\n";
        }
    }
};

// TODO: Create utility functions for testing comparisons
void test_money_comparison() {
    std::cout << "=== Money Comparison Test ===" << std::endl;
    
    // TODO: Create Money objects in different currencies and amounts
    // Test all comparison operators: ==, !=, <, <=, >, >=
}

void test_stock_price_comparison() {
    std::cout << "\\n=== Stock Price Comparison Test ===" << std::endl;
    
    // TODO: Create StockPrice objects, including some with NaN prices
    // Test comparison behavior with invalid prices
}

void test_instrument_sorting() {
    std::cout << "\\n=== Instrument Sorting Test ===" << std::endl;
    
    // TODO: Create vector of FinancialInstrument objects
    // Include different asset classes, values, and risk ratings
    // Sort and display the results
}

void test_portfolio_comparison() {
    std::cout << "\\n=== Portfolio Comparison Test ===" << std::endl;
    
    // TODO: Create multiple portfolios with different instruments
    // Compare portfolios and sort them
}

int main() {
    std::cout << "=== Spaceship Operator Demo ===" << std::endl;
    
    test_money_comparison();
    test_stock_price_comparison();
    test_instrument_sorting();
    test_portfolio_comparison();
    
    // TODO: Demonstrate automatic generation of all comparison operators
    std::cout << "\\n=== All Comparison Operators Work ===" << std::endl;
    Money m1{100.0, "USD"};
    Money m2{150.0, "USD"};
    
    // TODO: Show that all operators work without explicit implementation
    std::cout << "m1 == m2: " << (m1 == m2) << std::endl;
    std::cout << "m1 != m2: " << (m1 != m2) << std::endl;
    std::cout << "m1 < m2: " << (m1 < m2) << std::endl;
    std::cout << "m1 <= m2: " << (m1 <= m2) << std::endl;
    std::cout << "m1 > m2: " << (m1 > m2) << std::endl;
    std::cout << "m1 >= m2: " << (m1 >= m2) << std::endl;
    
    return 0;
}`,
    expectedOutput: '=== Spaceship Operator Demo ===\n=== Money Comparison Test ===\n100 EUR < 100 USD (currency comparison)\n100 USD < 150 USD (amount comparison)\n100 USD == 100 USD (equal values)\n\n=== Stock Price Comparison Test ===\nAAPL($150) < GOOGL($2500) (alphabetical symbols)\nTSLA(NaN) incomparable with AAPL($150) (NaN handling)\nMSFT($300) > AAPL($150) (same symbol prefix, price comparison)\n\n=== Instrument Sorting Test ===\nBefore sorting:\nTSLA (Stock) - Value: 800 USD, Risk: 8.5\nUS10Y (Bond) - Value: 1000 USD, Risk: 2.0\nAAPL (Stock) - Value: 1500 USD, Risk: 5.0\n\nAfter sorting:\nUS10Y (Bond) - Value: 1000 USD, Risk: 2.0\nAAPL (Stock) - Value: 1500 USD, Risk: 5.0\nTSLA (Stock) - Value: 800 USD, Risk: 8.5\n\n=== Portfolio Comparison Test ===\nTech Portfolio: $5000, 3 instruments\nBond Portfolio: $3000, 2 instruments\nTech Portfolio > Bond Portfolio (by value)\n\n=== All Comparison Operators Work ===\nm1 == m2: 0\nm1 != m2: 1\nm1 < m2: 1\nm1 <= m2: 1\nm1 > m2: 0\nm1 >= m2: 0',
    hints: [
      'Money comparison: compare currency string first, then amount',
      'StockPrice needs partial_ordering due to NaN handling',
      'std::isnan() to check for invalid prices in equality',
      'FinancialInstrument: use std::tuple for lexicographic comparison',
      'Portfolio comparison needs total_value() calculation',
      'Use std::strong_ordering for most financial comparisons',
      'Spaceship operator automatically generates all six comparison operators'
    ],
    feature: 'spaceship-operator',
    relatedTheory: 'spaceship-operator'
  },

  // === MISSING EXERCISES ADDED ===

  // Return Type Deduction Exercise
  {
    id: 'return-type-deduction-exercise',
    title: 'Advanced Return Type Deduction',
    standard: 'cpp14',
    difficulty: 'intermediate',
    description: 'Master return type deduction with auto and decltype(auto) in complex scenarios including perfect forwarding and conditional returns.',
    starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <type_traits>

// TODO: Implement a generic factory function that uses auto return type deduction
// The function should create objects based on a type parameter and forward arguments
template<typename T, typename... Args>
/* TODO: Add return type */ create_object(Args&&... args) {
    // TODO: Implement using perfect forwarding
}

// TODO: Implement a function that returns different types based on conditions
// Use auto return type deduction with trailing return type if needed
template<typename T>
/* TODO: Add return type */ get_value_or_default(const std::vector<T>& vec, size_t index) {
    // TODO: Return vec[index] if valid, otherwise return T{}
}

// TODO: Implement a function that uses decltype(auto) for perfect forwarding of return values
template<typename Container>
/* TODO: Add return type */ get_first_element(Container&& container) {
    // TODO: Return first element preserving reference type (lvalue/rvalue)
}

// TODO: Implement a lambda with auto return type that works with multiple types
// The lambda should perform different operations based on input type
int main() {
    std::cout << "=== Return Type Deduction Exercise ===\\n";
    
    // Test factory function
    // TODO: Create a std::string using create_object
    // TODO: Create a std::vector<int> using create_object
    
    // Test conditional return
    std::vector<int> numbers = {10, 20, 30};
    // TODO: Test get_value_or_default with valid and invalid indices
    
    // Test decltype(auto) forwarding
    // TODO: Test with lvalue and rvalue containers
    
    // TODO: Create and test the multi-type lambda
    
    return 0;
}`,
    expectedOutput: `=== Return Type Deduction Exercise ===
Factory created string: Hello World
Factory created vector size: 3
Valid index value: 20
Invalid index default: 0
First element (lvalue): 10
First element (rvalue): 100
Lambda with int: Result: 42
Lambda with string: Length: 5
Lambda with double: Rounded: 3`,
    hints: [
      'Use auto for simple return type deduction: auto function() { return value; }',
      'Use decltype(auto) for perfect forwarding: decltype(auto) func(T&& t) { return std::forward<T>(t); }',
      'For conditional returns, ensure all return paths have the same type',
      'Perfect forwarding in factory: return T(std::forward<Args>(args)...);',
      'Use trailing return type for complex deduction: auto func() -> decltype(expression)',
      'decltype(auto) preserves reference types and cv-qualifiers',
      'Generic lambdas can use auto parameters: [](auto&& x) { return process(x); }'
    ],
    feature: 'return-type-deduction',
    relatedTheory: 'return-type-deduction'
  },

  // std::make_unique Exercise
  {
    id: 'make-unique-exercise',
    title: 'Smart Pointer Creation with make_unique',
    standard: 'cpp14',
    difficulty: 'beginner',
    description: 'Learn to use std::make_unique for safe and efficient memory management, including arrays and custom deleters.',
    starterCode: `#include <iostream>
#include <memory>
#include <vector>
#include <string>

// Custom class for testing
class Resource {
private:
    std::string name_;
    int value_;
public:
    Resource(const std::string& name, int value) : name_(name), value_(value) {
        std::cout << "Resource '" << name_ << "' created with value " << value_ << "\\n";
    }
    
    ~Resource() {
        std::cout << "Resource '" << name_ << "' destroyed\\n";
    }
    
    void use() const {
        std::cout << "Using resource '" << name_ << "' (value: " << value_ << ")\\n";
    }
    
    const std::string& name() const { return name_; }
    int value() const { return value_; }
};

// TODO: Implement a factory function using make_unique
std::unique_ptr<Resource> create_resource(const std::string& name, int value) {
    // TODO: Use std::make_unique instead of new
}

// TODO: Implement a function that creates an array using make_unique
std::unique_ptr<int[]> create_number_array(size_t size) {
    // TODO: Create array and initialize with values 0, 1, 2, ...
}

int main() {
    std::cout << "=== make_unique Exercise ===\\n";
    
    // TODO: Create a single Resource using make_unique
    // TODO: Use the resource
    
    std::cout << "\\n--- Factory Function ---\\n";
    // TODO: Use the factory function to create a resource
    
    std::cout << "\\n--- Array Creation ---\\n";
    // TODO: Create an array of 5 integers using make_unique
    // TODO: Print the array values
    
    std::cout << "\\n--- Container of unique_ptrs ---\\n";
    // TODO: Create a vector of unique_ptrs to Resources
    // TODO: Add 3 resources using make_unique and emplace_back
    
    // TODO: Iterate through the vector and use each resource
    
    std::cout << "\\n--- Move Semantics ---\\n";
    // TODO: Demonstrate moving a unique_ptr
    
    return 0;
}`,
    expectedOutput: `=== make_unique Exercise ===
Resource 'MainResource' created with value 42
Using resource 'MainResource' (value: 42)

--- Factory Function ---
Resource 'FactoryResource' created with value 100
Using resource 'FactoryResource' (value: 100)
Resource 'FactoryResource' destroyed

--- Array Creation ---
Array values: 0 1 2 3 4 

--- Container of unique_ptrs ---
Resource 'Item1' created with value 1
Resource 'Item2' created with value 2
Resource 'Item3' created with value 3
Using resource 'Item1' (value: 1)
Using resource 'Item2' (value: 2)
Using resource 'Item3' (value: 3)

--- Move Semantics ---
Resource 'Movable' created with value 99
Resource moved successfully
Using moved resource 'Movable' (value: 99)
Resource 'Movable' destroyed
Resource 'Item3' destroyed
Resource 'Item2' destroyed
Resource 'Item1' destroyed
Resource 'MainResource' destroyed`,
    hints: [
      'Use std::make_unique<Type>(args...) instead of new Type(args...)',
      'For arrays: std::make_unique<Type[]>(size)',
      'make_unique is exception-safe and more efficient than new',
      'Factory function: return std::make_unique<Resource>(name, value);',
      'Initialize array elements in a loop after creation',
      'Use emplace_back with make_unique for containers',
      'Move unique_ptrs with std::move()'
    ],
    feature: 'std-make-unique',
    relatedTheory: 'std-make-unique'
  },

  // if constexpr Exercise  
  {
    id: 'if-constexpr-exercise',
    title: 'Compile-time Conditional Logic',
    standard: 'cpp17',
    difficulty: 'advanced',
    description: 'Master if constexpr for compile-time branching, template specialization avoidance, and type-dependent code generation.',
    starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <type_traits>

// TODO: Implement a generic print function that handles different types differently
template<typename T>
void print_value(const T& value) {
    // TODO: Use if constexpr to handle different types:
    // - For integers: print "Integer: <value>"
    // - For floating point: print "Float: <value>" with 2 decimal places
    // - For strings: print "String: '<value>' (length: <length>)"
    // - For containers: print "Container with <size> elements: [elements...]"
    // - For other types: print "Other type: <value>"
}

// TODO: Implement a generic serializer that works differently based on type
template<typename T>
std::string serialize(const T& value) {
    // TODO: Use if constexpr for different serialization strategies:
    // - Arithmetic types: convert to string
    // - String types: add quotes
    // - Containers: serialize as JSON-like array
    // - Other types: use generic approach
}

// TODO: Implement a generic algorithm that adapts based on iterator category
template<typename Iterator>
auto advance_iterator(Iterator it, int n) {
    // TODO: Use if constexpr to optimize based on iterator category:
    // - Random access: use it + n
    // - Bidirectional: use std::advance
    // - Forward: use std::advance
    return it;
}

// TODO: Implement a constexpr factorial that uses if constexpr for recursion termination
template<int N>
constexpr int factorial() {
    // TODO: Use if constexpr to handle base case and recursion
}

int main() {
    std::cout << "=== if constexpr Exercise ===\\n";
    
    // Test print_value with different types
    std::cout << "--- Generic Print Function ---\\n";
    // TODO: Test with int, double, string, vector
    
    std::cout << "\\n--- Generic Serializer ---\\n";  
    // TODO: Test serialization with different types
    
    std::cout << "\\n--- Iterator Optimization ---\\n";
    // TODO: Test with different iterator types
    
    std::cout << "\\n--- Compile-time Factorial ---\\n";
    // TODO: Test factorial with different values
    
    return 0;
}`,
    expectedOutput: `=== if constexpr Exercise ===
--- Generic Print Function ---
Integer: 42
Float: 3.14
String: 'Hello World' (length: 11)
Container with 4 elements: [1, 2, 3, 4]

--- Generic Serializer ---
Integer serialized: "42"
String serialized: "Hello"
Vector serialized: [1, 2, 3]

--- Iterator Optimization ---
Random access iterator advanced
Bidirectional iterator advanced
Forward iterator advanced

--- Compile-time Factorial ---
factorial<5> = 120
factorial<0> = 1
factorial<7> = 5040`,
    hints: [
      'Use if constexpr (condition) for compile-time branching',
      'Check types with std::is_same_v<T, Type> or std::is_arithmetic_v<T>',
      'For containers, use SFINAE or concepts to detect begin()/end()',
      'Iterator categories: std::is_same_v<typename std::iterator_traits<Iterator>::iterator_category, std::random_access_iterator_tag>',
      'Constexpr recursion: if constexpr (N == 0) return 1; else return N * factorial<N-1>();',
      'Use std::setprecision for floating point formatting',
      'Check for container types with decltype and SFINAE patterns'
    ],
    feature: 'if-constexpr',
    relatedTheory: 'if-constexpr'
  },

  // std::string_view Exercise
  {
    id: 'string-view-exercise',
    title: 'Efficient String Processing with string_view',
    standard: 'cpp17',
    difficulty: 'intermediate',
    description: 'Master std::string_view for efficient string processing without unnecessary copies, including parsing and text analysis.',
    starterCode: `#include <iostream>
#include <string_view>
#include <string>
#include <vector>
#include <algorithm>
#include <charconv>

// TODO: Implement a function to count words in a string_view
size_t count_words(std::string_view text) {
    // TODO: Count words separated by whitespace
    // Don't create any string copies!
}

// TODO: Implement a function to find all occurrences of a substring
std::vector<size_t> find_all(std::string_view text, std::string_view pattern) {
    std::vector<size_t> positions;
    // TODO: Find all positions where pattern occurs in text
    return positions;
}

// TODO: Implement a simple CSV parser using string_view
std::vector<std::string_view> parse_csv_line(std::string_view line) {
    std::vector<std::string_view> fields;
    // TODO: Split the line by commas, return string_views to each field
    return fields;
}

// TODO: Implement a function to trim whitespace from both ends
std::string_view trim(std::string_view text) {
    // TODO: Return a string_view with leading and trailing whitespace removed
}

// TODO: Implement a function to check if string_view starts with a prefix
bool starts_with(std::string_view text, std::string_view prefix) {
    // TODO: Check if text starts with prefix (don't use C++20 starts_with)
}

// TODO: Implement a function to convert string_view to number safely
template<typename T>
bool parse_number(std::string_view text, T& result) {
    // TODO: Use std::from_chars to parse number from string_view
    // Return true if successful, false otherwise
}

int main() {
    std::cout << "=== string_view Exercise ===\\n";
    
    const std::string text = "Hello world this is a test string with multiple words";
    const char* c_string = "C-style string processing";
    
    std::cout << "--- Word Counting ---\\n";
    // TODO: Test count_words with different inputs
    
    std::cout << "\\n--- Pattern Finding ---\\n";
    // TODO: Find all occurrences of "is" and "test" in the text
    
    std::cout << "\\n--- CSV Parsing ---\\n";
    std::string csv_line = "John,25,Engineer,New York";
    // TODO: Parse the CSV line and print each field
    
    std::cout << "\\n--- String Trimming ---\\n";
    std::string padded = "   trim me   ";
    // TODO: Test trimming functionality
    
    std::cout << "\\n--- Prefix Checking ---\\n";  
    // TODO: Test starts_with with various inputs
    
    std::cout << "\\n--- Number Parsing ---\\n";
    // TODO: Parse numbers from string_views
    
    return 0;
}`,
    expectedOutput: `=== string_view Exercise ===
--- Word Counting ---
Text word count: 10
C-string word count: 3

--- Pattern Finding ---
Pattern "is" found at positions: 2, 5
Pattern "test" found at positions: 6

--- CSV Parsing ---
Field 0: 'John'
Field 1: '25' 
Field 2: 'Engineer'
Field 3: 'New York'

--- String Trimming ---
Original: '   trim me   '
Trimmed: 'trim me'

--- Prefix Checking ---
'Hello world' starts with 'Hello': true
'Hello world' starts with 'World': false

--- Number Parsing ---
Parsed integer: 12345
Parsed double: 123.45
Invalid number parsing failed correctly`,
    hints: [
      'string_view provides efficient string operations without copying',
      'Use string_view::find and string_view::find_first_not_of for parsing',
      'Count words by counting transitions from whitespace to non-whitespace',
      'substr() on string_view returns another string_view (no copy)',
      'Use std::from_chars for efficient string-to-number conversion',
      'Trimming: find_first_not_of(" \\t\\n") and find_last_not_of(" \\t\\n")',
      'For CSV: use find(',') and substr() in a loop'
    ],
    feature: 'std-string-view',
    relatedTheory: 'std-string-view'
  },

  // std::variant Exercise
  {
    id: 'variant-exercise',
    title: 'Type-Safe Unions with std::variant',
    standard: 'cpp17',
    difficulty: 'advanced',
    description: 'Master std::variant for type-safe unions, visitor pattern implementation, and polymorphic data handling.',
    starterCode: `#include <iostream>
#include <variant>
#include <string>
#include <vector>
#include <memory>

// TODO: Define a variant for different data types in a configuration system
using ConfigValue = std::variant<int, double, std::string, bool>;

// TODO: Define a variant for different geometric shapes
struct Circle { double radius; };
struct Rectangle { double width, height; };  
struct Triangle { double base, height; };

using Shape = std::variant<Circle, Rectangle, Triangle>;

// TODO: Implement a visitor to calculate area of shapes
struct AreaCalculator {
    // TODO: Implement operator() for each shape type
};

// TODO: Implement a generic visitor to print configuration values
struct ConfigPrinter {
    // TODO: Implement operator() for each config type
};

// TODO: Implement a function to parse string into appropriate ConfigValue
ConfigValue parse_config_value(const std::string& input) {
    // TODO: Try to parse as bool, int, double, or keep as string
    // Return the most appropriate type
}

// TODO: Implement a function that processes a variant and returns a string description
template<typename T>
std::string describe_variant(const T& variant_value) {
    // TODO: Use std::visit to create a description string
}

int main() {
    std::cout << "=== std::variant Exercise ===\\n";
    
    // Test configuration system
    std::cout << "--- Configuration System ---\\n";
    std::vector<ConfigValue> config = {
        42,           // int
        3.14,         // double  
        std::string("hello"), // string
        true          // bool
    };
    
    // TODO: Print all config values using visitor
    
    std::cout << "\\n--- Shape Area Calculation ---\\n";
    std::vector<Shape> shapes = {
        Circle{5.0},
        Rectangle{4.0, 6.0},
        Triangle{3.0, 8.0}
    };
    
    // TODO: Calculate and print area of each shape
    
    std::cout << "\\n--- Dynamic Config Parsing ---\\n";
    std::vector<std::string> inputs = {"123", "45.67", "true", "hello_world"};
    
    // TODO: Parse each input and show the resulting type
    
    std::cout << "\\n--- Variant Type Checking ---\\n";
    ConfigValue mixed_value = 42;
    
    // TODO: Demonstrate std::holds_alternative and std::get_if
    
    // TODO: Change the variant value and test again
    
    return 0;
}`,
    expectedOutput: `=== std::variant Exercise ===
--- Configuration System ---
Config[0]: 42 (integer)
Config[1]: 3.14 (double)
Config[2]: hello (string)
Config[3]: true (boolean)

--- Shape Area Calculation ---
Circle area: 78.54
Rectangle area: 24
Triangle area: 12

--- Dynamic Config Parsing ---
"123" -> 123 (integer)
"45.67" -> 45.67 (double)  
"true" -> true (boolean)
"hello_world" -> hello_world (string)

--- Variant Type Checking ---
Value holds integer: true
Integer value: 42
After change - holds string: true
String value: changed`,
    hints: [
      'std::variant can hold one of several specified types',
      'Use std::visit with visitor pattern for type-safe operations',
      'std::holds_alternative<T>(variant) checks if variant holds type T',
      'std::get<T>(variant) extracts value of type T (throws if wrong type)',
      'std::get_if<T>(&variant) returns pointer to T or nullptr',
      'Visitor structs need operator() for each variant type',
      'For parsing, try conversions in order: bool -> int -> double -> string',
      'std::variant automatically handles construction from compatible types'
    ],
    feature: 'std-variant',
    relatedTheory: 'std-variant'
  },

  // std::any Exercise
  {
    id: 'any-exercise',
    title: 'Type-Erased Storage with std::any',
    standard: 'cpp17',
    difficulty: 'intermediate',
    description: 'Learn std::any for type-erased storage, runtime polymorphism, and flexible data containers.',
    starterCode: `#include <iostream>
#include <any>
#include <string>
#include <vector>
#include <typeinfo>
#include <map>

// TODO: Implement a flexible property system using std::any
class PropertyBag {
private:
    std::map<std::string, std::any> properties_;
    
public:
    // TODO: Implement set method to store any type
    template<typename T>
    void set(const std::string& key, const T& value) {
        // TODO: Store value in properties map
    }
    
    // TODO: Implement get method to retrieve typed value
    template<typename T>
    T get(const std::string& key) const {
        // TODO: Retrieve and cast value, throw if wrong type
    }
    
    // TODO: Implement has method to check if property exists
    bool has(const std::string& key) const {
        // TODO: Check if key exists in properties
    }
    
    // TODO: Implement get_type method to get type information
    std::string get_type(const std::string& key) const {
        // TODO: Return type name of stored value
    }
    
    // TODO: Implement safe_get method that returns optional-like result
    template<typename T>
    bool safe_get(const std::string& key, T& result) const {
        // TODO: Try to get value, return true if successful
    }
};

// TODO: Implement a function that processes a vector of std::any values
void process_mixed_data(const std::vector<std::any>& data) {
    // TODO: Iterate through data and handle different types appropriately
    // Handle at least: int, double, string, bool
}

// TODO: Implement a generic container that can store different types
class FlexibleContainer {
private:
    std::vector<std::any> items_;
    
public:
    // TODO: Add method to append any type
    template<typename T>
    void add(const T& item) {
        // TODO: Add item to container
    }
    
    // TODO: Get method with type checking
    template<typename T>
    T get(size_t index) const {
        // TODO: Get item at index with type check
    }
    
    // TODO: Method to get type at index
    std::string type_at(size_t index) const {
        // TODO: Return type name at index
    }
    
    size_t size() const { return items_.size(); }
};

int main() {
    std::cout << "=== std::any Exercise ===\\n";
    
    // Test PropertyBag
    std::cout << "--- Property Bag System ---\\n";
    PropertyBag config;
    
    // TODO: Set various properties of different types
    // TODO: Retrieve and print properties
    // TODO: Demonstrate type safety
    
    std::cout << "\\n--- Mixed Data Processing ---\\n";
    std::vector<std::any> mixed_data = {
        42,
        3.14,
        std::string("hello"),
        true,
        'A'
    };
    
    // TODO: Process the mixed data
    
    std::cout << "\\n--- Flexible Container ---\\n";
    FlexibleContainer container;
    
    // TODO: Add different types to container
    // TODO: Retrieve and display items with their types
    
    std::cout << "\\n--- Type Safety Demo ---\\n";
    std::any value = 42;
    
    // TODO: Demonstrate std::any_cast, type checking, and error handling
    
    return 0;
}`,
    expectedOutput: `=== std::any Exercise ===
--- Property Bag System ---
Set name: John
Set age: 30
Set height: 5.9
Property 'name': John (type: string)
Property 'age': 30 (type: int)
Property 'height': 5.9 (type: double)
Safe get successful: John

--- Mixed Data Processing ---
Processing int: 42
Processing double: 3.14
Processing string: hello
Processing bool: true
Processing char: A

--- Flexible Container ---
Container[0]: 100 (type: int)
Container[1]: Hello World (type: string)
Container[2]: 2.71 (type: double)

--- Type Safety Demo ---
Value holds int: 42
Type check passed for int
Type check failed for string (as expected)
Changed to string: "Hello Any!"`,
    hints: [
      'std::any can store any type but loses type information',
      'Use std::any_cast<T> to extract values (throws std::bad_any_cast if wrong type)',
      'Check type with value.type() == typeid(T)',
      'std::any is empty when default-constructed or reset',
      'Use has_value() to check if any contains a value',
      'Store in PropertyBag: properties_[key] = std::any(value);',
      'For safe operations, use try-catch around any_cast',
      'typeid().name() returns implementation-specific type name'
    ],
    feature: 'std-any',
    relatedTheory: 'std-any'
  },

  // std::span Exercise
  {
    id: 'span-exercise',
    title: 'Non-owning Array Views with std::span',
    standard: 'cpp20',
    difficulty: 'intermediate',
    description: 'Master std::span for safe, efficient array and container access without ownership transfer.',
    starterCode: `#include <iostream>
#include <span>
#include <vector>
#include <array>
#include <algorithm>
#include <numeric>

// TODO: Implement a function that processes any contiguous sequence
template<typename T>
void print_sequence(std::span<const T> data) {
    // TODO: Print all elements in the span with indices
}

// TODO: Implement a function that finds the maximum value in a span
template<typename T>
T find_maximum(std::span<const T> data) {
    // TODO: Find and return maximum value
    // Handle empty span appropriately
}

// TODO: Implement a function that modifies elements through a span
template<typename T>
void multiply_by_two(std::span<T> data) {
    // TODO: Multiply each element by 2
}

// TODO: Implement a function that calculates statistics
template<typename T>
struct Statistics {
    T sum;
    T mean;
    T min;
    T max;
    size_t count;
};

template<typename T>
Statistics<T> calculate_stats(std::span<const T> data) {
    Statistics<T> stats{};
    // TODO: Calculate sum, mean, min, max, count
    return stats;
}

// TODO: Implement a function that creates subspans
template<typename T>  
void analyze_subranges(std::span<const T> data) {
    // TODO: Create and analyze first half, second half, and middle portion
    // Handle edge cases for odd-sized spans
}

// TODO: Implement a safe array accessor that returns span
template<typename T, size_t N>
std::span<T> safe_array_access(std::array<T, N>& arr, size_t start, size_t count) {
    // TODO: Return subspan with bounds checking
    // Return empty span if invalid range
}

int main() {
    std::cout << "=== std::span Exercise ===\\n";
    
    // Test with different container types
    std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    std::array<double, 5> arr = {1.1, 2.2, 3.3, 4.4, 5.5};
    int c_array[] = {10, 20, 30, 40, 50};
    
    std::cout << "--- Printing Sequences ---\\n";
    // TODO: Print all three sequences using the same function
    
    std::cout << "\\n--- Finding Maximum ---\\n";
    // TODO: Find maximum in each container
    
    std::cout << "\\n--- Modifying Through Span ---\\n";
    // TODO: Double all values and show results
    
    std::cout << "\\n--- Statistical Analysis ---\\n";
    // TODO: Calculate statistics for the vector
    
    std::cout << "\\n--- Subrange Analysis ---\\n";
    // TODO: Analyze subranges of the vector
    
    std::cout << "\\n--- Safe Array Access ---\\n";
    // TODO: Test safe array access with valid and invalid ranges
    
    std::cout << "\\n--- Span Operations ---\\n";
    // TODO: Demonstrate span slicing, empty checks, and size operations
    
    return 0;
}`,
    expectedOutput: `=== std::span Exercise ===
--- Printing Sequences ---
Vector: [0]:1 [1]:2 [2]:3 [3]:4 [4]:5 [5]:6 [6]:7 [7]:8 [8]:9 [9]:10
Array: [0]:1.1 [1]:2.2 [2]:3.3 [3]:4.4 [4]:5.5
C-array: [0]:10 [1]:20 [2]:30 [3]:40 [4]:50

--- Finding Maximum ---
Vector maximum: 10
Array maximum: 5.5
C-array maximum: 50

--- Modifying Through Span ---
Doubled vector: 2 4 6 8 10 12 14 16 18 20
Doubled array: 2.2 4.4 6.6 8.8 11
Doubled C-array: 20 40 60 80 100

--- Statistical Analysis ---
Statistics: count=10, sum=110, mean=11, min=2, max=20

--- Subrange Analysis ---
First half: [2, 4, 6, 8, 10]
Second half: [12, 14, 16, 18, 20]
Middle portion: [6, 8, 10, 12, 14]

--- Safe Array Access ---
Safe access [1,3]: [4.4, 6.6, 8.8]
Invalid access: empty span returned

--- Span Operations ---
Span size: 10
Span is not empty
First 3 elements: [2, 4, 6]
Last 3 elements: [16, 18, 20]`,
    hints: [
      'std::span provides a view over contiguous memory without ownership',
      'Use std::span<const T> for read-only access',
      'Create spans from containers: std::span(container)',  
      'Subspans: span.subspan(offset, count) or span.first(n), span.last(n)',
      'Check bounds: if (start + count <= arr.size())',
      'std::span works with vectors, arrays, and C-arrays',
      'Empty span: return std::span<T>{}; or span.empty() to check',
      'Use std::ranges algorithms with spans for modern C++ style'
    ],
    feature: 'std-span',
    relatedTheory: 'std-span'
  },

  // consteval Exercise
  {
    id: 'consteval-exercise',
    title: 'Immediate Functions with consteval',
    standard: 'cpp20',
    difficulty: 'advanced',
    description: 'Master consteval for functions that must be evaluated at compile-time, ensuring zero runtime cost.',
    starterCode: `#include <iostream>
#include <array>
#include <string_view>
#include <cmath>

// TODO: Implement a consteval function to compute factorial
consteval int factorial(int n) {
    // TODO: Implement factorial calculation
    // Must be computable at compile-time
}

// TODO: Implement a consteval function to compute Fibonacci numbers
consteval long long fibonacci(int n) {
    // TODO: Implement Fibonacci calculation
    // Use iterative approach for better compile-time performance
}

// TODO: Implement a consteval function to check if a number is prime
consteval bool is_prime(int n) {
    // TODO: Implement prime checking
    // Must work at compile-time
}

// TODO: Implement a consteval function to compute string hash at compile-time
consteval std::size_t compile_time_hash(std::string_view str) {
    // TODO: Implement simple hash function (e.g., djb2 algorithm)
    std::size_t hash = 5381;
    // TODO: Complete the hash calculation
    return hash;
}

// TODO: Implement a consteval function to generate lookup tables
template<int Size>
consteval std::array<int, Size> generate_squares() {
    std::array<int, Size> result{};
    // TODO: Fill array with squares of indices (0^2, 1^2, 2^2, ...)
    return result;
}

// TODO: Implement a consteval function for compile-time string operations
consteval int count_vowels(std::string_view str) {
    // TODO: Count vowels (a, e, i, o, u) in the string
    int count = 0;
    // TODO: Implement counting logic
    return count;
}

// TODO: Create a compile-time configuration system
struct CompileTimeConfig {
    int version;
    bool debug_mode;
    int max_connections;
    
    // TODO: Add consteval constructor for validation
    consteval CompileTimeConfig(int v, bool debug, int max_conn) 
        : version(v), debug_mode(debug), max_connections(max_conn) {
        // TODO: Add compile-time validation
        // Version must be positive, max_connections must be reasonable
    }
};

// TODO: Implement consteval function to create compile-time switch/case
template<int Value>
consteval const char* number_to_string() {
    // TODO: Convert numbers 0-9 to string names
    // Return "unknown" for other values
}

int main() {
    std::cout << "=== consteval Exercise ===\\n";
    
    // Test factorial
    std::cout << "--- Factorial (compile-time) ---\\n";
    // TODO: Test factorial with different values
    // These should all be computed at compile-time!
    
    std::cout << "\\n--- Fibonacci (compile-time) ---\\n";
    // TODO: Test Fibonacci with different values
    
    std::cout << "\\n--- Prime Checking (compile-time) ---\\n";
    // TODO: Test prime checking with various numbers
    
    std::cout << "\\n--- String Hashing (compile-time) ---\\n";
    // TODO: Test compile-time string hashing
    
    std::cout << "\\n--- Lookup Table Generation ---\\n";
    // TODO: Generate and display squares lookup table
    
    std::cout << "\\n--- String Analysis (compile-time) ---\\n";
    // TODO: Count vowels in various strings at compile-time
    
    std::cout << "\\n--- Compile-time Configuration ---\\n";
    // TODO: Create and use compile-time configuration
    
    std::cout << "\\n--- Number to String (compile-time) ---\\n";
    // TODO: Test number to string conversion
    
    // Demonstrate that these are truly compile-time
    std::cout << "\\n--- Compile-time Proof ---\\n";
    constexpr int compile_time_result = factorial(5);
    std::cout << "Factorial result stored in constexpr: " << compile_time_result << "\\n";
    
    return 0;
}`,
    expectedOutput: `=== consteval Exercise ===
--- Factorial (compile-time) ---
factorial(5) = 120
factorial(0) = 1  
factorial(7) = 5040

--- Fibonacci (compile-time) ---
fibonacci(10) = 55
fibonacci(15) = 610
fibonacci(20) = 6765

--- Prime Checking (compile-time) ---
is_prime(17) = true
is_prime(18) = false
is_prime(97) = true

--- String Hashing (compile-time) ---
hash("hello") = 210714636441
hash("world") = 267487018924
hash("consteval") = 1934944949833

--- Lookup Table Generation ---
Squares table: 0 1 4 9 16 25 36 49 64 81

--- String Analysis (compile-time) ---
"hello world" has 3 vowels
"programming" has 3 vowels  
"consteval" has 4 vowels

--- Compile-time Configuration ---
Config: version=1, debug=true, max_connections=100

--- Number to String (compile-time) ---
0 -> "zero"
5 -> "five"  
9 -> "nine"
15 -> "unknown"

--- Compile-time Proof ---
Factorial result stored in constexpr: 120`,
    hints: [
      'consteval functions MUST be evaluated at compile-time',
      'All parameters must be constant expressions',  
      'Use recursive approach carefully - watch compile-time limits',
      'String operations: iterate with for loop over string_view',
      'Hash function: hash = hash * 33 + static_cast<unsigned char>(c)',
      'Array initialization: use constexpr for loops in consteval context',
      'Validation: use static_assert-like logic but with exceptions/aborts',
      'Template specialization can help with compile-time string conversion'
    ],
    feature: 'consteval',
    relatedTheory: 'consteval'
  },

  // Digit Separators & Binary Literals Exercise
  {
    id: 'digit-separators-binary-literals-exercise',
    title: 'Enhanced Numeric Literals',
    standard: 'cpp14',
    difficulty: 'beginner',
    description: 'Learn to use digit separators and binary literals for more readable and maintainable numeric constants.',
    starterCode: `#include <iostream>
#include <bitset>
#include <iomanip>

int main() {
    std::cout << "=== Enhanced Numeric Literals Exercise ===\\n";
    
    // TODO: Define large numbers using digit separators for readability
    // Examples: millions, file sizes, memory addresses
    
    std::cout << "--- Large Numbers with Separators ---\\n";
    // TODO: Create variables for:
    // - Population of a major city (e.g., 8_500_000)
    // - File size in bytes (e.g., 1_073_741_824 for 1GB)
    // - National debt (use a very large number)
    
    std::cout << "\\n--- Binary Literals for Bit Manipulation ---\\n";
    // TODO: Define binary constants for:
    // - File permissions (rwxrwxrwx = 0b111_111_111)
    // - Status flags (8-bit register with specific bits set)
    // - Network masks (e.g., 0b1111_1111_1111_1111_1111_1111_0000_0000)
    
    std::cout << "\\n--- Hexadecimal with Separators ---\\n";
    // TODO: Define hex values with separators:
    // - Memory addresses
    // - Color codes
    // - Magic numbers
    
    std::cout << "\\n--- Mixed Base Demonstrations ---\\n";
    // TODO: Show the same value in different bases:
    // - Decimal with separators
    // - Binary with separators  
    // - Hexadecimal with separators
    // - Octal
    
    std::cout << "\\n--- Bit Pattern Analysis ---\\n";
    // TODO: Create bit patterns and analyze them:
    // - Show binary representation using std::bitset
    // - Demonstrate bit operations with readable constants
    
    std::cout << "\\n--- Financial Calculations ---\\n";
    // TODO: Use separators for financial values:
    // - Large monetary amounts
    // - Precise decimal calculations (avoid floating point issues)
    
    std::cout << "\\n--- Configuration Constants ---\\n";
    // TODO: Define configuration values using appropriate literals:
    // - Timeout values in milliseconds
    // - Buffer sizes
    // - Protocol constants
    
    return 0;
}`,
    expectedOutput: `=== Enhanced Numeric Literals Exercise ===
--- Large Numbers with Separators ---
NYC Population: 8,500,000
1GB File Size: 1,073,741,824 bytes
National Debt: $28,000,000,000,000

--- Binary Literals for Bit Manipulation ---
File Permissions (rwxrwxrwx): 511 (binary: 111111111)
Status Register: 170 (binary: 10101010)  
Network Mask: 4294967040 (binary: 11111111111111111111111100000000)

--- Hexadecimal with Separators ---
Memory Address: 0x7FFF_5FBF_F000
Red Color: 0xFF_00_00
Magic Number: 0xDEAD_BEEF

--- Mixed Base Demonstrations ---
Value 1000000:
  Decimal: 1,000,000
  Binary: 0b11110100001001000000 
  Hex: 0xF4240
  Octal: 03641100

--- Bit Pattern Analysis ---
Flags 0b1010_1010:
  Binary: 10101010
  Set bits: 2, 4, 6, 8
  AND with 0b1111_0000: 10100000
  OR with 0b0000_1111: 10101111

--- Financial Calculations ---
Stock Price: $1,234.56 (as cents: 123,456)
Market Cap: $500,000,000,000
Bond Value: $10,000,000.00

--- Configuration Constants ---
Timeout: 30,000 ms (30 seconds)
Buffer Size: 64,536 bytes
HTTP Port: 8,080
Max Connections: 10,000`,
    hints: [
      'Use underscores (_) as digit separators: 1_000_000',
      'Binary literals start with 0b: 0b1010_1010', 
      'Separators can be used in any numeric base',
      'Separators improve readability but don\'t affect the value',
      'Use std::bitset to display binary representations',
      'Good practice: group binary digits by 4 or 8',
      'Financial: consider using integer cents instead of floating point',
      'Hex separators often group by 2 or 4 digits for readability'
    ],
    feature: 'digit-separators-binary-literals',
    relatedTheory: 'digit-separators-binary-literals'
  },

  // Inline Variables Exercise
  {
    id: 'inline-variables-exercise',
    title: 'Header-only Variable Definitions',
    standard: 'cpp17',
    difficulty: 'intermediate',
    description: 'Master inline variables for header-only libraries, avoiding ODR violations and reducing linking complexity.',
    starterCode: `// config.hpp - Header file with inline variables
#pragma once
#include <string>
#include <map>
#include <chrono>

// TODO: Define inline variables for application configuration
// These can be defined in header without ODR violations

namespace AppConfig {
    // TODO: Define inline version information
    inline const std::string version = "1.0.0";
    inline const int major_version = 1;
    inline const int minor_version = 0;
    inline const int patch_version = 0;
    
    // TODO: Define inline build configuration
    // TODO: Define inline default settings
    // TODO: Define inline limits and constants
}

// TODO: Create a template variable with inline specifier
template<typename T>
inline constexpr bool is_numeric_v = std::is_arithmetic_v<T>;

// TODO: Create inline variable for registry pattern
inline std::map<std::string, int> global_registry;

// TODO: Create inline variable for singleton-like behavior
struct Logger {
    void log(const std::string& msg) {
        std::cout << "[LOG] " << msg << std::endl;
    }
};

// TODO: Define inline logger instance
inline Logger& get_logger() {
    static Logger instance;
    return instance;
}

// === MAIN EXERCISE FILE ===
#include <iostream>
#include <vector>
#include <type_traits>

int main() {
    std::cout << "=== Inline Variables Exercise ===\\n";
    
    // TODO: Use the inline configuration variables
    std::cout << "--- Application Configuration ---\\n";
    // TODO: Display version information
    // TODO: Display build configuration
    // TODO: Display default settings
    
    std::cout << "\\n--- Template Variable Usage ---\\n";
    // TODO: Test the is_numeric_v template variable with different types
    
    std::cout << "\\n--- Global Registry Usage ---\\n";  
    // TODO: Add entries to global registry
    // TODO: Display registry contents
    
    std::cout << "\\n--- Singleton Logger Usage ---\\n";
    // TODO: Use the inline logger from multiple places
    
    std::cout << "\\n--- Performance Constants ---\\n";
    // TODO: Define and use inline performance-related constants
    
    std::cout << "\\n--- Feature Flags ---\\n";
    // TODO: Create inline boolean feature flags
    
    return 0;
}`,
    expectedOutput: `=== Inline Variables Exercise ===
--- Application Configuration ---
Version: 1.0.0
Version Components: 1.0.0
Build Type: Debug
Build Date: 2024-01-15
Default Timeout: 30000ms
Default Buffer Size: 8192
Max Connections: 1000
Thread Pool Size: 8

--- Template Variable Usage ---
int is numeric: true
string is numeric: false
double is numeric: true
bool is numeric: true

--- Global Registry Usage ---
Registry entries:
  users: 150
  products: 1250
  orders: 5680
Total entries: 3

--- Singleton Logger Usage ---
[LOG] Application started
[LOG] Configuration loaded
[LOG] System ready
[LOG] Processing complete

--- Performance Constants ---
Cache Line Size: 64 bytes
Page Size: 4096 bytes
Max Memory Pool: 1073741824 bytes

--- Feature Flags ---
Feature 'advanced_logging': enabled
Feature 'caching': disabled  
Feature 'compression': enabled`,
    hints: [
      'inline variables can be defined in headers without ODR violations',
      'Use inline constexpr for compile-time constants',
      'Template variables are implicitly inline when defined in headers',
      'inline variables are initialized once across all translation units',
      'Good for configuration systems and header-only libraries',
      'Can replace function-local static variables in some cases',
      'Useful for avoiding separate .cpp files for simple constants',
      'Works well with namespace organization for configuration'
    ],
    feature: 'inline-variables',
    relatedTheory: 'inline-variables'
  },

  // Static Polymorphism Exercises
  {
    id: 'crtp-basic',
    title: 'Implement CRTP for Shape Hierarchy',
    standard: 'templates',
    difficulty: 'intermediate',
    description: 'Create a CRTP-based shape hierarchy with compile-time polymorphism. Implement a base template class and derive specific shapes from it.',
    starterCode: `#include <iostream>
#include <cmath>

// TODO: Create a CRTP base template class named 'Shape'
// It should have:
// - area() method that delegates to derived class
// - perimeter() method that delegates to derived class
// - describe() method that prints shape info using area() and perimeter()

// TODO: Implement Circle class derived from Shape<Circle>
// Private member: radius_
// Implement: area_impl() and perimeter_impl()

// TODO: Implement Square class derived from Shape<Square>
// Private member: side_
// Implement: area_impl() and perimeter_impl()

// TODO: Create a generic function template process_shape()
// that accepts Shape<T> and calls describe() on it

int main() {
    // Test your implementation
    Circle circle(5.0);
    Square square(4.0);
    
    std::cout << "Circle:" << std::endl;
    process_shape(circle);
    
    std::cout << "\\nSquare:" << std::endl;
    process_shape(square);
    
    return 0;
}`,
    expectedOutput: `Circle:
Shape - Area: 78.5398, Perimeter: 31.4159

Square:
Shape - Area: 16, Perimeter: 16`,
    hints: [
      'CRTP pattern: class Derived : public Base<Derived>',
      'Use static_cast<const Derived*>(this) to access derived class',
      'Implementation methods should be named differently (e.g., area_impl)',
      'No virtual keyword needed - everything is compile-time',
      'Generic function template: template<typename T> void f(const Shape<T>&)',
      'Use 3.14159 for pi constant',
      'Circle perimeter = 2 * pi * radius',
      'Square perimeter = 4 * side'
    ],
    feature: 'crtp-static-polymorphism',
    relatedTheory: 'crtp-static-polymorphism'
  },

  {
    id: 'crtp-advanced',
    title: 'CRTP Mixin Classes',
    standard: 'templates',
    difficulty: 'advanced',
    description: 'Implement reusable mixin functionality using CRTP to add capabilities to classes at compile time.',
    starterCode: `#include <iostream>
#include <string>

// TODO: Create a Printable<Derived> mixin that adds print() method
// The print() method should call derived class's to_string() method

// TODO: Create a Comparable<Derived> mixin that adds comparison operators
// Use derived class's compare_to() method (should return int: <0, 0, >0)
// Implement: operator<, operator<=, operator>, operator>=, operator==, operator!=

// TODO: Create a Person class that uses both mixins
// class Person : public Printable<Person>, public Comparable<Person>
// Private members: name_, age_
// Implement: to_string() and compare_to() methods

int main() {
    Person p1("Alice", 30);
    Person p2("Bob", 25);
    Person p3("Alice", 30);
    
    // Test Printable mixin
    std::cout << "Person 1: ";
    p1.print();
    std::cout << "Person 2: ";
    p2.print();
    
    // Test Comparable mixin
    std::cout << "\\nComparisons:" << std::endl;
    std::cout << "p1 > p2: " << (p1 > p2) << std::endl;
    std::cout << "p1 == p3: " << (p1 == p3) << std::endl;
    std::cout << "p2 < p1: " << (p2 < p1) << std::endl;
    
    return 0;
}`,
    expectedOutput: `Person 1: Alice (30)
Person 2: Bob (25)

Comparisons:
p1 > p2: 1
p1 == p3: 1
p2 < p1: 1`,
    hints: [
      'Mixin pattern allows composing functionality from multiple base classes',
      'Use static_cast<Derived*>(this) to access derived class methods',
      'Person::compare_to() should compare by name first, then age',
      'operator< : return compare_to() < 0',
      'operator== : return compare_to() == 0',
      'to_string() should return formatted string: "name (age)"',
      'You can derive from multiple CRTP bases: class D : Base1<D>, Base2<D>',
      'CRTP mixins provide zero-overhead compile-time composition'
    ],
    feature: 'crtp-static-polymorphism',
    relatedTheory: 'crtp-static-polymorphism'
  },

  {
    id: 'variant-polymorphism-basic',
    title: 'std::variant Shape System',
    standard: 'cpp17',
    difficulty: 'intermediate',
    description: 'Create a polymorphic shape system using std::variant instead of virtual functions.',
    starterCode: `#include <iostream>
#include <variant>
#include <vector>
#include <cmath>

// TODO: Define three shape structs (no inheritance!):
// Circle { double radius; double area() const; }
// Rectangle { double width, height; double area() const; }
// Triangle { double base, height; double area() const; }

// TODO: Create a Shape variant type that can hold any of the three shapes

// TODO: Implement a visitor struct 'AreaCalculator' with operator() for each shape type

// TODO: Implement a function 'get_total_area' that takes vector<Shape>
// and returns the sum of all areas using std::visit

// TODO: Implement a function 'print_shape_info' that uses std::visit with
// a generic lambda to print type-specific information

int main() {
    std::vector<Shape> shapes;
    shapes.push_back(Circle{5.0});
    shapes.push_back(Rectangle{4.0, 6.0});
    shapes.push_back(Triangle{3.0, 8.0});
    
    std::cout << "Shape information:" << std::endl;
    for (const auto& shape : shapes) {
        print_shape_info(shape);
    }
    
    double total = get_total_area(shapes);
    std::cout << "\\nTotal area: " << total << std::endl;
    
    return 0;
}`,
    expectedOutput: `Shape information:
Circle with radius 5 - Area: 78.5398
Rectangle 4x6 - Area: 24
Triangle with base 3, height 8 - Area: 12

Total area: 114.54`,
    hints: [
      'using Shape = std::variant<Circle, Rectangle, Triangle>;',
      'std::visit applies a visitor to the currently held type',
      'Visitor needs operator() overload for each alternative type',
      'Generic lambda: [](const auto& shape) { ... }',
      'Use if constexpr with std::is_same_v for type-specific handling',
      'Circle area = π * r²',
      'Rectangle area = width * height',
      'Triangle area = 0.5 * base * height',
      'Accumulate areas in a loop using std::visit'
    ],
    feature: 'variant-polymorphism',
    relatedTheory: 'variant-polymorphism'
  },

  {
    id: 'variant-state-machine',
    title: 'State Machine with std::variant',
    standard: 'cpp17',
    difficulty: 'advanced',
    description: 'Implement a type-safe state machine using std::variant for compile-time polymorphism.',
    starterCode: `#include <iostream>
#include <variant>
#include <string>

// TODO: Define state structs
// struct Idle { };
// struct Running { int progress; };
// struct Paused { int saved_progress; };
// struct Completed { std::string result; };

// TODO: Create a State variant type

// TODO: Implement transition functions:
// State start(const Idle&) -> returns Running{0}
// State pause(const Running& r) -> returns Paused{r.progress}
// State resume(const Paused& p) -> returns Running{p.saved_progress}
// State complete(const Running& r) -> returns Completed{"Done at " + progress}
// State reset(const auto&) -> returns Idle{}

// TODO: Create a StateMachine class with:
// - current_state_ member of type State
// - apply_event() method that takes event string and transitions state
// - print_state() method that prints current state using std::visit

// Event strings: "start", "pause", "resume", "complete", "reset"

int main() {
    StateMachine machine;
    
    std::cout << "Initial: ";
    machine.print_state();
    
    machine.apply_event("start");
    std::cout << "After start: ";
    machine.print_state();
    
    machine.apply_event("pause");
    std::cout << "After pause: ";
    machine.print_state();
    
    machine.apply_event("resume");
    std::cout << "After resume: ";
    machine.print_state();
    
    machine.apply_event("complete");
    std::cout << "After complete: ";
    machine.print_state();
    
    machine.apply_event("reset");
    std::cout << "After reset: ";
    machine.print_state();
    
    return 0;
}`,
    expectedOutput: `Initial: State: Idle
After start: State: Running (progress: 0)
After pause: State: Paused (saved: 0)
After resume: State: Running (progress: 0)
After complete: State: Completed - Done at 0
After reset: State: Idle`,
    hints: [
      'using State = std::variant<Idle, Running, Paused, Completed>;',
      'Use std::visit to apply transitions based on current state',
      'Transition functions take one state type and return State variant',
      'std::holds_alternative<T>(variant) checks current type',
      'std::get<T>(variant) extracts value of type T',
      'Use generic lambda with if constexpr for state-specific logic',
      'Overloaded visitor pattern can make transitions cleaner',
      'State machine pattern with variant is type-safe and efficient'
    ],
    feature: 'variant-polymorphism',
    relatedTheory: 'variant-polymorphism'
  },

  {
    id: 'policy-based-logger',
    title: 'Policy-Based Logging System',
    standard: 'templates',
    difficulty: 'intermediate',
    description: 'Create a configurable logging system using policy-based design for compile-time customization.',
    starterCode: `#include <iostream>
#include <string>
#include <fstream>

// TODO: Implement logging policies:
// ConsoleLogger - logs to std::cout with "[Console]" prefix
// FileLogger - logs to "app.log" with "[File]" prefix
// NullLogger - does nothing (zero overhead)

// TODO: Implement formatting policies:
// SimpleFormatter - just returns the message as-is
// TimestampFormatter - adds "[TIMESTAMP] " prefix to message
// VerboseFormatter - adds "[LEVEL: INFO] " prefix to message

// TODO: Create Logger template class:
// template<typename LogPolicy, typename FormatPolicy>
// class Logger {
//   public:
//     static void log(const std::string& message);
// };
// 
// The log() method should format with FormatPolicy then output with LogPolicy

// TODO: Create type aliases for common configurations:
// using ConsoleLog = Logger<ConsoleLogger, SimpleFormatter>;
// using VerboseLog = Logger<ConsoleLogger, VerboseFormatter>;
// using ProductionLog = Logger<FileLogger, TimestampFormatter>;
// using NoLog = Logger<NullLogger, SimpleFormatter>;

int main() {
    std::cout << "=== Policy-Based Logging Demo ===\\n\\n";
    
    ConsoleLog::log("Application started");
    VerboseLog::log("Configuration loaded");
    ProductionLog::log("Database connected");
    NoLog::log("This will not appear");
    
    std::cout << "\\nLog messages sent with different policies" << std::endl;
    
    return 0;
}`,
    expectedOutput: `=== Policy-Based Logging Demo ===

[Console] Application started
[Console] [LEVEL: INFO] Configuration loaded

Log messages sent with different policies`,
    hints: [
      'Policies are classes with static methods',
      'LogPolicy::log(const std::string&) outputs the message',
      'FormatPolicy::format(const std::string&) returns formatted string',
      'Use both policies in Logger: LogPolicy::log(FormatPolicy::format(msg))',
      'NullLogger::log should be empty - compiler will optimize it out',
      'All policy resolution happens at compile time',
      'FileLogger should use static std::ofstream for file handle',
      'No virtual functions needed - zero runtime overhead'
    ],
    feature: 'policy-based-design',
    relatedTheory: 'policy-based-design'
  },

  {
    id: 'policy-based-container',
    title: 'Policy-Based Smart Container',
    standard: 'templates',
    difficulty: 'advanced',
    description: 'Design a flexible container with configurable storage, error handling, and thread-safety policies.',
    starterCode: `#include <iostream>
#include <vector>
#include <array>
#include <stdexcept>
#include <mutex>

// TODO: Implement storage policies:
// template<typename T> struct DynamicStorage { using Container = std::vector<T>; }
// template<typename T, size_t N> struct FixedStorage { 
//   struct Container { T data[N]; size_t size; }; 
// }
// Each should provide: add(), get(), size() static methods

// TODO: Implement error policies:
// struct ThrowOnError { static void handle(const char*); } - throws exception
// struct IgnoreError { static void handle(const char*); } - does nothing

// TODO: Implement thread-safety policies:
// struct ThreadSafe { 
//   using Lock = std::lock_guard<std::mutex>; 
//   static std::mutex& get_mutex(); 
// }
// struct NoThreadSafety { 
//   struct Lock { Lock(int) {} }; 
//   static int get_mutex() { return 0; } 
// }

// TODO: Create SmartContainer template:
// template<typename T, template<typename> class StoragePolicy, 
//          typename ErrorPolicy, typename ThreadPolicy>
// class SmartContainer
// Methods: add(), get(), size()
// Use ThreadPolicy::Lock for thread safety where needed

int main() {
    // Dynamic storage, throw on error, no thread safety
    SmartContainer<int, DynamicStorage, ThrowOnError, NoThreadSafety> container1;
    container1.add(10);
    container1.add(20);
    std::cout << "Container 1 size: " << container1.size() << std::endl;
    std::cout << "Container 1[0]: " << container1.get(0) << std::endl;
    
    // Fixed storage, ignore errors
    SmartContainer<int, FixedStorage<int, 5>::template Type, 
                   IgnoreError, NoThreadSafety> container2;
    container2.add(1);
    container2.add(2);
    std::cout << "\\nContainer 2 size: " << container2.size() << std::endl;
    
    try {
        container1.get(100); // Should throw
    } catch (const std::exception& e) {
        std::cout << "\\nCaught exception: " << e.what() << std::endl;
    }
    
    return 0;
}`,
    expectedOutput: `Container 1 size: 2
Container 1[0]: 10

Container 2 size: 2

Caught exception: Index out of bounds`,
    hints: [
      'StoragePolicy provides Container type and static methods',
      'Use typename StoragePolicy<T>::Container for storage',
      'ThreadPolicy::Lock guard(ThreadPolicy::get_mutex()) for locking',
      'Check bounds before get() and call ErrorPolicy::handle() if invalid',
      'FixedStorage needs nested template Type for proper syntax',
      'static std::mutex in ThreadSafe ensures single mutex instance',
      'NoThreadSafety::Lock is dummy type with no-op constructor',
      'All policy combinations are resolved at compile time'
    ],
    feature: 'policy-based-design',
    relatedTheory: 'policy-based-design'
  },

  {
    id: 'type-erasure-basic',
    title: 'Simple Type Erasure for Any Drawable',
    standard: 'templates',
    difficulty: 'advanced',
    description: 'Implement a basic type-erasure container that can hold any type with a draw() method.',
    starterCode: `#include <iostream>
#include <memory>
#include <vector>
#include <string>

// TODO: Implement AnyDrawable class with type erasure
// Should have:
// - Private concept interface with virtual draw()
// - Private model template that wraps any type T
// - Public constructor template that accepts any T
// - Public draw() method that forwards to stored object
// - Copy constructor using clone pattern

// TODO: Define concrete types (no common base class needed!):
// struct Circle { double radius; void draw() const; }
// struct Text { std::string content; void draw() const; }
// struct Icon { std::string name; void draw() const; }

int main() {
    std::vector<AnyDrawable> drawables;
    
    // Store different types without common base class
    drawables.emplace_back(Circle{5.0});
    drawables.emplace_back(Text{"Hello, World!"});
    drawables.emplace_back(Icon{"star"});
    
    std::cout << "Drawing all objects:" << std::endl;
    for (const auto& drawable : drawables) {
        drawable.draw();
    }
    
    // Test copy semantics
    AnyDrawable original = Circle{10.0};
    AnyDrawable copy = original;
    
    std::cout << "\\nOriginal: ";
    original.draw();
    std::cout << "Copy: ";
    copy.draw();
    
    return 0;
}`,
    expectedOutput: `Drawing all objects:
Circle with radius 5
Text: Hello, World!
Icon: star

Original: Circle with radius 10
Copy: Circle with radius 10`,
    hints: [
      'Type erasure uses internal concept/model pattern',
      'struct Concept { virtual ~Concept() = default; virtual void draw() = 0; };',
      'template<typename T> struct Model : Concept { T obj; ... };',
      'Store std::unique_ptr<Concept> as member',
      'Constructor: template<typename T> AnyDrawable(T obj)',
      'Use std::make_unique<Model<T>>(std::move(obj)) in constructor',
      'Copy constructor needs clone() method in Concept',
      'Wrapped types need no inheritance - just draw() method',
      'Forward draw() call: pimpl_->draw()'
    ],
    feature: 'type-erasure-pattern',
    relatedTheory: 'type-erasure-pattern'
  },

  {
    id: 'type-erasure-function',
    title: 'Custom Function Wrapper with Type Erasure',
    standard: 'templates',
    difficulty: 'advanced',
    description: 'Create a simplified version of std::function using type erasure to store any callable object.',
    starterCode: `#include <iostream>
#include <memory>
#include <string>

// TODO: Implement Function<R(Args...)> template class
// Similar to std::function but simpler
// Should support:
// - Storing any callable (lambda, function pointer, functor)
// - operator() to invoke the stored callable
// - Move semantics
// - Empty state checking with operator bool()

// Internal structure:
// - Concept interface with virtual call(Args...) -> R
// - Model<F> template storing callable of type F
// - std::unique_ptr<Concept> member

// TODO: Implement these callables for testing:
// - free function: int add(int a, int b) { return a + b; }
// - functor: struct Multiplier { int factor; int operator()(int x) const; }
// - lambda will be used directly

int main() {
    std::cout << "=== Custom Function Wrapper ===\\n\\n";
    
    // Store free function
    Function<int(int, int)> f1 = add;
    std::cout << "f1(3, 4) = " << f1(3, 4) << std::endl;
    
    // Store functor
    Function<int(int)> f2 = Multiplier{5};
    std::cout << "f2(6) = " << f2(6) << std::endl;
    
    // Store lambda
    Function<int(int, int)> f3 = [](int a, int b) { return a * b + 10; };
    std::cout << "f3(2, 3) = " << f3(2, 3) << std::endl;
    
    // Empty function
    Function<void()> f4;
    if (!f4) {
        std::cout << "\\nf4 is empty" << std::endl;
    }
    
    // Store lambda in f4
    f4 = []() { std::cout << "Hello from f4!" << std::endl; };
    if (f4) {
        f4();
    }
    
    return 0;
}`,
    expectedOutput: `=== Custom Function Wrapper ===

f1(3, 4) = 7
f2(6) = 30
f3(2, 3) = 16

f4 is empty
Hello from f4!`,
    hints: [
      'Use template specialization: template<typename R, typename... Args> class Function<R(Args...)>',
      'Concept: virtual R call(Args...) = 0;',
      'Model: template<typename F> struct Model : Concept',
      'Model stores F and implements call() by invoking F',
      'operator(): return pimpl_->call(std::forward<Args>(args)...);',
      'operator bool(): return pimpl_ != nullptr;',
      'Constructor: template<typename F> Function(F f)',
      'Move std::forward<F>(f) into Model',
      'This is how std::function works internally!'
    ],
    feature: 'type-erasure-pattern',
    relatedTheory: 'type-erasure-pattern'
  }
];