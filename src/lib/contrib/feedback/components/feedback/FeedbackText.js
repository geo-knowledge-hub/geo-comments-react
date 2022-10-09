/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CommentTextField } from '../../../../components';

export const FeedbackText = ({ fieldPath, editorConfig }) => (
  <CommentTextField fieldPath={fieldPath} editorConfig={editorConfig} />
);

FeedbackText.propTypes = {
  fieldPath: PropTypes.string,
  editorConfig: PropTypes.object,
};

FeedbackText.defaultProps = {
  fieldPath: 'content',
  editorConfig: {
    removePlugins: [
      'Image',
      'ImageCaption',
      'ImageStyle',
      'ImageToolbar',
      'ImageUpload',
      'MediaEmbed',
      'Table',
      'TableToolbar',
      'TableProperties',
      'TableCellProperties',
    ],
  },
};
