import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from '../components/Results';

describe('Results Component', () => {
  it('should display person data correctly', () => {
    const mockData = [
      {
        name: 'Luke Skywalker',
        gender: 'male',
        height: '172',
        mass: '77',
        url: 'https://swapi.dev/api/people/1/',
        skin_color: 'fair',
        eye_color: 'blue',
        hair_color: 'blond',
        id: '1',
      },
    ];

    render(<Results data={mockData} onItemSelected={jest.fn()} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });
});
