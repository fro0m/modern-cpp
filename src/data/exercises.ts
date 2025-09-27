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
  }
];