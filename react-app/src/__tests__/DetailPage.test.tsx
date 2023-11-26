import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import DetailPage from '../components/DetailPage/DetailPage';
import { store } from '../store';
import { Person } from '../types';
import MockRouter from 'next-router-mock';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => MockRouter,
}));

describe('DetailPage Component', () => {
  const mockPerson: Person = {
    name: 'Luke Skywalker',
    gender: 'male',
    height: '172',
    mass: '77',
    url: 'https://swapi.dev/api/people/1/',
    skin_color: 'fair',
    eye_color: 'blue',
    hair_color: 'blond',
    id: '1',
  };

  const renderDetailPage = (person: Person) => {
    MockRouter.setCurrentUrl('/detail/1');

    return render(
      <Provider store={store}>
        <DetailPage personProp={person} onClose={() => {}} />
      </Provider>
    );
  };

  it('should display the details of a person', () => {
    renderDetailPage(mockPerson);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
  });
});
