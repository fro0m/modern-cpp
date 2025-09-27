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
  },

  // === C++20 MODULES ===
  {
    id: 'modules',
    title: 'C++ Modules',
    standard: 'cpp20',
    description: 'Modern module system replacing traditional header files with better encapsulation, faster compilation, and cleaner imports.',
    codeExample: `// === BASIC MODULE EXAMPLE ===

// File: math_utils.cppm (module interface file)
export module math_utils;

import <iostream>;
import <vector>;
import <cmath>;

// Export individual functions
export double square(double x) {
    return x * x;
}

export double cube(double x) {
    return x * x * x;
}

// Export a class
export class Calculator {
private:
    double last_result_ = 0.0;
    
public:
    double add(double a, double b) {
        last_result_ = a + b;
        return last_result_;
    }
    
    double multiply(double a, double b) {
        last_result_ = a * b;
        return last_result_;
    }
    
    double power(double base, double exponent) {
        last_result_ = std::pow(base, exponent);
        return last_result_;
    }
    
    double get_last_result() const {
        return last_result_;
    }
};

// Internal helper function (not exported)
double internal_helper(double x) {
    return x * 2.0 + 1.0;
}

// Export with different name
export {
    double advanced_square(double x) {
        return internal_helper(x * x);
    }
}

// Export namespace
export namespace constants {
    const double PI = 3.14159265358979323846;
    const double E = 2.71828182845904523536;
    const double GOLDEN_RATIO = 1.61803398874989484820;
}

// === PARTITIONS AND SUBMODULES ===

// File: graphics.cppm (main module interface)
export module graphics;

// Partition declarations
export import :shapes;
export import :colors;
export import :rendering;

// Main graphics interface
export class Scene {
public:
    void render();
    void add_shape(const Shape& shape);
    void set_background_color(Color color);
};

// File: graphics-shapes.cppm (module partition)
export module graphics:shapes;

import <vector>;
import <memory>;

export class Point {
public:
    double x, y;
    Point(double x, double y) : x(x), y(y) {}
};

export class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
    virtual void draw() const = 0;
};

export class Circle : public Shape {
private:
    Point center_;
    double radius_;
    
public:
    Circle(Point center, double radius) 
        : center_(center), radius_(radius) {}
    
    double area() const override {
        return 3.14159 * radius_ * radius_;
    }
    
    void draw() const override {
        std::cout << "Drawing circle at (" << center_.x 
                  << ", " << center_.y << ") with radius " << radius_ << std::endl;
    }
};

export class Rectangle : public Shape {
private:
    Point top_left_;
    double width_, height_;
    
public:
    Rectangle(Point top_left, double width, double height)
        : top_left_(top_left), width_(width), height_(height) {}
    
    double area() const override {
        return width_ * height_;
    }
    
    void draw() const override {
        std::cout << "Drawing rectangle at (" << top_left_.x 
                  << ", " << top_left_.y << ") size " 
                  << width_ << "x" << height_ << std::endl;
    }
};

// File: main.cpp (using modules)
import math_utils;
import graphics;
import <iostream>;
import <vector>;
import <memory>;

int main() {
    std::cout << "=== C++ Modules Demo ===\\n\\n";
    
    // Using basic module functions
    std::cout << "=== Math Utils Module ===\\n";
    std::cout << "square(5) = " << square(5) << "\\n";
    std::cout << "cube(3) = " << cube(3) << "\\n";
    std::cout << "advanced_square(4) = " << advanced_square(4) << "\\n";
    
    // Using exported constants
    std::cout << "PI = " << constants::PI << "\\n";
    std::cout << "E = " << constants::E << "\\n";
    std::cout << "Golden Ratio = " << constants::GOLDEN_RATIO << "\\n\\n";
    
    // Using exported class
    Calculator calc;
    std::cout << "Calculator operations:\\n";
    std::cout << "5 + 3 = " << calc.add(5, 3) << "\\n";
    std::cout << "4 * 7 = " << calc.multiply(4, 7) << "\\n";
    std::cout << "2^8 = " << calc.power(2, 8) << "\\n";
    std::cout << "Last result: " << calc.get_last_result() << "\\n\\n";
    
    // Using graphics module with partitions
    std::cout << "=== Graphics Module (with partitions) ===\\n";
    
    auto circle = std::make_unique<Circle>(Point{10, 20}, 5.0);
    auto rectangle = std::make_unique<Rectangle>(Point{0, 0}, 15.0, 10.0);
    
    std::cout << "Circle area: " << circle->area() << "\\n";
    circle->draw();
    
    std::cout << "Rectangle area: " << rectangle->area() << "\\n";
    rectangle->draw();
    
    std::cout << "\\n=== Module Benefits ===\\n";
    std::cout << "✓ Faster compilation (no header re-parsing)\\n";
    std::cout << "✓ Better encapsulation (implementation details hidden)\\n";
    std::cout << "✓ No header guards needed\\n";
    std::cout << "✓ Order-independent imports\\n";
    std::cout << "✓ Macro isolation (macros don't leak)\\n";
    std::cout << "✓ Cleaner dependency management\\n";
    
    return 0;
}

// === COMPILATION EXAMPLE ===
/*
Module compilation order (simplified):

1. Compile module interface files:
   clang++ -std=c++20 --precompile math_utils.cppm -o math_utils.pcm
   clang++ -std=c++20 --precompile graphics-shapes.cppm -o graphics-shapes.pcm
   clang++ -std=c++20 --precompile graphics.cppm -o graphics.pcm

2. Compile module implementation files (if any):
   clang++ -std=c++20 -c math_utils.pcm -o math_utils.o
   clang++ -std=c++20 -c graphics.pcm -o graphics.o

3. Compile main program:
   clang++ -std=c++20 -c main.cpp -fmodule-file=math_utils.pcm 
           -fmodule-file=graphics.pcm -o main.o

4. Link:
   clang++ main.o math_utils.o graphics.o -o program
*/`,
    explanation: `C++ Modules revolutionize C++ compilation by replacing the traditional header/source file model with a more robust module system. Modules provide better encapsulation by clearly separating interface from implementation, eliminate issues with macro pollution and header order dependencies, and significantly improve compilation speed by avoiding repeated header parsing. Module partitions allow organizing large modules into logical components while maintaining a single import statement for users.`,
    useCase: `Essential for large codebases where compilation time and dependency management are critical. Perfect for libraries that need strong API boundaries, enterprise applications requiring modular architecture, and any project suffering from slow compilation due to heavy header dependencies. Modules are the future of C++ code organization and should be adopted for all new projects targeting C++20 and later.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/modules'
  },

  // === C++20 COROUTINES ===
  {
    id: 'coroutines',
    title: 'Coroutines',
    standard: 'cpp20',
    description: 'Cooperative multitasking with co_await, co_yield, and co_return for asynchronous programming and generators.',
    codeExample: `#include <coroutine>
#include <iostream>
#include <vector>
#include <chrono>
#include <thread>
#include <future>
#include <exception>

// === BASIC GENERATOR ===

template<typename T>
struct Generator {
    struct promise_type {
        T current_value;
        
        Generator get_return_object() {
            return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        void unhandled_exception() { std::terminate(); }
        
        std::suspend_always yield_value(T value) {
            current_value = value;
            return {};
        }
        
        void return_void() {}
    };
    
    std::coroutine_handle<promise_type> coro;
    
    Generator(std::coroutine_handle<promise_type> h) : coro(h) {}
    ~Generator() {
        if (coro) coro.destroy();
    }
    
    // Move-only type
    Generator(const Generator&) = delete;
    Generator& operator=(const Generator&) = delete;
    Generator(Generator&& other) noexcept : coro(other.coro) {
        other.coro = {};
    }
    Generator& operator=(Generator&& other) noexcept {
        if (this != &other) {
            if (coro) coro.destroy();
            coro = other.coro;
            other.coro = {};
        }
        return *this;
    }
    
    struct iterator {
        std::coroutine_handle<promise_type> coro;
        bool done;
        
        iterator(std::coroutine_handle<promise_type> h, bool d) : coro(h), done(d) {}
        
        T operator*() const {
            return coro.promise().current_value;
        }
        
        iterator& operator++() {
            coro.resume();
            done = coro.done();
            return *this;
        }
        
        bool operator!=(const iterator& other) const {
            return done != other.done;
        }
    };
    
    iterator begin() {
        if (coro) {
            coro.resume();
            return {coro, coro.done()};
        }
        return {coro, true};
    }
    
    iterator end() {
        return {coro, true};
    }
};

// Fibonacci generator
Generator<long long> fibonacci() {
    long long a = 0, b = 1;
    
    while (true) {
        co_yield a;
        auto next = a + b;
        a = b;
        b = next;
    }
}

// Range generator
Generator<int> range(int start, int end, int step = 1) {
    for (int i = start; i < end; i += step) {
        co_yield i;
    }
}

// === ASYNC TASK SYSTEM ===

template<typename T>
struct Task {
    struct promise_type {
        T result;
        std::exception_ptr exception;
        
        Task get_return_object() {
            return Task{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        
        void unhandled_exception() {
            exception = std::current_exception();
        }
        
        void return_value(T value) {
            result = value;
        }
    };
    
    std::coroutine_handle<promise_type> coro;
    
    Task(std::coroutine_handle<promise_type> h) : coro(h) {}
    ~Task() {
        if (coro) coro.destroy();
    }
    
    // Move-only
    Task(const Task&) = delete;
    Task& operator=(const Task&) = delete;
    Task(Task&& other) noexcept : coro(other.coro) {
        other.coro = {};
    }
    Task& operator=(Task&& other) noexcept {
        if (this != &other) {
            if (coro) coro.destroy();
            coro = other.coro;
            other.coro = {};
        }
        return *this;
    }
    
    T get() {
        if (!coro.done()) {
            // In a real implementation, this would block or schedule
            std::this_thread::sleep_for(std::chrono::milliseconds(1));
        }
        
        if (coro.promise().exception) {
            std::rethrow_exception(coro.promise().exception);
        }
        
        return coro.promise().result;
    }
    
    bool is_ready() const {
        return coro.done();
    }
};

// Simple awaitable type
struct SimpleAwaitable {
    int value;
    
    bool await_ready() const { return false; }
    void await_suspend(std::coroutine_handle<> handle) const {
        // Simulate async work
        std::thread([handle]() {
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
            handle.resume();
        }).detach();
    }
    int await_resume() const { return value; }
};

// Async computation
Task<int> compute_async(int x) {
    std::cout << "Starting async computation for " << x << "\\n";
    
    // Simulate async work
    auto result1 = co_await SimpleAwaitable{x * 2};
    std::cout << "First stage complete: " << result1 << "\\n";
    
    auto result2 = co_await SimpleAwaitable{result1 + 10};
    std::cout << "Second stage complete: " << result2 << "\\n";
    
    co_return result2;
}

// Async aggregation
Task<int> process_multiple(std::vector<int> values) {
    int total = 0;
    
    for (auto value : values) {
        auto result = co_await SimpleAwaitable{value * value};
        total += result;
        std::cout << "Processed " << value << " -> " << result << " (total: " << total << ")\\n";
    }
    
    co_return total;
}

// === STATE MACHINE COROUTINE ===

struct StateMachine {
    enum class State { Init, Processing, Waiting, Done };
    
    struct promise_type {
        State current_state = State::Init;
        
        StateMachine get_return_object() {
            return StateMachine{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        void unhandled_exception() { std::terminate(); }
        void return_void() {}
        
        std::suspend_always await_transform(State new_state) {
            current_state = new_state;
            return {};
        }
    };
    
    std::coroutine_handle<promise_type> coro;
    
    StateMachine(std::coroutine_handle<promise_type> h) : coro(h) {}
    ~StateMachine() {
        if (coro) coro.destroy();
    }
    
    State get_state() const {
        return coro.promise().current_state;
    }
    
    void step() {
        if (!coro.done()) {
            coro.resume();
        }
    }
    
    bool is_done() const {
        return coro.done();
    }
};

StateMachine create_state_machine() {
    std::cout << "State machine starting\\n";
    
    co_await StateMachine::State::Init;
    std::cout << "State: Init\\n";
    
    co_await StateMachine::State::Processing;
    std::cout << "State: Processing\\n";
    
    co_await StateMachine::State::Waiting;
    std::cout << "State: Waiting\\n";
    
    co_await StateMachine::State::Done;
    std::cout << "State: Done\\n";
}

int main() {
    std::cout << "=== C++ Coroutines Demo ===\\n\\n";
    
    // Generator example
    std::cout << "=== Fibonacci Generator ===\\n";
    auto fib = fibonacci();
    int count = 0;
    for (auto value : fib) {
        std::cout << value << " ";
        if (++count >= 15) break;  // First 15 numbers
    }
    std::cout << "\\n\\n";
    
    // Range generator
    std::cout << "=== Range Generator ===\\n";
    std::cout << "range(5, 20, 3): ";
    for (auto value : range(5, 20, 3)) {
        std::cout << value << " ";
    }
    std::cout << "\\n\\n";
    
    // Async task example
    std::cout << "=== Async Tasks ===\\n";
    auto task1 = compute_async(5);
    auto task2 = process_multiple({1, 2, 3, 4});
    
    std::cout << "Task 1 result: " << task1.get() << "\\n";
    std::cout << "Task 2 result: " << task2.get() << "\\n\\n";
    
    // State machine example
    std::cout << "=== State Machine ===\\n";
    auto machine = create_state_machine();
    
    while (!machine.is_done()) {
        std::cout << "Current state: " << static_cast<int>(machine.get_state()) << "\\n";
        machine.step();
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    
    std::cout << "\\n=== Coroutine Benefits ===\\n";
    std::cout << "✓ Cooperative multitasking without threads\\n";
    std::cout << "✓ Lazy evaluation and infinite sequences\\n";
    std::cout << "✓ Clean async code without callback hell\\n";
    std::cout << "✓ State machines with natural syntax\\n";
    std::cout << "✓ Memory efficient (stackless)\\n";
    std::cout << "✓ Composable and reusable async operations\\n";
    
    return 0;
}`,
    explanation: `Coroutines enable cooperative multitasking where functions can suspend and resume execution at specific points. The co_await operator suspends the coroutine until the awaited operation completes, co_yield produces values for generators, and co_return returns the final result. This enables writing asynchronous code that reads like synchronous code, creating efficient generators, and implementing complex state machines naturally.`,
    useCase: `Perfect for asynchronous I/O operations, parsing large files incrementally, implementing state machines, creating infinite sequences, and building responsive applications without the complexity of traditional threading. Essential for networking code, data processing pipelines, game AI systems, and any scenario requiring cooperative multitasking.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/coroutines'
  },

  // === EXECUTION POLICIES ===
  {
    id: 'execution-policies',
    title: 'Execution Policies in Standard Algorithms',
    standard: 'cpp17',
    description: 'Parallel execution of STL algorithms using execution policies for performance optimization.',
    codeExample: `#include <execution>
#include <algorithm>
#include <numeric>
#include <vector>
#include <chrono>
#include <iostream>
#include <random>
#include <future>
#include <thread>

class PerformanceBenchmark {
private:
    std::vector<int> large_dataset_;
    std::vector<double> financial_data_;
    
public:
    PerformanceBenchmark(size_t size = 10000000) {
        // Create large dataset for benchmarking
        large_dataset_.reserve(size);
        financial_data_.reserve(size);
        
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<int> int_dist(1, 1000);
        std::uniform_real_distribution<double> price_dist(50.0, 500.0);
        
        for (size_t i = 0; i < size; ++i) {
            large_dataset_.push_back(int_dist(gen));
            financial_data_.push_back(price_dist(gen));
        }
    }
    
    // Benchmark different execution policies
    void benchmark_sort() {
        std::cout << "=== Sorting Benchmark ===\\n";
        
        // Sequential execution
        auto data_copy = large_dataset_;
        auto start = std::chrono::high_resolution_clock::now();
        std::sort(std::execution::seq, data_copy.begin(), data_copy.end());
        auto end = std::chrono::high_resolution_clock::now();
        auto seq_time = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
        
        // Parallel execution
        data_copy = large_dataset_;
        start = std::chrono::high_resolution_clock::now();
        std::sort(std::execution::par, data_copy.begin(), data_copy.end());
        end = std::chrono::high_resolution_clock::now();
        auto par_time = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
        
        // Parallel unsequenced execution
        data_copy = large_dataset_;
        start = std::chrono::high_resolution_clock::now();
        std::sort(std::execution::par_unseq, data_copy.begin(), data_copy.end());
        end = std::chrono::high_resolution_clock::now();
        auto par_unseq_time = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
        
        std::cout << "Sequential sort: " << seq_time.count() << "ms\\n";
        std::cout << "Parallel sort: " << par_time.count() << "ms\\n";
        std::cout << "Par+unseq sort: " << par_unseq_time.count() << "ms\\n";
        std::cout << "Parallel speedup: " << (double)seq_time.count() / par_time.count() << "x\\n\\n";
    }
    
    void benchmark_transform() {
        std::cout << "=== Transform Benchmark ===\\n";
        std::vector<double> results(financial_data_.size());
        
        // Complex calculation: compound interest
        auto compound_interest = [](double principal) {
            const double rate = 0.05;  // 5% annual rate
            const int years = 10;
            double result = principal;
            for (int i = 0; i < years; ++i) {
                result *= (1.0 + rate);
            }
            return result;
        };
        
        // Sequential transform
        auto start = std::chrono::high_resolution_clock::now();
        std::transform(std::execution::seq, 
                      financial_data_.begin(), financial_data_.end(),
                      results.begin(), compound_interest);
        auto end = std::chrono::high_resolution_clock::now();
        auto seq_time = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
        
        // Parallel transform
        start = std::chrono::high_resolution_clock::now();
        std::transform(std::execution::par, 
                      financial_data_.begin(), financial_data_.end(),
                      results.begin(), compound_interest);
        end = std::chrono::high_resolution_clock::now();
        auto par_time = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
        
        std::cout << "Sequential transform: " << seq_time.count() << "ms\\n";
        std::cout << "Parallel transform: " << par_time.count() << "ms\\n";
        std::cout << "Parallel speedup: " << (double)seq_time.count() / par_time.count() << "x\\n\\n";
    }
    
    void benchmark_reduce() {
        std::cout << "=== Reduce Benchmark ===\\n";
        
        // Sequential reduce
        auto start = std::chrono::high_resolution_clock::now();
        auto seq_sum = std::reduce(std::execution::seq,
                                  large_dataset_.begin(), large_dataset_.end(),
                                  0LL);
        auto end = std::chrono::high_resolution_clock::now();
        auto seq_time = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
        
        // Parallel reduce
        start = std::chrono::high_resolution_clock::now();
        auto par_sum = std::reduce(std::execution::par,
                                  large_dataset_.begin(), large_dataset_.end(),
                                  0LL);
        end = std::chrono::high_resolution_clock::now();
        auto par_time = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
        
        std::cout << "Sequential sum: " << seq_sum << " (time: " << seq_time.count() << "ms)\\n";
        std::cout << "Parallel sum: " << par_sum << " (time: " << par_time.count() << "ms)\\n";
        std::cout << "Parallel speedup: " << (double)seq_time.count() / par_time.count() << "x\\n\\n";
    }
};

// Financial calculation examples
class FinancialAlgorithms {
public:
    // Parallel portfolio risk calculation
    static double calculate_portfolio_var(const std::vector<double>& returns, double confidence = 0.95) {
        std::vector<double> sorted_returns = returns;
        
        // Parallel sort for large datasets
        std::sort(std::execution::par, sorted_returns.begin(), sorted_returns.end());
        
        // Calculate Value at Risk at given confidence level
        size_t var_index = static_cast<size_t>((1.0 - confidence) * sorted_returns.size());
        return sorted_returns[var_index];
    }
    
    // Parallel Monte Carlo simulation
    static double monte_carlo_option_price(double S0, double K, double r, double sigma, 
                                         double T, size_t num_simulations = 1000000) {
        std::vector<double> payoffs(num_simulations);
        std::vector<size_t> indices(num_simulations);
        std::iota(indices.begin(), indices.end(), 0);
        
        std::random_device rd;
        thread_local std::mt19937 gen(rd());
        std::normal_distribution<double> norm(0.0, 1.0);
        
        // Parallel transform to calculate payoffs
        std::transform(std::execution::par, 
                      indices.begin(), indices.end(),
                      payoffs.begin(),
                      [&](size_t i) {
                          thread_local std::mt19937 local_gen(rd() + i);
                          std::normal_distribution<double> local_norm(0.0, 1.0);
                          
                          // Geometric Brownian Motion
                          double Z = local_norm(local_gen);
                          double ST = S0 * std::exp((r - 0.5 * sigma * sigma) * T + sigma * std::sqrt(T) * Z);
                          
                          // European call option payoff
                          return std::max(ST - K, 0.0);
                      });
        
        // Parallel reduce to calculate average payoff
        double average_payoff = std::reduce(std::execution::par, 
                                          payoffs.begin(), payoffs.end(), 0.0) / num_simulations;
        
        // Discount to present value
        return average_payoff * std::exp(-r * T);
    }
    
    // Parallel technical indicator calculation
    static std::vector<double> calculate_moving_average(const std::vector<double>& prices, int period) {
        if (prices.size() < period) return {};
        
        std::vector<double> ma_values(prices.size() - period + 1);
        std::vector<size_t> indices(ma_values.size());
        std::iota(indices.begin(), indices.end(), 0);
        
        // Parallel calculation of moving averages
        std::transform(std::execution::par,
                      indices.begin(), indices.end(),
                      ma_values.begin(),
                      [&](size_t i) {
                          double sum = std::reduce(std::execution::seq,  // Inner sum can be sequential
                                                 prices.begin() + i,
                                                 prices.begin() + i + period,
                                                 0.0);
                          return sum / period;
                      });
        
        return ma_values;
    }
};

int main() {
    std::cout << "=== Execution Policies Demo ===\\n\\n";
    std::cout << "Hardware concurrency: " << std::thread::hardware_concurrency() << " threads\\n\\n";
    
    // Basic algorithm benchmarks
    PerformanceBenchmark benchmark(5000000);  // 5M elements
    benchmark.benchmark_sort();
    benchmark.benchmark_transform();
    benchmark.benchmark_reduce();
    
    // Financial algorithms
    std::cout << "=== Financial Parallel Algorithms ===\\n";
    
    // Generate sample stock returns
    std::vector<double> returns(100000);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::normal_distribution<double> return_dist(0.001, 0.02);  // Daily returns
    
    std::generate(std::execution::par, returns.begin(), returns.end(),
                 [&]() { return return_dist(gen); });
    
    // Calculate VaR
    double var_95 = FinancialAlgorithms::calculate_portfolio_var(returns, 0.95);
    std::cout << "Portfolio VaR (95% confidence): " << var_95 * 100 << "%\\n";
    
    // Monte Carlo option pricing
    double option_price = FinancialAlgorithms::monte_carlo_option_price(
        100.0,  // Current price
        110.0,  // Strike price
        0.05,   // Risk-free rate
        0.2,    // Volatility
        1.0,    // Time to expiration (1 year)
        500000  // Number of simulations
    );
    std::cout << "European call option price (Monte Carlo): $" << option_price << "\\n";
    
    // Generate price series and calculate moving average
    std::vector<double> prices(1000);
    double price = 100.0;
    std::generate(prices.begin(), prices.end(), [&]() {
        price *= (1.0 + return_dist(gen));
        return price;
    });
    
    auto ma = FinancialAlgorithms::calculate_moving_average(prices, 20);
    std::cout << "20-period moving average calculated for " << ma.size() << " points\\n";
    
    std::cout << "\\n=== Execution Policy Benefits ===\\n";
    std::cout << "✓ Easy parallelization of STL algorithms\\n";
    std::cout << "✓ Significant speedup for CPU-intensive operations\\n";
    std::cout << "✓ Scales automatically with available CPU cores\\n";
    std::cout << "✓ No manual thread management required\\n";
    std::cout << "✓ Exception-safe parallel execution\\n";
    std::cout << "✓ Perfect for financial calculations and data processing\\n";
    
    return 0;
}`,
    explanation: `Execution policies in C++17 enable parallel execution of STL algorithms by simply specifying the execution policy as the first parameter. std::execution::seq runs sequentially, std::execution::par runs in parallel with synchronized access, and std::execution::par_unseq allows both parallelization and vectorization. This provides massive performance improvements for CPU-intensive operations without complex thread management.`,
    useCase: `Critical for high-performance computing, financial modeling, data analytics, and any application processing large datasets. Perfect for Monte Carlo simulations, risk calculations, sorting large financial datasets, parallel transformations of market data, and scientific computing where algorithm parallelization can provide significant speedup.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/algorithm/execution_policy_tag_t'
  },

  // === CLASS TEMPLATE ARGUMENT DEDUCTION (CTAD) ===
  {
    id: 'ctad',
    title: 'Class Template Argument Deduction (CTAD)',
    standard: 'cpp17',
    description: 'Automatic template argument deduction for class templates, making template usage more concise and intuitive.',
    codeExample: `#include <iostream>
#include <vector>
#include <map>
#include <pair>
#include <memory>
#include <string>
#include <optional>
#include <array>
#include <tuple>
#include <mutex>
#include <thread>

// === BASIC CTAD EXAMPLES ===

// Custom class template that benefits from CTAD
template<typename T, typename U = T>
class Pair {
private:
    T first_;
    U second_;
    
public:
    Pair(const T& first, const U& second) : first_(first), second_(second) {}
    
    const T& first() const { return first_; }
    const U& second() const { return second_; }
    
    void print() const {
        std::cout << "(" << first_ << ", " << second_ << ")";
    }
};

// Optional deduction guide (not needed for this simple case)
// template<typename T, typename U>
// Pair(T, U) -> Pair<T, U>;

// Advanced template with multiple parameters
template<typename Key, typename Value, typename Hash = std::hash<Key>>
class SimpleMap {
private:
    std::map<Key, Value> data_;
    Hash hasher_;
    
public:
    SimpleMap() = default;
    SimpleMap(std::initializer_list<std::pair<Key, Value>> init) {
        for (auto& p : init) {
            data_[p.first] = p.second;
        }
    }
    
    void insert(const Key& key, const Value& value) {
        data_[key] = value;
    }
    
    Value* find(const Key& key) {
        auto it = data_.find(key);
        return (it != data_.end()) ? &it->second : nullptr;
    }
    
    size_t size() const { return data_.size(); }
    
    void print() const {
        std::cout << "{";
        for (auto it = data_.begin(); it != data_.end(); ++it) {
            if (it != data_.begin()) std::cout << ", ";
            std::cout << it->first << ": " << it->second;
        }
        std::cout << "}";
    }
};

// Deduction guide for initializer list constructor
template<typename Key, typename Value>
SimpleMap(std::initializer_list<std::pair<Key, Value>>) -> SimpleMap<Key, Value>;

// === COMPLEX CTAD SCENARIOS ===

// Template class for financial instruments
template<typename PriceType, typename QuantityType = int64_t>
class Order {
private:
    std::string symbol_;
    PriceType price_;
    QuantityType quantity_;
    bool is_buy_;
    
public:
    Order(const std::string& symbol, PriceType price, QuantityType quantity, bool is_buy)
        : symbol_(symbol), price_(price), quantity_(quantity), is_buy_(is_buy) {}
    
    double get_notional() const {
        return static_cast<double>(price_) * static_cast<double>(quantity_);
    }
    
    void print() const {
        std::cout << (is_buy_ ? "BUY " : "SELL ") << quantity_ << " " << symbol_ 
                  << " @ " << price_ << " (notional: $" << get_notional() << ")";
    }
};

// Container template with custom allocator
template<typename T, typename Allocator = std::allocator<T>>
class CustomVector {
private:
    std::vector<T, Allocator> data_;
    
public:
    CustomVector() = default;
    
    template<typename Iterator>
    CustomVector(Iterator begin, Iterator end) : data_(begin, end) {}
    
    CustomVector(std::initializer_list<T> init) : data_(init) {}
    
    void push_back(const T& value) { data_.push_back(value); }
    size_t size() const { return data_.size(); }
    const T& operator[](size_t index) const { return data_[index]; }
    
    void print() const {
        std::cout << "[";
        for (size_t i = 0; i < data_.size(); ++i) {
            if (i > 0) std::cout << ", ";
            std::cout << data_[i];
        }
        std::cout << "]";
    }
};

// Deduction guides for different constructors
template<typename Iterator>
CustomVector(Iterator, Iterator) -> CustomVector<typename std::iterator_traits<Iterator>::value_type>;

template<typename T>
CustomVector(std::initializer_list<T>) -> CustomVector<T>;

// === THREAD-SAFE WRAPPER WITH CTAD ===

template<typename T, typename Mutex = std::mutex>
class ThreadSafe {
private:
    mutable Mutex mutex_;
    T data_;
    
public:
    ThreadSafe() = default;
    ThreadSafe(const T& data) : data_(data) {}
    ThreadSafe(T&& data) : data_(std::move(data)) {}
    
    template<typename... Args>
    ThreadSafe(Args&&... args) : data_(std::forward<Args>(args)...) {}
    
    template<typename Func>
    auto with_lock(Func&& func) const -> decltype(func(data_)) {
        std::lock_guard<Mutex> lock(mutex_);
        return func(data_);
    }
    
    template<typename Func>
    auto with_lock(Func&& func) -> decltype(func(data_)) {
        std::lock_guard<Mutex> lock(mutex_);
        return func(data_);
    }
    
    T get() const {
        std::lock_guard<Mutex> lock(mutex_);
        return data_;
    }
    
    void set(const T& new_data) {
        std::lock_guard<Mutex> lock(mutex_);
        data_ = new_data;
    }
};

// Deduction guides
template<typename T>
ThreadSafe(T) -> ThreadSafe<T>;

int main() {
    std::cout << "=== Class Template Argument Deduction (CTAD) Demo ===\\n\\n";
    
    // === Standard Library CTAD ===
    std::cout << "=== Standard Library CTAD ===\\n";
    
    // Before C++17: Required explicit template arguments
    // std::vector<int> numbers{1, 2, 3, 4, 5};
    // std::pair<int, std::string> p{42, "hello"};
    
    // C++17 CTAD: Template arguments deduced automatically
    std::vector numbers{1, 2, 3, 4, 5};  // Deduced as vector<int>
    std::pair p{42, std::string("hello")}; // Deduced as pair<int, string>
    std::optional opt{3.14}; // Deduced as optional<double>
    std::array arr{1, 2, 3, 4}; // Deduced as array<int, 4>
    std::tuple t{1, 2.5, "hello"}; // Deduced as tuple<int, double, const char*>
    
    std::cout << "Vector size: " << numbers.size() << "\\n";
    std::cout << "Pair: (" << p.first << ", " << p.second << ")\\n";
    std::cout << "Optional value: " << opt.value() << "\\n";
    std::cout << "Array size: " << arr.size() << "\\n\\n";
    
    // === Custom Class CTAD ===
    std::cout << "=== Custom Class CTAD ===\\n";
    
    // Our custom Pair class with CTAD
    Pair pair1{10, 20};        // Deduced as Pair<int>
    Pair pair2{3.14, "pi"};    // Deduced as Pair<double, const char*>
    Pair pair3{std::string("key"), 42}; // Deduced as Pair<string, int>
    
    std::cout << "pair1: "; pair1.print(); std::cout << "\\n";
    std::cout << "pair2: "; pair2.print(); std::cout << "\\n";
    std::cout << "pair3: "; pair3.print(); std::cout << "\\n\\n";
    
    // Custom map with initializer list
    SimpleMap map1{
        {"apple", 1.50},
        {"banana", 0.75},
        {"orange", 2.00}
    }; // Deduced as SimpleMap<const char*, double>
    
    SimpleMap map2{
        {std::string("AAPL"), 150.0},
        {std::string("GOOGL"), 2500.0},
        {std::string("MSFT"), 300.0}
    }; // Deduced as SimpleMap<string, double>
    
    std::cout << "Fruit prices: "; map1.print(); std::cout << "\\n";
    std::cout << "Stock prices: "; map2.print(); std::cout << "\\n\\n";
    
    // === Financial Order Example ===
    std::cout << "=== Financial Orders with CTAD ===\\n";
    
    Order buy_order{"AAPL", 150.50, 100, true};    // Deduced as Order<double, int>
    Order sell_order{"GOOGL", 2500.75, 50L, false}; // Deduced as Order<double, long>
    
    std::cout << "Buy order: "; buy_order.print(); std::cout << "\\n";
    std::cout << "Sell order: "; sell_order.print(); std::cout << "\\n\\n";
    
    // === Container with CTAD ===
    std::cout << "=== Custom Container with CTAD ===\\n";
    
    CustomVector vec1{1, 2, 3, 4, 5}; // Deduced as CustomVector<int>
    CustomVector vec2{1.1, 2.2, 3.3}; // Deduced as CustomVector<double>
    
    // Using iterator constructor
    std::vector<std::string> source{"hello", "world", "ctad"};
    CustomVector vec3{source.begin(), source.end()}; // Deduced as CustomVector<string>
    
    std::cout << "int vector: "; vec1.print(); std::cout << "\\n";
    std::cout << "double vector: "; vec2.print(); std::cout << "\\n";
    std::cout << "string vector: "; vec3.print(); std::cout << "\\n\\n";
    
    // === Thread-Safe Wrapper ===
    std::cout << "=== Thread-Safe Wrapper with CTAD ===\\n";
    
    ThreadSafe counter{0}; // Deduced as ThreadSafe<int>
    ThreadSafe message{std::string("Hello CTAD")}; // Deduced as ThreadSafe<string>
    
    // Use the thread-safe wrappers
    counter.with_lock([](int& c) { c += 10; });
    auto current_count = counter.get();
    auto current_message = message.get();
    
    std::cout << "Thread-safe counter: " << current_count << "\\n";
    std::cout << "Thread-safe message: " << current_message << "\\n\\n";
    
    std::cout << "=== CTAD Benefits ===\\n";
    std::cout << "✓ Less verbose template instantiation\\n";
    std::cout << "✓ Improved code readability and maintainability\\n";
    std::cout << "✓ Automatic type deduction reduces errors\\n";
    std::cout << "✓ Works seamlessly with auto and generic code\\n";
    std::cout << "✓ Custom deduction guides for complex scenarios\\n";
    std::cout << "✓ Better integration with modern C++ idioms\\n";
    
    return 0;
}`,
    explanation: `Class Template Argument Deduction (CTAD) allows the compiler to automatically deduce template arguments for class templates from their constructor arguments, eliminating the need for explicit template parameter specification. This makes code more concise and readable while maintaining type safety. Custom deduction guides can be provided for complex scenarios where the default deduction isn't sufficient or desired.`,
    useCase: `Essential for writing modern, clean C++ code with heavy template usage. Perfect for container classes, factory functions, wrapper classes, and any template code where explicit template arguments make code verbose. Particularly useful in financial applications with complex templated types like orders, instruments, and mathematical objects.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/class_template_argument_deduction'
  },

  // === FOLD EXPRESSIONS (EXPANDED) ===
  {
    id: 'fold-expressions',
    title: 'Fold Expressions',
    standard: 'cpp17',
    description: 'Concise syntax for applying binary operators to parameter packs, enabling powerful variadic template patterns.',
    codeExample: `#include <iostream>
#include <vector>
#include <string>
#include <type_traits>
#include <sstream>
#include <functional>
#include <memory>

// === BASIC FOLD EXPRESSIONS ===

// Unary right fold: (pack op ...)
template<typename... Args>
auto sum(Args... args) {
    return (args + ...);  // Expands to: arg1 + (arg2 + (arg3 + ...))
}

// Unary left fold: (... op pack)
template<typename... Args>
auto sum_left(Args... args) {
    return (... + args);  // Expands to: ((... + arg1) + arg2) + arg3
}

// Binary right fold: (pack op ... op init)
template<typename... Args>
auto sum_with_init(int init, Args... args) {
    return (args + ... + init);  // Expands to: arg1 + (arg2 + (... + init))
}

// Binary left fold: (init op ... op pack)
template<typename... Args>
auto sum_with_init_left(int init, Args... args) {
    return (init + ... + args);  // Expands to: ((init + arg1) + arg2) + ...
}

// === LOGICAL OPERATIONS ===

// All elements satisfy condition
template<typename... Args>
bool all_positive(Args... args) {
    return ((args > 0) && ...);  // All arguments must be positive
}

// Any element satisfies condition
template<typename... Args>
bool any_negative(Args... args) {
    return ((args < 0) || ...);  // At least one argument is negative
}

// Count elements satisfying condition
template<typename... Args>
size_t count_positive(Args... args) {
    return ((args > 0 ? 1 : 0) + ...);
}

// === STRING OPERATIONS ===

// Concatenate strings with separator
template<typename... Args>
std::string join_with_comma(Args... args) {
    std::ostringstream oss;
    size_t count = 0;
    ((oss << (count++ > 0 ? ", " : "") << args), ...);
    return oss.str();
}

// Print with separators
template<typename... Args>
void print_all(Args... args) {
    ((std::cout << args << " "), ...);
    std::cout << std::endl;
}

// Print with custom separator
template<char Separator, typename... Args>
void print_separated(Args... args) {
    size_t count = 0;
    ((std::cout << (count++ > 0 ? Separator : ' ') << args), ...);
    std::cout << std::endl;
}

// === FUNCTION APPLICATION ===

// Apply function to all arguments
template<typename Func, typename... Args>
void apply_to_all(Func func, Args... args) {
    (func(args), ...);
}

// Transform and sum
template<typename Func, typename... Args>
auto transform_and_sum(Func func, Args... args) {
    return (func(args) + ...);
}

// === CONTAINER OPERATIONS ===

// Push all elements to vector
template<typename T, typename... Args>
void push_all(std::vector<T>& vec, Args... args) {
    (vec.push_back(args), ...);
}

// Check if value exists in multiple containers
template<typename Value, typename... Containers>
bool exists_in_any(const Value& value, const Containers&... containers) {
    return ((std::find(containers.begin(), containers.end(), value) != containers.end()) || ...);
}

// Get total size of all containers
template<typename... Containers>
size_t total_size(const Containers&... containers) {
    return (containers.size() + ...);
}

// === TYPE OPERATIONS ===

// Check if all types are the same
template<typename T, typename... Args>
constexpr bool all_same_type() {
    return (std::is_same_v<T, Args> && ...);
}

// Check if all types are arithmetic
template<typename... Args>
constexpr bool all_arithmetic() {
    return (std::is_arithmetic_v<Args> && ...);
}

// Count types satisfying predicate
template<template<typename> class Predicate, typename... Args>
constexpr size_t count_types() {
    return (Predicate<Args>::value + ...);
}

// === ADVANCED PATTERNS ===

// Recursive data structure traversal
template<typename Visitor, typename... Nodes>
void visit_all(Visitor&& visitor, Nodes&&... nodes) {
    (visitor(std::forward<Nodes>(nodes)), ...);
}

// Factory pattern with fold expressions
template<typename Base, typename... Args>
auto create_all(Args&&... args) {
    std::vector<std::unique_ptr<Base>> objects;
    (objects.push_back(std::make_unique<Args>(std::forward<Args>(args))), ...);
    return objects;
}

// Comparison operations
template<typename T, typename... Args>
bool all_equal(const T& first, Args... args) {
    return ((first == args) && ...);
}

template<typename T, typename... Args>
T min_of_all(T first, Args... args) {
    return ((first = (first < args ? first : args)), ...);
}

template<typename T, typename... Args>
T max_of_all(T first, Args... args) {
    return ((first = (first > args ? first : args)), ...);
}

// === MATHEMATICAL OPERATIONS ===

// Product of all arguments
template<typename... Args>
auto product(Args... args) {
    return (args * ...);
}

// Average of all arguments
template<typename... Args>
auto average(Args... args) {
    return (args + ...) / sizeof...(args);
}

// Euclidean distance (n-dimensional)
template<typename... Args>
auto euclidean_distance(Args... args) {
    return std::sqrt((args * args + ...));
}

// Dot product of two parameter packs
template<typename... Args1, typename... Args2>
auto dot_product(std::tuple<Args1...> pack1, std::tuple<Args2...> pack2) {
    return [&]<size_t... Is>(std::index_sequence<Is...>) {
        return ((std::get<Is>(pack1) * std::get<Is>(pack2)) + ...);
    }(std::index_sequence_for<Args1...>{});
}

// === DEMONSTRATION CLASSES ===

class Shape {
public:
    virtual ~Shape() = default;
    virtual void draw() const = 0;
    virtual double area() const = 0;
};

class Circle : public Shape {
private:
    double radius_;
public:
    Circle(double r) : radius_(r) {}
    void draw() const override { std::cout << "Circle(r=" << radius_ << ")"; }
    double area() const override { return 3.14159 * radius_ * radius_; }
};

class Rectangle : public Shape {
private:
    double width_, height_;
public:
    Rectangle(double w, double h) : width_(w), height_(h) {}
    void draw() const override { std::cout << "Rectangle(" << width_ << "x" << height_ << ")"; }
    double area() const override { return width_ * height_; }
};

int main() {
    std::cout << "=== Fold Expressions Demo ===\\n\\n";
    
    // === Basic arithmetic ===
    std::cout << "=== Basic Arithmetic ===\\n";
    std::cout << "sum(1, 2, 3, 4, 5) = " << sum(1, 2, 3, 4, 5) << "\\n";
    std::cout << "product(2, 3, 4) = " << product(2, 3, 4) << "\\n";
    std::cout << "average(10, 20, 30) = " << average(10, 20, 30) << "\\n";
    std::cout << "euclidean_distance(3, 4) = " << euclidean_distance(3, 4) << "\\n\\n";
    
    // === Logical operations ===
    std::cout << "=== Logical Operations ===\\n";
    std::cout << "all_positive(1, 2, 3) = " << all_positive(1, 2, 3) << "\\n";
    std::cout << "all_positive(1, -2, 3) = " << all_positive(1, -2, 3) << "\\n";
    std::cout << "any_negative(-1, 2, 3) = " << any_negative(-1, 2, 3) << "\\n";
    std::cout << "count_positive(1, -2, 3, -4, 5) = " << count_positive(1, -2, 3, -4, 5) << "\\n\\n";
    
    // === String operations ===
    std::cout << "=== String Operations ===\\n";
    std::cout << "join_with_comma(\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\"): " 
              << join_with_comma("apple", "banana", "cherry") << "\\n";
    std::cout << "print_all output: ";
    print_all("Hello", "world", "from", "fold", "expressions");
    std::cout << "print_separated<'|'> output: ";
    print_separated<'|'>("C++", "fold", "expressions", "rock");
    std::cout << "\\n";
    
    // === Container operations ===
    std::cout << "=== Container Operations ===\\n";
    std::vector<int> vec;
    push_all(vec, 10, 20, 30, 40, 50);
    std::cout << "Vector after push_all: [";
    for (size_t i = 0; i < vec.size(); ++i) {
        if (i > 0) std::cout << ", ";
        std::cout << vec[i];
    }
    std::cout << "]\\n";
    
    std::vector<int> v1{1, 2, 3};
    std::vector<int> v2{4, 5, 6};
    std::vector<int> v3{7, 8, 9};
    std::cout << "Total size of three vectors: " << total_size(v1, v2, v3) << "\\n";
    std::cout << "Value 5 exists in any vector: " << exists_in_any(5, v1, v2, v3) << "\\n\\n";
    
    // === Type operations ===
    std::cout << "=== Type Operations ===\\n";
    std::cout << "all_same_type<int, int, int>(): " << all_same_type<int, int, int>() << "\\n";
    std::cout << "all_same_type<int, double, int>(): " << all_same_type<int, double, int>() << "\\n";
    std::cout << "all_arithmetic<int, double, float>(): " << all_arithmetic<int, double, float>() << "\\n";
    std::cout << "all_arithmetic<int, std::string, float>(): " << all_arithmetic<int, std::string, float>() << "\\n\\n";
    
    // === Advanced patterns ===
    std::cout << "=== Advanced Patterns ===\\n";
    
    // Function application
    auto square = [](int x) { std::cout << x << "² = " << x*x << " "; };
    std::cout << "Applying square function: ";
    apply_to_all(square, 2, 3, 4, 5);
    std::cout << "\\n";
    
    // Transform and sum
    auto cube = [](int x) { return x * x * x; };
    std::cout << "Sum of cubes of (1,2,3,4): " << transform_and_sum(cube, 1, 2, 3, 4) << "\\n";
    
    // Comparisons
    std::cout << "all_equal(5, 5, 5, 5): " << all_equal(5, 5, 5, 5) << "\\n";
    std::cout << "all_equal(5, 5, 4, 5): " << all_equal(5, 5, 4, 5) << "\\n";
    std::cout << "min_of_all(10, 3, 7, 2, 8): " << min_of_all(10, 3, 7, 2, 8) << "\\n";
    std::cout << "max_of_all(10, 3, 7, 15, 8): " << max_of_all(10, 3, 7, 15, 8) << "\\n\\n";
    
    std::cout << "=== Fold Expression Benefits ===\\n";
    std::cout << "✓ Concise variadic template patterns\\n";
    std::cout << "✓ No recursive template instantiation needed\\n";
    std::cout << "✓ Better compile-time performance\\n";
    std::cout << "✓ More readable than SFINAE alternatives\\n";
    std::cout << "✓ Works with any binary operator\\n";
    std::cout << "✓ Perfect for functional programming patterns\\n";
    
    return 0;
}`,
    explanation: `Fold expressions provide a concise way to apply binary operators to parameter packs without writing recursive templates. The four forms are: unary right fold (pack op ...), unary left fold (... op pack), binary right fold (pack op ... op init), and binary left fold (init op ... op pack). This enables powerful variadic template patterns for mathematical operations, logical tests, container manipulations, and type operations with clean, readable syntax.`,
    useCase: `Perfect for variadic template functions that need to apply operations across all parameters, such as mathematical libraries, logging systems with multiple arguments, container operations, type trait checking, and any functional programming patterns. Essential for modern C++ template metaprogramming and generic algorithm design.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/fold'
  },

  // === TEMPLATE SPECIALIZATION (EXPANDED) ===
  {
    id: 'template-specialization',
    title: 'Template Specialization',
    standard: 'templates',
    description: 'Full and partial template specialization for customizing template behavior for specific types and type patterns.',
    codeExample: `#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <type_traits>
#include <bitset>
#include <array>

// === FUNCTION TEMPLATE SPECIALIZATION ===

// Primary template
template<typename T>
void print_info(const T& value) {
    std::cout << "Generic type: " << value << " (size: " << sizeof(T) << " bytes)\\n";
}

// Full specialization for std::string
template<>
void print_info<std::string>(const std::string& value) {
    std::cout << "String: \\"" << value << "\\" (length: " << value.length() << " chars)\\n";
}

// Full specialization for pointers
template<typename T>
void print_info(T* ptr) {
    if (ptr) {
        std::cout << "Pointer to " << typeid(T).name() << ": " << *ptr 
                  << " (address: " << ptr << ")\\n";
    } else {
        std::cout << "Null pointer to " << typeid(T).name() << "\\n";
    }
}

// === CLASS TEMPLATE SPECIALIZATION ===

// Primary template for a simple container
template<typename T, size_t N>
class FixedArray {
private:
    T data_[N];
    
public:
    FixedArray() = default;
    
    T& operator[](size_t index) { return data_[index]; }
    const T& operator[](size_t index) const { return data_[index]; }
    
    constexpr size_t size() const { return N; }
    
    void print() const {
        std::cout << "FixedArray<" << typeid(T).name() << ", " << N << ">: [";
        for (size_t i = 0; i < N; ++i) {
            if (i > 0) std::cout << ", ";
            std::cout << data_[i];
        }
        std::cout << "]\\n";
    }
    
    // Generic implementation
    void fill(const T& value) {
        for (size_t i = 0; i < N; ++i) {
            data_[i] = value;
        }
    }
};

// Partial specialization for bool (bit-packed storage)
template<size_t N>
class FixedArray<bool, N> {
private:
    std::bitset<N> bits_;
    
public:
    FixedArray() = default;
    
    // Proxy class for bit access
    class BitProxy {
    private:
        std::bitset<N>& bits_;
        size_t index_;
        
    public:
        BitProxy(std::bitset<N>& bits, size_t index) : bits_(bits), index_(index) {}
        
        BitProxy& operator=(bool value) {
            bits_[index_] = value;
            return *this;
        }
        
        operator bool() const {
            return bits_[index_];
        }
    };
    
    BitProxy operator[](size_t index) { return BitProxy(bits_, index); }
    bool operator[](size_t index) const { return bits_[index]; }
    
    constexpr size_t size() const { return N; }
    
    void print() const {
        std::cout << "FixedArray<bool, " << N << "> (bit-packed): [";
        for (size_t i = 0; i < N; ++i) {
            if (i > 0) std::cout << ", ";
            std::cout << (bits_[i] ? "true" : "false");
        }
        std::cout << "]\\n";
    }
    
    // Specialized implementation for bool
    void fill(bool value) {
        if (value) {
            bits_.set();  // Set all bits to 1
        } else {
            bits_.reset(); // Set all bits to 0
        }
    }
    
    size_t count() const { return bits_.count(); }
    void flip() { bits_.flip(); }
};

// Full specialization for void pointers
template<size_t N>
class FixedArray<void*, N> {
private:
    void* data_[N];
    
public:
    FixedArray() {
        for (size_t i = 0; i < N; ++i) {
            data_[i] = nullptr;
        }
    }
    
    void*& operator[](size_t index) { return data_[index]; }
    void* const& operator[](size_t index) const { return data_[index]; }
    
    constexpr size_t size() const { return N; }
    
    void print() const {
        std::cout << "FixedArray<void*, " << N << "> (pointer array): [";
        for (size_t i = 0; i < N; ++i) {
            if (i > 0) std::cout << ", ";
            std::cout << data_[i];
        }
        std::cout << "]\\n";
    }
    
    void fill(void* ptr) {
        for (size_t i = 0; i < N; ++i) {
            data_[i] = ptr;
        }
    }
    
    size_t non_null_count() const {
        size_t count = 0;
        for (size_t i = 0; i < N; ++i) {
            if (data_[i] != nullptr) count++;
        }
        return count;
    }
};

// === ADVANCED SPECIALIZATION PATTERNS ===

// Type traits with specialization
template<typename T>
struct TypeTraits {
    static constexpr bool is_pointer = false;
    static constexpr bool is_reference = false;
    static constexpr bool is_array = false;
    static const char* name() { return "unknown"; }
};

// Specialization for pointers
template<typename T>
struct TypeTraits<T*> {
    using pointed_type = T;
    static constexpr bool is_pointer = true;
    static constexpr bool is_reference = false;
    static constexpr bool is_array = false;
    static const char* name() { return "pointer"; }
};

// Specialization for references
template<typename T>
struct TypeTraits<T&> {
    using referenced_type = T;
    static constexpr bool is_pointer = false;
    static constexpr bool is_reference = true;
    static constexpr bool is_array = false;
    static const char* name() { return "reference"; }
};

// Specialization for arrays
template<typename T, size_t N>
struct TypeTraits<T[N]> {
    using element_type = T;
    static constexpr bool is_pointer = false;
    static constexpr bool is_reference = false;
    static constexpr bool is_array = true;
    static constexpr size_t array_size = N;
    static const char* name() { return "array"; }
};

// === SFINAE WITH SPECIALIZATION ===

// Helper for detecting member functions
template<typename T, typename = void>
struct has_push_back : std::false_type {};

template<typename T>
struct has_push_back<T, std::void_t<
    decltype(std::declval<T>().push_back(std::declval<typename T::value_type>()))
>> : std::true_type {};

// Container wrapper with specialization based on capabilities
template<typename Container, bool HasPushBack = has_push_back<Container>::value>
class ContainerWrapper;

// Specialization for containers with push_back
template<typename Container>
class ContainerWrapper<Container, true> {
private:
    Container container_;
    
public:
    void add(const typename Container::value_type& value) {
        container_.push_back(value);
        std::cout << "Added via push_back: " << value << "\\n";
    }
    
    size_t size() const { return container_.size(); }
    
    void print() const {
        std::cout << "Container with push_back (size: " << container_.size() << "): [";
        for (auto it = container_.begin(); it != container_.end(); ++it) {
            if (it != container_.begin()) std::cout << ", ";
            std::cout << *it;
        }
        std::cout << "]\\n";
    }
};

// Specialization for containers without push_back (like arrays)
template<typename Container>
class ContainerWrapper<Container, false> {
private:
    Container container_;
    size_t current_size_ = 0;
    
public:
    void add(const typename Container::value_type& value) {
        if (current_size_ < container_.size()) {
            container_[current_size_++] = value;
            std::cout << "Added via index assignment: " << value << "\\n";
        } else {
            std::cout << "Container is full, cannot add: " << value << "\\n";
        }
    }
    
    size_t size() const { return current_size_; }
    
    void print() const {
        std::cout << "Container without push_back (size: " << current_size_ << "): [";
        for (size_t i = 0; i < current_size_; ++i) {
            if (i > 0) std::cout << ", ";
            std::cout << container_[i];
        }
        std::cout << "]\\n";
    }
};

// === VARIADIC TEMPLATE SPECIALIZATION ===

// Primary template for tuple-like structure
template<typename... Types>
struct Tuple;

// Specialization for empty tuple
template<>
struct Tuple<> {
    static constexpr size_t size = 0;
    void print() const {
        std::cout << "Empty tuple()\\n";
    }
};

// Specialization for single element
template<typename T>
struct Tuple<T> {
    T value;
    static constexpr size_t size = 1;
    
    Tuple(const T& v) : value(v) {}
    
    void print() const {
        std::cout << "Tuple(" << value << ")\\n";
    }
};

// Specialization for two elements
template<typename T1, typename T2>
struct Tuple<T1, T2> {
    T1 first;
    T2 second;
    static constexpr size_t size = 2;
    
    Tuple(const T1& f, const T2& s) : first(f), second(s) {}
    
    void print() const {
        std::cout << "Tuple(" << first << ", " << second << ")\\n";
    }
};

// General case handled by recursion (for more than 2 elements)
template<typename T, typename... Rest>
struct Tuple<T, Rest...> {
    T head;
    Tuple<Rest...> tail;
    static constexpr size_t size = 1 + sizeof...(Rest);
    
    Tuple(const T& h, const Rest&... r) : head(h), tail(r...) {}
    
    void print() const {
        std::cout << "Tuple(" << head;
        if constexpr (sizeof...(Rest) > 0) {
            std::cout << ", ";
            // Note: This is a simplified print - real implementation would be more complex
        }
        std::cout << " + tail)\\n";
    }
};

int main() {
    std::cout << "=== Template Specialization Demo ===\\n\\n";
    
    // === Function Template Specialization ===
    std::cout << "=== Function Template Specialization ===\\n";
    print_info(42);
    print_info(3.14);
    print_info(std::string("Hello World"));
    
    int value = 100;
    int* ptr = &value;
    print_info(ptr);
    print_info<int>(nullptr);
    std::cout << "\\n";
    
    // === Class Template Specialization ===
    std::cout << "=== Class Template Specialization ===\\n";
    
    FixedArray<int, 5> int_array;
    int_array.fill(42);
    int_array.print();
    
    FixedArray<bool, 8> bool_array;
    bool_array.fill(true);
    bool_array[2] = false;
    bool_array[5] = false;
    bool_array.print();
    std::cout << "True bits count: " << bool_array.count() << "\\n";
    
    FixedArray<void*, 4> ptr_array;
    ptr_array.fill(&value);
    ptr_array[1] = nullptr;
    ptr_array.print();
    std::cout << "Non-null pointers: " << ptr_array.non_null_count() << "\\n\\n";
    
    // === Type Traits Specialization ===
    std::cout << "=== Type Traits Specialization ===\\n";
    std::cout << "int - pointer: " << TypeTraits<int>::is_pointer << ", name: " << TypeTraits<int>::name() << "\\n";
    std::cout << "int* - pointer: " << TypeTraits<int*>::is_pointer << ", name: " << TypeTraits<int*>::name() << "\\n";
    std::cout << "int& - reference: " << TypeTraits<int&>::is_reference << ", name: " << TypeTraits<int&>::name() << "\\n";
    std::cout << "int[10] - array: " << TypeTraits<int[10]>::is_array << ", name: " << TypeTraits<int[10]>::name() << "\\n\\n";
    
    // === SFINAE with Specialization ===
    std::cout << "=== SFINAE with Specialization ===\\n";
    
    ContainerWrapper<std::vector<int>> vector_wrapper;
    vector_wrapper.add(1);
    vector_wrapper.add(2);
    vector_wrapper.add(3);
    vector_wrapper.print();
    
    ContainerWrapper<std::array<int, 5>> array_wrapper;
    array_wrapper.add(10);
    array_wrapper.add(20);
    array_wrapper.add(30);
    array_wrapper.print();
    std::cout << "\\n";
    
    // === Variadic Template Specialization ===
    std::cout << "=== Variadic Template Specialization ===\\n";
    
    Tuple<> empty_tuple;
    empty_tuple.print();
    
    Tuple<int> single_tuple{42};
    single_tuple.print();
    
    Tuple<int, std::string> pair_tuple{100, "hello"};
    pair_tuple.print();
    
    Tuple<int, double, std::string> triple_tuple{1, 2.5, "world"};
    triple_tuple.print();
    std::cout << "\\n";
    
    std::cout << "=== Template Specialization Benefits ===\\n";
    std::cout << "✓ Customize behavior for specific types\\n";
    std::cout << "✓ Optimize implementations for special cases\\n";
    std::cout << "✓ Enable type-specific algorithms\\n";
    std::cout << "✓ Foundation for advanced metaprogramming\\n";
    std::cout << "✓ Essential for creating robust generic libraries\\n";
    std::cout << "✓ Enables fine-grained control over template instantiation\\n";
    
    return 0;
}`,
    explanation: `Template specialization allows customizing template behavior for specific types or type patterns. Full specialization provides completely custom implementations for specific type combinations, while partial specialization enables patterns like "all pointers" or "all const types". This is fundamental to the STL's design and enables optimizations like std::vector<bool>'s bit-packing. Specialization is essential for type traits, SFINAE techniques, and creating generic libraries that handle edge cases elegantly.`,
    useCase: `Critical for generic library design, type traits implementation, performance optimizations for specific types, and handling special cases in template code. Essential for creating robust generic containers, algorithms that adapt to type properties, and any situation where one-size-fits-all generic code isn't optimal. Used extensively in STL implementations and advanced template metaprogramming.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/template_specialization'
  },

  // === DEDUCING THIS (C++23) ===
  {
    id: 'deducing-this',
    title: 'Deducing this',
    standard: 'cpp23',
    description: 'Explicit object parameters that deduce the type and value category of the calling object, enabling unified function definitions.',
    codeExample: `#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <utility>
#include <type_traits>

// === BASIC DEDUCING THIS EXAMPLE ===

class BasicExample {
private:
    std::string data_;
    
public:
    BasicExample(std::string data) : data_(std::move(data)) {}
    
    // Traditional approach: need separate const and non-const versions
    std::string& get_data_old() & { return data_; }
    const std::string& get_data_old() const & { return data_; }
    std::string get_data_old() && { return std::move(data_); }
    
    // C++23 deducing this: single function handles all cases
    template<typename Self>
    auto&& get_data(this Self&& self) {
        return std::forward<Self>(self).data_;
    }
    
    // Another example: chaining operations
    template<typename Self>
    auto&& append(this Self&& self, const std::string& suffix) {
        self.data_ += suffix;
        return std::forward<Self>(self);
    }
    
    void print() const {
        std::cout << "Data: " << data_ << "\\n";
    }
};

// === CRTP ELIMINATION ===

// Old CRTP pattern
template<typename Derived>
class CRTPBase {
public:
    void process_old() {
        static_cast<Derived*>(this)->process_impl();
    }
    
protected:
    ~CRTPBase() = default;
};

class CRTPDerived : public CRTPBase<CRTPDerived> {
public:
    void process_impl() {
        std::cout << "CRTP processing in derived class\\n";
    }
};

// New approach with deducing this
class ModernBase {
public:
    template<typename Self>
    void process(this Self&& self) {
        self.process_impl();
    }
};

class ModernDerived : public ModernBase {
public:
    void process_impl() {
        std::cout << "Modern processing in derived class\\n";
    }
};

// === ADVANCED PATTERNS ===

// Builder pattern with deducing this
template<typename T>
class Builder {
private:
    T object_;
    
public:
    Builder() = default;
    
    template<typename Self, typename U>
    auto&& set_value(this Self&& self, U&& value) {
        self.object_.value = std::forward<U>(value);
        return std::forward<Self>(self);
    }
    
    template<typename Self>
    auto&& set_name(this Self&& self, std::string name) {
        self.object_.name = std::move(name);
        return std::forward<Self>(self);
    }
    
    template<typename Self>
    auto&& add_tag(this Self&& self, std::string tag) {
        self.object_.tags.push_back(std::move(tag));
        return std::forward<Self>(self);
    }
    
    T build() && {
        return std::move(object_);
    }
    
    const T& build() const & {
        return object_;
    }
};

struct Product {
    int value = 0;
    std::string name;
    std::vector<std::string> tags;
    
    void print() const {
        std::cout << "Product: " << name << " (value: " << value << ")\\n";
        std::cout << "Tags: [";
        for (size_t i = 0; i < tags.size(); ++i) {
            if (i > 0) std::cout << ", ";
            std::cout << tags[i];
        }
        std::cout << "]\\n";
    }
};

// === RECURSIVE OPERATIONS ===

// Tree-like structure with deducing this
template<typename T>
class TreeNode {
private:
    T data_;
    std::vector<std::unique_ptr<TreeNode<T>>> children_;
    
public:
    TreeNode(T data) : data_(std::move(data)) {}
    
    template<typename Self>
    auto&& add_child(this Self&& self, T data) {
        self.children_.push_back(std::make_unique<TreeNode<T>>(std::move(data)));
        return std::forward<Self>(self);
    }
    
    template<typename Self, typename Func>
    void visit(this Self&& self, Func&& func) {
        func(self.data_);
        for (auto& child : self.children_) {
            child->visit(std::forward<Func>(func));
        }
    }
    
    template<typename Self, typename Func>
    auto transform(this Self&& self, Func&& func) -> TreeNode<decltype(func(self.data_))> {
        TreeNode<decltype(func(self.data_))> result(func(self.data_));
        
        for (auto& child : self.children_) {
            result.children_.push_back(
                std::make_unique<TreeNode<decltype(func(self.data_))>>(
                    child->transform(std::forward<Func>(func))
                )
            );
        }
        
        return result;
    }
    
    const T& data() const { return data_; }
    size_t child_count() const { return children_.size(); }
};

// === OPTIONAL-LIKE OPERATIONS ===

template<typename T>
class Optional {
private:
    bool has_value_;
    alignas(T) char storage_[sizeof(T)];
    
    T* get_ptr() { return reinterpret_cast<T*>(storage_); }
    const T* get_ptr() const { return reinterpret_cast<const T*>(storage_); }
    
public:
    Optional() : has_value_(false) {}
    
    Optional(const T& value) : has_value_(true) {
        new(storage_) T(value);
    }
    
    Optional(T&& value) : has_value_(true) {
        new(storage_) T(std::move(value));
    }
    
    ~Optional() {
        if (has_value_) {
            get_ptr()->~T();
        }
    }
    
    // Deducing this for value access
    template<typename Self>
    auto&& value(this Self&& self) {
        if (!self.has_value_) {
            throw std::runtime_error("Optional is empty");
        }
        return *self.get_ptr();
    }
    
    // Transform operation with perfect forwarding
    template<typename Self, typename Func>
    auto transform(this Self&& self, Func&& func) -> Optional<decltype(func(*self.get_ptr()))> {
        if (!self.has_value_) {
            return {};
        }
        return Optional<decltype(func(*self.get_ptr()))>(func(*self.get_ptr()));
    }
    
    // Chain operations
    template<typename Self, typename Func>
    auto and_then(this Self&& self, Func&& func) -> decltype(func(*self.get_ptr())) {
        if (!self.has_value_) {
            return {};
        }
        return func(*self.get_ptr());
    }
    
    bool has_value() const { return has_value_; }
};

// === PERFORMANCE CONSIDERATIONS ===

// Efficient accessor with deducing this
class PerformanceExample {
private:
    std::vector<int> data_;
    
public:
    PerformanceExample(std::vector<int> data) : data_(std::move(data)) {}
    
    // Single function handles all reference qualifiers efficiently
    template<typename Self>
    auto&& get_data_efficiently(this Self&& self) noexcept {
        // Perfect forwarding preserves value category
        return std::forward<Self>(self).data_;
    }
    
    // Conditional operations based on const-ness
    template<typename Self>
    void modify_if_mutable(this Self&& self, int new_value) {
        if constexpr (!std::is_const_v<std::remove_reference_t<Self>>) {
            self.data_.push_back(new_value);
            std::cout << "Added value: " << new_value << "\\n";
        } else {
            std::cout << "Cannot modify const object\\n";
        }
    }
    
    size_t size() const { return data_.size(); }
    
    void print() const {
        std::cout << "Data: [";
        for (size_t i = 0; i < data_.size(); ++i) {
            if (i > 0) std::cout << ", ";
            std::cout << data_[i];
        }
        std::cout << "]\\n";
    }
};

int main() {
    std::cout << "=== Deducing This Demo ===\\n\\n";
    
    // === Basic Example ===
    std::cout << "=== Basic Deducing This ===\\n";
    
    BasicExample example("Hello");
    example.print();
    
    // Works with different value categories
    auto& ref_result = example.get_data();
    std::cout << "Lvalue reference: " << ref_result << "\\n";
    
    const BasicExample const_example("World");
    const auto& const_ref_result = const_example.get_data();
    std::cout << "Const lvalue reference: " << const_ref_result << "\\n";
    
    auto moved_result = BasicExample("Moved").get_data();
    std::cout << "Rvalue (moved): " << moved_result << "\\n";
    
    // Chaining operations
    BasicExample("Chain").append(" test").append(" works").print();
    std::cout << "\\n";
    
    // === CRTP vs Modern Approach ===
    std::cout << "=== CRTP vs Modern Approach ===\\n";
    
    CRTPDerived crtp_obj;
    crtp_obj.process_old();
    
    ModernDerived modern_obj;
    modern_obj.process();
    std::cout << "\\n";
    
    // === Builder Pattern ===
    std::cout << "=== Builder Pattern with Deducing This ===\\n";
    
    auto product = Builder<Product>{}
        .set_name("Laptop")
        .set_value(1500)
        .add_tag("electronics")
        .add_tag("computer")
        .add_tag("portable")
        .build();
    
    product.print();
    std::cout << "\\n";
    
    // === Tree Operations ===
    std::cout << "=== Tree with Deducing This ===\\n";
    
    TreeNode<int> tree(1);
    tree.add_child(2).add_child(3);
    
    std::cout << "Tree traversal: ";
    tree.visit([](const int& value) { std::cout << value << " "; });
    std::cout << "\\n";
    
    // Transform tree
    auto string_tree = tree.transform([](int value) { 
        return std::to_string(value * 10); 
    });
    
    std::cout << "Transformed tree: ";
    string_tree.visit([](const std::string& value) { std::cout << value << " "; });
    std::cout << "\\n\\n";
    
    // === Optional Operations ===
    std::cout << "=== Optional with Deducing This ===\\n";
    
    Optional<int> opt1(42);
    Optional<int> opt2;
    
    auto doubled = opt1.transform([](int x) { return x * 2; });
    auto empty_doubled = opt2.transform([](int x) { return x * 2; });
    
    std::cout << "opt1 has value: " << opt1.has_value() << ", value: " << opt1.value() << "\\n";
    std::cout << "doubled has value: " << doubled.has_value() << ", value: " << doubled.value() << "\\n";
    std::cout << "empty_doubled has value: " << empty_doubled.has_value() << "\\n\\n";
    
    // === Performance Example ===
    std::cout << "=== Performance Example ===\\n";
    
    PerformanceExample perf_obj({1, 2, 3, 4, 5});
    perf_obj.print();
    
    perf_obj.modify_if_mutable(6);  // Should work (non-const)
    perf_obj.print();
    
    const PerformanceExample const_perf_obj({10, 20, 30});
    const_perf_obj.modify_if_mutable(40);  // Should not modify (const)
    const_perf_obj.print();
    std::cout << "\\n";
    
    std::cout << "=== Deducing This Benefits ===\\n";
    std::cout << "✓ Eliminates code duplication for const/non-const overloads\\n";
    std::cout << "✓ Perfect forwarding of value categories\\n";
    std::cout << "✓ Simplifies CRTP patterns\\n";
    std::cout << "✓ Enables more generic and reusable code\\n";
    std::cout << "✓ Better performance through perfect forwarding\\n";
    std::cout << "✓ Cleaner API design with unified interfaces\\n";
    
    return 0;
}`,
    explanation: `Deducing this in C++23 allows member functions to explicitly take the object they're called on as a template parameter, deducing both its type and value category. This eliminates the need for separate const/non-const overloads, simplifies CRTP patterns, and enables perfect forwarding within member functions. The 'this Self&&' parameter allows a single function to handle lvalue, const lvalue, and rvalue calls with optimal efficiency.`,
    useCase: `Perfect for eliminating code duplication in member function overloads, creating more efficient builder patterns, simplifying generic programming patterns that previously required CRTP, and implementing fluent interfaces with optimal performance. Essential for modern C++ library design where perfect forwarding and minimal code duplication are priorities.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/member_functions#Deducing_this'
  },

  // === std::filesystem ===
  {
    id: 'filesystem',
    title: 'std::filesystem',
    standard: 'cpp17',
    description: 'Comprehensive file system operations including path manipulation, directory iteration, file queries, and cross-platform file handling.',
    codeExample: `#include <filesystem>
#include <iostream>
#include <fstream>
#include <string>
#include <chrono>
#include <vector>
#include <algorithm>
#include <iomanip>

namespace fs = std::filesystem;

// === PATH MANIPULATION ===

void demonstrate_path_operations() {
    std::cout << "=== Path Manipulation ===\\n";
    
    // Creating and manipulating paths
    fs::path project_path = "/home/user/projects/cpp_app";
    fs::path source_file = project_path / "src" / "main.cpp";
    fs::path header_file = project_path / "include" / "app.h";
    
    std::cout << "Project path: " << project_path << "\\n";
    std::cout << "Source file: " << source_file << "\\n";
    std::cout << "Header file: " << header_file << "\\n";
    
    // Path components
    std::cout << "\\nPath components of " << source_file << ":\\n";
    std::cout << "  Root name: " << source_file.root_name() << "\\n";
    std::cout << "  Root directory: " << source_file.root_directory() << "\\n";
    std::cout << "  Root path: " << source_file.root_path() << "\\n";
    std::cout << "  Relative path: " << source_file.relative_path() << "\\n";
    std::cout << "  Parent path: " << source_file.parent_path() << "\\n";
    std::cout << "  Filename: " << source_file.filename() << "\\n";
    std::cout << "  Stem: " << source_file.stem() << "\\n";
    std::cout << "  Extension: " << source_file.extension() << "\\n";
    
    // Path modifications
    fs::path backup_file = source_file;
    backup_file.replace_extension(".bak");
    std::cout << "\\nBackup file: " << backup_file << "\\n";
    
    // Relative paths
    fs::path relative = fs::relative(header_file, project_path);
    std::cout << "Relative path from project to header: " << relative << "\\n";
    
    // Path comparison and manipulation
    fs::path config_file = project_path / "config.json";
    std::cout << "\\nConfig file exists check path: " << config_file << "\\n";
}

// === DIRECTORY OPERATIONS ===

class DirectoryManager {
public:
    static void create_sample_structure(const fs::path& base_path) {
        std::cout << "\\n=== Creating Sample Directory Structure ===\\n";
        
        try {
            // Create directories
            fs::create_directories(base_path / "src");
            fs::create_directories(base_path / "include");
            fs::create_directories(base_path / "build" / "debug");
            fs::create_directories(base_path / "build" / "release");
            fs::create_directories(base_path / "docs");
            fs::create_directories(base_path / "tests");
            
            // Create sample files
            create_sample_file(base_path / "README.md", "# Sample Project\\n\\nThis is a sample C++ project.\\n");
            create_sample_file(base_path / "CMakeLists.txt", "cmake_minimum_required(VERSION 3.10)\\nproject(SampleApp)\\n");
            create_sample_file(base_path / "src" / "main.cpp", "#include <iostream>\\nint main() { return 0; }\\n");
            create_sample_file(base_path / "include" / "app.h", "#pragma once\\nclass App {};\\n");
            create_sample_file(base_path / "docs" / "manual.txt", "User manual content\\n");
            create_sample_file(base_path / "tests" / "test_main.cpp", "#include <cassert>\\nvoid test() {}\\n");
            
            std::cout << "Sample structure created at: " << base_path << "\\n";
            
        } catch (const fs::filesystem_error& e) {
            std::cout << "Error creating directory structure: " << e.what() << "\\n";
        }
    }
    
    static void list_directory_contents(const fs::path& path) {
        std::cout << "\\n=== Directory Contents: " << path << " ===\\n";
        
        try {
            for (const auto& entry : fs::directory_iterator(path)) {
                auto status = entry.status();
                auto perms = status.permissions();
                
                // File type
                char type = '?';
                if (entry.is_regular_file()) type = 'f';
                else if (entry.is_directory()) type = 'd';
                else if (entry.is_symlink()) type = 'l';
                else if (entry.is_block_file()) type = 'b';
                else if (entry.is_character_file()) type = 'c';
                else if (entry.is_fifo()) type = 'p';
                else if (entry.is_socket()) type = 's';
                
                // File size
                std::uintmax_t size = 0;
                if (entry.is_regular_file()) {
                    std::error_code ec;
                    size = fs::file_size(entry.path(), ec);
                    if (ec) size = 0;
                }
                
                // Last write time
                auto time = fs::last_write_time(entry.path());
                auto sctp = std::chrono::time_point_cast<std::chrono::system_clock::duration>(
                    time - fs::file_time_type::clock::now() + std::chrono::system_clock::now()
                );
                auto cftime = std::chrono::system_clock::to_time_t(sctp);
                
                std::cout << type << " "
                          << std::setw(10) << size << " bytes "
                          << std::put_time(std::localtime(&cftime), "%Y-%m-%d %H:%M:%S") << " "
                          << entry.path().filename() << "\\n";
            }
        } catch (const fs::filesystem_error& e) {
            std::cout << "Error listing directory: " << e.what() << "\\n";
        }
    }
    
    static void recursive_directory_walk(const fs::path& path) {
        std::cout << "\\n=== Recursive Directory Walk: " << path << " ===\\n";
        
        try {
            for (const auto& entry : fs::recursive_directory_iterator(path)) {
                auto depth = std::distance(path.begin(), entry.path().parent_path().end()) - 
                            std::distance(path.begin(), path.end());
                
                // Indentation based on depth
                for (int i = 0; i < depth; ++i) std::cout << "  ";
                
                if (entry.is_directory()) {
                    std::cout << "[DIR]  " << entry.path().filename() << "\\n";
                } else {
                    auto size = entry.is_regular_file() ? fs::file_size(entry.path()) : 0;
                    std::cout << "[FILE] " << entry.path().filename() 
                              << " (" << size << " bytes)\\n";
                }
            }
        } catch (const fs::filesystem_error& e) {
            std::cout << "Error in recursive walk: " << e.what() << "\\n";
        }
    }
    
private:
    static void create_sample_file(const fs::path& file_path, const std::string& content) {
        std::ofstream file(file_path);
        if (file) {
            file << content;
        }
    }
};

// === FILE OPERATIONS ===

class FileOperations {
public:
    static void demonstrate_file_queries(const fs::path& path) {
        std::cout << "\\n=== File Queries for: " << path << " ===\\n";
        
        std::error_code ec;
        
        // Existence and type checks
        std::cout << "Exists: " << fs::exists(path, ec) << "\\n";
        std::cout << "Is regular file: " << fs::is_regular_file(path, ec) << "\\n";
        std::cout << "Is directory: " << fs::is_directory(path, ec) << "\\n";
        std::cout << "Is symlink: " << fs::is_symlink(path, ec) << "\\n";
        std::cout << "Is empty: " << fs::is_empty(path, ec) << "\\n";
        
        if (fs::exists(path, ec) && fs::is_regular_file(path, ec)) {
            // File size
            auto size = fs::file_size(path, ec);
            std::cout << "File size: " << size << " bytes\\n";
            
            // Timestamps
            auto write_time = fs::last_write_time(path, ec);
            auto sctp = std::chrono::time_point_cast<std::chrono::system_clock::duration>(
                write_time - fs::file_time_type::clock::now() + std::chrono::system_clock::now()
            );
            auto cftime = std::chrono::system_clock::to_time_t(sctp);
            std::cout << "Last modified: " << std::put_time(std::localtime(&cftime), "%Y-%m-%d %H:%M:%S") << "\\n";
            
            // Permissions
            auto perms = fs::status(path, ec).permissions();
            std::cout << "Permissions: ";
            std::cout << ((perms & fs::perms::owner_read) != fs::perms::none ? "r" : "-");
            std::cout << ((perms & fs::perms::owner_write) != fs::perms::none ? "w" : "-");
            std::cout << ((perms & fs::perms::owner_exec) != fs::perms::none ? "x" : "-");
            std::cout << "\\n";
        }
        
        if (ec) {
            std::cout << "Error: " << ec.message() << "\\n";
        }
    }
    
    static void copy_and_move_operations(const fs::path& source_dir) {
        std::cout << "\\n=== Copy and Move Operations ===\\n";
        
        fs::path temp_dir = source_dir / "temp_operations";
        fs::path copy_target = temp_dir / "copy_test";
        fs::path move_target = temp_dir / "move_test";
        
        try {
            // Create temporary directory
            fs::create_directories(temp_dir);
            std::cout << "Created temp directory: " << temp_dir << "\\n";
            
            // Copy directory
            fs::copy(source_dir / "src", copy_target, fs::copy_options::recursive);
            std::cout << "Copied src directory to: " << copy_target << "\\n";
            
            // Move (rename) directory
            fs::rename(copy_target, move_target);
            std::cout << "Moved directory to: " << move_target << "\\n";
            
            // Copy file with options
            fs::path original_file = source_dir / "README.md";
            fs::path backup_file = temp_dir / "README_backup.md";
            
            fs::copy_file(original_file, backup_file, fs::copy_options::overwrite_existing);
            std::cout << "Created backup of README.md\\n";
            
            // Demonstrate different copy options
            fs::path newer_file = temp_dir / "newer_readme.md";
            
            // Create a newer version
            {
                std::ofstream file(newer_file);
                file << "# Newer Version\\nThis is a newer version of the readme.\\n";
            }
            
            // Try copying with update_existing option
            bool copied = fs::copy_file(newer_file, backup_file, 
                                      fs::copy_options::update_existing);
            std::cout << "Updated backup with newer version: " << (copied ? "Yes" : "No") << "\\n";
            
        } catch (const fs::filesystem_error& e) {
            std::cout << "Error in copy/move operations: " << e.what() << "\\n";
        }
    }
    
    static void cleanup_temp_files(const fs::path& base_path) {
        std::cout << "\\n=== Cleaning Up Temporary Files ===\\n";
        
        try {
            fs::path temp_dir = base_path / "temp_operations";
            if (fs::exists(temp_dir)) {
                auto removed_count = fs::remove_all(temp_dir);
                std::cout << "Removed " << removed_count << " files/directories\\n";
            }
            
            // Remove the entire sample structure
            if (fs::exists(base_path)) {
                auto total_removed = fs::remove_all(base_path);
                std::cout << "Total cleanup: removed " << total_removed << " items\\n";
            }
            
        } catch (const fs::filesystem_error& e) {
            std::cout << "Error during cleanup: " << e.what() << "\\n";
        }
    }
};

// === ADVANCED FILE SYSTEM UTILITIES ===

class FileSystemUtils {
public:
    static std::vector<fs::path> find_files_by_extension(const fs::path& root, const std::string& extension) {
        std::vector<fs::path> matching_files;
        
        try {
            for (const auto& entry : fs::recursive_directory_iterator(root)) {
                if (entry.is_regular_file() && entry.path().extension() == extension) {
                    matching_files.push_back(entry.path());
                }
            }
        } catch (const fs::filesystem_error& e) {
            std::cout << "Error searching for files: " << e.what() << "\\n";
        }
        
        return matching_files;
    }
    
    static std::uintmax_t calculate_directory_size(const fs::path& path) {
        std::uintmax_t size = 0;
        std::error_code ec;
        
        for (const auto& entry : fs::recursive_directory_iterator(path, ec)) {
            if (entry.is_regular_file()) {
                size += fs::file_size(entry.path(), ec);
            }
        }
        
        return size;
    }
    
    static void demonstrate_space_info(const fs::path& path) {
        std::cout << "\\n=== File System Space Information ===\\n";
        
        try {
            auto space = fs::space(path);
            
            std::cout << "File system space for: " << path << "\\n";
            std::cout << "  Capacity: " << format_bytes(space.capacity) << "\\n";
            std::cout << "  Free: " << format_bytes(space.free) << "\\n";
            std::cout << "  Available: " << format_bytes(space.available) << "\\n";
            
            double usage_percent = 100.0 * (space.capacity - space.available) / space.capacity;
            std::cout << "  Usage: " << std::fixed << std::setprecision(1) << usage_percent << "%\\n";
            
        } catch (const fs::filesystem_error& e) {
            std::cout << "Error getting space info: " << e.what() << "\\n";
        }
    }
    
private:
    static std::string format_bytes(std::uintmax_t bytes) {
        const char* units[] = {"B", "KB", "MB", "GB", "TB"};
        int unit = 0;
        double size = static_cast<double>(bytes);
        
        while (size >= 1024.0 && unit < 4) {
            size /= 1024.0;
            unit++;
        }
        
        std::ostringstream oss;
        oss << std::fixed << std::setprecision(2) << size << " " << units[unit];
        return oss.str();
    }
};

int main() {
    std::cout << "=== std::filesystem Demo ===\\n\\n";
    
    // Use current directory for demo
    fs::path demo_path = fs::current_path() / "filesystem_demo";
    
    std::cout << "Demo will be conducted in: " << demo_path << "\\n";
    
    // Path manipulation
    demonstrate_path_operations();
    
    // Create sample directory structure
    DirectoryManager::create_sample_structure(demo_path);
    
    // List directory contents
    DirectoryManager::list_directory_contents(demo_path);
    
    // Recursive directory walk
    DirectoryManager::recursive_directory_walk(demo_path);
    
    // File queries
    FileOperations::demonstrate_file_queries(demo_path / "README.md");
    FileOperations::demonstrate_file_queries(demo_path / "src");
    
    // Copy and move operations
    FileOperations::copy_and_move_operations(demo_path);
    
    // Advanced utilities
    std::cout << "\\n=== Advanced File System Utilities ===\\n";
    
    auto cpp_files = FileSystemUtils::find_files_by_extension(demo_path, ".cpp");
    std::cout << "Found " << cpp_files.size() << " .cpp files:\\n";
    for (const auto& file : cpp_files) {
        std::cout << "  " << file << "\\n";
    }
    
    auto dir_size = FileSystemUtils::calculate_directory_size(demo_path);
    std::cout << "\\nTotal directory size: " << dir_size << " bytes\\n";
    
    // File system space info
    FileSystemUtils::demonstrate_space_info(fs::current_path());
    
    std::cout << "\\n=== std::filesystem Benefits ===\\n";
    std::cout << "✓ Cross-platform file system operations\\n";
    std::cout << "✓ Modern C++ exception handling\\n";
    std::cout << "✓ Type-safe path manipulation\\n";
    std::cout << "✓ Comprehensive file and directory operations\\n";
    std::cout << "✓ Iterator-based directory traversal\\n";
    std::cout << "✓ Detailed file metadata and permissions\\n";
    std::cout << "✓ Space and capacity queries\\n";
    
    // Cleanup
    FileOperations::cleanup_temp_files(demo_path);
    
    return 0;
}`,
    explanation: `std::filesystem provides a modern, cross-platform interface for file system operations. It includes comprehensive path manipulation with automatic platform-specific separators, directory iteration with both regular and recursive iterators, detailed file queries including size and timestamps, atomic file operations with error handling, and space information queries. The library uses RAII principles and provides strong exception safety guarantees.`,
    useCase: `Essential for applications that need robust file handling: build systems, file managers, backup utilities, data processing pipelines, log rotation systems, and any application working with files and directories. Perfect for cross-platform development where file system operations must work consistently across Windows, Linux, and macOS.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/filesystem'
  },

  // === constinit (C++20) ===
  {
    id: 'constinit',
    title: 'constinit',
    standard: 'cpp20',
    description: 'Ensures static and thread-local variables are initialized at compile time, preventing static initialization order fiasco.',
    codeExample: `#include <iostream>
#include <string>
#include <vector>
#include <chrono>
#include <thread>
#include <atomic>
#include <array>

// === BASIC constinit USAGE ===

// Global variables with constinit
constinit int global_counter = 0;  // Zero-initialized at compile time
constinit const double PI = 3.141592653589793;  // Compile-time constant

// constinit ensures compile-time initialization
constinit std::atomic<int> atomic_counter{0};

// This would be an error - not compile-time initializable:
// constinit std::string error_string("hello");  // ERROR: std::string constructor not constexpr

// === COMPILE-TIME COMPUTATION ===

constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

constexpr int fibonacci(int n) {
    return (n <= 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

// Using constinit with compile-time computed values
constinit int fact_10 = factorial(10);
constinit int fib_15 = fibonacci(15);

// === ARRAY AND STRUCTURE INITIALIZATION ===

struct CompileTimeConfig {
    int max_connections;
    double timeout_seconds;
    bool debug_enabled;
    
    constexpr CompileTimeConfig(int max_conn, double timeout, bool debug)
        : max_connections(max_conn), timeout_seconds(timeout), debug_enabled(debug) {}
};

// constinit with custom structure
constinit CompileTimeConfig app_config{1000, 30.0, false};

// constinit with arrays
constinit int prime_numbers[] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};
constinit std::array<double, 4> coefficients = {1.0, 0.5, 0.25, 0.125};

// === THREAD-LOCAL VARIABLES ===

// Thread-local storage with constinit
thread_local constinit int thread_counter = 0;
thread_local constinit double thread_accumulator = 0.0;

// Function to demonstrate thread-local behavior
void worker_function(int worker_id, int iterations) {
    for (int i = 0; i < iterations; ++i) {
        thread_counter++;
        thread_accumulator += worker_id * 0.1;
    }
    
    std::cout << "Worker " << worker_id 
              << " - thread_counter: " << thread_counter
              << ", accumulator: " << thread_accumulator << "\\n";
}

// === STATIC INITIALIZATION ORDER SAFETY ===

class Logger {
private:
    static constinit std::atomic<int> log_count_;
    static constinit bool initialized_;
    
public:
    static void log(const std::string& message) {
        // Safe to use because constinit guarantees initialization
        int count = ++log_count_;
        std::cout << "[LOG #" << count << "] " << message << "\\n";
    }
    
    static void initialize() {
        initialized_ = true;
        log("Logger initialized");
    }
    
    static bool is_initialized() {
        return initialized_;
    }
    
    static int get_log_count() {
        return log_count_.load();
    }
};

// Definition of static constinit members
constinit std::atomic<int> Logger::log_count_{0};
constinit bool Logger::initialized_{false};

// === FINANCIAL CALCULATION CONSTANTS ===

namespace FinanceConstants {
    // Trading constants
    constinit double TRADING_FEE_RATE = 0.001;  // 0.1%
    constinit int MAX_POSITION_SIZE = 10000;
    constinit double RISK_FREE_RATE = 0.02;  // 2%
    
    // Market data constants
    constinit int MARKET_HOURS_START = 9;  // 9 AM
    constinit int MARKET_HOURS_END = 16;   // 4 PM
    constinit double VOLATILITY_SCALE = 0.01;
    
    // Pre-calculated compound factors (compile-time)
    constexpr double compound_factor(double rate, int periods) {
        double result = 1.0;
        for (int i = 0; i < periods; ++i) {
            result *= (1.0 + rate);
        }
        return result;
    }
    
    constinit double ANNUAL_GROWTH_10Y = compound_factor(0.07, 10);  // 7% for 10 years
    constinit double MONTHLY_GROWTH_5Y = compound_factor(0.005, 60); // 0.5% monthly for 5 years
}

// === PERFORMANCE MEASUREMENT ===

class PerformanceTimer {
private:
    static constinit std::atomic<uint64_t> total_measurements_;
    static constinit std::atomic<uint64_t> total_nanoseconds_;
    
    std::chrono::high_resolution_clock::time_point start_time_;
    
public:
    PerformanceTimer() : start_time_(std::chrono::high_resolution_clock::now()) {}
    
    ~PerformanceTimer() {
        auto end_time = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end_time - start_time_);
        
        total_measurements_++;
        total_nanoseconds_ += duration.count();
    }
    
    static void print_statistics() {
        auto measurements = total_measurements_.load();
        auto total_ns = total_nanoseconds_.load();
        
        if (measurements > 0) {
            double avg_ns = static_cast<double>(total_ns) / measurements;
            std::cout << "Performance Statistics:\\n";
            std::cout << "  Total measurements: " << measurements << "\\n";
            std::cout << "  Average time: " << avg_ns << " ns\\n";
            std::cout << "  Total time: " << total_ns / 1000000.0 << " ms\\n";
        }
    }
};

constinit std::atomic<uint64_t> PerformanceTimer::total_measurements_{0};
constinit std::atomic<uint64_t> PerformanceTimer::total_nanoseconds_{0};

// === LOOKUP TABLES ===

// Pre-computed lookup tables for fast operations
namespace LookupTables {
    // Sine approximation table
    constexpr std::array<double, 360> generate_sine_table() {
        std::array<double, 360> table{};
        for (int i = 0; i < 360; ++i) {
            // Simplified sine approximation for demo
            double radians = i * 3.14159265358979323846 / 180.0;
            table[i] = radians - (radians * radians * radians) / 6.0;  // Taylor series approximation
        }
        return table;
    }
    
    constinit auto sine_table = generate_sine_table();
    
    // Powers of 2 table
    constexpr std::array<uint64_t, 64> generate_powers_of_2() {
        std::array<uint64_t, 64> table{};
        uint64_t power = 1;
        for (int i = 0; i < 64; ++i) {
            table[i] = power;
            power *= 2;
        }
        return table;
    }
    
    constinit auto powers_of_2 = generate_powers_of_2();
}

// === CONFIGURATION SYSTEM ===

struct SystemConfig {
    // Network settings
    int max_connections = 1000;
    double connection_timeout = 30.0;
    int port = 8080;
    
    // Performance settings
    int thread_pool_size = 8;
    size_t buffer_size = 8192;
    bool enable_compression = true;
    
    // Logging settings
    int log_level = 2;  // INFO level
    size_t max_log_file_size = 10 * 1024 * 1024;  // 10 MB
    
    constexpr SystemConfig() = default;
    
    constexpr SystemConfig(int max_conn, double timeout, int port_num)
        : max_connections(max_conn), connection_timeout(timeout), port(port_num) {}
};

// Global configuration with constinit
constinit SystemConfig global_config;

// Development configuration
constinit SystemConfig dev_config{100, 5.0, 3000};

int main() {
    std::cout << "=== constinit Demo ===\\n\\n";
    
    // === Basic Usage ===
    std::cout << "=== Basic constinit Usage ===\\n";
    std::cout << "Global counter: " << global_counter << "\\n";
    std::cout << "PI value: " << PI << "\\n";
    std::cout << "Factorial(10): " << fact_10 << "\\n";
    std::cout << "Fibonacci(15): " << fib_15 << "\\n";
    std::cout << "Atomic counter: " << atomic_counter.load() << "\\n\\n";
    
    // === Configuration ===
    std::cout << "=== Configuration Usage ===\\n";
    std::cout << "App config - max connections: " << app_config.max_connections << "\\n";
    std::cout << "App config - timeout: " << app_config.timeout_seconds << " seconds\\n";
    std::cout << "App config - debug: " << (app_config.debug_enabled ? "enabled" : "disabled") << "\\n\\n";
    
    // === Arrays ===
    std::cout << "=== Array Initialization ===\\n";
    std::cout << "First few prime numbers: ";
    for (int i = 0; i < 5; ++i) {
        std::cout << prime_numbers[i] << " ";
    }
    std::cout << "\\n";
    
    std::cout << "Coefficients: ";
    for (const auto& coef : coefficients) {
        std::cout << coef << " ";
    }
    std::cout << "\\n\\n";
    
    // === Thread-local Variables ===
    std::cout << "=== Thread-local constinit ===\\n";
    std::vector<std::thread> workers;
    
    for (int i = 1; i <= 3; ++i) {
        workers.emplace_back(worker_function, i, 1000);
    }
    
    for (auto& worker : workers) {
        worker.join();
    }
    
    std::cout << "Main thread - thread_counter: " << thread_counter 
              << ", accumulator: " << thread_accumulator << "\\n\\n";
    
    // === Logger with Static Initialization ===
    std::cout << "=== Logger with constinit Statics ===\\n";
    Logger::initialize();
    Logger::log("Application started");
    Logger::log("Processing data");
    Logger::log("Operation completed");
    std::cout << "Total log entries: " << Logger::get_log_count() << "\\n\\n";
    
    // === Financial Constants ===
    std::cout << "=== Financial Constants ===\\n";
    std::cout << "Trading fee rate: " << FinanceConstants::TRADING_FEE_RATE * 100 << "%\\n";
    std::cout << "Max position size: " << FinanceConstants::MAX_POSITION_SIZE << "\\n";
    std::cout << "10-year growth factor (7%): " << FinanceConstants::ANNUAL_GROWTH_10Y << "\\n";
    std::cout << "5-year monthly growth factor: " << FinanceConstants::MONTHLY_GROWTH_5Y << "\\n\\n";
    
    // === Lookup Tables ===
    std::cout << "=== Lookup Tables ===\\n";
    std::cout << "Sine approximation for 90°: " << LookupTables::sine_table[90] << "\\n";
    std::cout << "Power of 2^10: " << LookupTables::powers_of_2[10] << "\\n";
    std::cout << "Power of 2^20: " << LookupTables::powers_of_2[20] << "\\n\\n";
    
    // === Performance Timing ===
    std::cout << "=== Performance Measurement ===\\n";
    
    // Simulate some timed operations
    for (int i = 0; i < 100; ++i) {
        PerformanceTimer timer;
        
        // Simulate work
        volatile int sum = 0;
        for (int j = 0; j < 1000; ++j) {
            sum += j;
        }
    }
    
    PerformanceTimer::print_statistics();
    std::cout << "\\n";
    
    // === Configuration System ===
    std::cout << "=== Configuration System ===\\n";
    std::cout << "Global config port: " << global_config.port << "\\n";
    std::cout << "Global config max connections: " << global_config.max_connections << "\\n";
    std::cout << "Dev config port: " << dev_config.port << "\\n";
    std::cout << "Dev config timeout: " << dev_config.connection_timeout << " seconds\\n\\n";
    
    std::cout << "=== constinit Benefits ===\\n";
    std::cout << "✓ Guarantees compile-time initialization\\n";
    std::cout << "✓ Prevents static initialization order fiasco\\n";
    std::cout << "✓ Zero runtime initialization overhead\\n";
    std::cout << "✓ Safe for use in library initialization\\n";
    std::cout << "✓ Thread-safe initialization guarantee\\n";
    std::cout << "✓ Compile-time error for non-constant expressions\\n";
    
    return 0;
}`,
    explanation: `constinit ensures that static and thread-local variables are initialized at compile time, not runtime. This eliminates the static initialization order fiasco and provides zero-overhead initialization for global state. Unlike constexpr, constinit variables can be modified at runtime, but their initial value must be computable at compile time. This is particularly valuable for atomic variables, configuration constants, and lookup tables.`,
    useCase: `Essential for high-performance applications requiring predictable initialization, library code that must initialize before main(), embedded systems with limited startup time, financial trading systems needing guaranteed initialization order, and any application where static initialization order could cause bugs. Perfect for global configuration, lookup tables, and atomic counters.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/constinit'
  },

  // === THREE-WAY COMPARISON / SPACESHIP OPERATOR ===
  {
    id: 'spaceship-operator',
    title: 'Three-way Comparison / Spaceship Operator',
    standard: 'cpp20',
    description: 'The <=> operator provides unified comparison semantics, automatically generating all six comparison operators from a single definition.',
    codeExample: `#include <compare>
#include <iostream>
#include <string>
#include <vector>
#include <tuple>
#include <algorithm>

// === BASIC SPACESHIP OPERATOR ===

class Version {
private:
    int major_, minor_, patch_;
    
public:
    Version(int major, int minor, int patch) 
        : major_(major), minor_(minor), patch_(patch) {}
    
    // Spaceship operator - automatically generates all six comparison operators
    auto operator<=>(const Version& other) const {
        // Lexicographic comparison using tuple
        return std::tuple(major_, minor_, patch_) <=> std::tuple(other.major_, other.minor_, other.patch_);
    }
    
    // Equality operator (optional, but recommended for clarity)
    bool operator==(const Version& other) const = default;
    
    void print() const {
        std::cout << major_ << "." << minor_ << "." << patch_;
    }
};

// === CUSTOM COMPARISON CATEGORIES ===

class Temperature {
private:
    double celsius_;
    
public:
    Temperature(double celsius) : celsius_(celsius) {}
    
    // Strong ordering: all values are comparable and have a total order
    std::strong_ordering operator<=>(const Temperature& other) const {
        if (celsius_ < other.celsius_) return std::strong_ordering::less;
        if (celsius_ > other.celsius_) return std::strong_ordering::greater;
        return std::strong_ordering::equal;
    }
    
    bool operator==(const Temperature& other) const = default;
    
    double celsius() const { return celsius_; }
    double fahrenheit() const { return celsius_ * 9.0 / 5.0 + 32.0; }
};

class FloatingPoint {
private:
    double value_;
    
public:
    FloatingPoint(double value) : value_(value) {}
    
    // Partial ordering: some values may be incomparable (NaN)
    std::partial_ordering operator<=>(const FloatingPoint& other) const {
        if (std::isnan(value_) || std::isnan(other.value_)) {
            return std::partial_ordering::unordered;
        }
        if (value_ < other.value_) return std::partial_ordering::less;
        if (value_ > other.value_) return std::partial_ordering::greater;
        return std::partial_ordering::equivalent;
    }
    
    bool operator==(const FloatingPoint& other) const {
        // Handle NaN properly
        if (std::isnan(value_) || std::isnan(other.value_)) return false;
        return value_ == other.value_;
    }
    
    double value() const { return value_; }
};

class CaseInsensitiveString {
private:
    std::string str_;
    
    static std::string to_lower(const std::string& s) {
        std::string result = s;
        std::transform(result.begin(), result.end(), result.begin(), ::tolower);
        return result;
    }
    
public:
    CaseInsensitiveString(const std::string& str) : str_(str) {}
    
    // Weak ordering: equivalent but not equal elements
    std::weak_ordering operator<=>(const CaseInsensitiveString& other) const {
        auto this_lower = to_lower(str_);
        auto other_lower = to_lower(other.str_);
        
        if (this_lower < other_lower) return std::weak_ordering::less;
        if (this_lower > other_lower) return std::weak_ordering::greater;
        return std::weak_ordering::equivalent;  // Case-insensitive equivalent
    }
    
    // Custom equality for case-insensitive comparison
    bool operator==(const CaseInsensitiveString& other) const {
        return to_lower(str_) == to_lower(other.str_);
    }
    
    const std::string& str() const { return str_; }
};

// === FINANCIAL INSTRUMENT COMPARISON ===

enum class AssetClass { Stock, Bond, Commodity, Currency, Derivative };

class FinancialInstrument {
private:
    std::string symbol_;
    AssetClass asset_class_;
    double price_;
    double market_cap_;
    double volatility_;
    
public:
    FinancialInstrument(std::string symbol, AssetClass asset_class, 
                       double price, double market_cap, double volatility)
        : symbol_(std::move(symbol)), asset_class_(asset_class), 
          price_(price), market_cap_(market_cap), volatility_(volatility) {}
    
    // Complex multi-criteria comparison
    std::strong_ordering operator<=>(const FinancialInstrument& other) const {
        // Primary: Asset class
        if (auto cmp = asset_class_ <=> other.asset_class_; cmp != 0) {
            return cmp;
        }
        
        // Secondary: Market cap (descending order for same asset class)
        if (auto cmp = other.market_cap_ <=> market_cap_; cmp != 0) {
            return cmp;
        }
        
        // Tertiary: Symbol (alphabetical)
        if (auto cmp = symbol_ <=> other.symbol_; cmp != 0) {
            return cmp;
        }
        
        // Final: Price
        return price_ <=> other.price_;
    }
    
    bool operator==(const FinancialInstrument& other) const = default;
    
    void print() const {
        const char* asset_names[] = {"Stock", "Bond", "Commodity", "Currency", "Derivative"};
        std::cout << symbol_ << " (" << asset_names[static_cast<int>(asset_class_)] 
                  << ") - Price: $" << price_ << ", Market Cap: $" << market_cap_ / 1e9 << "B";
    }
    
    // Getters
    const std::string& symbol() const { return symbol_; }
    AssetClass asset_class() const { return asset_class_; }
    double price() const { return price_; }
    double market_cap() const { return market_cap_; }
    double volatility() const { return volatility_; }
};

// === CONTAINER WITH SPACESHIP OPERATOR ===

template<typename T>
class SortedVector {
private:
    std::vector<T> data_;
    
    void maintain_order() {
        std::sort(data_.begin(), data_.end());
    }
    
public:
    void insert(const T& value) {
        data_.push_back(value);
        maintain_order();
    }
    
    void insert(T&& value) {
        data_.push_back(std::move(value));
        maintain_order();
    }
    
    // Lexicographic comparison using spaceship
    auto operator<=>(const SortedVector& other) const {
        return data_ <=> other.data_;
    }
    
    bool operator==(const SortedVector& other) const = default;
    
    size_t size() const { return data_.size(); }
    const T& operator[](size_t index) const { return data_[index]; }
    
    auto begin() const { return data_.begin(); }
    auto end() const { return data_.end(); }
};

// === DEMONSTRATION FUNCTIONS ===

void demonstrate_version_comparison() {
    std::cout << "=== Version Comparison ===\\n";
    
    Version v1{2, 1, 0};
    Version v2{2, 1, 5};
    Version v3{3, 0, 0};
    Version v4{2, 1, 0};
    
    std::vector<Version> versions = {v3, v1, v2, v4};
    
    std::cout << "Before sorting: ";
    for (const auto& v : versions) {
        v.print();
        std::cout << " ";
    }
    std::cout << "\\n";
    
    std::sort(versions.begin(), versions.end());
    
    std::cout << "After sorting: ";
    for (const auto& v : versions) {
        v.print();
        std::cout << " ";
    }
    std::cout << "\\n";
    
    // Demonstrate all comparison operators work
    std::cout << "\\nComparison results:\\n";
    std::cout << "v1 == v4: " << (v1 == v4) << "\\n";
    std::cout << "v1 != v2: " << (v1 != v2) << "\\n";
    std::cout << "v1 < v2: " << (v1 < v2) << "\\n";
    std::cout << "v1 <= v4: " << (v1 <= v4) << "\\n";
    std::cout << "v3 > v2: " << (v3 > v2) << "\\n";
    std::cout << "v3 >= v2: " << (v3 >= v2) << "\\n";
}

void demonstrate_comparison_categories() {
    std::cout << "\\n=== Comparison Categories ===\\n";
    
    // Strong ordering
    Temperature t1{20.0};
    Temperature t2{25.0};
    Temperature t3{20.0};
    
    std::cout << "Temperature comparison (strong ordering):\\n";
    std::cout << "20°C == 20°C: " << (t1 == t3) << "\\n";
    std::cout << "20°C < 25°C: " << (t1 < t2) << "\\n";
    std::cout << "25°C > 20°C: " << (t2 > t1) << "\\n";
    
    // Partial ordering with NaN
    FloatingPoint f1{1.5};
    FloatingPoint f2{2.5};
    FloatingPoint f3{std::numeric_limits<double>::quiet_NaN()};
    
    std::cout << "\\nFloating point comparison (partial ordering):\\n";
    std::cout << "1.5 < 2.5: " << (f1 < f2) << "\\n";
    std::cout << "1.5 == NaN: " << (f1 == f3) << "\\n";
    std::cout << "1.5 < NaN: " << (f1 < f3) << "\\n";
    std::cout << "NaN == NaN: " << (f3 == f3) << "\\n";
    
    // Weak ordering
    CaseInsensitiveString s1{"Hello"};
    CaseInsensitiveString s2{"HELLO"};
    CaseInsensitiveString s3{"World"};
    
    std::cout << "\\nCase-insensitive string comparison (weak ordering):\\n";
    std::cout << "\\"Hello\\" == \\"HELLO\\": " << (s1 == s2) << "\\n";
    std::cout << "\\"Hello\\" < \\"World\\": " << (s1 < s3) << "\\n";
    std::cout << "\\"HELLO\\" < \\"World\\": " << (s2 < s3) << "\\n";
}

void demonstrate_financial_instruments() {
    std::cout << "\\n=== Financial Instrument Comparison ===\\n";
    
    std::vector<FinancialInstrument> instruments = {
        {"AAPL", AssetClass::Stock, 150.0, 2400e9, 0.25},
        {"GOOGL", AssetClass::Stock, 2500.0, 1600e9, 0.30},
        {"TSLA", AssetClass::Stock, 800.0, 800e9, 0.45},
        {"US10Y", AssetClass::Bond, 98.5, 0, 0.05},
        {"GOLD", AssetClass::Commodity, 1900.0, 0, 0.20}
    };
    
    std::cout << "Before sorting:\\n";
    for (const auto& instr : instruments) {
        instr.print();
        std::cout << "\\n";
    }
    
    std::sort(instruments.begin(), instruments.end());
    
    std::cout << "\\nAfter sorting (by asset class, then market cap desc):\\n";
    for (const auto& instr : instruments) {
        instr.print();
        std::cout << "\\n";
    }
}

int main() {
    std::cout << "=== Three-way Comparison / Spaceship Operator Demo ===\\n\\n";
    
    demonstrate_version_comparison();
    demonstrate_comparison_categories();
    demonstrate_financial_instruments();
    
    // === SortedVector Demo ===
    std::cout << "\\n=== SortedVector with Spaceship ===\\n";
    
    SortedVector<int> sv1;
    sv1.insert(5);
    sv1.insert(2);
    sv1.insert(8);
    sv1.insert(1);
    
    SortedVector<int> sv2;
    sv2.insert(5);
    sv2.insert(2);
    sv2.insert(8);
    
    std::cout << "sv1 contents: ";
    for (const auto& val : sv1) {
        std::cout << val << " ";
    }
    std::cout << "\\n";
    
    std::cout << "sv2 contents: ";
    for (const auto& val : sv2) {
        std::cout << val << " ";
    }
    std::cout << "\\n";
    
    std::cout << "sv1 == sv2: " << (sv1 == sv2) << "\\n";
    std::cout << "sv1 > sv2: " << (sv1 > sv2) << "\\n";
    std::cout << "sv1 < sv2: " << (sv1 < sv2) << "\\n";
    
    std::cout << "\\n=== Spaceship Operator Benefits ===\\n";
    std::cout << "✓ Single operator generates all six comparisons\\n";
    std::cout << "✓ Consistent and efficient comparison semantics\\n";
    std::cout << "✓ Automatic support for standard algorithms\\n";
    std::cout << "✓ Clear intent with comparison categories\\n";
    std::cout << "✓ Compiler-optimized implementations\\n";
    std::cout << "✓ Reduced boilerplate code\\n";
    std::cout << "✓ Better support for generic programming\\n";
    
    return 0;
}`,
    explanation: `The three-way comparison operator <=> (spaceship operator) returns a comparison category indicating the relationship between two objects. It automatically generates all six comparison operators (==, !=, <, <=, >, >=) from a single definition. The operator returns one of three ordering types: strong_ordering (total order), weak_ordering (equivalent but not equal elements allowed), or partial_ordering (some elements may be incomparable). This provides consistent, efficient, and expressive comparison semantics.`,
    useCase: `Essential for creating comparable types in modern C++, financial instruments with complex ordering criteria, version numbers, container classes, and any type that needs comprehensive comparison support. Perfect for use with standard algorithms, container sorting, and generic programming where consistent comparison semantics are crucial.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/operator_comparison'
  },

  // === DIGIT SEPARATORS & BINARY LITERALS ===
  {
    id: 'digit-separators-binary-literals',
    title: 'Digit Separators & Binary Literals',
    standard: 'cpp14',
    description: 'Improve numeric literal readability with digit separators and support binary literals for bit manipulation and embedded programming.',
    codeExample: `#include <iostream>
#include <bitset>
#include <iomanip>
#include <string>
#include <cstdint>

// === DIGIT SEPARATORS FOR READABILITY ===

namespace FinancialConstants {
    // Large financial amounts with separators
    constexpr long long ONE_MILLION = 1'000'000;
    constexpr long long ONE_BILLION = 1'000'000'000;
    constexpr long long ONE_TRILLION = 1'000'000'000'000;
    
    // Trading limits
    constexpr int MAX_ORDER_SIZE = 100'000;
    constexpr double HIGH_FREQUENCY_THRESHOLD = 1'000'000.50;
    
    // Interest rates with precision
    constexpr double LIBOR_RATE = 0.025'75;  // 2.5775%
    constexpr double FEDERAL_RATE = 0.050'00;  // 5.00%
    
    // Large portfolio values
    constexpr double PORTFOLIO_VALUE = 450'000'000.00;  // $450M
    constexpr double RISK_LIMIT = 25'000'000.00;        // $25M
}

namespace SystemConstants {
    // Memory sizes
    constexpr size_t CACHE_SIZE = 64'000'000;      // 64 MB
    constexpr size_t BUFFER_SIZE = 8'192;          // 8 KB
    constexpr size_t MAX_FILE_SIZE = 2'147'483'648; // 2 GB
    
    // Network parameters
    constexpr int DEFAULT_PORT = 8'080;
    constexpr int MAX_CONNECTIONS = 10'000;
    constexpr double TIMEOUT_SECONDS = 30.0;
    
    // Performance thresholds
    constexpr long long OPERATIONS_PER_SECOND = 1'000'000;
    constexpr double LATENCY_THRESHOLD_MS = 0.1;  // 100 microseconds
}

// === BINARY LITERALS FOR BIT MANIPULATION ===

namespace BitOperations {
    // Permission flags using binary literals
    constexpr uint32_t READ_PERMISSION     = 0b0000'0001;
    constexpr uint32_t WRITE_PERMISSION    = 0b0000'0010;
    constexpr uint32_t EXECUTE_PERMISSION  = 0b0000'0100;
    constexpr uint32_t ADMIN_PERMISSION    = 0b0000'1000;
    constexpr uint32_t SUPER_PERMISSION    = 0b0001'0000;
    
    // Network protocol flags
    constexpr uint8_t TCP_FLAG_FIN = 0b0000'0001;
    constexpr uint8_t TCP_FLAG_SYN = 0b0000'0010;
    constexpr uint8_t TCP_FLAG_RST = 0b0000'0100;
    constexpr uint8_t TCP_FLAG_PSH = 0b0000'1000;
    constexpr uint8_t TCP_FLAG_ACK = 0b0001'0000;
    constexpr uint8_t TCP_FLAG_URG = 0b0010'0000;
    
    // Color values (RGB)
    constexpr uint32_t COLOR_RED   = 0b1111'1111'0000'0000'0000'0000;
    constexpr uint32_t COLOR_GREEN = 0b0000'0000'1111'1111'0000'0000;
    constexpr uint32_t COLOR_BLUE  = 0b0000'0000'0000'0000'1111'1111;
    constexpr uint32_t COLOR_WHITE = 0b1111'1111'1111'1111'1111'1111;
    
    // Bit masks for data extraction
    constexpr uint32_t LOWER_16_BITS = 0b0000'0000'0000'0000'1111'1111'1111'1111;
    constexpr uint32_t UPPER_16_BITS = 0b1111'1111'1111'1111'0000'0000'0000'0000;
    constexpr uint8_t  LOWER_4_BITS  = 0b0000'1111;
    constexpr uint8_t  UPPER_4_BITS  = 0b1111'0000;
}

// === FINANCIAL BIT FLAGS ===

enum class OrderFlags : uint32_t {
    NONE            = 0b0000'0000,
    MARKET_ORDER    = 0b0000'0001,
    LIMIT_ORDER     = 0b0000'0010,
    STOP_ORDER      = 0b0000'0100,
    HIDDEN_ORDER    = 0b0000'1000,
    ICEBERG_ORDER   = 0b0001'0000,
    IOC_ORDER       = 0b0010'0000,  // Immediate or Cancel
    FOK_ORDER       = 0b0100'0000,  // Fill or Kill
    POST_ONLY       = 0b1000'0000,
    
    // Combinations
    COMPLEX_ORDER   = LIMIT_ORDER | STOP_ORDER,
    ADVANCED_ORDER  = HIDDEN_ORDER | ICEBERG_ORDER
};

// Bitwise operators for enum class
constexpr OrderFlags operator|(OrderFlags a, OrderFlags b) {
    return static_cast<OrderFlags>(static_cast<uint32_t>(a) | static_cast<uint32_t>(b));
}

constexpr OrderFlags operator&(OrderFlags a, OrderFlags b) {
    return static_cast<OrderFlags>(static_cast<uint32_t>(a) & static_cast<uint32_t>(b));
}

constexpr bool has_flag(OrderFlags flags, OrderFlags flag) {
    return (flags & flag) == flag;
}

// === EMBEDDED SYSTEM REGISTER CONFIGURATION ===

struct RegisterConfig {
    // Using binary literals for hardware register values
    static constexpr uint32_t SYSTEM_CONTROL = 0b1010'0000'0000'0001'1111'0000'0000'0000;
    
    // Timer configuration
    static constexpr uint16_t TIMER_ENABLE    = 0b1000'0000'0000'0000;
    static constexpr uint16_t TIMER_INTERRUPT = 0b0100'0000'0000'0000;
    static constexpr uint16_t TIMER_PRESCALER = 0b0000'1111'0000'0000;
    
    // GPIO pin configurations
    static constexpr uint8_t GPIO_INPUT       = 0b00;
    static constexpr uint8_t GPIO_OUTPUT      = 0b01;
    static constexpr uint8_t GPIO_ALTERNATE   = 0b10;
    static constexpr uint8_t GPIO_ANALOG      = 0b11;
    
    // SPI configuration
    static constexpr uint32_t SPI_MASTER      = 0b0000'0000'0000'0000'0000'0010'0000'0000;
    static constexpr uint32_t SPI_SLAVE       = 0b0000'0000'0000'0000'0000'0000'0000'0000;
    static constexpr uint32_t SPI_8BIT        = 0b0000'0000'0000'0000'0000'0000'0000'0000;
    static constexpr uint32_t SPI_16BIT       = 0b0000'0000'0000'0000'0000'1000'0000'0000;
};

// === BIT MANIPULATION UTILITIES ===

class BitManipulator {
public:
    template<typename T>
    static void print_binary(T value, const std::string& label = "") {
        if (!label.empty()) {
            std::cout << label << ": ";
        }
        
        std::cout << "0b";
        for (int i = sizeof(T) * 8 - 1; i >= 0; --i) {
            if (i < sizeof(T) * 8 - 1 && (i + 1) % 4 == 0) {
                std::cout << "'";
            }
            std::cout << ((value >> i) & 1);
        }
        
        std::cout << " (decimal: " << static_cast<uint64_t>(value) << ")\\n";
    }
    
    template<typename T>
    static T set_bit(T value, int bit_position) {
        return value | (T(1) << bit_position);
    }
    
    template<typename T>
    static T clear_bit(T value, int bit_position) {
        return value & ~(T(1) << bit_position);
    }
    
    template<typename T>
    static T toggle_bit(T value, int bit_position) {
        return value ^ (T(1) << bit_position);
    }
    
    template<typename T>
    static bool test_bit(T value, int bit_position) {
        return (value & (T(1) << bit_position)) != 0;
    }
    
    template<typename T>
    static T extract_bits(T value, int start_bit, int num_bits) {
        T mask = (T(1) << num_bits) - 1;  // Create mask with num_bits set
        return (value >> start_bit) & mask;
    }
};

// === NETWORK PACKET STRUCTURE ===

struct NetworkPacket {
    // Header with bit fields
    uint16_t version : 4;       // 4 bits for version
    uint16_t type : 4;          // 4 bits for packet type
    uint16_t flags : 8;         // 8 bits for flags
    
    uint32_t sequence_number;   // 32-bit sequence number
    uint16_t data_length;       // 16-bit data length
    uint16_t checksum;          // 16-bit checksum
    
    // Flag constants using binary literals
    static constexpr uint8_t FLAG_COMPRESSED  = 0b0000'0001;
    static constexpr uint8_t FLAG_ENCRYPTED   = 0b0000'0010;
    static constexpr uint8_t FLAG_PRIORITY    = 0b0000'0100;
    static constexpr uint8_t FLAG_FRAGMENTED  = 0b0000'1000;
    static constexpr uint8_t FLAG_LAST_FRAGMENT = 0b0001'0000;
    
    bool has_flag(uint8_t flag) const {
        return (flags & flag) != 0;
    }
    
    void set_flag(uint8_t flag) {
        flags |= flag;
    }
    
    void clear_flag(uint8_t flag) {
        flags &= ~flag;
    }
    
    void print() const {
        std::cout << "Network Packet:\\n";
        std::cout << "  Version: " << version << "\\n";
        std::cout << "  Type: " << type << "\\n";
        std::cout << "  Sequence: " << sequence_number << "\\n";
        std::cout << "  Data Length: " << data_length << " bytes\\n";
        std::cout << "  Flags: ";
        BitManipulator::print_binary(flags, "");
        std::cout << "    Compressed: " << (has_flag(FLAG_COMPRESSED) ? "Yes" : "No") << "\\n";
        std::cout << "    Encrypted: " << (has_flag(FLAG_ENCRYPTED) ? "Yes" : "No") << "\\n";
        std::cout << "    Priority: " << (has_flag(FLAG_PRIORITY) ? "Yes" : "No") << "\\n";
    }
};

int main() {
    std::cout << "=== Digit Separators & Binary Literals Demo ===\\n\\n";
    
    // === Financial Constants with Separators ===
    std::cout << "=== Financial Constants with Digit Separators ===\\n";
    std::cout << "One Million: " << FinancialConstants::ONE_MILLION << "\\n";
    std::cout << "One Billion: " << FinancialConstants::ONE_BILLION << "\\n";
    std::cout << "One Trillion: " << FinancialConstants::ONE_TRILLION << "\\n";
    std::cout << "Max Order Size: " << FinancialConstants::MAX_ORDER_SIZE << "\\n";
    std::cout << "Portfolio Value: $" << std::fixed << std::setprecision(2) 
              << FinancialConstants::PORTFOLIO_VALUE << "\\n";
    std::cout << "Risk Limit: $" << FinancialConstants::RISK_LIMIT << "\\n\\n";
    
    // === System Constants ===
    std::cout << "=== System Constants ===\\n";
    std::cout << "Cache Size: " << SystemConstants::CACHE_SIZE / 1'000'000 << " MB\\n";
    std::cout << "Buffer Size: " << SystemConstants::BUFFER_SIZE << " bytes\\n";
    std::cout << "Max File Size: " << SystemConstants::MAX_FILE_SIZE / 1'000'000'000 << " GB\\n";
    std::cout << "Operations/Second: " << SystemConstants::OPERATIONS_PER_SECOND << "\\n\\n";
    
    // === Binary Literals and Bit Operations ===
    std::cout << "=== Binary Literals and Bit Operations ===\\n";
    
    // Permission system
    uint32_t user_permissions = BitOperations::READ_PERMISSION | 
                               BitOperations::WRITE_PERMISSION;
    
    BitManipulator::print_binary(BitOperations::READ_PERMISSION, "Read Permission");
    BitManipulator::print_binary(BitOperations::WRITE_PERMISSION, "Write Permission");
    BitManipulator::print_binary(user_permissions, "User Permissions");
    
    std::cout << "\\nTCP Flags:\\n";
    BitManipulator::print_binary(BitOperations::TCP_FLAG_SYN, "SYN Flag");
    BitManipulator::print_binary(BitOperations::TCP_FLAG_ACK, "ACK Flag");
    
    uint8_t tcp_handshake = BitOperations::TCP_FLAG_SYN | BitOperations::TCP_FLAG_ACK;
    BitManipulator::print_binary(tcp_handshake, "SYN+ACK");
    
    // === Order Flags ===
    std::cout << "\\n=== Financial Order Flags ===\\n";
    
    OrderFlags simple_order = OrderFlags::LIMIT_ORDER;
    OrderFlags complex_order = OrderFlags::LIMIT_ORDER | OrderFlags::HIDDEN_ORDER | OrderFlags::IOC_ORDER;
    
    std::cout << "Simple limit order has LIMIT_ORDER flag: " 
              << has_flag(simple_order, OrderFlags::LIMIT_ORDER) << "\\n";
    std::cout << "Complex order has HIDDEN_ORDER flag: " 
              << has_flag(complex_order, OrderFlags::HIDDEN_ORDER) << "\\n";
    std::cout << "Complex order has MARKET_ORDER flag: " 
              << has_flag(complex_order, OrderFlags::MARKET_ORDER) << "\\n";
    
    // === Bit Manipulation ===
    std::cout << "\\n=== Bit Manipulation Examples ===\\n";
    
    uint32_t register_value = 0b1010'1100'0000'1111;
    BitManipulator::print_binary(register_value, "Original");
    
    // Set bit 3
    register_value = BitManipulator::set_bit(register_value, 3);
    BitManipulator::print_binary(register_value, "After setting bit 3");
    
    // Clear bit 15
    register_value = BitManipulator::clear_bit(register_value, 15);
    BitManipulator::print_binary(register_value, "After clearing bit 15");
    
    // Toggle bit 8
    register_value = BitManipulator::toggle_bit(register_value, 8);
    BitManipulator::print_binary(register_value, "After toggling bit 8");
    
    // Extract bits 4-7 (4 bits starting from position 4)
    uint32_t extracted = BitManipulator::extract_bits(register_value, 4, 4);
    BitManipulator::print_binary(extracted, "Extracted bits 4-7");
    
    // === Network Packet Example ===
    std::cout << "\\n=== Network Packet with Bit Fields ===\\n";
    
    NetworkPacket packet;
    packet.version = 4;
    packet.type = 2;
    packet.flags = NetworkPacket::FLAG_COMPRESSED | NetworkPacket::FLAG_PRIORITY;
    packet.sequence_number = 12345;
    packet.data_length = 1500;
    packet.checksum = 0xABCD;
    
    packet.print();
    
    std::cout << "\\n=== Color Values ===\\n";
    BitManipulator::print_binary(BitOperations::COLOR_RED, "Red (RGB)");
    BitManipulator::print_binary(BitOperations::COLOR_GREEN, "Green (RGB)");
    BitManipulator::print_binary(BitOperations::COLOR_BLUE, "Blue (RGB)");
    BitManipulator::print_binary(BitOperations::COLOR_WHITE, "White (RGB)");
    
    std::cout << "\\n=== Benefits of Digit Separators & Binary Literals ===\\n";
    std::cout << "✓ Improved readability of large numbers\\n";
    std::cout << "✓ Reduced errors in numeric constants\\n";
    std::cout << "✓ Clear bit pattern visualization\\n";
    std::cout << "✓ Better embedded programming support\\n";
    std::cout << "✓ Easier financial calculation constants\\n";
    std::cout << "✓ More maintainable bit manipulation code\\n";
    std::cout << "✓ Enhanced protocol and register definitions\\n";
    
    return 0;
}`,
    explanation: `Digit separators (apostrophes) in numeric literals improve readability by allowing visual grouping of digits, especially useful for large financial amounts, memory sizes, and bit patterns. Binary literals (0b prefix) enable direct specification of bit patterns, making embedded programming, protocol definitions, and bit manipulation more intuitive. These features make code more maintainable and reduce errors in numeric constants.`,
    useCase: `Essential for financial applications with large monetary values, embedded systems programming with register configurations, network protocol implementations, bit manipulation libraries, and any code dealing with large numeric constants. Perfect for hardware abstraction layers, cryptographic implementations, and systems where bit-level operations are common.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/integer_literal'
  },

  // === INLINE VARIABLES (C++17) ===
  {
    id: 'inline-variables',
    title: 'Inline Variables',
    standard: 'cpp17',
    description: 'Define variables in header files without ODR violations, enabling header-only libraries with static data members and global constants.',
    codeExample: `#include <iostream>
#include <string>
#include <vector>
#include <atomic>
#include <chrono>

// === HEADER-ONLY LIBRARY PATTERN ===

// Before C++17: Had to use functions to avoid ODR violations
// const std::string& get_app_name() {
//     static const std::string name = "MyApp";
//     return name;
// }

// C++17: Direct inline variable definition
inline const std::string APP_NAME = "Modern C++ App";
inline const std::string APP_VERSION = "2.1.0";
inline const int APP_BUILD_NUMBER = 42;

// Mathematical constants
inline constexpr double PI = 3.141592653589793238462643383279;
inline constexpr double E = 2.718281828459045235360287471352;
inline constexpr double GOLDEN_RATIO = 1.618033988749894848204586834365;

// === FINANCIAL CONSTANTS ===

namespace Finance {
    // Market constants
    inline const double TRADING_FEE_PERCENTAGE = 0.0025;  // 0.25%
    inline const int TRADING_DAY_HOURS = 6.5 * 60 * 60;   // 6.5 hours in seconds
    inline const std::string DEFAULT_CURRENCY = "USD";
    
    // Risk management
    inline constexpr double MAX_POSITION_RISK = 0.02;     // 2% max risk per position
    inline constexpr double PORTFOLIO_VAR_LIMIT = 0.05;   // 5% VaR limit
    inline constexpr int MAX_LEVERAGE = 10;
    
    // Market data
    inline const std::vector<std::string> MAJOR_CURRENCIES = {
        "USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "NZD"
    };
    
    inline const std::vector<std::string> STOCK_EXCHANGES = {
        "NYSE", "NASDAQ", "LSE", "TSE", "HKSE", "SSE", "BSE"
    };
}

// === CONFIGURATION SYSTEM ===

class Config {
public:
    // Network configuration
    inline static const std::string DEFAULT_HOST = "localhost";
    inline static const int DEFAULT_PORT = 8080;
    inline static const int MAX_CONNECTIONS = 10000;
    inline static const double CONNECTION_TIMEOUT = 30.0;
    
    // Performance settings
    inline static const size_t BUFFER_SIZE = 64 * 1024;        // 64KB
    inline static const size_t MAX_MESSAGE_SIZE = 10 * 1024 * 1024; // 10MB
    inline static const int THREAD_POOL_SIZE = 8;
    
    // Logging configuration
    inline static const std::string LOG_LEVEL = "INFO";
    inline static const size_t MAX_LOG_FILE_SIZE = 100 * 1024 * 1024; // 100MB
    inline static const int LOG_ROTATION_COUNT = 5;
    
    // Cache settings
    inline static const size_t CACHE_SIZE = 256 * 1024 * 1024;  // 256MB
    inline static const double CACHE_EXPIRY_HOURS = 24.0;
    inline static const int CACHE_CLEANUP_INTERVAL_MINUTES = 30;
    
    // Database settings
    inline static const std::string DB_CONNECTION_STRING = 
        "postgresql://localhost:5432/app_db";
    inline static const int DB_CONNECTION_POOL_SIZE = 20;
    inline static const double DB_QUERY_TIMEOUT = 10.0;
    
    // Feature flags
    inline static const bool ENABLE_COMPRESSION = true;
    inline static const bool ENABLE_ENCRYPTION = true;
    inline static const bool ENABLE_METRICS = true;
    inline static const bool DEBUG_MODE = false;
};

// === STATISTICS TRACKING ===

class Stats {
public:
    inline static std::atomic<uint64_t> requests_processed{0};
    inline static std::atomic<uint64_t> bytes_transferred{0};
    inline static std::atomic<uint64_t> errors_encountered{0};
    inline static std::atomic<uint64_t> cache_hits{0};
    inline static std::atomic<uint64_t> cache_misses{0};
    
    // Version information
    inline static const std::string BUILD_DATE = __DATE__;
    inline static const std::string BUILD_TIME = __TIME__;
    inline static const std::string COMPILER_VERSION = 
#ifdef __GNUC__
        "GCC " + std::to_string(__GNUC__) + "." + std::to_string(__GNUC_MINOR__);
#elif defined(_MSC_VER)
        "MSVC " + std::to_string(_MSC_VER);
#elif defined(__clang__)
        "Clang " + std::to_string(__clang_major__) + "." + std::to_string(__clang_minor__);
#else
        "Unknown";
#endif
    
    static void increment_requests() { requests_processed++; }
    static void add_bytes(uint64_t bytes) { bytes_transferred += bytes; }
    static void increment_errors() { errors_encountered++; }
    static void increment_cache_hits() { cache_hits++; }
    static void increment_cache_misses() { cache_misses++; }
    
    static void print_stats() {
        std::cout << "=== Application Statistics ===\\n";
        std::cout << "Requests processed: " << requests_processed.load() << "\\n";
        std::cout << "Bytes transferred: " << bytes_transferred.load() << "\\n";
        std::cout << "Errors encountered: " << errors_encountered.load() << "\\n";
        std::cout << "Cache hit rate: " << calculate_hit_rate() << "%\\n";
        std::cout << "Build info: " << BUILD_DATE << " " << BUILD_TIME << "\\n";
        std::cout << "Compiler: " << COMPILER_VERSION << "\\n";
    }
    
    static double calculate_hit_rate() {
        uint64_t hits = cache_hits.load();
        uint64_t misses = cache_misses.load();
        uint64_t total = hits + misses;
        return total > 0 ? (double(hits) / total) * 100.0 : 0.0;
    }
};

// === REGISTRY PATTERN ===

template<typename T>
class Registry {
public:
    inline static std::vector<T*> instances_;
    inline static std::atomic<size_t> next_id_{0};
    
    static size_t register_instance(T* instance) {
        instances_.push_back(instance);
        return next_id_++;
    }
    
    static void unregister_instance(T* instance) {
        instances_.erase(
            std::remove(instances_.begin(), instances_.end(), instance),
            instances_.end()
        );
    }
    
    static const std::vector<T*>& get_instances() {
        return instances_;
    }
    
    static size_t count() {
        return instances_.size();
    }
};

// Example usage with a service class
class LoggingService {
private:
    std::string service_name_;
    size_t service_id_;
    
public:
    LoggingService(const std::string& name) 
        : service_name_(name) {
        service_id_ = Registry<LoggingService>::register_instance(this);
        std::cout << "LoggingService '" << service_name_ << "' registered with ID " 
                  << service_id_ << "\\n";
    }
    
    ~LoggingService() {
        Registry<LoggingService>::unregister_instance(this);
        std::cout << "LoggingService '" << service_name_ << "' unregistered\\n";
    }
    
    void log(const std::string& message) {
        std::cout << "[" << service_name_ << ":" << service_id_ << "] " << message << "\\n";
    }
    
    const std::string& name() const { return service_name_; }
    size_t id() const { return service_id_; }
};

// === COMPILE-TIME STRING CONSTANTS ===

namespace StringConstants {
    // Error messages
    inline constexpr const char* ERROR_INVALID_INPUT = "Invalid input provided";
    inline constexpr const char* ERROR_NETWORK_TIMEOUT = "Network operation timed out";
    inline constexpr const char* ERROR_INSUFFICIENT_MEMORY = "Insufficient memory available";
    inline constexpr const char* ERROR_FILE_NOT_FOUND = "Requested file not found";
    inline constexpr const char* ERROR_PERMISSION_DENIED = "Permission denied";
    
    // Success messages
    inline constexpr const char* SUCCESS_OPERATION_COMPLETED = "Operation completed successfully";
    inline constexpr const char* SUCCESS_DATA_SAVED = "Data saved successfully";
    inline constexpr const char* SUCCESS_CONNECTION_ESTABLISHED = "Connection established";
    
    // Status messages
    inline constexpr const char* STATUS_INITIALIZING = "System initializing...";
    inline constexpr const char* STATUS_READY = "System ready";
    inline constexpr const char* STATUS_SHUTTING_DOWN = "System shutting down...";
    inline constexpr const char* STATUS_MAINTENANCE = "System under maintenance";
}

// === MARKET DATA CONSTANTS ===

namespace MarketData {
    // Trading session times (in minutes from midnight UTC)
    inline constexpr int NYSE_OPEN = 9 * 60 + 30;   // 9:30 AM EST
    inline constexpr int NYSE_CLOSE = 16 * 60;       // 4:00 PM EST
    inline constexpr int LSE_OPEN = 8 * 60;          // 8:00 AM GMT  
    inline constexpr int LSE_CLOSE = 16 * 60 + 30;   // 4:30 PM GMT
    inline constexpr int TSE_OPEN = 9 * 60;          // 9:00 AM JST
    inline constexpr int TSE_CLOSE = 15 * 60;        // 3:00 PM JST
    
    // Market holidays (simplified - normally from database)
    inline const std::vector<std::string> US_HOLIDAYS_2024 = {
        "2024-01-01", "2024-01-15", "2024-02-19", "2024-05-27",
        "2024-06-19", "2024-07-04", "2024-09-02", "2024-10-14",
        "2024-11-28", "2024-12-25"
    };
    
    // Tick sizes for different price ranges
    inline constexpr double TICK_SIZE_UNDER_1 = 0.0001;      // $0.0001
    inline constexpr double TICK_SIZE_1_TO_10 = 0.001;       // $0.001  
    inline constexpr double TICK_SIZE_OVER_10 = 0.01;        // $0.01
    
    // Circuit breaker levels
    inline constexpr double CIRCUIT_BREAKER_LEVEL_1 = 0.07;  // 7%
    inline constexpr double CIRCUIT_BREAKER_LEVEL_2 = 0.13;  // 13%
    inline constexpr double CIRCUIT_BREAKER_LEVEL_3 = 0.20;  // 20%
}

// === PERFORMANCE BENCHMARKING ===

class Benchmark {
public:
    inline static std::vector<std::pair<std::string, double>> results_;
    
    template<typename Func>
    static double time_function(const std::string& name, Func&& func, int iterations = 1000) {
        auto start = std::chrono::high_resolution_clock::now();
        
        for (int i = 0; i < iterations; ++i) {
            func();
        }
        
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
        
        double avg_time = duration.count() / double(iterations);
        results_.emplace_back(name, avg_time);
        
        return avg_time;
    }
    
    static void print_results() {
        std::cout << "\\n=== Benchmark Results ===\\n";
        for (const auto& [name, time] : results_) {
            std::cout << name << ": " << time << " μs\\n";
        }
    }
    
    static void clear_results() {
        results_.clear();
    }
};

int main() {
    std::cout << "=== Inline Variables Demo ===\\n\\n";
    
    // === Basic Usage ===
    std::cout << "=== Application Constants ===\\n";
    std::cout << "App Name: " << APP_NAME << "\\n";
    std::cout << "Version: " << APP_VERSION << "\\n";
    std::cout << "Build: " << APP_BUILD_NUMBER << "\\n";
    std::cout << "PI: " << PI << "\\n";
    std::cout << "Golden Ratio: " << GOLDEN_RATIO << "\\n\\n";
    
    // === Configuration ===
    std::cout << "=== Configuration Settings ===\\n";
    std::cout << "Default Host: " << Config::DEFAULT_HOST << "\\n";
    std::cout << "Default Port: " << Config::DEFAULT_PORT << "\\n";
    std::cout << "Buffer Size: " << Config::BUFFER_SIZE / 1024 << " KB\\n";
    std::cout << "Thread Pool Size: " << Config::THREAD_POOL_SIZE << "\\n";
    std::cout << "Compression Enabled: " << (Config::ENABLE_COMPRESSION ? "Yes" : "No") << "\\n\\n";
    
    // === Financial Constants ===
    std::cout << "=== Financial Constants ===\\n";
    std::cout << "Trading Fee: " << Finance::TRADING_FEE_PERCENTAGE * 100 << "%\\n";
    std::cout << "Max Position Risk: " << Finance::MAX_POSITION_RISK * 100 << "%\\n";
    std::cout << "Default Currency: " << Finance::DEFAULT_CURRENCY << "\\n";
    std::cout << "Major Currencies: ";
    for (size_t i = 0; i < Finance::MAJOR_CURRENCIES.size(); ++i) {
        if (i > 0) std::cout << ", ";
        std::cout << Finance::MAJOR_CURRENCIES[i];
    }
    std::cout << "\\n\\n";
    
    // === Statistics Tracking ===
    std::cout << "=== Statistics Tracking ===\\n";
    
    // Simulate some activity
    for (int i = 0; i < 100; ++i) {
        Stats::increment_requests();
        Stats::add_bytes(1024 * (i + 1));
        if (i % 10 == 0) Stats::increment_errors();
        if (i % 3 == 0) Stats::increment_cache_hits();
        else Stats::increment_cache_misses();
    }
    
    Stats::print_stats();
    std::cout << "\\n";
    
    // === Registry Pattern ===
    std::cout << "=== Registry Pattern ===\\n";
    
    {
        LoggingService service1("WebServer");
        LoggingService service2("Database");
        LoggingService service3("Cache");
        
        service1.log("Server started");
        service2.log("Connected to database");
        service3.log("Cache warmed up");
        
        std::cout << "Total registered services: " << Registry<LoggingService>::count() << "\\n";
        
        std::cout << "All services: ";
        for (const auto* service : Registry<LoggingService>::get_instances()) {
            std::cout << service->name() << " ";
        }
        std::cout << "\\n";
    } // Services go out of scope and unregister
    
    std::cout << "Services after scope exit: " << Registry<LoggingService>::count() << "\\n\\n";
    
    // === Market Data ===
    std::cout << "=== Market Data Constants ===\\n";
    std::cout << "NYSE Opens at: " << MarketData::NYSE_OPEN / 60 << ":" 
              << std::setfill('0') << std::setw(2) << MarketData::NYSE_OPEN % 60 << " EST\\n";
    std::cout << "NYSE Closes at: " << MarketData::NYSE_CLOSE / 60 << ":" 
              << std::setfill('0') << std::setw(2) << MarketData::NYSE_CLOSE % 60 << " EST\\n";
    std::cout << "Circuit Breaker Level 1: " << MarketData::CIRCUIT_BREAKER_LEVEL_1 * 100 << "%\\n";
    std::cout << "US Holidays in 2024: " << MarketData::US_HOLIDAYS_2024.size() << " days\\n\\n";
    
    // === Performance Benchmarking ===
    std::cout << "=== Performance Benchmarking ===\\n";
    
    // Benchmark different operations
    Benchmark::time_function("Vector push_back", []() {
        static std::vector<int> vec;
        vec.push_back(42);
    });
    
    Benchmark::time_function("String concatenation", []() {
        static std::string result;
        result += "test";
    });
    
    Benchmark::time_function("Math calculation", []() {
        volatile double result = std::sin(PI / 4) * std::cos(PI / 6);
    });
    
    Benchmark::print_results();
    
    std::cout << "\\n=== Inline Variables Benefits ===\\n";
    std::cout << "✓ Header-only library support\\n";
    std::cout << "✓ No ODR violations for global constants\\n";
    std::cout << "✓ Simplified static member initialization\\n";
    std::cout << "✓ Single definition across translation units\\n";
    std::cout << "✓ Template static member simplification\\n";
    std::cout << "✓ Cleaner configuration systems\\n";
    std::cout << "✓ Reduced boilerplate code\\n";
    
    return 0;
}`,
    explanation: `Inline variables in C++17 allow defining variables directly in header files without ODR (One Definition Rule) violations. This enables header-only libraries with global constants, simplifies static data member initialization in templates, and eliminates the need for .cpp files for simple constant definitions. The compiler ensures only one definition exists across all translation units while allowing the variable to be defined in headers.`,
    useCase: `Perfect for header-only libraries, configuration systems with global constants, template static members, mathematical constants, application-wide settings, and any scenario where you need global variables accessible from headers without linker errors. Essential for modern C++ library design and reducing compilation dependencies.`,
    referenceUrl: 'https://en.cppreference.com/w/cpp/language/inline'
  }
];