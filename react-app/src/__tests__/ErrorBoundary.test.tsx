import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

// Мокаем глобальную функцию перезагрузки страницы
Object.defineProperty(window, 'location', {
  value: { reload: jest.fn() },
});

describe('ErrorBoundary', () => {
  it('displays fallback UI when an error is caught', () => {
    const ProblemChild = () => {
      throw new Error('Error thrown from problem child');
    };
    const { getByText } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(getByText(/an error has occurred/i)).toBeInTheDocument();
  });

  it('calls window.location.reload when the button is clicked', () => {
    const ProblemChild = () => {
      throw new Error('Error thrown from problem child');
    };
    const { getByText } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    fireEvent.click(getByText(/reload/i));
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>No error here</div>
      </ErrorBoundary>
    );
    expect(getByText(/no error here/i)).toBeInTheDocument();
  });
});
