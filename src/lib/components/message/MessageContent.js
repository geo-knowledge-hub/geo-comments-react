/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

export const MessageContent = ({ content }) => {
  return <span dangerouslySetInnerHTML={{ __html: content }} />;
};

MessageContent.propTypes = {
  content: PropTypes.string,
};

MessageContent.defaultProps = {
  content: '',
};
