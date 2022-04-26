/*
 * This file is part of GEO-Feedback-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Feedback-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { render } from '@testing-library/react';

test('Basic App test', () => {
  // ToDo: add tests for the components itself.
  const { getByText } = render(<h1>Geo Feedback React</h1>);

  expect(getByText('Geo Feedback React')).toBeInTheDocument();
});
