type TestCase = {
  input: any;
  expected: any;
};

type TestResult = {
  success: boolean;
  output?: any;
  expected?: any;
  error?: string;
  executionTime?: number;
};

type WorkerMessage = {
  code: string;
  testCase: TestCase;
  timeLimit: number;
};

self.addEventListener('message', async (e: MessageEvent<WorkerMessage>) => {
  const { code, testCase, timeLimit } = e.data;

  const startTime = performance.now();

  try {
    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Execution timeout')), timeLimit);
    });

    // Create evaluation promise
    const evaluationPromise = new Promise<TestResult>(resolve => {
      try {
        // Create safe evaluation context
        const context = {
          console: {
            log: (...args: any[]) => args.join(' '),
          },
        };

        // Wrap user code in a function
        const wrappedCode = `
          return (function() {
            ${code}
            return {
              runTest: function(input) {
                return linearSearch(input);
              }
            };
          })();
        `;

        const evaluator = new Function(...Object.keys(context), wrappedCode);
        const result = evaluator(...Object.values(context));
        const output = result.runTest(testCase.input);

        resolve({
          success: true,
          output,
          expected: testCase.expected,
          executionTime: performance.now() - startTime,
        });
      } catch (err) {
        resolve({
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error',
          executionTime: performance.now() - startTime,
        });
      }
    });

    // Race between timeout and evaluation
    const result = await Promise.race([evaluationPromise, timeoutPromise]);
    self.postMessage(result);
  } catch (err) {
    self.postMessage({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      executionTime: performance.now() - startTime,
    });
  }
});
