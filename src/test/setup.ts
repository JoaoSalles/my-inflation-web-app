import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';

expect.extend(matchers);

// Radix UI uses these internally; jsdom doesn't implement them
window.HTMLElement.prototype.hasPointerCapture = vi.fn()
window.HTMLElement.prototype.scrollIntoView = vi.fn()