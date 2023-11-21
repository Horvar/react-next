import React from 'react';
import styles from './Results.module.css';
import { useRouter } from 'next/router';

import { Person } from '../../types';

type ResultsProps = {
  data: Person[];
  onItemSelected: (person: Person) => void;
};

const Results: React.FC<ResultsProps> = ({ data, onItemSelected }) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;

  const handleItemClick = (person: Person) => {
    const personId = person.url.split('/').slice(-2, -1)[0];
    router.push(`/details/${personId}?page=${currentPage}`);
    onItemSelected(person);
  };

  if (data.length === 0) {
    return <div className={styles.resultsNotFound}>No cards available</div>;
  }

  return (
    <div className={styles.results}>
      {data.map((result: Person) => (
        <div
          className={styles.resultsItem}
          key={result.url}
          onClick={() => handleItemClick(result)}
          data-testid="result-item"
        >
          <h3 className={styles.resultsName}>{result.name}</h3>
          <p className={styles.resultsText}>
            <b>Gender: </b>
            {result.gender}
          </p>
          <p className={styles.resultsText}>
            <b>Height: </b>
            {result.height}
          </p>
          <p className={styles.resultsText}>
            <b>Mass: </b>
            {result.mass}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Results;
