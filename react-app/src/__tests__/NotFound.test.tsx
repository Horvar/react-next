import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '../pages/404';

const mockRouterPush = jest.fn();

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    mockRouterPush.mockClear();
  });

  it('should render NotFoundPage component', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Return' })).toBeInTheDocument();
  });

  it('should navigate to home page on button click', () => {
    render(<NotFoundPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Return' }));
    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });
});
