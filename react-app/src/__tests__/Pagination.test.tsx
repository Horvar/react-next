import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination Component Tests', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <Pagination total={50} currentPage={1} onPaginate={() => {}} />
    );
    expect(getByText('1')).toBeInTheDocument();
    // Другие проверки рендеринга...
  });

  it('correctly highlights the active page', () => {
    const currentPage = 3;
    const { getByText } = render(
      <Pagination total={50} currentPage={currentPage} onPaginate={() => {}} />
    );
    const activePageButton = getByText(currentPage.toString());
    expect(activePageButton).toHaveClass('active'); // Предполагается, что у активной кнопки есть класс 'active'
    // Другие проверки активной страницы...
  });

  it('calls onPaginate with correct page number', () => {
    const mockOnPaginate = jest.fn();
    const { getByText } = render(
      <Pagination total={50} currentPage={1} onPaginate={mockOnPaginate} />
    );
    const pageButton = getByText('2');
    fireEvent.click(pageButton);
    expect(mockOnPaginate).toHaveBeenCalledWith(2);
    // Другие проверки обработки событий...
  });

  // Дополнительные тесты для граничных условий, разных пропсов и snapshot-тестирования...
});
