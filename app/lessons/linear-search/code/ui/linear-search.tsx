'use client';

import { useEffect, useState, useCallback } from 'react';
import { z } from 'zod';
import { mdiPlay } from '@mdi/js';
import Icon from '@mdi/react';

import CodeEditor from '@/app/ui/code/code-editor';

type TestCase = {
  input: any;
  expected: any;
};

type TestResult = {
  success: boolean;
  output?: any;
  expected?: any;
  error?: string;
  testNumber: number;
  passed: boolean;
  executionTime?: number;
};

const codeSchema = z
  .string()
  .min(1, 'Code must not be empty')
  .max(5000, 'Code must not exceed 5000 characters')
  .refine(
    code => code.includes('function linearSearch'),
    'Code must contain a function named linearSearch',
  );

export default function LinearSearch() {
  const defaultCode = `function linearSearch(arr, target) {
  // Write your code here
  // Return the index of the target element if found
  // Otherwise, return -1

}`;

  const [code, setCode] = useState(defaultCode);
  const [results, setResults] = useState<TestResult[]>([]);
  const [error, setError] = useState('');
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const testCases = [
    {
      input: [[1, 2, 3, 4, 5], 3],
      expected: 2,
    },
    {
      input: [[1, 2, 3, 4, 5], 6],
      expected: -1,
    },
    {
      input: [[], 0],
      expected: -1,
    },
    {
      input: [[1, 2, 3, 4, 5], 1],
      expected: 0,
    },
    {
      input: [[1, 2, 3, 4, 5], 5],
      expected: 4,
    },
    {
      input: [[1, 2, 3, 4, 5], 2],
      expected: 1,
    },
    {
      input: [[1, 2, 3, 4, 5], 4],
      expected: 3,
    },
  ];

  useEffect(() => {
    const newWorker = new Worker(new URL('./worker.ts', import.meta.url));
    setWorker(newWorker);

    return () => newWorker.terminate();
  }, []);

  const validateInputs = useCallback(() => {
    try {
      const parsedCode = codeSchema.parse(code);
      return parsedCode;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors.map(e => e.message).join('\n'));
      }
      throw error;
    }
  }, [code]);

  const runTests = async () => {
    if (!worker) return;

    setError('');
    setIsRunning(true);

    try {
      const parsedCode = validateInputs();
      const results: TestResult[] = [];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        const result = await new Promise<TestResult>(resolve => {
          worker.onmessage = event => {
            const testResult = event.data;
            resolve({
              ...testResult,
              testNumber: i + 1,
              passed: testResult.output === testCase.expected,
            });
          };

          worker.postMessage({
            code: parsedCode,
            testCase,
            timeLimit: 1000,
          });
        });

        results.push(result);
      }
      setResults(results);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <button
        className="bg-midnight-purple hover:bg-purple-600 transition-colors duration-300 w-32 px-4 py-2 rounded-lg text-white font-semibold"
        onClick={runTests}
        disabled={isRunning}
      >
        <Icon path={mdiPlay} size={1} className="inline" />
        <span>{isRunning ? 'Running...' : 'Run'}</span>
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex w-10/12 gap-2 min-h-[400px] max-h-[450px] overflow-auto">
        <CodeEditor code={code} onChange={value => setCode(value ?? '')} />
        <ul className="flex flex-col gap-2 bg-gray-950 p-4 overflow-auto w-1/2 rounded">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded ${
                result.passed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              <div className="font-medium">
                Test {result.testNumber}: {result.passed ? 'PASSED' : 'FAILED'}
              </div>
              {result.success ? (
                <>
                  <div>Output: {JSON.stringify(result.output)}</div>
                  <div>Expected: {JSON.stringify(result.expected)}</div>
                  <div>
                    Execution time: {result.executionTime?.toFixed(2)}ms
                  </div>
                </>
              ) : (
                <div>Error: {result.error}</div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
