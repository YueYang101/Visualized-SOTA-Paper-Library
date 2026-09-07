export {};

declare global {
  interface Document {
    modelContext?: {
      registerTool(
        tool: {
          name: string;
          title?: string;
          description: string;
          inputSchema: Record<string, unknown>;
          execute(input: unknown): unknown;
          annotations?: {
            readOnlyHint?: boolean;
            untrustedContentHint?: boolean;
          };
        },
        options?: { signal?: AbortSignal },
      ): void | Promise<void>;
    };
  }
}
