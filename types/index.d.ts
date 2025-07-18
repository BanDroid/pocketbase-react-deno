export {};

declare global {
  interface Window extends EventTarget {
    /** Reference to the current window object */
    readonly window: Window & typeof globalThis;

    /** Reference to the current window object */
    readonly self: Window & typeof globalThis;
    locals: object & {
      title: string;
      status: number;
    };
  }
}
