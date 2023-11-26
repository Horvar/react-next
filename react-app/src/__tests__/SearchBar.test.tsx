import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  test('should render input element', () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/search/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('should allow typing in search input', () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText(
      /search/i
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Luke Skywalker' } });
    expect(inputElement.value).toBe('Luke Skywalker');
  });

  test('should trigger onSearch when search button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText(/search/i);
    const buttonElement = screen.getByRole('button', { name: /search/i });

    fireEvent.change(inputElement, { target: { value: 'Yoda' } });
    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledWith('Yoda');
  });

  test('should trigger onSearch with empty input when search button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const buttonElement = screen.getByRole('button', { name: /search/i });

    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
