import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useFetchPeopleQuery } from '../features/api/apiSlice';
import { setSearchTerm, setCurrentPage } from '../features/search/searchSlice';
import { setMainPageLoading } from '../features/loading/loadingSlice';
import styles from './Search.module.css';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import Pagination from '../components/Pagination';
import { Person } from '../types';
import { RootState } from '../store';
import DetailPage from '../components/DetailPage/DetailPage';

const SearchPage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.search.currentPage
  );
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const { data, error, isLoading } = useFetchPeopleQuery({
    searchTerm,
    page: currentPage,
  });

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    dispatch(setMainPageLoading(isLoading));

    const urlSearchTerm =
      typeof router.query.search === 'string' ? router.query.search : '';
    const page =
      typeof router.query.page === 'string'
        ? parseInt(router.query.page, 10)
        : 1;

    if (urlSearchTerm !== searchTerm) {
      dispatch(setSearchTerm(urlSearchTerm));
    }
    if (page !== currentPage) {
      dispatch(setCurrentPage(page));
    }
  }, [router.query, searchTerm, currentPage, dispatch, isLoading]);

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
    router.push(`/?search=${term}&page=1`);
  };

  const handlePaginate = (page: number) => {
    dispatch(setCurrentPage(page));
    router.push(`/?search=${searchTerm}&page=${page}`);
  };

  const openDetails = (person: Person) => {
    setSelectedPerson(person);
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchPageRowSearch}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className={styles.searchPageRowSearch}>
          <div className={styles.error}>
            An error has occurred. Please try again later.
          </div>
        </div>
      )}

      <div className={styles.searchPageRowResult}>
        {isLoading ? (
          <div className={styles.loader}>Loading...</div>
        ) : (
          <Results data={data?.results || []} onItemSelected={openDetails} />
        )}
      </div>

      <div className={styles.searchPageRowControls}>
        <Pagination
          total={data?.count || 0}
          currentPage={currentPage}
          onPaginate={handlePaginate}
        />
      </div>

      {selectedPerson && (
        <DetailPage
          personProp={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </div>
  );
};

export default SearchPage;
