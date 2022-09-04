import { useState, useEffect } from 'react';
import { GlobalStyle } from 'GlobalStyle';
import { AppWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from '../components/Loader/Loader';
import { getImages } from 'services/api';

export const App = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [showModal, setShowModal] = useState('');

  const onFormSubmit = query => {
    setCurrentQuery(query);
    setImages([]);
    setCurrentPage(1);
    setStatus('idle');
  };

  useEffect(() => {
    if (!currentQuery) return;

    async function getPhoto() {
      try {
        setStatus('pending');
        const { hits, totalHits } = await getImages(currentQuery, currentPage);

        if (totalHits === 0 || (hits.length === 0 && hits.totalHits > 0)) {
          setStatus('idle');
          return;
        }
        setStatus('resolved');
        setImages(state => [...state, ...hits]);
        setTotalHits(totalHits);
        return;
      } catch (error) {
        console.log(error);
        setStatus('rejected');
      }
    }

    getPhoto();
  }, [currentPage, currentQuery]);

  const onLoadMoreBtnClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const getImageURL = largeImageURL => {
    setImageURL(largeImageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <AppWrapper>
      <Searchbar handleSubmit={onFormSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={getImageURL} />
      )}
      {status === 'resolved' &&
        images.length % 12 === 0 &&
        totalHits.length !== 0 && (
          <Button text={'Load more'} onClick={onLoadMoreBtnClick} />
        )}
      {status === 'pending' && <Loader />}
      {showModal && <Modal onClose={closeModal} src={imageURL}></Modal>}

      <GlobalStyle />
    </AppWrapper>
  );
};
