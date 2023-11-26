import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setDetailsPageLoading } from '../../features/loading/loadingSlice';
import { RootState } from '../../store';
import styles from './Details.module.css';

import { Person } from '../../types';

const DetailPage = ({
  personProp,
  onClose,
}: {
  personProp: Person;
  onClose: () => void;
}) => {
  const router = useRouter();
  const { detailsId } = router.query;
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: RootState) => state.loading.detailsPageLoading
  );

  const [personState, setPersonState] = useState<Person | null>(null);

  const personToShow = personProp || personState;

  const closeDetails = () => {
    onClose?.();
  };

  useEffect(() => {
    if (personProp || !detailsId || Array.isArray(detailsId)) return;

    const fetchDetails = async () => {
      dispatch(setDetailsPageLoading(true));

      try {
        const response = await fetch(
          `https://swapi.dev/api/people/${detailsId}`
        );
        const data = await response.json();
        setPersonState(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        dispatch(setDetailsPageLoading(false));
      }
    };

    fetchDetails();
  }, [detailsId, personProp, dispatch]);

  if (isLoading) {
    return (
      <div className={styles.details}>
        <div className={styles.detailsOverlay} onClick={closeDetails}></div>
        <div className={styles.detailsModal}>
          <div className={styles.loader}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.details}>
      <>
        <div className={styles.detailsOverlay} onClick={closeDetails}></div>
        <div className={styles.detailsModal}>
          {personToShow ? (
            <>
              <button className={styles.detailsClose} onClick={onClose}>
                Close
              </button>
              <h2 className={styles.detailsTitle}>{personToShow.name}</h2>
              <div className={styles.detailsData}>
                <span>Gender: </span>
                <span>
                  <b>{personToShow.gender}</b>
                </span>
              </div>
              <div className={styles.detailsData}>
                <span>Height: </span>
                <span>
                  <b>{personToShow.height}</b>
                </span>
              </div>
              <div className={styles.detailsData}>
                <span>Mass: </span>
                <span>
                  <b>{personToShow.mass}</b>
                </span>
              </div>
              <div className={styles.detailsData}>
                <span>Hair color: </span>
                <span>
                  <b>{personToShow.hair_color}</b>
                </span>
              </div>
              <div className={styles.detailsData}>
                <span>Eye color: </span>
                <span>
                  <b>{personToShow.eye_color}</b>
                </span>
              </div>
              <div className={styles.detailsData}>
                <span>Skin color: </span>
                <span>
                  <b>{personToShow.skin_color}</b>
                </span>
              </div>
            </>
          ) : null}
        </div>
      </>
    </div>
  );
};

export default DetailPage;
