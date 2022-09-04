// import PropTypes from 'prop-types';
import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  SearcHeader,
  SearchForm,
  SearchButton,
  SearchIcon,
  SearchLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ handleSubmit }) => {
  const [value, setValue] = useState('');

  const onFormChange = e => {
    const inputValue = e.currentTarget.value.trim();
    setValue(inputValue);
  };

  const onSearchSubmit = e => {
    e.preventDefault();
    handleSubmit(value);

    if (value === '') {
      Notify.warning('Input is still empty, please type something!', {
        width: '400px',
        fontSize: '20px',
        position: 'center-top',
        distance: '50px',
      });
      return;
    }
    setValue('');
  };

  return (
    <SearcHeader>
      <SearchForm onSubmit={onSearchSubmit}>
        <SearchButton type="submit">
          <SearchLabel>
            <SearchIcon />
          </SearchLabel>
        </SearchButton>

        <Input
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onFormChange}
          value={value}
        />
      </SearchForm>
    </SearcHeader>
  );
};
