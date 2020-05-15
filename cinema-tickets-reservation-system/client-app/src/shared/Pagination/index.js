import React from 'react';
import './pagination.scss';

const PageBar = ({ currentPage, nextPage, goToPage }) => (
  <div className="page-bar__container">
    {
      (currentPage - 1 > 0)
        ? (
          <button
            className="page-bar__button button-prev"
            type="button"
            onClick={() => goToPage(currentPage - 1)}
          />
        )
        : <div className="button__placeholder" />
    }
    { currentPage && <p className="page-bar__number">Page: {currentPage}</p> }
    { nextPage
      ? (
        <button
          className="page-bar__button button-next"
          type="button"
          onClick={() => goToPage(nextPage)}
        />
      )
      : <div className="button__placeholder" />
    }
  </div>
);

export default PageBar;
