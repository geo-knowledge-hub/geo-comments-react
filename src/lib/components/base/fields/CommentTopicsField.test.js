/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { renderWithFormikProvider } from '@tests/renders';

import { CommentTopicsField } from './CommentTopicsField';

describe('CommentTopicsField tests', () => {
  describe('Render tests', () => {
    it('should render with no props without crashing', () => {
      renderWithFormikProvider(<CommentTopicsField />);
    });

    it('should render with required props without crashing', () => {
      renderWithFormikProvider(
        <>
          <CommentTopicsField
            fieldPath={'test'}
            category={'testCategory'}
            labelIcon={'car'}
          />
        </>
      );
    });
  });
});
