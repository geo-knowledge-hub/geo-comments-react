/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useEffect } from 'react';

import { Button } from 'semantic-ui-react';

import { i18next } from '@translations/i18next';

/**
 * Cancel button action.
 *
 * @note Component adapted from Invenio Requests.
 */
export const CancelButton = React.forwardRef((props, ref) => {
  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return (
    <Button
      ref={ref}
      icon="cancel"
      content={i18next.t('Cancel')}
      size="mini"
      {...props}
    />
  );
});
