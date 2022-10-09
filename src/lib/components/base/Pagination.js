/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Pagination as PaginationComponent } from 'semantic-ui-react';

/**
 * Pagination component.
 *
 * @note Component adapted from Invenio Requests.
 */
export const Pagination = ({ size, page, totalLength, setPage }) => {
  const totalPages = Math.ceil(totalLength / size);

  const shouldShow = totalLength > size;

  return shouldShow ? (
    <PaginationComponent
      size={'mini'}
      totalPages={totalPages}
      activePage={page}
      onPageChange={(event, { activePage }) => setPage(activePage)}
    />
  ) : null;
};

Pagination.propTypes = {
  size: PropTypes.number,
  page: PropTypes.number,
  totalLength: PropTypes.number,
  setPage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  size: 1,
  page: 1,
  totalLength: 1,
};
