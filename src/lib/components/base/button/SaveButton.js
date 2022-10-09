/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { Button } from 'semantic-ui-react';

import { i18next } from '@translations/i18next';

/**
 * Save button action.
 *
 * @note Component adapted from Invenio Requests.
 */
export const SaveButton = (props) => (
  <Button
    icon="save"
    positive
    size="mini"
    content={i18next.t('Save')}
    {...props}
  />
);
