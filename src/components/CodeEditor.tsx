import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun?: () => void;
  readOnly?: boolean;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  readOnly = false,
  height = '400px'
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure C++ language
    monaco.languages.setMonarchTokensProvider('cpp', {
      keywords: [
        'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
        'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if',
        'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static',
        'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile',
        'while', 'class', 'private', 'protected', 'public', 'virtual', 'friend',
        'inline', 'template', 'typename', 'namespace', 'using', 'try', 'catch',
        'throw', 'new', 'delete', 'operator', 'this', 'true', 'false', 'nullptr',
        'constexpr', 'decltype', 'override', 'final', 'noexcept', 'thread_local',
        'alignas', 'alignof', 'static_assert', 'concept', 'requires', 'co_yield',
        'co_await', 'co_return', 'export', 'module', 'import'
      ],
      operators: [
        '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
        '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
        '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
        '%=', '<<=', '>>=', '>>>='
      ],
      tokenizer: {
        root: [
          [/[a-zA-Z_]\w*/, {
            cases: {
              '@keywords': 'keyword',
              '@default': 'identifier'
            }
          }],
          [/".*?"/, 'string'],
          [/'.*?'/, 'string'],
          [/\/\/.*$/, 'comment'],
          [/\/\*/, 'comment', '@comment'],
          [/\d+(\.\d+)?/, 'number']
        ],
        comment: [
          [/\*\//, 'comment', '@pop'],
          [/./, 'comment']
        ]
      }
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You might want to show a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const resetCode = () => {
    // This would reset to original starter code if provided
    // For now, we'll just clear the editor
    onChange('');
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-600 font-medium">C++ Editor</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
            title="Copy code"
          >
            <Copy className="h-4 w-4" />
          </button>
          {!readOnly && (
            <button
              onClick={resetCode}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
              title="Reset code"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
          {onRun && (
            <button
              onClick={onRun}
              className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>Run</span>
            </button>
          )}
        </div>
      </div>
      
      <Editor
        height={height}
        language="cpp"
        theme="vs-light"
        value={code}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineHeight: 20,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto'
          }
        }}
      />
    </div>
  );
};

export default CodeEditor;