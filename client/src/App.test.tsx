/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import App from './App';

declare global {
  namespace jest {
    interface Matchers<R = void> extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  }
}

// Mock the translations hook
jest.mock('@/hooks/use-translations', () => ({
  useTranslations: () => ({
    t: (key: string) => key,
    locale: 'en',
    setLocale: jest.fn(),
  }),
}));

// Mock the components
jest.mock('./pages/Landing');
jest.mock('./pages/Dashboard');
jest.mock('./components/Footer');

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders landing page when not logged in', async () => {
    await act(async () => {
      render(<App />);
    });
    const landingContent = screen.getByTestId('landing-page');
    expect(landingContent).toBeInTheDocument();
  });

  it('renders dashboard when logged in', async () => {
    // Mock localStorage
    localStorage.setItem('isLoggedIn', 'true');

    await act(async () => {
      render(<App />);
    });
    const dashboardContent = screen.getByTestId('dashboard');
    expect(dashboardContent).toBeInTheDocument();
  });
}); 