'use client';

import { Editor, OnChange } from '@monaco-editor/react';

export default function CodeEditor({
  code,
  onChange,
}: {
  code: string;
  onChange: OnChange;
}) {
  return (
    <div className="flex-1">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={code}
        onChange={onChange}
        theme="vs-dark"
        width="100%"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'on',
        }}
      />
    </div>
  );
}
