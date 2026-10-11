/// <reference types="vite/client" />

declare module "gsap-trial/SplitText" {
  export class SplitText {
    constructor(target: unknown, vars?: Record<string, unknown>);
    chars: HTMLElement[];
    lines: HTMLElement[];
    words: HTMLElement[];
    revert(): void;
  }
}

declare module "gsap-trial/ScrollSmoother" {
  export class ScrollSmoother {
    static create(vars: Record<string, unknown>): ScrollSmoother;
    static get(): ScrollSmoother;
    static refresh(soft?: boolean): void;
    scrollTop(value?: number): number;
    paused(state?: boolean): boolean;
    scrollTo(target: unknown, smooth?: boolean, position?: string): void;
    kill(): void;
  }
}
