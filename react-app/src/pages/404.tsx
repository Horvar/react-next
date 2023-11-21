import React from 'react';
import styles from './404.module.css';
import { useRouter } from 'next/router';

const NotFoundPage = () => {
  const router = useRouter();

  const handleReturnClick = () => {
    router.push('/');
  };

  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundWrapper}>
        <div className={styles.notFoundError}>404</div>
        <h1 className={styles.notFoundTitle}>Page Not Found</h1>
        <button onClick={handleReturnClick} className={styles.notFoundButton}>
          Return
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
