import * as fs from 'fs';
import * as path from 'path';
import { exercises } from './src/data/exercises';

const targetDir = '/Users/konstantinfrumkin/dev/prj/tst/cpp-practice-playground';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

let cmakeContent = `cmake_minimum_required(VERSION 3.20)
project(CppPracticePlayground)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

function(add_practice_target target_name)
    add_executable(\${target_name} \${target_name}/main.cpp)
    target_compile_options(\${target_name} PRIVATE $<$<CXX_COMPILER_ID:GNU,Clang,AppleClang>:-Wall -Wextra -Wpedantic>)
    target_compile_options(\${target_name} PRIVATE $<$<CXX_COMPILER_ID:MSVC>:/W4>)
endfunction()

`;

exercises.forEach(ex => {
    const dirPath = path.join(targetDir, ex.id);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    
    const mainCppPath = path.join(dirPath, 'main.cpp');
    fs.writeFileSync(mainCppPath, ex.starterCode || `#include <iostream>\n\n// ${ex.title}\n\nint main() {\n    std::cout << "Task: ${ex.id}\\n";\n    return 0;\n}\n`);
    
    cmakeContent += `add_practice_target(${ex.id})\n`;
});

fs.writeFileSync(path.join(targetDir, 'CMakeLists.txt'), cmakeContent);
console.log('Playground generated successfully!');
