import '@testing-library/jest-dom/extend-expect';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
 
declare global {
  namespace jest {
    interface Matchers<R = void> extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  }
} 