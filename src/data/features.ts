import { CppFeature } from '../types';

export const cppFeatures: CppFeature[] = [
  // C++14 Features
  {
    id: 'generic-lambdas',
    title: 'Generic Lambdas',
    standard: 'cpp14',
    description: 'Lambda expressions with auto parameters for generic programming',
    codeExample: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

int main() {
    // Generic lambda that works with any type
    // The 'auto' keyword allows the lambda to accept any parameter type
    auto print_value = [](const auto& value) {
        std::cout << "Value: " << value << "\\n";
    };
    
    // Using the same lambda with different types
    print_value(42);           // Works with int
    print_value(3.14);         // Works with double
    print_value("Hello");      // Works with const char*
    print_value(std::string("World")); // Works with std::string
    
    // Generic lambda for mathematical operations
    auto add = [](auto a, auto b) {
        return a + b;  // Works with any type that supports operator+
    };
    
    std::cout << "Int addition: " << add(5, 3) << "\\n";
    std::cout << "Double addition: " << add(2.5, 1.7) << "\\n";
    std::cout << "String concatenation: " << add(std::string("Hello "), std::string("World")) << "\\n";
    
    // Using generic lambdas with STL algorithms
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    std::vector<std::string> words = {"apple", "banana", "cherry"};
    
    // Generic lambda to print any container element
    auto print_element = [](const auto& element) {
        std::cout << element << " ";
    };
    
    std::cout << "Numbers: ";
    std::for_each(numbers.begin(), numbers.end(), print_element);
    std::cout << "\\n";
    
    std::cout << "Words: ";
    std::for_each(words.begin(), words.end(), print_element);
    std::cout << "\\n";
    
    return 0;
}`,
    explanation: 'Generic lambdas introduced in C++14 allow lambda parameters to use auto, making them work with multiple types without explicit template syntax. This enables writing more flexible and reusable lambda expressions.',
    useCase: 'Perfect for creating reusable lambda expressions that work with multiple types, especially useful in STL algorithms and functional programming patterns.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/lambda'
  },
  {
    id: 'variable-templates',
    title: 'Variable Templates',
    standard: 'cpp14',
    description: 'Template variables for compile-time constants and type traits',
    codeExample: `#include <iostream>
#include <type_traits>

// Variable template for mathematical constants
// This creates a template variable that can be specialized for different types
template<typename T>
constexpr T pi = T(3.1415926535897932385);

// Specialization for float (less precision)
template<>
constexpr float pi<float> = 3.14159f;

// Variable template for type checking
// This simplifies the syntax for common type traits
template<typename T>
constexpr bool is_integral_v = std::is_integral<T>::value;

template<typename T>
constexpr bool is_floating_point_v = std::is_floating_point<T>::value;

// Custom variable template for array size
template<typename T, std::size_t N>
constexpr std::size_t array_size_v = N;

template<typename T, std::size_t N>
constexpr std::size_t get_array_size(T (&)[N]) {
    return array_size_v<T, N>;
}

int main() {
    // Using mathematical constant templates
    std::cout << "Pi as double: " << pi<double> << "\\n";
    std::cout << "Pi as float: " << pi<float> << "\\n";
    std::cout << "Pi as long double: " << pi<long double> << "\\n";
    
    // Using type trait variable templates (C++14 style)
    std::cout << "\\nType checking with variable templates:\\n";
    std::cout << "int is integral: " << is_integral_v<int> << "\\n";
    std::cout << "double is integral: " << is_integral_v<double> << "\\n";
    std::cout << "float is floating point: " << is_floating_point_v<float> << "\\n";
    std::cout << "char is floating point: " << is_floating_point_v<char> << "\\n";
    
    // Comparison with C++11 style (more verbose)
    std::cout << "\\nC++11 style (verbose): " << std::is_integral<int>::value << "\\n";
    std::cout << "C++14 style (concise): " << is_integral_v<int> << "\\n";
    
    // Array size example
    int arr[] = {1, 2, 3, 4, 5};
    std::cout << "\\nArray size: " << get_array_size(arr) << "\\n";
    
    return 0;
}`,
    explanation: 'Variable templates allow you to create template variables, making it easier to define compile-time constants and simplify type trait usage. They provide a more concise syntax compared to traditional approaches.',
    useCase: 'Ideal for mathematical constants that need different precision for different types, and for creating more readable type trait checks in template metaprogramming.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/variable_template'
  },
  {
    id: 'return-type-deduction',
    title: 'Return Type Deduction',
    standard: 'cpp14',
    description: 'Automatic deduction of function return types using auto',
    codeExample: `#include <iostream>
#include <vector>
#include <string>

// Simple auto return type deduction
// The compiler deduces the return type from the return statement
auto add(int a, int b) {
    return a + b;  // Compiler deduces return type as int
}

// Auto return type with multiple return paths
// All return statements must deduce to the same type
auto get_absolute_value(double x) {
    if (x >= 0) {
        return x;      // Returns double
    } else {
        return -x;     // Also returns double - consistent!
    }
}

// Generic function with auto return type
// The return type depends on the template parameters
template<typename T, typename U>
auto multiply(T a, U b) {
    return a * b;  // Return type is deduced from a * b operation
}

// More complex example with containers
auto create_number_vector(int count) {
    std::vector<int> result;
    for (int i = 1; i <= count; ++i) {
        result.push_back(i * i);  // Square numbers
    }
    return result;  // Compiler deduces std::vector<int>
}

// Recursive function with auto return type
auto fibonacci(int n) {
    if (n <= 1) {
        return n;  // Base case: returns int
    }
    return fibonacci(n - 1) + fibonacci(n - 2);  // Recursive case: also int
}

// Lambda with auto return type
auto create_multiplier(int factor) {
    // Returns a lambda that captures 'factor' by value
    return [factor](int x) {
        return x * factor;  // Lambda's return type is deduced as int
    };
}

int main() {
    // Basic auto return type usage
    auto sum = add(5, 3);
    std::cout << "Sum: " << sum << " (type deduced as int)\\n";
    
    // Auto return with floating point
    auto abs_val = get_absolute_value(-3.14);
    std::cout << "Absolute value: " << abs_val << " (type deduced as double)\\n";
    
    // Generic function with different type combinations
    auto int_result = multiply(5, 3);        // int * int = int
    auto mixed_result = multiply(2.5, 4);    // double * int = double
    auto float_result = multiply(1.5f, 2.0f); // float * float = float
    
    std::cout << "Int multiply: " << int_result << "\\n";
    std::cout << "Mixed multiply: " << mixed_result << "\\n";
    std::cout << "Float multiply: " << float_result << "\\n";
    
    // Container creation with auto return
    auto squares = create_number_vector(5);
    std::cout << "Square numbers: ";
    for (const auto& num : squares) {
        std::cout << num << " ";
    }
    std::cout << "\\n";
    
    // Recursive function
    std::cout << "Fibonacci(10): " << fibonacci(10) << "\\n";
    
    // Lambda with auto return
    auto times_three = create_multiplier(3);
    std::cout << "7 * 3 = " << times_three(7) << "\\n";
    
    return 0;
}`,
    explanation: 'C++14 extended auto return type deduction to regular functions (not just lambdas). The compiler automatically deduces the return type from return statements, making code more maintainable and enabling easier refactoring.',
    useCase: 'Excellent for template functions where the return type depends on template parameters, and for simplifying function signatures when the return type is obvious from the implementation.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/function#Return_type_deduction'
  },
  {
    id: 'std-make-unique',
    title: 'std::make_unique',
    standard: 'cpp14',
    description: 'Safe and efficient creation of unique_ptr objects',
    codeExample: `#include <iostream>
#include <memory>
#include <vector>
#include <string>

// === BASIC CLASSES FOR DEMONSTRATION ===
class Resource {
private:
    std::string name_;
    int id_;
    
public:
    Resource(const std::string& name, int id) : name_(name), id_(id) {
        std::cout << "Resource '" << name_ << "' (id: " << id_ << ") created\\n";
    }
    
    ~Resource() {
        std::cout << "Resource '" << name_ << "' (id: " << id_ << ") destroyed\\n";
    }
    
    void use() const {
        std::cout << "Using resource '" << name_ << "' (id: " << id_ << ")\\n";
    }
    
    const std::string& name() const { return name_; }
    int id() const { return id_; }
};

class DatabaseConnection {
private:
    std::string connection_string_;
    bool connected_;
    
public:
    DatabaseConnection(const std::string& conn_str) 
        : connection_string_(conn_str), connected_(true) {
        std::cout << "Database connected to: " << conn_str << "\\n";
    }
    
    ~DatabaseConnection() {
        if (connected_) {
            std::cout << "Database connection closed\\n";
        }
    }
    
    void disconnect() {
        connected_ = false;
        std::cout << "Database manually disconnected\\n";
    }
    
    void query(const std::string& sql) const {
        if (connected_) {
            std::cout << "Executing query: " << sql << "\\n";
        } else {
            std::cout << "Cannot execute query: disconnected\\n";
        }
    }
};

// === FACTORY FUNCTIONS ===
std::unique_ptr<Resource> create_resource(const std::string& name, int id) {
    // Safe creation - exception safe
    return std::make_unique<Resource>(name, id);
}

std::unique_ptr<DatabaseConnection> connect_to_database(const std::string& db_name) {
    return std::make_unique<DatabaseConnection>("postgresql://" + db_name);
}

// === RESOURCE MANAGER ===
class ResourceManager {
private:
    std::vector<std::unique_ptr<Resource>> resources_;
    
public:
    void add_resource(const std::string& name, int id) {
        // Direct emplacement with make_unique
        resources_.push_back(std::make_unique<Resource>(name, id));
    }
    
    Resource* get_resource(int id) {
        for (auto& resource : resources_) {
            if (resource->id() == id) {
                return resource.get();
            }
        }
        return nullptr;
    }
    
    std::unique_ptr<Resource> take_resource(int id) {
        for (auto it = resources_.begin(); it != resources_.end(); ++it) {
            if ((*it)->id() == id) {
                auto resource = std::move(*it);
                resources_.erase(it);
                return resource;
            }
        }
        return nullptr;
    }
    
    void list_resources() const {
        std::cout << "Managed resources:\\n";
        for (const auto& resource : resources_) {
            std::cout << "  - " << resource->name() << " (id: " << resource->id() << ")\\n";
        }
    }
    
    size_t count() const { return resources_.size(); }
};

// === ARRAY CREATION ===
template<typename T>
std::unique_ptr<T[]> make_unique_array(size_t size) {
    return std::make_unique<T[]>(size);
}

int main() {
    std::cout << "=== Basic make_unique Usage ===\\n";
    
    // === BASIC USAGE VS NEW ===
    // Old way (not recommended)
    // std::unique_ptr<Resource> old_way(new Resource("OldResource", 1));
    
    // New way (recommended)
    auto resource1 = std::make_unique<Resource>("NewResource", 1);
    resource1->use();
    
    // === EXCEPTION SAFETY DEMONSTRATION ===
    std::cout << "\\n=== Exception Safety ===\\n";
    try {
        // This is exception safe - if Resource constructor throws,
        // no memory is leaked
        auto safe_resource = std::make_unique<Resource>("SafeResource", 2);
        safe_resource->use();
        
        // Simulate an exception after construction
        // throw std::runtime_error("Simulated error");
        
    } catch (const std::exception& e) {
        std::cout << "Exception caught: " << e.what() << "\\n";
        std::cout << "No memory leak occurred!\\n";
    }
    
    // === FACTORY FUNCTIONS ===
    std::cout << "\\n=== Factory Functions ===\\n";
    auto db_resource = create_resource("DatabaseResource", 3);
    auto db_connection = connect_to_database("myapp_db");
    
    db_resource->use();
    db_connection->query("SELECT * FROM users");
    
    // === RESOURCE MANAGER ===
    std::cout << "\\n=== Resource Manager ===\\n";
    ResourceManager manager;
    
    manager.add_resource("WebServer", 10);
    manager.add_resource("FileHandler", 11);
    manager.add_resource("Logger", 12);
    
    manager.list_resources();
    std::cout << "Total resources: " << manager.count() << "\\n";
    
    // Get resource reference (still managed)
    if (auto* logger = manager.get_resource(12)) {
        logger->use();
    }
    
    // Take ownership (removes from manager)
    auto taken_resource = manager.take_resource(11);
    std::cout << "\\nAfter taking resource 11:\\n";
    manager.list_resources();
    
    if (taken_resource) {
        taken_resource->use();
    }
    
    // === ARRAYS WITH MAKE_UNIQUE ===
    std::cout << "\\n=== Arrays with make_unique ===\\n";
    
    // C++14: Array version
    auto int_array = std::make_unique<int[]>(5);
    for (int i = 0; i < 5; ++i) {
        int_array[i] = i * i;
    }
    
    std::cout << "Array values: ";
    for (int i = 0; i < 5; ++i) {
        std::cout << int_array[i] << " ";
    }
    std::cout << "\\n";
    
    // === CONTAINER OF UNIQUE_PTRS ===
    std::cout << "\\n=== Container of unique_ptrs ===\\n";
    std::vector<std::unique_ptr<Resource>> resource_collection;
    
    // Add multiple resources
    for (int i = 20; i < 23; ++i) {
        resource_collection.push_back(
            std::make_unique<Resource>("CollectionItem" + std::to_string(i), i)
        );
    }
    
    std::cout << "Using collection resources:\\n";
    for (const auto& resource : resource_collection) {
        resource->use();
    }
    
    // === MOVE SEMANTICS ===
    std::cout << "\\n=== Move Semantics ===\\n";
    auto moveable_resource = std::make_unique<Resource>("MovableResource", 30);
    moveable_resource->use();
    
    // Transfer ownership
    auto new_owner = std::move(moveable_resource);
    // moveable_resource is now nullptr
    
    if (new_owner) {
        new_owner->use();
    }
    
    if (!moveable_resource) {
        std::cout << "Original pointer is now empty\\n";
    }
    
    // === COMPARISON WITH SHARED_PTR ===
    std::cout << "\\n=== Comparison with shared_ptr ===\\n";
    
    // Use make_unique when you need exclusive ownership
    auto unique_res = std::make_unique<Resource>("UniqueOwner", 40);
    
    // Use make_shared when you need shared ownership
    auto shared_res = std::make_shared<Resource>("SharedOwner", 41);
    auto shared_copy = shared_res; // Reference count: 2
    
    std::cout << "shared_ptr reference count: " << shared_res.use_count() << "\\n";
    
    unique_res->use();
    shared_res->use();
    
    std::cout << "\\n=== Automatic Cleanup ===\\n";
    std::cout << "Resources will be automatically cleaned up...\\n";
    
    return 0;
    // All unique_ptrs automatically clean up here
}`,
    explanation: 'std::make_unique provides a safe and efficient way to create std::unique_ptr objects. It offers exception safety, prevents memory leaks, and is more readable than using new directly. It also enables perfect forwarding of constructor arguments.',
    useCase: 'Essential for modern C++ memory management, factory functions, RAII patterns, and any scenario where you need single ownership semantics. Prefer make_unique over direct new to ensure exception safety and cleaner code.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/memory/unique_ptr/make_unique'
  },

  // C++17 Features (Enhanced with more detailed comments)
  {
    id: 'structured-bindings',
    title: 'Structured Bindings',
    standard: 'cpp17',
    description: 'Decompose objects into individual variables',
    codeExample: `#include <tuple>
#include <map>
#include <iostream>
#include <array>
#include <utility>

// Custom struct to demonstrate structured bindings
struct Point {
    double x, y, z;
};

int main() {
    // === TUPLE DECOMPOSITION ===
    // Create a tuple with different types
    auto data = std::make_tuple(42, 3.14, "Hello World");
    
    // Structured binding: decompose tuple into individual variables
    // The compiler automatically deduces the types: int, double, const char*
    auto [integer_val, double_val, string_val] = data;
    
    std::cout << "=== Tuple Decomposition ===\\n";
    std::cout << "Integer: " << integer_val << "\\n";
    std::cout << "Double: " << double_val << "\\n";
    std::cout << "String: " << string_val << "\\n\\n";
    
    // === MAP ITERATION ===
    // Create a map of student scores
    std::map<std::string, int> student_scores{
        {"Alice", 95}, {"Bob", 87}, {"Charlie", 92}, {"Diana", 98}
    };
    
    std::cout << "=== Map Iteration with Structured Bindings ===\\n";
    // Traditional way (verbose):
    // for (const std::pair<const std::string, int>& pair : student_scores)
    
    // Modern way with structured bindings:
    // Each map element is a pair<const Key, Value>
    // We decompose it directly into name and score variables
    for (const auto& [student_name, score] : student_scores) {
        std::cout << student_name << " scored " << score << " points\\n";
    }
    std::cout << "\\n";
    
    // === ARRAY DECOMPOSITION ===
    // Fixed-size arrays can also be decomposed
    std::array<int, 3> coordinates = {10, 20, 30};
    auto [x_coord, y_coord, z_coord] = coordinates;
    
    std::cout << "=== Array Decomposition ===\\n";
    std::cout << "Coordinates: (" << x_coord << ", " << y_coord << ", " << z_coord << ")\\n\\n";
    
    // === CUSTOM STRUCT DECOMPOSITION ===
    // Structured bindings work with any struct/class with public members
    Point origin{0.0, 0.0, 0.0};
    Point destination{10.5, 20.3, 15.7};
    
    // Decompose struct members directly
    auto [dest_x, dest_y, dest_z] = destination;
    
    std::cout << "=== Struct Decomposition ===\\n";
    std::cout << "Destination point: (" << dest_x << ", " << dest_y << ", " << dest_z << ")\\n\\n";
    
    // === FUNCTION RETURN VALUE DECOMPOSITION ===
    // Function that returns multiple values as a tuple
    auto get_min_max = [](const std::vector<int>& vec) {
        auto [min_it, max_it] = std::minmax_element(vec.begin(), vec.end());
        return std::make_tuple(*min_it, *max_it, vec.size());
    };
    
    std::vector<int> numbers = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    
    // Decompose the returned tuple directly
    auto [min_val, max_val, count] = get_min_max(numbers);
    
    std::cout << "=== Function Return Decomposition ===\\n";
    std::cout << "Min: " << min_val << ", Max: " << max_val << ", Count: " << count << "\\n";
    
    return 0;
}`,
    explanation: 'Structured bindings allow you to decompose objects like tuples, pairs, arrays, and structs into individual named variables in a single declaration. This feature makes code more readable by eliminating the need for std::get<> or manual member access.',
    useCase: 'Perfect for unpacking return values from functions that return multiple values, iterating over maps with readable key-value names, and working with structured data without verbose syntax.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/structured_binding'
  },
  {
    id: 'std-optional',
    title: 'std::optional',
    standard: 'cpp17',
    description: 'Represent values that may or may not exist',
    codeExample: `#include <optional>
#include <iostream>
#include <string>
#include <vector>
#include <cmath>

// Function that may or may not return a valid result
// Returns std::nullopt when division by zero is attempted
std::optional<double> safe_divide(double numerator, double denominator) {
    if (denominator == 0.0) {
        // Return empty optional instead of throwing exception
        return std::nullopt;
    }
    return numerator / denominator;
}

// Function to find a user by ID
// Returns empty optional if user not found
std::optional<std::string> find_user_by_id(int user_id) {
    // Simulate a simple user database
    static const std::vector<std::pair<int, std::string>> users = {
        {1, "Alice Johnson"}, {2, "Bob Smith"}, {3, "Charlie Brown"}
    };
    
    // Search for user with matching ID
    for (const auto& [id, name] : users) {
        if (id == user_id) {
            return name;  // Found user, return their name
        }
    }
    
    // User not found, return empty optional
    return std::nullopt;
}

// Function to calculate square root of non-negative numbers
std::optional<double> safe_sqrt(double value) {
    if (value < 0) {
        return std::nullopt;  // Cannot calculate sqrt of negative number
    }
    return std::sqrt(value);
}

int main() {
    std::cout << "=== Safe Division Examples ===\\n";
    
    // === CHECKING IF OPTIONAL HAS VALUE ===
    auto result1 = safe_divide(10.0, 2.0);  // Valid division
    auto result2 = safe_divide(10.0, 0.0);  // Division by zero
    
    // Method 1: Using has_value() method
    if (result1.has_value()) {
        std::cout << "10 / 2 = " << result1.value() << "\\n";
    } else {
        std::cout << "Division failed!\\n";
    }
    
    // Method 2: Using boolean conversion (more concise)
    if (result2) {
        std::cout << "10 / 0 = " << *result2 << "\\n";  // Dereference with *
    } else {
        std::cout << "Cannot divide by zero!\\n";
    }
    
    std::cout << "\\n=== User Lookup Examples ===\\n";
    
    // === USING value_or() FOR DEFAULT VALUES ===
    // value_or() returns the contained value or a default if empty
    for (int id = 1; id <= 4; ++id) {
        auto user = find_user_by_id(id);
        std::cout << "User " << id << ": " 
                  << user.value_or("Unknown User") << "\\n";
    }
    
    std::cout << "\\n=== Chaining Optional Operations ===\\n";
    
    // === ADVANCED OPTIONAL USAGE ===
    std::vector<double> test_values = {16.0, -4.0, 0.0, 25.0};
    
    for (double val : test_values) {
        auto sqrt_result = safe_sqrt(val);
        
        if (sqrt_result) {
            std::cout << "sqrt(" << val << ") = " << *sqrt_result << "\\n";
        } else {
            std::cout << "Cannot calculate sqrt(" << val << ") - negative value\\n";
        }
    }
    
    std::cout << "\\n=== Optional Assignment and Reset ===\\n";
    
    // === MODIFYING OPTIONAL VALUES ===
    std::optional<int> maybe_number;  // Initially empty
    
    std::cout << "Initially empty: " << (maybe_number ? "has value" : "empty") << "\\n";
    
    // Assign a value
    maybe_number = 42;
    std::cout << "After assignment: " << maybe_number.value() << "\\n";
    
    // Reset to empty state
    maybe_number.reset();
    std::cout << "After reset: " << (maybe_number ? "has value" : "empty") << "\\n";
    
    // Emplace a new value (construct in-place)
    maybe_number.emplace(100);
    std::cout << "After emplace: " << maybe_number.value() << "\\n";
    
    return 0;
}`,
    explanation: 'std::optional represents a value that may or may not be present, providing a type-safe alternative to null pointers or special sentinel values. It eliminates the ambiguity of whether a function succeeded or failed, making error handling more explicit and safer.',
    useCase: 'Ideal for functions that may fail to return a meaningful value (like parsing, searching, or mathematical operations), configuration values that might not be set, and any scenario where you want to avoid exceptions or null pointer issues.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/utility/optional'
  },
  {
    id: 'if-constexpr',
    title: 'if constexpr',
    standard: 'cpp17',
    description: 'Conditional compilation based on compile-time conditions',
    codeExample: `#include <iostream>
#include <type_traits>
#include <vector>
#include <string>

// === BASIC TYPE-BASED CONDITIONAL COMPILATION ===
template<typename T>
void process_value(T value) {
    std::cout << "Processing value: " << value << "\\n";
    
    // if constexpr evaluates the condition at compile time
    // Only the matching branch is compiled into the final code
    if constexpr (std::is_integral_v<T>) {
        // This code only exists if T is an integral type (int, char, etc.)
        std::cout << "  -> This is an integer type\\n";
        std::cout << "  -> Value doubled: " << (value * 2) << "\\n";
        std::cout << "  -> Is even: " << (value % 2 == 0 ? "yes" : "no") << "\\n";
        
    } else if constexpr (std::is_floating_point_v<T>) {
        // This code only exists if T is a floating-point type
        std::cout << "  -> This is a floating-point type\\n";
        std::cout << "  -> Value squared: " << (value * value) << "\\n";
        std::cout << "  -> Precision: " << (sizeof(T) == 4 ? "single" : "double") << "\\n";
        
    } else if constexpr (std::is_same_v<T, std::string>) {
        // This code only exists if T is exactly std::string
        std::cout << "  -> This is a string type\\n";
        std::cout << "  -> Length: " << value.length() << " characters\\n";
        std::cout << "  -> Uppercase first char: " << static_cast<char>(std::toupper(value[0])) << "\\n";
        
    } else {
        // Fallback for any other type
        std::cout << "  -> This is some other type\\n";
        std::cout << "  -> Size: " << sizeof(T) << " bytes\\n";
    }
    std::cout << "\\n";
}

// === ADVANCED EXAMPLE: CONTAINER OPERATIONS ===
template<typename Container>
void analyze_container(const Container& container) {
    std::cout << "Analyzing container...\\n";
    
    // Check if container has size() method
    if constexpr (requires { container.size(); }) {
        std::cout << "  -> Container size: " << container.size() << "\\n";
        
        // Further check if it's a vector specifically
        if constexpr (std::is_same_v<Container, std::vector<typename Container::value_type>>) {
            std::cout << "  -> This is a std::vector\\n";
            std::cout << "  -> Capacity: " << container.capacity() << "\\n";
        }
    } else {
        std::cout << "  -> Container size unknown (no size() method)\\n";
    }
    
    // Check if container supports random access
    if constexpr (requires { container[0]; }) {
        std::cout << "  -> Supports random access\\n";
        if (!container.empty()) {
            std::cout << "  -> First element: " << container[0] << "\\n";
        }
    } else {
        std::cout << "  -> Sequential access only\\n";
    }
    
    std::cout << "\\n";
}

// === COMPILE-TIME ALGORITHM SELECTION ===
template<typename T>
T compute_factorial(T n) {
    // Choose algorithm based on type properties at compile time
    if constexpr (std::is_integral_v<T> && sizeof(T) <= 4) {
        // For small integers, use iterative approach
        std::cout << "Using iterative factorial (small integer)\\n";
        T result = 1;
        for (T i = 2; i <= n; ++i) {
            result *= i;
        }
        return result;
        
    } else if constexpr (std::is_integral_v<T> && sizeof(T) > 4) {
        // For large integers, use recursive approach with optimization
        std::cout << "Using recursive factorial (large integer)\\n";
        if (n <= 1) return 1;
        return n * compute_factorial(n - 1);
        
    } else if constexpr (std::is_floating_point_v<T>) {
        // For floating point, use gamma function approximation
        std::cout << "Using gamma function approximation (floating point)\\n";
        // Simplified: just use iterative for demo
        T result = 1.0;
        for (T i = 2.0; i <= n; i += 1.0) {
            result *= i;
        }
        return result;
        
    } else {
        // Compile-time error for unsupported types
        static_assert(std::is_arithmetic_v<T>, "Factorial requires arithmetic type");
    }
}

int main() {
    std::cout << "=== Type-Based Processing ===\\n";
    
    // Each call will compile only the relevant branch
    process_value(42);                    // Integer path
    process_value(3.14159);              // Floating-point path
    process_value(std::string("Hello")); // String path
    
    std::cout << "=== Container Analysis ===\\n";
    
    std::vector<int> vec = {1, 2, 3, 4, 5};
    std::string str = "Hello";
    
    analyze_container(vec);  // Vector-specific analysis
    analyze_container(str);  // String analysis
    
    std::cout << "=== Compile-Time Algorithm Selection ===\\n";
    
    // Different algorithms chosen based on type
    auto result1 = compute_factorial(5);        // int: iterative
    auto result2 = compute_factorial(5L);       // long: recursive  
    auto result3 = compute_factorial(5.0);      // double: gamma approximation
    
    std::cout << "5! (int) = " << result1 << "\\n";
    std::cout << "5! (long) = " << result2 << "\\n";
    std::cout << "5! (double) = " << result3 << "\\n";
    
    return 0;
}`,
    explanation: 'if constexpr allows conditional compilation based on compile-time conditions, enabling different code paths without template specialization. Unlike regular if statements, only the matching branch is compiled, preventing compilation errors in unused branches and enabling more efficient generic code.',
    useCase: 'Essential for writing generic code that behaves differently based on type traits, template parameters, or other compile-time conditions. Perfect for creating type-safe generic algorithms and avoiding the complexity of SFINAE or template specialization.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/if'
  },
  {
    id: 'std-string-view',
    title: 'std::string_view',
    standard: 'cpp17',
    description: 'Non-owning string references for efficient string operations',
    codeExample: `#include <iostream>
#include <string>
#include <string_view>
#include <vector>

// === BASIC STRING_VIEW USAGE ===
// Function that accepts any string-like object
void print_info(std::string_view sv) {
    std::cout << "String: '" << sv << "'\\n";
    std::cout << "Length: " << sv.length() << "\\n";
    std::cout << "Empty: " << (sv.empty() ? "yes" : "no") << "\\n";
}

// === STRING PARSING WITH STRING_VIEW ===
std::vector<std::string_view> split(std::string_view str, char delimiter) {
    std::vector<std::string_view> tokens;
    size_t start = 0;
    
    while (true) {
        size_t end = str.find(delimiter, start);
        tokens.push_back(str.substr(start, end - start));
        
        if (end == std::string_view::npos) break;
        start = end + 1;
    }
    
    return tokens;
}

// === EFFICIENT TEXT PROCESSING ===
class TextProcessor {
public:
    // No copies, works with any string type
    bool contains_keyword(std::string_view text, std::string_view keyword) {
        return text.find(keyword) != std::string_view::npos;
    }
    
    // Extract file extension without copying
    std::string_view get_extension(std::string_view filename) {
        size_t dot_pos = filename.find_last_of('.');
        if (dot_pos == std::string_view::npos) {
            return {}; // Empty string_view
        }
        return filename.substr(dot_pos);
    }
    
    // Count words efficiently
    size_t count_words(std::string_view text) {
        if (text.empty()) return 0;
        
        size_t count = 0;
        bool in_word = false;
        
        for (char c : text) {
            if (std::isspace(c)) {
                in_word = false;
            } else if (!in_word) {
                in_word = true;
                ++count;
            }
        }
        return count;
    }
};

int main() {
    // === WORKS WITH DIFFERENT STRING TYPES ===
    std::string str = "Hello, World!";
    const char* cstr = "C-style string";
    char array[] = "Character array";
    
    std::cout << "=== String View with Different Types ===\\n";
    print_info(str);        // std::string
    print_info(cstr);       // const char*
    print_info(array);      // char array
    print_info("literal");  // string literal
    
    // === SUBSTRING WITHOUT COPYING ===
    std::string text = "The quick brown fox jumps over the lazy dog";
    std::string_view view = text;
    std::string_view word = view.substr(4, 5); // "quick" - no copy!
    
    std::cout << "\\n=== Substring Operations ===\\n";
    std::cout << "Original: " << text << "\\n";
    std::cout << "Substring: " << word << "\\n";
    
    // === TEXT SPLITTING ===
    std::cout << "\\n=== Text Splitting ===\\n";
    std::string csv = "apple,banana,cherry,date";
    auto tokens = split(csv, ',');
    
    std::cout << "CSV tokens: ";
    for (auto token : tokens) {
        std::cout << "'" << token << "' ";
    }
    std::cout << "\\n";
    
    // === TEXT PROCESSING ===
    std::cout << "\\n=== Text Processing ===\\n";
    TextProcessor processor;
    std::string document = "This is a sample document.txt with some content";
    
    std::cout << "Contains 'sample': " << processor.contains_keyword(document, "sample") << "\\n";
    std::cout << "Extension: " << processor.get_extension("document.txt") << "\\n";
    std::cout << "Word count: " << processor.count_words(document) << "\\n";
    
    // === PERFORMANCE COMPARISON DEMONSTRATION ===
    std::cout << "\\n=== Performance Benefits ===\\n";
    std::cout << "string_view avoids copies and allocations\\n";
    std::cout << "Perfect for read-only string operations\\n";
    std::cout << "Works seamlessly with existing string APIs\\n";
    
    return 0;
}`,
    explanation: 'std::string_view provides a non-owning reference to a string, allowing efficient string operations without copying data. It can reference any contiguous sequence of characters and provides a read-only view into existing string data.',
    useCase: 'Perfect for function parameters that only read strings, parsing operations where you need to extract substrings without copying, and APIs that work with multiple string types. Essential for performance-critical code that processes large amounts of text.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/string/basic_string_view'
  },
  {
    id: 'std-variant',
    title: 'std::variant',
    standard: 'cpp17',
    description: 'Type-safe union for holding values of different types',
    codeExample: `#include <iostream>
#include <string>
#include <variant>
#include <vector>

// === BASIC VARIANT USAGE ===
using Value = std::variant<int, double, std::string>;

void print_value(const Value& v) {
    // Using std::visit with a lambda
    std::visit([](const auto& value) {
        std::cout << "Value: " << value << " (type: " << typeid(value).name() << ")\\n";
    }, v);
}

// === VISITOR PATTERN ===
struct ValueProcessor {
    void operator()(int i) const {
        std::cout << "Processing integer: " << i << "\\n";
    }
    
    void operator()(double d) const {
        std::cout << "Processing double: " << d << "\\n";
    }
    
    void operator()(const std::string& s) const {
        std::cout << "Processing string: '" << s << "' (length: " << s.length() << ")\\n";
    }
};

// === ERROR HANDLING WITH VARIANT ===
enum class ErrorType { NetworkError, FileError, ParseError };

using Result = std::variant<std::string, ErrorType>;

Result fetch_data(int id) {
    if (id < 0) return ErrorType::ParseError;
    if (id > 1000) return ErrorType::NetworkError;
    return std::string("Data for ID: " + std::to_string(id));
}

// === MATHEMATICAL EXPRESSION EVALUATOR ===
struct Number { double value; };
struct Add { double left, right; };
struct Multiply { double left, right; };

using Expression = std::variant<Number, Add, Multiply>;

double evaluate(const Expression& expr) {
    return std::visit([](const auto& e) -> double {
        using T = std::decay_t<decltype(e)>;
        if constexpr (std::is_same_v<T, Number>) {
            return e.value;
        } else if constexpr (std::is_same_v<T, Add>) {
            return e.left + e.right;
        } else if constexpr (std::is_same_v<T, Multiply>) {
            return e.left * e.right;
        }
    }, expr);
}

int main() {
    // === BASIC USAGE ===
    std::cout << "=== Basic Variant Usage ===\\n";
    Value v1 = 42;
    Value v2 = 3.14;
    Value v3 = std::string("Hello");
    
    print_value(v1);
    print_value(v2);
    print_value(v3);
    
    // === TYPE CHECKING ===
    std::cout << "\\n=== Type Checking ===\\n";
    std::cout << "v1 holds int: " << std::holds_alternative<int>(v1) << "\\n";
    std::cout << "v1 holds string: " << std::holds_alternative<std::string>(v1) << "\\n";
    std::cout << "Current index of v2: " << v2.index() << "\\n";
    
    // === ACCESSING VALUES ===
    std::cout << "\\n=== Accessing Values ===\\n";
    try {
        int val = std::get<int>(v1);
        std::cout << "Got int value: " << val << "\\n";
        
        // This will throw std::bad_variant_access
        // std::string bad = std::get<std::string>(v1);
    } catch (const std::bad_variant_access& e) {
        std::cout << "Bad variant access: " << e.what() << "\\n";
    }
    
    // Safe access with get_if
    if (auto ptr = std::get_if<double>(&v2)) {
        std::cout << "Safely got double: " << *ptr << "\\n";
    }
    
    // === VISITOR PATTERN ===
    std::cout << "\\n=== Visitor Pattern ===\\n";
    std::visit(ValueProcessor{}, v1);
    std::visit(ValueProcessor{}, v2);
    std::visit(ValueProcessor{}, v3);
    
    // === ERROR HANDLING ===
    std::cout << "\\n=== Error Handling ===\\n";
    auto results = {fetch_data(42), fetch_data(-1), fetch_data(1500)};
    
    for (const auto& result : results) {
        std::visit([](const auto& r) {
            using T = std::decay_t<decltype(r)>;
            if constexpr (std::is_same_v<T, std::string>) {
                std::cout << "Success: " << r << "\\n";
            } else {
                std::cout << "Error occurred (type: " << static_cast<int>(r) << ")\\n";
            }
        }, result);
    }
    
    // === EXPRESSION EVALUATOR ===
    std::cout << "\\n=== Expression Evaluator ===\\n";
    std::vector<Expression> expressions = {
        Number{5.0},
        Add{3.0, 4.0},
        Multiply{2.0, 6.0}
    };
    
    for (const auto& expr : expressions) {
        std::cout << "Result: " << evaluate(expr) << "\\n";
    }
    
    return 0;
}`,
    explanation: 'std::variant is a type-safe union that can hold a value of one of several specified types. It knows which type it currently holds and provides safe access mechanisms. Combined with std::visit, it enables powerful pattern matching and visitor patterns.',
    useCase: 'Excellent for representing data that can be one of several types (like JSON values), implementing state machines, error handling without exceptions, and building recursive data structures like expression trees or parsers.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/utility/variant'
  },
  {
    id: 'std-any',
    title: 'std::any',
    standard: 'cpp17',
    description: 'Type-safe container for single values of any type',
    codeExample: `#include <iostream>
#include <any>
#include <string>
#include <vector>
#include <map>
#include <typeinfo>

// === BASIC ANY USAGE ===
void print_any_info(const std::any& a) {
    if (a.has_value()) {
        std::cout << "Type: " << a.type().name() << "\\n";
        std::cout << "Has value: true\\n";
    } else {
        std::cout << "Empty std::any\\n";
    }
}

// === GENERIC CONTAINER WITH ANY ===
class PropertyBag {
private:
    std::map<std::string, std::any> properties_;
    
public:
    template<typename T>
    void set(const std::string& key, T&& value) {
        properties_[key] = std::forward<T>(value);
    }
    
    template<typename T>
    T get(const std::string& key) const {
        auto it = properties_.find(key);
        if (it == properties_.end()) {
            throw std::runtime_error("Key not found: " + key);
        }
        
        try {
            return std::any_cast<T>(it->second);
        } catch (const std::bad_any_cast& e) {
            throw std::runtime_error("Type mismatch for key: " + key);
        }
    }
    
    template<typename T>
    bool try_get(const std::string& key, T& value) const {
        auto it = properties_.find(key);
        if (it == properties_.end()) return false;
        
        try {
            value = std::any_cast<T>(it->second);
            return true;
        } catch (const std::bad_any_cast&) {
            return false;
        }
    }
    
    bool has(const std::string& key) const {
        return properties_.find(key) != properties_.end();
    }
    
    void remove(const std::string& key) {
        properties_.erase(key);
    }
    
    void list_properties() const {
        std::cout << "Properties:\\n";
        for (const auto& [key, value] : properties_) {
            std::cout << "  " << key << " -> " << value.type().name() << "\\n";
        }
    }
};

// === EVENT SYSTEM WITH ANY ===
struct Event {
    std::string type;
    std::any data;
    
    template<typename T>
    Event(std::string t, T&& d) : type(std::move(t)), data(std::forward<T>(d)) {}
    
    template<typename T>
    T get_data() const {
        return std::any_cast<T>(data);
    }
    
    template<typename T>
    bool try_get_data(T& result) const {
        try {
            result = std::any_cast<T>(data);
            return true;
        } catch (const std::bad_any_cast&) {
            return false;
        }
    }
};

class EventHandler {
public:
    void handle_event(const Event& event) {
        std::cout << "Handling event: " << event.type << "\\n";
        
        if (event.type == "user_input") {
            auto input = event.get_data<std::string>();
            std::cout << "  User typed: " << input << "\\n";
        } else if (event.type == "mouse_click") {
            auto pos = event.get_data<std::pair<int, int>>();
            std::cout << "  Mouse clicked at: (" << pos.first << ", " << pos.second << ")\\n";
        } else if (event.type == "file_loaded") {
            auto info = event.get_data<std::pair<std::string, size_t>>();
            std::cout << "  File loaded: " << info.first << " (" << info.second << " bytes)\\n";
        }
    }
};

// === SCRIPTING/CONFIG SYSTEM ===
class ConfigValue {
private:
    std::any value_;
    
public:
    template<typename T>
    ConfigValue(T&& val) : value_(std::forward<T>(val)) {}
    
    ConfigValue() = default; // Empty config value
    
    template<typename T>
    T as() const {
        return std::any_cast<T>(value_);
    }
    
    template<typename T>
    T as_or(T&& default_val) const {
        try {
            return std::any_cast<T>(value_);
        } catch (const std::bad_any_cast&) {
            return std::forward<T>(default_val);
        }
    }
    
    bool empty() const { return !value_.has_value(); }
    std::string type_name() const { return value_.type().name(); }
    
    // Conversion operators for common types
    operator int() const { return as<int>(); }
    operator double() const { return as<double>(); }
    operator std::string() const { return as<std::string>(); }
    operator bool() const { return as<bool>(); }
};

int main() {
    // === BASIC ANY USAGE ===
    std::cout << "=== Basic std::any Usage ===\\n";
    
    std::any empty_any;
    std::any int_any = 42;
    std::any string_any = std::string("Hello, Any!");
    std::any vec_any = std::vector<int>{1, 2, 3, 4, 5};
    
    print_any_info(empty_any);
    print_any_info(int_any);
    print_any_info(string_any);
    
    // === TYPE CASTING ===
    std::cout << "\\n=== Type Casting ===\\n";
    try {
        int value = std::any_cast<int>(int_any);
        std::cout << "Integer value: " << value << "\\n";
        
        std::string str = std::any_cast<std::string>(string_any);
        std::cout << "String value: " << str << "\\n";
        
        auto vec = std::any_cast<std::vector<int>>(vec_any);
        std::cout << "Vector size: " << vec.size() << "\\n";
        
        // This will throw std::bad_any_cast
        // double bad = std::any_cast<double>(int_any);
    } catch (const std::bad_any_cast& e) {
        std::cout << "Bad cast: " << e.what() << "\\n";
    }
    
    // === PROPERTY BAG USAGE ===
    std::cout << "\\n=== Property Bag System ===\\n";
    PropertyBag config;
    
    config.set("width", 1920);
    config.set("height", 1080);
    config.set("fullscreen", true);
    config.set("title", std::string("My Application"));
    config.set("version", 1.5);
    
    config.list_properties();
    
    // Retrieve values
    int width = config.get<int>("width");
    bool fullscreen = config.get<bool>("fullscreen");
    std::string title = config.get<std::string>("title");
    
    std::cout << "\\nConfiguration:\\n";
    std::cout << "  Resolution: " << width << "x" << config.get<int>("height") << "\\n";
    std::cout << "  Fullscreen: " << (fullscreen ? "yes" : "no") << "\\n";
    std::cout << "  Title: " << title << "\\n";
    
    // Safe retrieval
    double fps;
    if (config.try_get("fps", fps)) {
        std::cout << "  FPS: " << fps << "\\n";
    } else {
        std::cout << "  FPS: not set\\n";
    }
    
    // === EVENT SYSTEM ===
    std::cout << "\\n=== Event System ===\\n";
    EventHandler handler;
    
    std::vector<Event> events = {
        Event("user_input", std::string("Hello World!")),
        Event("mouse_click", std::make_pair(150, 200)),
        Event("file_loaded", std::make_pair(std::string("data.txt"), size_t(1024)))
    };
    
    for (const auto& event : events) {
        handler.handle_event(event);
    }
    
    // === CONFIG SYSTEM ===
    std::cout << "\\n=== Config System ===\\n";
    std::map<std::string, ConfigValue> settings = {
        {"max_connections", 100},
        {"timeout", 30.5},
        {"debug_mode", true},
        {"server_name", std::string("localhost")},
        {"ports", std::vector<int>{8080, 8443, 9090}}
    };
    
    std::cout << "Settings:\\n";
    for (const auto& [key, value] : settings) {
        if (!value.empty()) {
            std::cout << "  " << key << " (" << value.type_name() << ")\\n";
        }
    }
    
    // Usage with defaults
    int max_conn = settings["max_connections"].as_or(50);
    double timeout = settings["timeout"].as_or(15.0);
    bool debug = settings["debug_mode"].as_or(false);
    
    std::cout << "\\nProcessed settings:\\n";
    std::cout << "  Max connections: " << max_conn << "\\n";
    std::cout << "  Timeout: " << timeout << "s\\n";
    std::cout << "  Debug mode: " << (debug ? "enabled" : "disabled") << "\\n";
    
    return 0;
}`,
    explanation: 'std::any can hold any type of value and provides type-safe access to the stored value. Unlike std::variant which has a fixed set of possible types, std::any can store any type, making it useful for dynamic typing scenarios, plugin systems, and generic data containers.',
    useCase: 'Perfect for configuration systems, event handling with diverse payload types, plugin interfaces, scripting language bindings, and any scenario where you need to store and retrieve values of unknown types at compile time.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/utility/any'
  },

  // C++20 Features (Enhanced)
  {
    id: 'concepts',
    title: 'Concepts',
    standard: 'cpp20',
    description: 'Constrain template parameters with semantic requirements',
    codeExample: `#include <iostream>
#include <concepts>
#include <string>
#include <vector>
#include <type_traits>

// === BASIC CONCEPT DEFINITIONS ===

// Simple concept: requires type to be arithmetic (numbers)
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

// Concept with multiple requirements
template<typename T>
concept Printable = requires(T t) {
    // T must be usable with std::cout
    std::cout << t;
};

// More complex concept: requires specific operations
template<typename T>
concept Addable = requires(T a, T b) {
    // T must support addition and the result must be convertible to T
    { a + b } -> std::convertible_to<T>;
};

// === ADVANCED CONCEPTS ===

// Concept for container-like types
template<typename T>
concept Container = requires(T t) {
    // Must have begin(), end(), and size() methods
    t.begin();
    t.end();
    t.size();
    // Must have a value_type typedef
    typename T::value_type;
};

// Concept combining multiple requirements
template<typename T>
concept NumericContainer = Container<T> && 
    requires(T t) {
        // The container's value type must be numeric
        requires Numeric<typename T::value_type>;
    };

// === FUNCTIONS USING CONCEPTS ===

// Function constrained by Numeric concept
// Only accepts arithmetic types (int, float, double, etc.)
template<Numeric T>
T safe_add(T a, T b) {
    std::cout << "Adding numeric values: ";
    return a + b;
}

// Alternative syntax: concept as template parameter constraint
template<typename T>
    requires Printable<T> && Addable<T>
void print_and_add(T a, T b) {
    std::cout << "First value: " << a << "\\n";
    std::cout << "Second value: " << b << "\\n";
    std::cout << "Sum: " << (a + b) << "\\n\\n";
}

// Function for containers with numeric elements
template<NumericContainer C>
auto calculate_sum(const C& container) {
    using ValueType = typename C::value_type;
    ValueType sum{};  // Zero-initialize
    
    std::cout << "Calculating sum of " << container.size() << " elements:\\n";
    for (const auto& element : container) {
        std::cout << "  Adding: " << element << "\\n";
        sum += element;
    }
    
    return sum;
}

// === CONCEPT-BASED FUNCTION OVERLOADING ===

// Different implementations based on concepts
template<std::integral T>
void process_number(T value) {
    std::cout << "Processing integer: " << value << "\\n";
    std::cout << "  Binary representation: ";
    for (int i = sizeof(T) * 8 - 1; i >= 0; --i) {
        std::cout << ((value >> i) & 1);
    }
    std::cout << "\\n\\n";
}

template<std::floating_point T>
void process_number(T value) {
    std::cout << "Processing floating-point: " << value << "\\n";
    std::cout << "  Precision: " << (sizeof(T) == 4 ? "single" : "double") << "\\n";
    std::cout << "  Scientific notation: " << std::scientific << value << "\\n\\n";
}

// === CUSTOM CONCEPT WITH COMPLEX REQUIREMENTS ===
template<typename T>
concept Drawable = requires(T obj) {
    // Must have draw() method
    obj.draw();
    // Must have position coordinates
    obj.x;
    obj.y;
    // Must be moveable
    obj.move(0, 0);
};

// Simple classes to demonstrate concepts
struct Circle {
    double x = 0, y = 0, radius = 1;
    void draw() const { std::cout << "Drawing circle at (" << x << ", " << y << ")\\n"; }
    void move(double dx, double dy) { x += dx; y += dy; }
};

struct Rectangle {
    double x = 0, y = 0, width = 1, height = 1;
    void draw() const { std::cout << "Drawing rectangle at (" << x << ", " << y << ")\\n"; }
    void move(double dx, double dy) { x += dx; y += dy; }
};

// Function that works with any drawable object
template<Drawable T>
void render_object(T& obj) {
    std::cout << "Rendering drawable object:\\n";
    obj.draw();
    std::cout << "Moving object by (5, 3)\\n";
    obj.move(5, 3);
    obj.draw();
    std::cout << "\\n";
}

int main() {
    std::cout << "=== Basic Concept Usage ===\\n";
    
    // These work because int and double satisfy Numeric concept
    std::cout << "Integer addition: " << safe_add(5, 3) << "\\n";
    std::cout << "Float addition: " << safe_add(2.5, 1.7) << "\\n\\n";
    
    // This would cause a compile error:
    // safe_add(std::string("hello"), std::string("world")); // Error: string is not Numeric
    
    std::cout << "=== Multiple Concept Requirements ===\\n";
    print_and_add(10, 20);           // int satisfies both Printable and Addable
    print_and_add(3.14, 2.86);      // double satisfies both concepts
    print_and_add(std::string("Hello "), std::string("World")); // string satisfies both
    
    std::cout << "=== Container Concepts ===\\n";
    
    std::vector<int> int_vector = {1, 2, 3, 4, 5};
    std::vector<double> double_vector = {1.1, 2.2, 3.3};
    
    auto sum1 = calculate_sum(int_vector);
    auto sum2 = calculate_sum(double_vector);
    
    std::cout << "Integer vector sum: " << sum1 << "\\n";
    std::cout << "Double vector sum: " << sum2 << "\\n\\n";
    
    std::cout << "=== Concept-Based Overloading ===\\n";
    
    process_number(42);        // Calls integral version
    process_number(3.14159);   // Calls floating_point version
    
    std::cout << "=== Custom Drawable Concept ===\\n";
    
    Circle circle;
    Rectangle rect;
    
    render_object(circle);     // Works: Circle satisfies Drawable
    render_object(rect);       // Works: Rectangle satisfies Drawable
    
    return 0;
}`,
    explanation: 'Concepts provide a way to specify requirements on template parameters, making templates more readable and providing better error messages. They allow you to express what operations a type must support, leading to more self-documenting and maintainable generic code.',
    useCase: 'Essential for creating self-documenting generic code with clear constraints, better compilation errors, and enabling concept-based overloading. Perfect for library development where you need to clearly specify what types are acceptable.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/constraints'
  },
  {
    id: 'ranges',
    title: 'Ranges Library',
    standard: 'cpp20',
    description: 'Composable algorithms and lazy evaluation',
    codeExample: `#include <iostream>
#include <ranges>
#include <vector>
#include <string>
#include <algorithm>
#include <numeric>

int main() {
    std::cout << "=== Basic Range Views ===\\n";
    
    // Create a vector of numbers for demonstration
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
    
    // === COMPOSABLE RANGE OPERATIONS ===
    // Chain multiple operations together using the pipe operator |
    // Each operation creates a "view" - no actual computation until iteration
    auto processed_numbers = numbers 
        | std::views::filter([](int n) { 
            std::cout << "  Checking if " << n << " is even...\\n";
            return n % 2 == 0; 
          })  // Keep only even numbers
        | std::views::transform([](int n) { 
            std::cout << "  Squaring " << n << "...\\n";
            return n * n; 
          })  // Square each number
        | std::views::take(4);  // Take only first 4 results
    
    std::cout << "Processing pipeline (lazy evaluation):\\n";
    std::cout << "Even squares (first 4): ";
    
    // Computation happens here during iteration - this is lazy evaluation!
    for (int n : processed_numbers) {
        std::cout << n << " ";
    }
    std::cout << "\\n\\n";
    
    // === INFINITE SEQUENCES ===
    std::cout << "=== Infinite Sequences ===\\n";
    
    // Generate infinite sequence starting from 1
    // iota creates: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...
    auto fibonacci_indices = std::views::iota(0, 15);  // 0 to 14
    
    // Transform indices to Fibonacci numbers
    auto fibonacci_sequence = fibonacci_indices
        | std::views::transform([](int n) {
            // Calculate nth Fibonacci number
            if (n <= 1) return n;
            int a = 0, b = 1;
            for (int i = 2; i <= n; ++i) {
                int temp = a + b;
                a = b;
                b = temp;
            }
            return b;
        });
    
    std::cout << "First 15 Fibonacci numbers: ";
    for (int fib : fibonacci_sequence) {
        std::cout << fib << " ";
    }
    std::cout << "\\n\\n";
    
    // === STRING PROCESSING WITH RANGES ===
    std::cout << "=== String Processing ===\\n";
    
    std::vector<std::string> words = {
        "apple", "banana", "cherry", "date", "elderberry", 
        "fig", "grape", "honeydew", "kiwi", "lemon"
    };
    
    // Complex string processing pipeline
    auto long_uppercase_words = words
        | std::views::filter([](const std::string& word) {
            std::cout << "  Checking length of '" << word << "' (" << word.length() << " chars)\\n";
            return word.length() > 5;  // Only words longer than 5 characters
          })
        | std::views::transform([](const std::string& word) {
            std::cout << "  Converting '" << word << "' to uppercase\\n";
            std::string upper_word;
            std::ranges::transform(word, std::back_inserter(upper_word), 
                                 [](char c) { return std::toupper(c); });
            return upper_word;
          })
        | std::views::take(3);  // Take only first 3 results
    
    std::cout << "Long words (>5 chars) in uppercase:\\n";
    for (const auto& word : long_uppercase_words) {
        std::cout << "  " << word << "\\n";
    }
    std::cout << "\\n";
    
    // === ADVANCED RANGE OPERATIONS ===
    std::cout << "=== Advanced Operations ===\\n";
    
    std::vector<int> data = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9};
    
    // Multiple transformations and filters
    auto unique_large_doubled = data
        | std::views::filter([](int n) { return n > 4; })  // Numbers > 4
        | std::views::transform([](int n) { return n * 2; })  // Double them
        | std::views::reverse  // Reverse the order
        | std::views::take(6);  // Take first 6
    
    std::cout << "Large numbers (>4), doubled, reversed, first 6: ";
    for (int n : unique_large_doubled) {
        std::cout << n << " ";
    }
    std::cout << "\\n\\n";
    
    // === RANGE ALGORITHMS ===
    std::cout << "=== Range Algorithms ===\\n";
    
    std::vector<int> unsorted = {64, 34, 25, 12, 22, 11, 90};
    std::cout << "Original: ";
    std::ranges::for_each(unsorted, [](int n) { std::cout << n << " "; });
    std::cout << "\\n";
    
    // Sort using ranges algorithm
    std::ranges::sort(unsorted);
    std::cout << "Sorted: ";
    std::ranges::for_each(unsorted, [](int n) { std::cout << n << " "; });
    std::cout << "\\n";
    
    // Find element using ranges
    auto it = std::ranges::find(unsorted, 25);
    if (it != unsorted.end()) {
        std::cout << "Found 25 at position: " << std::distance(unsorted.begin(), it) << "\\n";
    }
    
    // Count elements meeting condition
    auto count = std::ranges::count_if(unsorted, [](int n) { return n > 30; });
    std::cout << "Numbers greater than 30: " << count << "\\n\\n";
    
    // === PERFORMANCE BENEFIT DEMONSTRATION ===
    std::cout << "=== Lazy Evaluation Benefit ===\\n";
    
    // Large dataset
    std::vector<int> large_data(1000);
    std::iota(large_data.begin(), large_data.end(), 1);  // 1 to 1000
    
    // Only the first element that satisfies all conditions is computed
    auto first_large_even_square = large_data
        | std::views::filter([](int n) { 
            std::cout << "  Filtering " << n << "\\n";
            return n > 500 && n % 2 == 0; 
          })
        | std::views::transform([](int n) { 
            std::cout << "  Squaring " << n << "\\n";
            return n * n; 
          })
        | std::views::take(1);  // Only need the first one
    
    std::cout << "First large even number squared: ";
    for (int n : first_large_even_square) {
        std::cout << n << "\\n";
        break;  // Only process the first element
    }
    
    return 0;
}`,
    explanation: 'The Ranges library provides a new way to work with sequences of data using composable views and algorithms. Views are lazy - they don\'t perform computation until you iterate over them, enabling efficient chaining of operations and working with infinite sequences.',
    useCase: 'Enables functional programming patterns with lazy evaluation, making complex data transformations more readable and efficient. Perfect for data processing pipelines, filtering and transforming collections, and working with large datasets where you only need part of the result.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/ranges'
  },
  {
    id: 'std-span',
    title: 'std::span',
    standard: 'cpp20',
    description: 'Non-owning view over a contiguous sequence of objects',
    codeExample: `#include <iostream>
#include <vector>
#include <array>
#include <span>
#include <algorithm>

// === BASIC SPAN USAGE ===
void print_elements(std::span<const int> data) {
    std::cout << "Elements: ";
    for (int value : data) {
        std::cout << value << " ";
    }
    std::cout << " (size: " << data.size() << ")\\n";
}

// === SPAN WITH DIFFERENT CONTAINERS ===
void process_data(std::span<int> data) {
    // Works with any contiguous container
    std::cout << "Processing " << data.size() << " elements\\n";
    
    // Can modify elements (if not const span)
    for (auto& element : data) {
        element *= 2;
    }
    
    // Subspan operations
    if (!data.empty()) {
        auto first_half = data.first(data.size() / 2);
        auto second_half = data.last(data.size() / 2);
        
        std::cout << "First half size: " << first_half.size() << "\\n";
        std::cout << "Second half size: " << second_half.size() << "\\n";
    }
}

// === MATRIX OPERATIONS WITH SPAN ===
class Matrix {
private:
    std::vector<double> data_;
    size_t rows_, cols_;
    
public:
    Matrix(size_t rows, size_t cols) : rows_(rows), cols_(cols), data_(rows * cols) {}
    
    // Return a span for a specific row
    std::span<double> row(size_t r) {
        return std::span(data_).subspan(r * cols_, cols_);
    }
    
    std::span<const double> row(size_t r) const {
        return std::span(data_).subspan(r * cols_, cols_);
    }
    
    size_t rows() const { return rows_; }
    size_t cols() const { return cols_; }
    
    // Fill matrix with values
    void fill_sequence() {
        std::iota(data_.begin(), data_.end(), 1.0);
    }
};

void print_matrix_row(std::span<const double> row, size_t row_num) {
    std::cout << "Row " << row_num << ": ";
    for (double value : row) {
        std::cout << value << " ";
    }
    std::cout << "\\n";
}

// === SAFE ARRAY ACCESS ===
class SafeBuffer {
private:
    std::vector<uint8_t> buffer_;
    
public:
    SafeBuffer(size_t size) : buffer_(size) {
        std::iota(buffer_.begin(), buffer_.end(), 1);
    }
    
    // Return span instead of raw pointer
    std::span<uint8_t> data() { return buffer_; }
    std::span<const uint8_t> data() const { return buffer_; }
    
    // Safe substring access
    std::span<const uint8_t> segment(size_t offset, size_t length) const {
        if (offset >= buffer_.size()) return {};
        length = std::min(length, buffer_.size() - offset);
        return std::span(buffer_).subspan(offset, length);
    }
};

int main() {
    // === WORKS WITH DIFFERENT CONTAINER TYPES ===
    std::cout << "=== Span with Different Containers ===\\n";
    
    // C-style array
    int c_array[] = {1, 2, 3, 4, 5};
    print_elements(c_array);
    
    // std::array
    std::array<int, 4> std_array = {10, 20, 30, 40};
    print_elements(std_array);
    
    // std::vector
    std::vector<int> vec = {100, 200, 300, 400, 500, 600};
    print_elements(vec);
    
    // Subset of vector
    print_elements(std::span(vec).subspan(1, 3)); // Elements at index 1,2,3
    
    // === PROCESSING DATA ===
    std::cout << "\\n=== Data Processing ===\\n";
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8};
    std::cout << "Before: ";
    print_elements(numbers);
    
    process_data(numbers);
    std::cout << "After: ";
    print_elements(numbers);
    
    // === MATRIX EXAMPLE ===
    std::cout << "\\n=== Matrix Operations ===\\n";
    Matrix matrix(3, 4);
    matrix.fill_sequence();
    
    for (size_t i = 0; i < matrix.rows(); ++i) {
        print_matrix_row(matrix.row(i), i);
    }
    
    // Modify a specific row
    auto row1 = matrix.row(1);
    std::fill(row1.begin(), row1.end(), 99.0);
    std::cout << "After modifying row 1:\\n";
    print_matrix_row(matrix.row(1), 1);
    
    // === SAFE BUFFER ACCESS ===
    std::cout << "\\n=== Safe Buffer Access ===\\n";
    SafeBuffer buffer(10);
    
    auto full_data = buffer.data();
    std::cout << "Full buffer: ";
    for (auto byte : full_data) {
        std::cout << static_cast<int>(byte) << " ";
    }
    std::cout << "\\n";
    
    auto segment = buffer.segment(3, 4);
    std::cout << "Segment [3:7): ";
    for (auto byte : segment) {
        std::cout << static_cast<int>(byte) << " ";
    }
    std::cout << "\\n";
    
    // === SPAN PROPERTIES ===
    std::cout << "\\n=== Span Properties ===\\n";
    std::cout << "Span is lightweight (size: " << sizeof(std::span<int>) << " bytes)\\n";
    std::cout << "No memory allocation or copying\\n";
    std::cout << "Type-safe and bounds-aware\\n";
    
    return 0;
}`,
    explanation: 'std::span provides a non-owning view over a contiguous sequence of objects, similar to string_view but for any type. It encapsulates a pointer and size, providing safe access to arrays, vectors, and other contiguous containers without owning the memory.',
    useCase: 'Perfect for function parameters that work with any contiguous container, safe array manipulation, implementing views over data structures (like matrix rows), and avoiding raw pointer parameters in APIs while maintaining performance.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/container/span'
  },
  {
    id: 'consteval',
    title: 'consteval',
    standard: 'cpp20',
    description: 'Immediate functions that must be evaluated at compile time',
    codeExample: `#include <iostream>
#include <string_view>
#include <array>

// === BASIC CONSTEVAL FUNCTIONS ===
// consteval functions MUST be evaluated at compile time
consteval int factorial(int n) {
    if (n < 0) throw "Negative factorial not supported";
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

consteval double power_of_two(int exp) {
    if (exp < 0) throw "Negative exponent not supported";
    double result = 1.0;
    for (int i = 0; i < exp; ++i) {
        result *= 2.0;
    }
    return result;
}

// === COMPILE-TIME STRING PROCESSING ===
consteval size_t string_length(const char* str) {
    size_t len = 0;
    while (str[len] != '\\0') {
        ++len;
    }
    return len;
}

consteval bool is_palindrome(std::string_view str) {
    if (str.empty()) return true;
    
    size_t left = 0;
    size_t right = str.length() - 1;
    
    while (left < right) {
        if (str[left] != str[right]) {
            return false;
        }
        ++left;
        --right;
    }
    return true;
}

// === COMPILE-TIME CONFIGURATION ===
enum class BuildType { Debug, Release, Test };

consteval BuildType get_build_type() {
    #ifdef DEBUG
        return BuildType::Debug;
    #elif defined(TEST)
        return BuildType::Test;
    #else
        return BuildType::Release;
    #endif
}

consteval const char* get_build_name() {
    switch (get_build_type()) {
        case BuildType::Debug: return "Debug Build";
        case BuildType::Release: return "Release Build";
        case BuildType::Test: return "Test Build";
    }
}

// === COMPILE-TIME VALIDATION ===
template<size_t N>
consteval std::array<int, N> generate_fibonacci() {
    static_assert(N > 0, "Array size must be positive");
    
    std::array<int, N> result{};
    if (N >= 1) result[0] = 0;
    if (N >= 2) result[1] = 1;
    
    for (size_t i = 2; i < N; ++i) {
        result[i] = result[i-1] + result[i-2];
    }
    return result;
}

consteval bool is_power_of_two(size_t n) {
    return n > 0 && (n & (n - 1)) == 0;
}

// Template that only accepts power-of-two sizes
template<size_t Size>
    requires is_power_of_two(Size)
class PowerOfTwoBuffer {
private:
    std::array<int, Size> data_{};
    
public:
    constexpr size_t size() const { return Size; }
    constexpr size_t capacity() const { return Size; }
    
    constexpr int& operator[](size_t index) { return data_[index]; }
    constexpr const int& operator[](size_t index) const { return data_[index]; }
};

// === COMPILE-TIME HASH FUNCTION ===
consteval size_t compile_time_hash(std::string_view str) {
    size_t hash = 5381;
    for (char c : str) {
        hash = ((hash << 5) + hash) + c;
    }
    return hash;
}

// === CONSTEVAL VS CONSTEXPR DEMONSTRATION ===
constexpr int constexpr_func(int n) {
    // Can be evaluated at compile time OR runtime
    return n * n;
}

consteval int consteval_func(int n) {
    // MUST be evaluated at compile time
    return n * n * n;
}

int main() {
    // === COMPILE-TIME CALCULATIONS ===
    std::cout << "=== Compile-Time Calculations ===\\n";
    
    // These are all computed at compile time
    constexpr int fact5 = factorial(5);
    constexpr double pow2_10 = power_of_two(10);
    constexpr size_t hello_len = string_length("Hello, World!");
    
    std::cout << "factorial(5) = " << fact5 << "\\n";
    std::cout << "2^10 = " << pow2_10 << "\\n";
    std::cout << "Length of 'Hello, World!' = " << hello_len << "\\n";
    
    // === COMPILE-TIME STRING VALIDATION ===
    std::cout << "\\n=== Compile-Time String Validation ===\\n";
    constexpr bool is_racecar = is_palindrome("racecar");
    constexpr bool is_hello = is_palindrome("hello");
    
    std::cout << "'racecar' is palindrome: " << is_racecar << "\\n";
    std::cout << "'hello' is palindrome: " << is_hello << "\\n";
    
    // === BUILD CONFIGURATION ===
    std::cout << "\\n=== Build Configuration ===\\n";
    std::cout << "Build type: " << get_build_name() << "\\n";
    
    // === COMPILE-TIME DATA STRUCTURES ===
    std::cout << "\\n=== Compile-Time Data Structures ===\\n";
    constexpr auto fib_sequence = generate_fibonacci<10>();
    
    std::cout << "First 10 Fibonacci numbers: ";
    for (int num : fib_sequence) {
        std::cout << num << " ";
    }
    std::cout << "\\n";
    
    // === CONSTEVAL CONSTRAINTS ===
    std::cout << "\\n=== Consteval Constraints ===\\n";
    
    // These work - power of two sizes
    PowerOfTwoBuffer<8> buffer8;     // 8 is 2^3
    PowerOfTwoBuffer<16> buffer16;   // 16 is 2^4
    
    // This would cause compilation error:
    // PowerOfTwoBuffer<10> buffer10;  // 10 is not a power of 2
    
    std::cout << "PowerOfTwoBuffer<8> size: " << buffer8.size() << "\\n";
    std::cout << "PowerOfTwoBuffer<16> size: " << buffer16.size() << "\\n";
    
    // === COMPILE-TIME HASH ===
    std::cout << "\\n=== Compile-Time Hash ===\\n";
    constexpr size_t hash1 = compile_time_hash("Hello");
    constexpr size_t hash2 = compile_time_hash("World");
    
    std::cout << "Hash of 'Hello': " << hash1 << "\\n";
    std::cout << "Hash of 'World': " << hash2 << "\\n";
    
    // === CONSTEVAL VS CONSTEXPR ===
    std::cout << "\\n=== consteval vs constexpr ===\\n";
    
    // Both can be used at compile time
    constexpr int ce1 = constexpr_func(5);  // Compile time
    constexpr int ce2 = consteval_func(5);  // Compile time (required)
    
    // Only constexpr can be used at runtime
    int runtime_val = 7;
    int ce3 = constexpr_func(runtime_val);   // Runtime evaluation OK
    // int ce4 = consteval_func(runtime_val);  // ERROR: must be compile time
    
    std::cout << "constexpr_func(5) = " << ce1 << "\\n";
    std::cout << "consteval_func(5) = " << ce2 << "\\n";
    std::cout << "constexpr_func(runtime_val) = " << ce3 << "\\n";
    
    return 0;
}`,
    explanation: 'consteval declares immediate functions that must be evaluated at compile time. Unlike constexpr functions that can run at either compile time or runtime, consteval functions are guaranteed to execute during compilation, making them perfect for compile-time computations and validation.',
    useCase: 'Essential for compile-time configuration, validation of template parameters, generating compile-time constants, implementing compile-time parsers or DSLs, and ensuring certain computations never impact runtime performance.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/consteval'
  },

  // C++23 Features (Enhanced)
  {
    id: 'std-expected',
    title: 'std::expected',
    standard: 'cpp23',
    description: 'Type-safe error handling without exceptions',
    codeExample: `#include <expected>
#include <iostream>
#include <string>
#include <fstream>
#include <vector>

// === CUSTOM ERROR TYPES ===
// Define specific error types for different failure scenarios
enum class ParseError {
    InvalidInput,
    OutOfRange,
    EmptyString,
    NonNumeric
};

enum class FileError {
    NotFound,
    PermissionDenied,
    ReadError
};

// Helper function to convert error to string for display
std::string error_to_string(ParseError error) {
    switch (error) {
        case ParseError::InvalidInput: return "Invalid input format";
        case ParseError::OutOfRange: return "Value out of acceptable range";
        case ParseError::EmptyString: return "Input string is empty";
        case ParseError::NonNumeric: return "Input contains non-numeric characters";
    }
    return "Unknown error";
}

// === BASIC EXPECTED USAGE ===
// Function that may fail: parsing integer with validation
std::expected<int, ParseError> parse_positive_int(const std::string& str) {
    std::cout << "  Attempting to parse: '" << str << "'\\n";
    
    // Check for empty string
    if (str.empty()) {
        std::cout << "  -> Error: Empty string\\n";
        return std::unexpected(ParseError::EmptyString);
    }
    
    // Check for non-numeric characters (simple check)
    for (char c : str) {
        if (!std::isdigit(c) && c != '-' && c != '+') {
            std::cout << "  -> Error: Non-numeric character found\\n";
            return std::unexpected(ParseError::NonNumeric);
        }
    }
    
    try {
        int value = std::stoi(str);
        
        // Additional validation: must be positive
        if (value <= 0) {
            std::cout << "  -> Error: Value must be positive\\n";
            return std::unexpected(ParseError::OutOfRange);
        }
        
        std::cout << "  -> Success: Parsed value " << value << "\\n";
        return value;  // Success case
        
    } catch (const std::exception&) {
        std::cout << "  -> Error: Failed to convert to integer\\n";
        return std::unexpected(ParseError::InvalidInput);
    }
}

// === CHAINING OPERATIONS WITH EXPECTED ===
// Function that depends on successful parsing
std::expected<double, ParseError> calculate_square_root(const std::string& input) {
    // Chain operations: parse then calculate
    return parse_positive_int(input)
        .and_then([](int value) -> std::expected<double, ParseError> {
            std::cout << "  Computing square root of " << value << "\\n";
            return std::sqrt(static_cast<double>(value));
        });
}

// === COMPLEX ERROR HANDLING SCENARIO ===
// Simulate reading and processing a configuration file
std::expected<std::vector<int>, FileError> read_numbers_from_file(const std::string& filename) {
    std::cout << "Attempting to read from file: " << filename << "\\n";
    
    // Simulate different file errors
    if (filename == "nonexistent.txt") {
        return std::unexpected(FileError::NotFound);
    }
    if (filename == "protected.txt") {
        return std::unexpected(FileError::PermissionDenied);
    }
    if (filename == "corrupted.txt") {
        return std::unexpected(FileError::ReadError);
    }
    
    // Simulate successful file reading
    std::cout << "  -> File read successfully\\n";
    return std::vector<int>{10, 20, 30, 40, 50};
}

// Function that processes file data and can fail at multiple points
std::expected<double, std::string> process_config_file(const std::string& filename) {
    // First, try to read the file
    auto file_result = read_numbers_from_file(filename);
    
    if (!file_result) {
        // Convert file error to string error for unified error handling
        std::string error_msg = "File error: ";
        switch (file_result.error()) {
            case FileError::NotFound:
                error_msg += "File not found";
                break;
            case FileError::PermissionDenied:
                error_msg += "Permission denied";
                break;
            case FileError::ReadError:
                error_msg += "Read error";
                break;
        }
        return std::unexpected(error_msg);
    }
    
    // Process the data
    const auto& numbers = file_result.value();
    if (numbers.empty()) {
        return std::unexpected("No data in file");
    }
    
    // Calculate average
    double sum = 0;
    for (int num : numbers) {
        sum += num;
    }
    double average = sum / numbers.size();
    
    std::cout << "  -> Calculated average: " << average << "\\n";
    return average;
}

int main() {
    std::cout << "=== Basic Expected Usage ===\\n";
    
    // Test cases for parsing
    std::vector<std::string> test_inputs = {
        "42",      // Valid positive integer
        "-5",      // Negative number (should fail)
        "abc",     // Non-numeric
        "",        // Empty string
        "0",       // Zero (should fail - not positive)
        "123"      // Valid positive integer
    };
    
    for (const auto& input : test_inputs) {
        auto result = parse_positive_int(input);
        
        // Method 1: Check with has_value()
        if (result.has_value()) {
            std::cout << "SUCCESS: Parsed '" << input << "' as " << result.value() << "\\n";
        } else {
            std::cout << "FAILED: " << error_to_string(result.error()) << "\\n";
        }
        std::cout << "\\n";
    }
    
    std::cout << "=== Chaining Operations ===\\n";
    
    // Test chaining with and_then
    std::vector<std::string> sqrt_inputs = {"16", "25", "-4", "abc"};
    
    for (const auto& input : sqrt_inputs) {
        std::cout << "Computing square root of '" << input << "':\\n";
        auto result = calculate_square_root(input);
        
        if (result) {
            std::cout << "SUCCESS: sqrt(" << input << ") = " << *result << "\\n";
        } else {
            std::cout << "FAILED: " << error_to_string(result.error()) << "\\n";
        }
        std::cout << "\\n";
    }
    
    std::cout << "=== Advanced Error Handling ===\\n";
    
    // Test file processing with different error scenarios
    std::vector<std::string> filenames = {
        "config.txt",      // Success case
        "nonexistent.txt", // File not found
        "protected.txt",   // Permission denied
        "corrupted.txt"    // Read error
    };
    
    for (const auto& filename : filenames) {
        std::cout << "Processing " << filename << ":\\n";
        auto result = process_config_file(filename);
        
        // Using value_or for default handling
        if (result) {
            std::cout << "SUCCESS: Average value is " << result.value() << "\\n";
        } else {
            std::cout << "FAILED: " << result.error() << "\\n";
        }
        std::cout << "\\n";
    }
    
    std::cout << "=== Expected vs Optional Comparison ===\\n";
    
    // Demonstrate why expected is better than optional for error cases
    auto parse_result = parse_positive_int("abc");
    
    // With expected, we know WHY it failed
    if (!parse_result) {
        std::cout << "Parse failed with specific reason: " 
                  << error_to_string(parse_result.error()) << "\\n";
    }
    
    // With optional, we'd only know THAT it failed, not why
    // std::optional<int> would just be empty with no error information
    
    std::cout << "\\n=== Transform and Error Recovery ===\\n";
    
    // Using transform to modify successful values
    auto transform_result = parse_positive_int("10")
        .transform([](int value) {
            std::cout << "  Transforming " << value << " to " << (value * 2) << "\\n";
            return value * 2;
        });
    
    if (transform_result) {
        std::cout << "Transformed result: " << *transform_result << "\\n";
    }
    
    // Using or_else for error recovery
    auto recovery_result = parse_positive_int("invalid")
        .or_else([](ParseError error) -> std::expected<int, ParseError> {
            std::cout << "  Recovering from error: " << error_to_string(error) << "\\n";
            std::cout << "  Using default value: 1\\n";
            return 1;  // Provide default value
        });
    
    if (recovery_result) {
        std::cout << "Recovered result: " << *recovery_result << "\\n";
    }
    
    return 0;
}`,
    explanation: 'std::expected provides a type-safe way to handle operations that can fail, containing either a value or an error. Unlike exceptions, errors are part of the type system, making error handling explicit and allowing you to know exactly what can go wrong and why.',
    useCase: 'Perfect for error handling in systems where exceptions are not desired, APIs that can fail in predictable ways, parsing operations, file I/O, network operations, and any scenario where you want explicit, type-safe error handling with detailed error information.',
    referenceUrl: 'https://en.cppreference.com/w/cpp/utility/expected'
  },
  {
    id: 'ranges-to',
    title: 'std::ranges::to',
    standard: 'cpp23',
    description: 'Convert range views directly into containers with std::ranges::to.',
    codeExample: `#include <ranges>
#include <vector>
#include <set>
#include <iostream>

int main() {
    // Convert range to vector
    auto numbers = std::views::iota(1, 6) 
                 | std::ranges::to<std::vector>();
    
    // Convert with transformation to set
    auto squares = std::views::iota(1, 6)
                 | std::views::transform([](int x) { return x * x; })
                 | std::ranges::to<std::set>();
    
    return 0;
}`,
    explanation: 'std::ranges::to provides a convenient way to materialize range views into concrete containers. This eliminates the need for manual iteration or using algorithms like std::copy to convert lazy range views into actual container objects.',
    useCase: `Essential for converting the result of range operations into specific container types for storage, further processing, or API compatibility. Perfect for data processing pipelines where you need the final result in a particular container format, and for performance-critical code where you want to minimize intermediate allocations.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/ranges'
  },

  // === TEMPLATE METAPROGRAMMING FEATURES ===
  {
    id: 'template-basics',
    title: 'Template Fundamentals',
    standard: 'templates',
    description: 'Master the fundamentals of C++ templates including function templates, class templates, and template specialization.',
    codeExample: `#include <iostream>
#include <vector>
#include <string>
#include <type_traits>

// Function template with type deduction
template<typename T>
T max_value(const T& a, const T& b) {
    return (a > b) ? a : b;
}

// Function template with multiple parameters
template<typename T, typename U>
auto add(const T& a, const U& b) -> decltype(a + b) {
    return a + b;
}

// Class template with default parameters
template<typename T, size_t N = 10>
class FixedArray {
private:
    T data_[N];
    size_t size_ = 0;

public:
    void push_back(const T& value) {
        if (size_ < N) {
            data_[size_++] = value;
        }
    }
    
    T& operator[](size_t index) { return data_[index]; }
    const T& operator[](size_t index) const { return data_[index]; }
    size_t size() const { return size_; }
    constexpr size_t capacity() const { return N; }
};

// Template specialization for bool
template<size_t N>
class FixedArray<bool, N> {
private:
    std::vector<bool> data_;

public:
    FixedArray() : data_(N) {}
    
    void set(size_t index, bool value) {
        if (index < N) data_[index] = value;
    }
    
    bool get(size_t index) const {
        return index < N ? data_[index] : false;
    }
};

int main() {
    // Function template usage
    std::cout << "Max of 10, 20: " << max_value(10, 20) << std::endl;
    std::cout << "Max of 3.14, 2.71: " << max_value(3.14, 2.71) << std::endl;
    
    // Mixed type addition
    std::cout << "Add 5 + 3.14: " << add(5, 3.14) << std::endl;
    
    // Class template usage
    FixedArray<int, 5> int_array;
    int_array.push_back(1);
    int_array.push_back(2);
    int_array.push_back(3);
    
    std::cout << "Array size: " << int_array.size() << std::endl;
    std::cout << "Array capacity: " << int_array.capacity() << std::endl;
    
    // Specialized template for bool
    FixedArray<bool, 8> bool_array;
    bool_array.set(0, true);
    bool_array.set(1, false);
    
    std::cout << "Bool array[0]: " << bool_array.get(0) << std::endl;
    
    return 0;
}`,
    explanation: `Templates are C++'s mechanism for generic programming, allowing you to write code that works with multiple types while maintaining type safety and performance. Function templates enable generic algorithms, class templates create generic data structures, and template specialization allows customization for specific types. Templates are resolved at compile time, resulting in zero runtime overhead.`,
    useCase: `Templates are fundamental to modern C++ libraries like STL. Use function templates for generic algorithms (sorting, searching), class templates for containers and smart pointers, and specialization for type-specific optimizations. Essential for library development and performance-critical generic code.`
  },

  {
    id: 'sfinae-concepts',
    title: 'SFINAE and Modern Concepts',
    standard: 'templates',
    description: 'Learn Substitution Failure Is Not An Error (SFINAE) techniques and how modern concepts provide cleaner template constraints.',
    codeExample: `#include <iostream>
#include <type_traits>
#include <concepts>
#include <vector>
#include <string>

// === SFINAE Examples ===

// SFINAE with std::enable_if
template<typename T>
typename std::enable_if<std::is_integral_v<T>, void>::type
print_if_integral(const T& value) {
    std::cout << "Integer: " << value << std::endl;
}

template<typename T>
typename std::enable_if<std::is_floating_point_v<T>, void>::type
print_if_integral(const T& value) {
    std::cout << "Float: " << value << std::endl;
}

// SFINAE with decltype and expression SFINAE
template<typename T>
auto has_size_method(const T& t) -> decltype(t.size(), std::true_type{});

template<typename T>
std::false_type has_size_method(...);

template<typename T>
constexpr bool has_size_v = decltype(has_size_method(std::declval<T>()))::value;

// === Modern Concepts (C++20) ===

template<typename T>
concept Integral = std::is_integral_v<T>;

template<typename T>
concept FloatingPoint = std::is_floating_point_v<T>;

template<typename T>
concept HasSize = requires(T t) {
    { t.size() } -> std::convertible_to<std::size_t>;
};

template<typename T>
concept Printable = requires(T t) {
    std::cout << t;
};

// Using concepts for cleaner template constraints
template<Integral T>
void modern_print_integral(const T& value) {
    std::cout << "Modern Integer: " << value << std::endl;
}

template<FloatingPoint T>
void modern_print_float(const T& value) {
    std::cout << "Modern Float: " << value << std::endl;
}

template<HasSize T>
void print_size(const T& container) {
    std::cout << "Container size: " << container.size() << std::endl;
}

template<Printable T>
void safe_print(const T& value) {
    std::cout << "Value: " << value << std::endl;
}

// Concept composition
template<typename T>
concept PrintableContainer = HasSize<T> && Printable<T>;

template<PrintableContainer T>
void print_container_info(const T& container) {
    std::cout << "Container: " << container << " (size: " << container.size() << ")" << std::endl;
}

int main() {
    // SFINAE examples
    print_if_integral(42);        // Calls integer version
    print_if_integral(3.14);      // Calls float version
    
    // Test has_size detection
    std::vector<int> vec = {1, 2, 3};
    std::string str = "hello";
    int number = 42;
    
    std::cout << "vector has size: " << has_size_v<std::vector<int>> << std::endl;
    std::cout << "string has size: " << has_size_v<std::string> << std::endl;
    std::cout << "int has size: " << has_size_v<int> << std::endl;
    
    // Modern concepts
    modern_print_integral(100);
    modern_print_float(2.718);
    
    print_size(vec);
    print_size(str);
    
    safe_print(42);
    safe_print("Hello World");
    
    // This would cause a compile error:
    // print_size(number); // int doesn't have size() method
    
    return 0;
}`,
    explanation: `SFINAE (Substitution Failure Is Not An Error) is a C++ technique that allows template specialization based on whether certain expressions are valid. When template argument substitution fails, the compiler doesn't generate an error but instead removes that template from consideration. Modern C++20 concepts provide a cleaner, more readable way to constrain templates with better error messages.`,
    useCase: `SFINAE is crucial for creating flexible template libraries that adapt to different types. Use it for type detection, conditional compilation, and creating different implementations based on type properties. Modern concepts make template constraints self-documenting and provide much clearer error messages than SFINAE.`
  },

  {
    id: 'variadic-templates',
    title: 'Variadic Templates and Perfect Forwarding',
    standard: 'templates',
    description: 'Master variadic templates for handling variable numbers of arguments and perfect forwarding for efficient parameter passing.',
    codeExample: `#include <iostream>
#include <memory>
#include <utility>
#include <string>
#include <vector>

// === Basic Variadic Templates ===

// Recursive variadic template
template<typename T>
void print(const T& value) {
    std::cout << value << std::endl;
}

template<typename T, typename... Args>
void print(const T& first, const Args&... rest) {
    std::cout << first << " ";
    print(rest...);  // Recursive call
}

// C++17 fold expressions (cleaner approach)
template<typename... Args>
void print_fold(const Args&... args) {
    ((std::cout << args << " "), ...);
    std::cout << std::endl;
}

// === Perfect Forwarding ===

// Factory function with perfect forwarding
template<typename T, typename... Args>
std::unique_ptr<T> make_unique_perfect(Args&&... args) {
    return std::make_unique<T>(std::forward<Args>(args)...);
}

// Wrapper function that preserves value categories
template<typename Func, typename... Args>
auto call_function(Func&& func, Args&&... args) 
    -> decltype(std::forward<Func>(func)(std::forward<Args>(args)...)) {
    std::cout << "Calling function with " << sizeof...(args) << " arguments" << std::endl;
    return std::forward<Func>(func)(std::forward<Args>(args)...);
}

// === Advanced Variadic Techniques ===

// Variadic class template
template<typename... Types>
class TypeList {
public:
    static constexpr size_t size = sizeof...(Types);
    
    template<size_t Index>
    using type_at = std::tuple_element_t<Index, std::tuple<Types...>>;
};

// Variadic template with type constraints
template<typename... Args>
requires (std::is_arithmetic_v<Args> && ...)
auto sum_all(Args... args) {
    return (args + ...);  // C++17 fold expression
}

// Variadic template for container construction
template<typename Container, typename... Args>
Container make_container(Args&&... args) {
    Container container;
    (container.push_back(std::forward<Args>(args)), ...);
    return container;
}

// === Example Classes for Testing ===

class Person {
private:
    std::string name_;
    int age_;

public:
    Person(const std::string& name, int age) : name_(name), age_(age) {
        std::cout << "Person constructed: " << name_ << ", " << age_ << std::endl;
    }
    
    Person(std::string&& name, int age) : name_(std::move(name)), age_(age) {
        std::cout << "Person constructed with move: " << name_ << ", " << age_ << std::endl;
    }
    
    void introduce() const {
        std::cout << "Hi, I'm " << name_ << " and I'm " << age_ << " years old." << std::endl;
    }
};

int multiply(int a, int b, int c) {
    return a * b * c;
}

int main() {
    // Basic variadic templates
    std::cout << "=== Basic Variadic Templates ===" << std::endl;
    print(1, 2.5, "hello", 'c');
    print_fold("C++", 20, "is", "awesome!");
    
    // Perfect forwarding with factory
    std::cout << "\\n=== Perfect Forwarding ===" << std::endl;
    std::string name = "Alice";
    auto person1 = make_unique_perfect<Person>(name, 25);        // Copy
    auto person2 = make_unique_perfect<Person>("Bob", 30);       // Move
    
    person1->introduce();
    person2->introduce();
    
    // Function wrapper with perfect forwarding
    std::cout << "\\n=== Function Wrapper ===" << std::endl;
    auto result = call_function(multiply, 2, 3, 4);
    std::cout << "Result: " << result << std::endl;
    
    // TypeList usage
    std::cout << "\\n=== TypeList ===" << std::endl;
    using MyTypes = TypeList<int, double, std::string>;
    std::cout << "TypeList size: " << MyTypes::size << std::endl;
    
    // Sum with fold expression
    std::cout << "\\n=== Fold Expressions ===" << std::endl;
    auto sum = sum_all(1, 2, 3, 4, 5);
    std::cout << "Sum: " << sum << std::endl;
    
    // Container construction
    std::cout << "\\n=== Container Construction ===" << std::endl;
    auto vec = make_container<std::vector<int>>(1, 2, 3, 4, 5);
    std::cout << "Vector size: " << vec.size() << std::endl;
    
    return 0;
}`,
    explanation: `Variadic templates allow functions and classes to accept a variable number of template arguments. Perfect forwarding preserves the value category (lvalue/rvalue) of arguments when passing them to other functions, enabling efficient generic wrappers. C++17 fold expressions provide a concise way to apply operations to parameter packs.`,
    useCase: `Variadic templates are essential for generic factory functions, logging systems, and container constructors. Perfect forwarding is crucial for wrapper functions, factory methods, and any code that needs to preserve argument semantics. Used extensively in standard library functions like std::make_unique and std::forward.`
  },

  // === PERFORMANCE OPTIMIZATION FEATURES ===
  {
    id: 'memory-layout-optimization',
    title: 'Memory Layout & Cache Optimization',
    standard: 'performance',
    description: 'Optimize data structures for cache performance and memory access patterns',
    codeExample: `#include <iostream>
#include <vector>
#include <chrono>
#include <memory>
#include <cstring>

// === CACHE-FRIENDLY DATA STRUCTURES ===

// Bad: Array of Structures (AoS) - poor cache locality
struct ParticleAoS {
    float x, y, z;     // Position
    float vx, vy, vz;  // Velocity
    float mass;
    int id;
};

// Good: Structure of Arrays (SoA) - excellent cache locality
struct ParticlesSoA {
    std::vector<float> x, y, z;        // Positions grouped together
    std::vector<float> vx, vy, vz;     // Velocities grouped together
    std::vector<float> mass;           // Masses grouped together
    std::vector<int> id;               // IDs grouped together
    
    void resize(size_t count) {
        x.resize(count); y.resize(count); z.resize(count);
        vx.resize(count); vy.resize(count); vz.resize(count);
        mass.resize(count); id.resize(count);
    }
};

// === MEMORY ALIGNMENT FOR PERFORMANCE ===

// Poorly aligned structure (lots of padding)
struct BadAlignment {
    char a;      // 1 byte
    // 7 bytes padding
    double b;    // 8 bytes
    char c;      // 1 byte
    // 7 bytes padding
    double d;    // 8 bytes
    // Total: 32 bytes with padding
};

// Well-aligned structure (minimal padding)
struct GoodAlignment {
    double b;    // 8 bytes
    double d;    // 8 bytes
    char a;      // 1 byte
    char c;      // 1 byte
    // 6 bytes padding
    // Total: 24 bytes with padding
};

// Force specific alignment for SIMD operations
struct alignas(32) SIMDAligned {
    float data[8];  // Perfectly aligned for AVX operations
};

// === CACHE-LINE AWARE PROGRAMMING ===

// Prevent false sharing by padding to cache line boundaries
struct alignas(64) CacheLinePadded {  // 64 bytes = typical cache line size
    std::atomic<int> counter;
    char padding[64 - sizeof(std::atomic<int>)];
};

// Hot/Cold data separation
struct HotColdSeparation {
    // Hot data: frequently accessed
    struct Hot {
        double price;
        int64_t timestamp;
        int32_t quantity;
    } hot;
    
    // Cold data: rarely accessed
    struct Cold {
        std::string symbol;
        std::string exchange;
        char metadata[256];
    } cold;
};

// === PERFORMANCE BENCHMARKING ===

void benchmark_memory_access() {
    const size_t N = 1000000;
    
    // AoS benchmark
    std::vector<ParticleAoS> particles_aos(N);
    auto start = std::chrono::high_resolution_clock::now();
    
    // Only access position data (poor cache usage)
    double sum_aos = 0;
    for (const auto& p : particles_aos) {
        sum_aos += p.x + p.y + p.z;  // Loads entire struct, wastes cache
    }
    
    auto end = std::chrono::high_resolution_clock::now();
    auto aos_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    // SoA benchmark
    ParticlesSoA particles_soa;
    particles_soa.resize(N);
    
    start = std::chrono::high_resolution_clock::now();
    
    // Only access position data (excellent cache usage)
    double sum_soa = 0;
    for (size_t i = 0; i < N; ++i) {
        sum_soa += particles_soa.x[i] + particles_soa.y[i] + particles_soa.z[i];
    }
    
    end = std::chrono::high_resolution_clock::now();
    auto soa_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    std::cout << "=== Memory Layout Performance ===\\n";
    std::cout << "AoS time: " << aos_time.count() << " μs\\n";
    std::cout << "SoA time: " << soa_time.count() << " μs\\n";
    std::cout << "SoA speedup: " << (double)aos_time.count() / soa_time.count() << "x\\n";
    
    // Memory usage analysis
    std::cout << "\\n=== Memory Usage Analysis ===\\n";
    std::cout << "BadAlignment size: " << sizeof(BadAlignment) << " bytes\\n";
    std::cout << "GoodAlignment size: " << sizeof(GoodAlignment) << " bytes\\n";
    std::cout << "SIMDAligned size: " << sizeof(SIMDAligned) << " bytes\\n";
    std::cout << "CacheLinePadded size: " << sizeof(CacheLinePadded) << " bytes\\n";
}

int main() {
    benchmark_memory_access();
    return 0;
}`,
    explanation: 'Memory layout optimization is crucial for high-performance applications. Structure of Arrays (SoA) provides better cache locality than Array of Structures (AoS) when processing specific fields. Proper alignment reduces memory waste and enables SIMD optimizations, while cache-line awareness prevents false sharing in multi-threaded code.',
    useCase: 'Essential for high-frequency trading systems, game engines, scientific computing, and any performance-critical application where memory access patterns significantly impact performance. Critical for SIMD vectorization and multi-threaded applications.'
  },
  {
    id: 'lock-free-programming',
    title: 'Lock-Free Programming & Atomics',
    standard: 'performance',
    description: 'Implement high-performance concurrent data structures without locks',
    codeExample: `#include <atomic>
#include <memory>
#include <iostream>
#include <thread>
#include <vector>
#include <chrono>

// === LOCK-FREE QUEUE IMPLEMENTATION ===

template<typename T>
class LockFreeQueue {
private:
    struct Node {
        std::atomic<T*> data{nullptr};
        std::atomic<Node*> next{nullptr};
    };
    
    std::atomic<Node*> head{new Node};
    std::atomic<Node*> tail{head.load()};
    
public:
    ~LockFreeQueue() {
        while (Node* const old_head = head.load()) {
            head.store(old_head->next);
            delete old_head;
        }
    }
    
    void enqueue(T item) {
        Node* const new_node = new Node;
        T* const data = new T(std::move(item));
        new_node->data.store(data);
        
        Node* prev_tail = tail.exchange(new_node);
        prev_tail->next.store(new_node);
    }
    
    bool dequeue(T& result) {
        Node* head_node = head.load();
        Node* const next = head_node->next.load();
        
        if (next == nullptr) {
            return false;  // Queue is empty
        }
        
        T* const data = next->data.load();
        if (data == nullptr) {
            return false;  // Another thread got here first
        }
        
        // Try to claim the data
        if (!next->data.compare_exchange_strong(data, nullptr)) {
            return false;  // Another thread got here first
        }
        
        result = *data;
        delete data;
        
        // Move head forward
        head.store(next);
        delete head_node;
        
        return true;
    }
};

// === ATOMIC OPERATIONS AND MEMORY ORDERING ===

class HighPerformanceCounter {
private:
    // Different memory orderings for different use cases
    std::atomic<int64_t> counter_{0};
    std::atomic<bool> flag_{false};
    
public:
    // Relaxed ordering: fastest, no synchronization guarantees
    void increment_relaxed() {
        counter_.fetch_add(1, std::memory_order_relaxed);
    }
    
    // Acquire-release: synchronizes with other acquire-release operations
    void increment_acq_rel() {
        counter_.fetch_add(1, std::memory_order_acq_rel);
    }
    
    // Sequential consistency: strongest guarantees, slowest
    void increment_seq_cst() {
        counter_.fetch_add(1, std::memory_order_seq_cst);
    }
    
    // Compare-and-swap for lock-free algorithms
    bool try_increment_if_less_than(int64_t threshold) {
        int64_t current = counter_.load(std::memory_order_acquire);
        
        do {
            if (current >= threshold) {
                return false;  // Threshold reached
            }
        } while (!counter_.compare_exchange_weak(
            current, current + 1,
            std::memory_order_release,
            std::memory_order_acquire
        ));
        
        return true;
    }
    
    int64_t get() const {
        return counter_.load(std::memory_order_acquire);
    }
    
    // Lock-free flag operations
    void set_flag() {
        flag_.store(true, std::memory_order_release);
    }
    
    bool check_flag() {
        return flag_.load(std::memory_order_acquire);
    }
};

// === HAZARD POINTERS FOR SAFE MEMORY RECLAMATION ===

template<typename T>
class HazardPointer {
private:
    static thread_local std::atomic<T*> hazard_ptr_;
    
public:
    static void set_hazard(T* ptr) {
        hazard_ptr_.store(ptr, std::memory_order_release);
    }
    
    static void clear_hazard() {
        hazard_ptr_.store(nullptr, std::memory_order_release);
    }
    
    static T* get_hazard() {
        return hazard_ptr_.load(std::memory_order_acquire);
    }
};

template<typename T>
thread_local std::atomic<T*> HazardPointer<T>::hazard_ptr_{nullptr};

// === PERFORMANCE BENCHMARKING ===

void benchmark_atomic_operations() {
    const int iterations = 10000000;
    HighPerformanceCounter counter;
    
    // Benchmark different memory orderings
    auto benchmark = [&](auto func, const std::string& name) {
        auto start = std::chrono::high_resolution_clock::now();
        
        for (int i = 0; i < iterations; ++i) {
            func();
        }
        
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
        
        std::cout << name << ": " << duration.count() << " μs\\n";
    };
    
    std::cout << "=== Atomic Operation Performance ===\\n";
    benchmark([&]() { counter.increment_relaxed(); }, "Relaxed ordering");
    benchmark([&]() { counter.increment_acq_rel(); }, "Acquire-release ordering");
    benchmark([&]() { counter.increment_seq_cst(); }, "Sequential consistency");
    
    std::cout << "Final counter value: " << counter.get() << "\\n";
}

void test_lock_free_queue() {
    LockFreeQueue<int> queue;
    const int num_producers = 4;
    const int num_consumers = 2;
    const int items_per_producer = 10000;
    
    std::vector<std::thread> producers;
    std::vector<std::thread> consumers;
    std::atomic<int> total_consumed{0};
    std::atomic<bool> done{false};
    
    // Start producers
    for (int p = 0; p < num_producers; ++p) {
        producers.emplace_back([&, p]() {
            for (int i = 0; i < items_per_producer; ++i) {
                queue.enqueue(p * items_per_producer + i);
            }
        });
    }
    
    // Start consumers
    for (int c = 0; c < num_consumers; ++c) {
        consumers.emplace_back([&]() {
            int item;
            int consumed = 0;
            
            while (!done.load() || queue.dequeue(item)) {
                if (queue.dequeue(item)) {
                    consumed++;
                }
                std::this_thread::yield();
            }
            
            total_consumed.fetch_add(consumed);
        });
    }
    
    // Wait for producers to finish
    for (auto& t : producers) {
        t.join();
    }
    
    // Signal consumers to finish
    done.store(true);
    
    // Wait for consumers to finish
    for (auto& t : consumers) {
        t.join();
    }
    
    std::cout << "\\n=== Lock-Free Queue Test ===\\n";
    std::cout << "Items produced: " << num_producers * items_per_producer << "\\n";
    std::cout << "Items consumed: " << total_consumed.load() << "\\n";
}

int main() {
    benchmark_atomic_operations();
    test_lock_free_queue();
    return 0;
}`,
    explanation: 'Lock-free programming uses atomic operations and memory ordering to achieve thread safety without locks, eliminating contention and improving scalability. Compare-and-swap operations enable lock-free data structures, while different memory orderings provide trade-offs between performance and synchronization guarantees.',
    useCase: 'Critical for high-frequency trading systems, real-time applications, and high-throughput servers where lock contention would be a bottleneck. Essential for building scalable concurrent data structures and minimizing latency in multi-threaded applications.'
  },
  {
    id: 'simd-vectorization',
    title: 'SIMD Vectorization & Intrinsics',
    standard: 'performance',
    description: 'Leverage CPU vector instructions for parallel data processing',
    codeExample: `#include <immintrin.h>  // Intel intrinsics
#include <iostream>
#include <vector>
#include <chrono>
#include <random>
#include <cstring>

// === SIMD VECTOR OPERATIONS ===

class SIMDMath {
public:
    // Vectorized addition of 8 floats at once using AVX
    static void add_vectors_avx(const float* a, const float* b, float* result, size_t size) {
        size_t simd_size = size - (size % 8);  // Process in chunks of 8
        
        for (size_t i = 0; i < simd_size; i += 8) {
            // Load 8 floats from each array
            __m256 va = _mm256_load_ps(&a[i]);
            __m256 vb = _mm256_load_ps(&b[i]);
            
            // Perform 8 additions in parallel
            __m256 vresult = _mm256_add_ps(va, vb);
            
            // Store result
            _mm256_store_ps(&result[i], vresult);
        }
        
        // Handle remaining elements
        for (size_t i = simd_size; i < size; ++i) {
            result[i] = a[i] + b[i];
        }
    }
    
    // Vectorized dot product using AVX
    static float dot_product_avx(const float* a, const float* b, size_t size) {
        __m256 sum_vec = _mm256_setzero_ps();
        size_t simd_size = size - (size % 8);
        
        for (size_t i = 0; i < simd_size; i += 8) {
            __m256 va = _mm256_load_ps(&a[i]);
            __m256 vb = _mm256_load_ps(&b[i]);
            
            // Multiply and accumulate
            sum_vec = _mm256_fmadd_ps(va, vb, sum_vec);
        }
        
        // Horizontal sum of the vector
        alignas(32) float temp[8];
        _mm256_store_ps(temp, sum_vec);
        
        float result = temp[0] + temp[1] + temp[2] + temp[3] + 
                      temp[4] + temp[5] + temp[6] + temp[7];
        
        // Handle remaining elements
        for (size_t i = simd_size; i < size; ++i) {
            result += a[i] * b[i];
        }
        
        return result;
    }
    
    // Scalar versions for comparison
    static void add_vectors_scalar(const float* a, const float* b, float* result, size_t size) {
        for (size_t i = 0; i < size; ++i) {
            result[i] = a[i] + b[i];
        }
    }
    
    static float dot_product_scalar(const float* a, const float* b, size_t size) {
        float result = 0.0f;
        for (size_t i = 0; i < size; ++i) {
            result += a[i] * b[i];
        }
        return result;
    }
};

// === FINANCIAL CALCULATIONS WITH SIMD ===

class FinancialSIMD {
public:
    // Calculate moving average using SIMD
    static void moving_average_avx(const float* prices, float* averages, 
                                  size_t size, int window) {
        for (size_t i = window - 1; i < size; ++i) {
            __m256 sum_vec = _mm256_setzero_ps();
            size_t start = i - window + 1;
            size_t simd_end = start + ((window / 8) * 8);
            
            // SIMD sum
            for (size_t j = start; j < simd_end; j += 8) {
                __m256 prices_vec = _mm256_loadu_ps(&prices[j]);
                sum_vec = _mm256_add_ps(sum_vec, prices_vec);
            }
            
            // Horizontal sum
            alignas(32) float temp[8];
            _mm256_store_ps(temp, sum_vec);
            float sum = temp[0] + temp[1] + temp[2] + temp[3] + 
                       temp[4] + temp[5] + temp[6] + temp[7];
            
            // Add remaining elements
            for (size_t j = simd_end; j < start + window; ++j) {
                sum += prices[j];
            }
            
            averages[i] = sum / window;
        }
    }
    
    // Vectorized price volatility calculation
    static void calculate_volatility_avx(const float* prices, float* volatility,
                                        size_t size, int window) {
        std::vector<float> returns(size - 1);
        
        // Calculate returns using SIMD
        for (size_t i = 0; i < size - 1; i += 8) {
            size_t remaining = std::min(8UL, size - 1 - i);
            
            if (remaining == 8) {
                __m256 current = _mm256_loadu_ps(&prices[i + 1]);
                __m256 previous = _mm256_loadu_ps(&prices[i]);
                __m256 ratio = _mm256_div_ps(current, previous);
                __m256 one = _mm256_set1_ps(1.0f);
                __m256 ret = _mm256_sub_ps(ratio, one);
                
                _mm256_storeu_ps(&returns[i], ret);
            } else {
                // Handle remaining elements
                for (size_t j = i; j < i + remaining; ++j) {
                    returns[j] = (prices[j + 1] / prices[j]) - 1.0f;
                }
            }
        }
        
        // Calculate rolling standard deviation (simplified)
        for (size_t i = window - 1; i < returns.size(); ++i) {
            float sum = 0.0f, sum_sq = 0.0f;
            
            for (int j = 0; j < window; ++j) {
                float ret = returns[i - j];
                sum += ret;
                sum_sq += ret * ret;
            }
            
            float mean = sum / window;
            float variance = (sum_sq / window) - (mean * mean);
            volatility[i] = std::sqrt(variance);
        }
    }
};

// === PERFORMANCE BENCHMARKING ===

void benchmark_simd_operations() {
    const size_t size = 1000000;
    
    // Aligned memory allocation for SIMD
    alignas(32) std::vector<float> a(size);
    alignas(32) std::vector<float> b(size);
    alignas(32) std::vector<float> result_simd(size);
    alignas(32) std::vector<float> result_scalar(size);
    
    // Initialize with random data
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_real_distribution<float> dis(-100.0f, 100.0f);
    
    for (size_t i = 0; i < size; ++i) {
        a[i] = dis(gen);
        b[i] = dis(gen);
    }
    
    std::cout << "=== SIMD Performance Comparison ===\\n";
    
    // Benchmark vector addition
    auto start = std::chrono::high_resolution_clock::now();
    SIMDMath::add_vectors_scalar(a.data(), b.data(), result_scalar.data(), size);
    auto end = std::chrono::high_resolution_clock::now();
    auto scalar_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    start = std::chrono::high_resolution_clock::now();
    SIMDMath::add_vectors_avx(a.data(), b.data(), result_simd.data(), size);
    end = std::chrono::high_resolution_clock::now();
    auto simd_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    std::cout << "Vector Addition:\\n";
    std::cout << "  Scalar: " << scalar_time.count() << " μs\\n";
    std::cout << "  SIMD:   " << simd_time.count() << " μs\\n";
    std::cout << "  Speedup: " << (double)scalar_time.count() / simd_time.count() << "x\\n\\n";
    
    // Benchmark dot product
    start = std::chrono::high_resolution_clock::now();
    float dot_scalar = SIMDMath::dot_product_scalar(a.data(), b.data(), size);
    end = std::chrono::high_resolution_clock::now();
    scalar_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    start = std::chrono::high_resolution_clock::now();
    float dot_simd = SIMDMath::dot_product_avx(a.data(), b.data(), size);
    end = std::chrono::high_resolution_clock::now();
    simd_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    std::cout << "Dot Product:\\n";
    std::cout << "  Scalar: " << scalar_time.count() << " μs (result: " << dot_scalar << ")\\n";
    std::cout << "  SIMD:   " << simd_time.count() << " μs (result: " << dot_simd << ")\\n";
    std::cout << "  Speedup: " << (double)scalar_time.count() / simd_time.count() << "x\\n\\n";
    
    // Financial calculations benchmark
    std::vector<float> prices(size);
    std::vector<float> averages(size);
    
    for (size_t i = 0; i < size; ++i) {
        prices[i] = 100.0f + dis(gen) * 0.1f;  // Stock prices around $100
    }
    
    start = std::chrono::high_resolution_clock::now();
    FinancialSIMD::moving_average_avx(prices.data(), averages.data(), size, 20);
    end = std::chrono::high_resolution_clock::now();
    auto financial_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    std::cout << "Financial Moving Average (20-period):\\n";
    std::cout << "  SIMD: " << financial_time.count() << " μs\\n";
}

int main() {
    // Check CPU capabilities
    std::cout << "=== CPU SIMD Capabilities ===\\n";
    std::cout << "This demo assumes AVX support\\n";
    std::cout << "In production, check __builtin_cpu_supports(\\"avx\\")\\n\\n";
    
    benchmark_simd_operations();
    return 0;
}`,
    explanation: 'SIMD (Single Instruction, Multiple Data) vectorization allows processing multiple data elements simultaneously using specialized CPU instructions. AVX instructions can process 8 floats or 4 doubles in parallel, providing significant speedups for mathematical operations, financial calculations, and data processing tasks.',
    useCase: 'Essential for high-frequency trading algorithms, real-time signal processing, scientific computing, and any application requiring high-throughput mathematical operations. Critical for market data processing, risk calculations, and algorithmic trading strategies where microsecond performance matters.'
  },
  {
    id: 'branch-prediction-optimization',
    title: 'Branch Prediction & CPU Optimization',
    standard: 'performance',
    description: 'Optimize code for modern CPU architectures using branch prediction hints, instruction pipelining, and micro-optimizations.',
    codeExample: `#include <iostream>
#include <type_traits>
#include <vector>
#include <chrono>
#include <random>
#include <algorithm>
#include <cstring>
#include <string_view>

// === Branch Prediction Optimization ===

// Compile-time factorial using constexpr
constexpr long long factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

// Compile-time prime checking
constexpr bool is_prime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}

// Branch prediction hints (GCC/Clang)
#ifdef __GNUC__
    #define LIKELY(x)   __builtin_expect(!!(x), 1)
    #define UNLIKELY(x) __builtin_expect(!!(x), 0)
#else
    #define LIKELY(x)   (x)
    #define UNLIKELY(x) (x)
#endif

// Optimized search with branch prediction
template<typename T>
int optimized_search(const std::vector<T>& data, const T& target) {
    const size_t size = data.size();
    
    // Early exit for empty container (unlikely)
    if (UNLIKELY(size == 0)) {
        return -1;
    }
    
    // Linear search with branch prediction hints
    for (size_t i = 0; i < size; ++i) {
        if (LIKELY(data[i] != target)) {
            continue;  // Most comparisons will fail
        }
        return static_cast<int>(i);  // Found (unlikely)
    }
    
    return -1;  // Not found
}

// === CPU Cache Optimization ===

// Cache-friendly matrix multiplication
void optimized_matrix_multiply(const float* A, const float* B, float* C, 
                              size_t N, size_t block_size = 64) {
    // Blocked matrix multiplication for better cache locality
    for (size_t i = 0; i < N; i += block_size) {
        for (size_t j = 0; j < N; j += block_size) {
            for (size_t k = 0; k < N; k += block_size) {
                // Process block
                size_t max_i = std::min(i + block_size, N);
                size_t max_j = std::min(j + block_size, N);
                size_t max_k = std::min(k + block_size, N);
                
                for (size_t ii = i; ii < max_i; ++ii) {
                    for (size_t jj = j; jj < max_j; ++jj) {
                        float sum = C[ii * N + jj];
                        for (size_t kk = k; kk < max_k; ++kk) {
                            sum += A[ii * N + kk] * B[kk * N + jj];
                        }
                        C[ii * N + jj] = sum;
                    }
                }
            }
        }
    }
}

// === Memory Access Patterns ===

// Sequential vs random access benchmark
class MemoryAccessBenchmark {
private:
    std::vector<int> data_;
    std::vector<size_t> indices_;
    
public:
    MemoryAccessBenchmark(size_t size) : data_(size) {
        // Initialize data
        std::iota(data_.begin(), data_.end(), 0);
        
        // Create random indices
        indices_.resize(size);
        std::iota(indices_.begin(), indices_.end(), 0);
        std::random_device rd;
        std::mt19937 gen(rd());
        std::shuffle(indices_.begin(), indices_.end(), gen);
    }
    
    // Sequential access (cache-friendly)
    long long sequential_sum() {
        long long sum = 0;
        for (size_t i = 0; i < data_.size(); ++i) {
            sum += data_[i];
        }
        return sum;
    }
    
    // Random access (cache-unfriendly)
    long long random_sum() {
        long long sum = 0;
        for (size_t i = 0; i < indices_.size(); ++i) {
            sum += data_[indices_[i]];
// === Function Call Optimization ===

// Hot function - should be inlined
inline __attribute__((always_inline))
float fast_multiply_add(float a, float b, float c) {
    return a * b + c;  // Fused multiply-add when possible
}

// Cold function - unlikely to be called
__attribute__((noinline))
void handle_error_case(const std::string& error) {
    std::cerr << "Error: " << error << std::endl;
    // Complex error handling...
}

// Function with branch optimization
int process_data(const std::vector<int>& data) {
    int result = 0;
    
    for (const auto& value : data) {
        // Common case: positive values
        if (LIKELY(value > 0)) {
            result += value * 2;
        }
        // Uncommon case: zero
        else if (UNLIKELY(value == 0)) {
            result += 1;
        }
        // Rare case: negative values
        else {
            handle_error_case("Negative value encountered");
            result -= value;
        }
    }
    
    return result;
}

// === Benchmark Functions ===

template<typename Func>
double benchmark_function(Func&& func, int iterations = 1000) {
    auto start = std::chrono::high_resolution_clock::now();
    
    for (int i = 0; i < iterations; ++i) {
        func();
    }
    
    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    return duration.count() / static_cast<double>(iterations);
}

int main() {
    std::cout << "=== CPU Optimization Techniques ===" << std::endl;
    
    // Branch prediction test
    std::cout << "\\n=== Branch Prediction Test ===" << std::endl;
    std::vector<int> test_data = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    int index = optimized_search(test_data, 7);
    std::cout << "Found 7 at index: " << index << std::endl;
    
    // Memory access pattern benchmark
    std::cout << "\\n=== Memory Access Patterns ===" << std::endl;
    const size_t data_size = 1000000;
    MemoryAccessBenchmark benchmark(data_size);
    
    auto sequential_time = benchmark_function([&]() {
        volatile auto sum = benchmark.sequential_sum();
    }, 100);
    
    auto random_time = benchmark_function([&]() {
        volatile auto sum = benchmark.random_sum();
    }, 100);
    
    std::cout << "Sequential access time: " << sequential_time << " μs" << std::endl;
    std::cout << "Random access time: " << random_time << " μs" << std::endl;
    std::cout << "Random access slowdown: " << (random_time / sequential_time) << "x" << std::endl;
    
    // Function inlining test
    std::cout << "\\n=== Function Optimization ===" << std::endl;
    std::vector<int> process_test = {1, 2, 3, 0, 4, 5};
    int result = process_data(process_test);
    std::cout << "Processed result: " << result << std::endl;
    
    // Fast math operations
    float a = 2.5f, b = 3.0f, c = 1.5f;
    float fma_result = fast_multiply_add(a, b, c);
    std::cout << "Fast multiply-add result: " << fma_result << std::endl;
    
    return 0;
}`,
    explanation: `Modern CPUs use sophisticated techniques like branch prediction, instruction pipelining, and multi-level caches. By understanding these mechanisms, we can write code that works with the CPU rather than against it. Branch prediction hints help the CPU make better guesses about which branches will be taken. Cache-friendly memory access patterns reduce memory latency. Function inlining eliminates call overhead for hot paths.`,
    useCase: `Critical for high-frequency trading, game engines, scientific computing, and any performance-critical application. Use branch hints for predictable conditional code, optimize memory access patterns for large datasets, and inline hot functions. These techniques can provide 2-10x performance improvements in CPU-bound code.`
  },

  {
    id: 'zero-cost-abstractions',
    title: 'Zero-Cost Abstractions & CRTP',
    standard: 'performance',
    description: 'Design high-level abstractions that compile down to optimal machine code with no runtime overhead.',
    codeExample: `#include <iostream>
#include <chrono>
#include <memory>
#include <vector>
#include <type_traits>

// === Strong Types (Zero-Cost Wrappers) ===

template<typename T, typename Tag>
class StrongType {
private:
    T value_;

public:
    explicit StrongType(const T& value) : value_(value) {}
    explicit StrongType(T&& value) : value_(std::move(value)) {}
    
    const T& get() const { return value_; }
    T& get() { return value_; }
    
    // Enable arithmetic operations if T supports them
    template<typename U = T>
    auto operator+(const StrongType& other) const 
        -> std::enable_if_t<std::is_arithmetic_v<U>, StrongType> {
        return StrongType{value_ + other.value_};
    }
    
    template<typename U = T>
    auto operator*(const StrongType& other) const 
        -> std::enable_if_t<std::is_arithmetic_v<U>, StrongType> {
        return StrongType{value_ * other.value_};
    }
    int count = 0;
    int candidate = 2;
// Type tags for strong typing
struct PriceTag {};
struct QuantityTag {};
struct VolumeTag {};

using Price = StrongType<double, PriceTag>;
using Quantity = StrongType<int, QuantityTag>;
using Volume = StrongType<double, VolumeTag>;

// === CRTP (Curiously Recurring Template Pattern) ===

// Base class using CRTP for zero-cost polymorphism
template<typename Derived>
class Shape {
public:
    double area() const {
        return static_cast<const Derived*>(this)->area_impl();
    }
    
    double perimeter() const {
        return static_cast<const Derived*>(this)->perimeter_impl();
    }
    
    void print_info() const {
        const auto& derived = static_cast<const Derived&>(*this);
        std::cout << "Area: " << derived.area() << ", Perimeter: " << derived.perimeter() << std::endl;
    }
        }
        candidate++;
class Circle : public Shape<Circle> {
private:
    double radius_;

public:
    explicit Circle(double radius) : radius_(radius) {}
    
    double area_impl() const {
        return 3.14159 * radius_ * radius_;
    }
    
    double perimeter_impl() const {
        return 2 * 3.14159 * radius_;
    }
}

class Rectangle : public Shape<Rectangle> {
private:
    double width_, height_;

public:
    Rectangle(double width, double height) : width_(width), height_(height) {}
    
    double area_impl() const {
        return width_ * height_;
    }
    
    double perimeter_impl() const {
        return 2 * (width_ + height_);
    }
};

// === Policy-Based Design ===

// Storage policies
template<typename T>
class VectorStorage {
private:
    std::vector<T> data_;

public:
    void push_back(const T& item) { data_.push_back(item); }
    T& operator[](size_t index) { return data_[index]; }
    const T& operator[](size_t index) const { return data_[index]; }
    size_t size() const { return data_.size(); }
};

template<typename T, size_t N>
class ArrayStorage {
private:
    T data_[N];
    size_t size_ = 0;

public:
    void push_back(const T& item) {
        if (size_ < N) data_[size_++] = item;
    }
    T& operator[](size_t index) { return data_[index]; }
    const T& operator[](size_t index) const { return data_[index]; }
    size_t size() const { return size_; }
    constexpr size_t capacity() const { return N; }
};

// Filter types based on predicate
template<template<typename> class Predicate, typename List>
struct Filter;

template<template<typename> class Predicate>
struct Filter<Predicate, TypeList<>> {
    using type = TypeList<>;
};

template<template<typename> class Predicate, typename Head, typename... Tail>
struct Filter<Predicate, TypeList<Head, Tail...>> {
    using filtered_tail = typename Filter<Predicate, TypeList<Tail...>>::type;
    
    using type = std::conditional_t<
        Predicate<Head>::value,
        typename PrependType<Head, filtered_tail>::type,
        filtered_tail
    >;
};

// Helper to prepend type to type list
template<typename T, typename List>
struct PrependType;

template<typename T, typename... Types>
struct PrependType<T, TypeList<Types...>> {
    using type = TypeList<T, Types...>;
};

// === SFINAE AND CONCEPT-BASED DISPATCH ===

// Modern concept-based approach
template<typename T>
concept Arithmetic = std::is_arithmetic_v<T>;

template<typename T>
concept HasToString = requires(T t) {
    { t.to_string() } -> std::convertible_to<std::string>;
};

template<typename T>
concept Streamable = requires(T t, std::ostream& os) {
    { os << t } -> std::convertible_to<std::ostream&>;
};

// Concept-based function overloading
template<Arithmetic T>
void process_value(T value) {
    std::cout << "Processing arithmetic value: " << value << "\\n";
}

template<HasToString T>
void process_value(T value) {
    std::cout << "Processing object with to_string(): " << value.to_string() << "\\n";
}

template<Streamable T>
    requires (!Arithmetic<T> && !HasToString<T>)
void process_value(T value) {
    std::cout << "Processing streamable object: " << value << "\\n";
}

// === COMPILE-TIME STRING PROCESSING ===

template<size_t N>
struct FixedString {
    char data[N];
    
    constexpr FixedString(const char (&str)[N]) {
        for (size_t i = 0; i < N; ++i) {
            data[i] = str[i];
        }
    }
    
    constexpr std::string_view view() const {
        return std::string_view(data, N - 1);
    }
};

// Compile-time string hashing
constexpr uint64_t hash_string(std::string_view str) {
    uint64_t hash = 14695981039346656037ULL;  // FNV offset basis
    for (char c : str) {
        hash ^= static_cast<uint64_t>(c);
        hash *= 1099511628211ULL;  // FNV prime
    }
    return hash;
}

// Compile-time switch using string hashes
template<FixedString str>
constexpr auto compile_time_switch() {
    constexpr auto hash = hash_string(str.view());
    
    if constexpr (hash == hash_string("add")) {
        return [](auto a, auto b) { return a + b; };
    } else if constexpr (hash == hash_string("multiply")) {
        return [](auto a, auto b) { return a * b; };
    } else if constexpr (hash == hash_string("divide")) {
        return [](auto a, auto b) { return a / b; };
    } else {
        return [](auto a, auto b) { return a - b; };  // default: subtract
    }
}

// Threading policies
class SingleThreaded {
public:
    void lock() {}
    void unlock() {}
};

class VectorExpression {
public:
    const E& self() const { return static_cast<const E&>(*this); }
    E& self() { return static_cast<E&>(*this); }
    
    auto operator[](size_t i) const { return self()[i]; }
    size_t size() const { return self().size(); }
};

template<typename T>
class Vector : public VectorExpression<Vector<T>> {
private:
    std::vector<T> data_;
    
public:
    Vector(size_t size) : data_(size) {}
    Vector(std::initializer_list<T> init) : data_(init) {}
class MultiThreaded {
private:
    mutable std::mutex mutex_;
    
    // Assignment from expression
    void lock() const { mutex_.lock(); }
    void unlock() const { mutex_.unlock(); }
        data_.resize(e.size());
        for (size_t i = 0; i < e.size(); ++i) {
// Container with policies
template<typename T, template<typename> class StoragePolicy, class ThreadingPolicy>
class Container : private ThreadingPolicy {
        }
    StoragePolicy<T> storage_;
    }
    
    
    void print() const {
        std::cout << "[";
        for (size_t i = 0; i < data_.size(); ++i) {
            std::cout << data_[i];
            if (i < data_.size() - 1) std::cout << ", ";
        }
        std::cout << "]\\n";
    }
};

// Binary operation expression
template<typename L, typename R, typename Op>
class BinaryOp : public VectorExpression<BinaryOp<L, R, Op>> {
private:
    const L& left_;
    const R& right_;
    Op op_;
    
public:
    BinaryOp(const L& left, const R& right, Op op)
        : left_(left), right_(right), op_(op) {}
    
    auto operator[](size_t i) const { return op_(left_[i], right_[i]); }
    size_t size() const { return left_.size(); }
};

// Operator overloads
template<typename L, typename R>
auto operator+(const VectorExpression<L>& left, const VectorExpression<R>& right) {
    return BinaryOp(left.self(), right.self(), [](auto a, auto b) { return a + b; });
}

template<typename L, typename R>
auto operator*(const VectorExpression<L>& left, const VectorExpression<R>& right) {
    return BinaryOp(left.self(), right.self(), [](auto a, auto b) { return a * b; });
}

// === DEMONSTRATION ===

// Test class for concept demonstration
class CustomObject {
public:
    std::string to_string() const { return "CustomObject"; }
};

int main() {
    std::cout << "=== Compile-Time Computations ===\\n";
    
    // Compile-time factorial
    constexpr auto fact_10 = factorial(10);
    std::cout << "10! = " << fact_10 << " (computed at compile time)\\n";
    
    // Compile-time prime generation
    constexpr auto primes = generate_primes<10>();
    std::cout << "First 10 primes: ";
    for (auto p : primes) {
        std::cout << p << " ";
    }
    std::cout << "\\n\\n";
    
    std::cout << "=== Concept-Based Dispatch ===\\n";
    process_value(42);                    // Arithmetic
    process_value(CustomObject{});        // HasToString
    process_value(std::string("hello"));  // Streamable
    std::cout << "\\n";
    
    std::cout << "=== Compile-Time String Operations ===\\n";
    
    // Compile-time string hashing and switching
    constexpr auto add_func = compile_time_switch<"add">();
    constexpr auto mul_func = compile_time_switch<"multiply">();
    
    std::cout << "add(5, 3) = " << add_func(5, 3) << "\\n";
    std::cout << "multiply(5, 3) = " << mul_func(5, 3) << "\\n\\n";
    
    std::cout << "=== Expression Templates ===\\n";
    
    Vector<double> a{1.0, 2.0, 3.0, 4.0};
    Vector<double> b{2.0, 3.0, 4.0, 5.0};
    Vector<double> c{1.0, 1.0, 1.0, 1.0};
    
    std::cout << "a = "; a.print();
    std::cout << "b = "; b.print();
    std::cout << "c = "; c.print();
    
    // Complex expression evaluated lazily
    Vector<double> result = a + b * c;
    std::cout << "a + b * c = "; result.print();
    
    return 0;
}`,
    explanation: 'Advanced template metaprogramming enables compile-time computation, type manipulation, and code generation. Modern C++20 concepts provide cleaner syntax than SFINAE, while expression templates enable lazy evaluation for mathematical operations. Compile-time string processing and type lists enable sophisticated generic programming patterns.',
    useCase: 'Essential for high-performance libraries, domain-specific languages embedded in C++, mathematical libraries with zero-cost abstractions, and systems where compile-time optimization is crucial. Perfect for financial modeling libraries, game engines, and scientific computing frameworks.'
  },
  {
    id: 'zero-cost-abstractions',
    title: 'Zero-Cost Abstractions & Optimization',
    standard: 'cpp20',
    description: 'Design high-level abstractions that compile to optimal machine code',
    codeExample: `#include <iostream>
#include <vector>
#include <chrono>
#include <memory>
#include <type_traits>
#include <concepts>

// === ZERO-COST WRAPPER TYPES ===

// Strong type wrapper with zero runtime cost
template<typename T, typename Tag>
class StrongType {
private:
    T value_;
    
public:
    explicit constexpr StrongType(T value) : value_(value) {}
    
    constexpr T get() const { return value_; }
    constexpr T& get() { return value_; }
    
    // Arithmetic operations (when applicable)
    constexpr StrongType operator+(const StrongType& other) const 
        requires std::is_arithmetic_v<T> {
        return StrongType{value_ + other.value_};
    }
    
    constexpr StrongType operator*(const StrongType& other) const 
        requires std::is_arithmetic_v<T> {
        return StrongType{value_ * other.value_};
    }
    
    constexpr bool operator<(const StrongType& other) const {
        return value_ < other.value_;
    }
    
    constexpr bool operator==(const StrongType& other) const {
        return value_ == other.value_;
    }
};

// Type-safe financial types
struct PriceTag {};
struct QuantityTag {};
struct TimestampTag {};

using Price = StrongType<double, PriceTag>;
using Quantity = StrongType<int64_t, QuantityTag>;
using Timestamp = StrongType<uint64_t, TimestampTag>;

// === COMPILE-TIME POLYMORPHISM ===

// Strategy pattern with zero runtime cost
template<typename Strategy>
class TradingEngine {
private:
    Strategy strategy_;
    
public:
    explicit TradingEngine(Strategy strategy) : strategy_(strategy) {}
    
    // This call will be inlined completely
    auto execute_trade(Price price, Quantity quantity) {
        return strategy_.calculate_order(price, quantity);
    }
    
    auto calculate_risk(Price price, Quantity quantity) {
        return strategy_.assess_risk(price, quantity);
    }
};

// Different trading strategies
struct AggressiveStrategy {
    constexpr double calculate_order(Price price, Quantity qty) const {
        return price.get() * qty.get() * 1.05;  // 5% premium for speed
    }
    
    constexpr double assess_risk(Price price, Quantity qty) const {
        return price.get() * qty.get() * 0.02;  // 2% risk
    }
};

struct ConservativeStrategy {
    constexpr double calculate_order(Price price, Quantity qty) const {
        return price.get() * qty.get() * 0.98;  // 2% discount for safety
    }
    
    constexpr double assess_risk(Price price, Quantity qty) const {
        return price.get() * qty.get() * 0.005; // 0.5% risk
    }
};

// === CRTP FOR ZERO-COST INHERITANCE ===

template<typename Derived>
class OrderBookBase {
public:
    void add_order(Price price, Quantity quantity) {
        static_cast<Derived*>(this)->add_order_impl(price, quantity);
    }
    
    Price get_best_bid() const {
        return static_cast<const Derived*>(this)->get_best_bid_impl();
    }
    
    Price get_best_ask() const {
        return static_cast<const Derived*>(this)->get_best_ask_impl();
    }
    
    // Template method pattern with zero virtual call overhead
    double calculate_spread() const {
        auto bid = get_best_bid();
        auto ask = get_best_ask();
        return ask.get() - bid.get();
    }
};

class FastOrderBook : public OrderBookBase<FastOrderBook> {
private:
    Price best_bid_{0.0};
    Price best_ask_{1000000.0};
    
public:
    void add_order_impl(Price price, Quantity quantity) {
        // Simplified: just update best prices
        if (quantity.get() > 0) {  // Buy order
            if (price > best_bid_) {
                best_bid_ = price;
            }
        } else {  // Sell order
            if (price < best_ask_) {
                best_ask_ = price;
            }
        }
    }
    
    Price get_best_bid_impl() const { return best_bid_; }
    Price get_best_ask_impl() const { return best_ask_; }
};

// === CONSTEXPR ALGORITHMS ===

// Compile-time sorting for lookup tables
template<typename T, size_t N>
constexpr void bubble_sort(std::array<T, N>& arr) {
    for (size_t i = 0; i < N - 1; ++i) {
        for (size_t j = 0; j < N - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                T temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// Compile-time binary search
template<typename T, size_t N>
constexpr int binary_search(const std::array<T, N>& arr, T target) {
    int left = 0, right = N - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;  // Not found
}

// === INLINED FUNCTION OBJECTS ===

// Custom allocator with zero overhead
template<typename T>
class StackAllocator {
private:
    static constexpr size_t STACK_SIZE = 1024 * 1024;  // 1MB stack
    alignas(T) static thread_local char stack_[STACK_SIZE];
    static thread_local size_t offset_;
    
public:
    using value_type = T;
    
    T* allocate(size_t n) {
        size_t bytes = n * sizeof(T);
        if (offset_ + bytes > STACK_SIZE) {
            throw std::bad_alloc{};
        }
        
        T* result = reinterpret_cast<T*>(stack_ + offset_);
        offset_ += bytes;
        return result;
    }
    
    void deallocate(T* ptr, size_t n) {
        // Stack allocator: deallocation is no-op
        // Memory is reclaimed when thread ends
    }
    
    template<typename U>
    bool operator==(const StackAllocator<U>&) const { return true; }
};

template<typename T>
alignas(T) thread_local char StackAllocator<T>::stack_[StackAllocator<T>::STACK_SIZE];

template<typename T>
thread_local size_t StackAllocator<T>::offset_ = 0;

// === PERFORMANCE BENCHMARKING ===

void benchmark_zero_cost_abstractions() {
    const int iterations = 10000000;
    
    std::cout << "=== Zero-Cost Abstraction Benchmarks ===\\n";
    
    // Benchmark 1: Strong types vs raw types
    auto start = std::chrono::high_resolution_clock::now();
    
    double raw_sum = 0.0;
    for (int i = 0; i < iterations; ++i) {
        double price = 100.0 + (i % 100) * 0.01;
        int64_t qty = 100 + (i % 1000);
        raw_sum += price * qty;
    }
    
    auto end = std::chrono::high_resolution_clock::now();
    auto raw_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    start = std::chrono::high_resolution_clock::now();
    
    double strong_sum = 0.0;
    for (int i = 0; i < iterations; ++i) {
        Price price{100.0 + (i % 100) * 0.01};
        Quantity qty{100 + (i % 1000)};
        strong_sum += price.get() * qty.get();
    }
    
    end = std::chrono::high_resolution_clock::now();
    auto strong_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    std::cout << "Strong Types vs Raw Types:\\n";
    std::cout << "  Raw types: " << raw_time.count() << " μs\\n";
    std::cout << "  Strong types: " << strong_time.count() << " μs\\n";
    std::cout << "  Overhead: " << (double)strong_time.count() / raw_time.count() << "x\\n\\n";
    
    // Benchmark 2: CRTP vs Virtual functions
    FastOrderBook order_book;
    
    start = std::chrono::high_resolution_clock::now();
    
    for (int i = 0; i < iterations / 1000; ++i) {
        Price price{100.0 + (i % 100) * 0.01};
        Quantity qty{100 + (i % 1000)};
        order_book.add_order(price, qty);
        volatile double spread = order_book.calculate_spread();  // Prevent optimization
        (void)spread;
    }
    
    end = std::chrono::high_resolution_clock::now();
    auto crtp_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    std::cout << "CRTP Performance:\\n";
    std::cout << "  CRTP calls: " << crtp_time.count() << " μs\\n";
    std::cout << "  (No virtual function overhead)\\n\\n";
    
    // Benchmark 3: Compile-time vs runtime algorithms
    constexpr std::array<int, 10> lookup_table = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    
    start = std::chrono::high_resolution_clock::now();
    
    int found_count = 0;
    for (int i = 0; i < iterations / 1000; ++i) {
        int target = (i % 20) + 1;
        if (binary_search(lookup_table, target) != -1) {
            found_count++;
        }
    }
    
    end = std::chrono::high_resolution_clock::now();
    auto compile_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    
    std::cout << "Compile-time Binary Search:\\n";
    std::cout << "  Time: " << compile_time.count() << " μs\\n";
    std::cout << "  Found: " << found_count << " items\\n";
    std::cout << "  (Lookup table sorted at compile time)\\n";
}

int main() {
    std::cout << "=== Zero-Cost Abstractions Demo ===\\n\\n";
    
    // Demonstrate type safety with zero cost
    Price stock_price{150.75};
    Quantity order_size{1000};
    
    std::cout << "Type-safe calculations:\\n";
    std::cout << "Stock price: $" << stock_price.get() << "\\n";
    std::cout << "Order size: " << order_size.get() << " shares\\n";
    
    // Demonstrate strategy pattern with zero cost
    TradingEngine aggressive_engine{AggressiveStrategy{}};
    TradingEngine conservative_engine{ConservativeStrategy{}};
    
    auto aggressive_cost = aggressive_engine.execute_trade(stock_price, order_size);
    auto conservative_cost = conservative_engine.execute_trade(stock_price, order_size);
    
    std::cout << "\\nTrading strategies (zero virtual call overhead):\\n";
    std::cout << "Aggressive strategy cost: $" << aggressive_cost << "\\n";
    std::cout << "Conservative strategy cost: $" << conservative_cost << "\\n\\n";
    
    // Run performance benchmarks
    benchmark_zero_cost_abstractions();
    
    return 0;
}`,
    explanation: 'Zero-cost abstractions provide high-level programming constructs that compile down to the same machine code as hand-optimized low-level code. Strong types, CRTP, compile-time polymorphism, and constexpr algorithms enable type safety and expressiveness without runtime overhead, making C++ ideal for performance-critical systems.',
    useCase: 'Critical for high-frequency trading systems, embedded systems, game engines, and any performance-critical application where abstraction cannot come at the cost of runtime performance. Essential for building maintainable yet optimal financial trading systems, real-time systems, and system-level programming.'
  }
];