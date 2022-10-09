/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Message } from 'semantic-ui-react';

import { i18next } from '@translations/i18next';

/**
 * Error component.
 *
 * @note Component adapted from Invenio Requests.
 */
export class Error extends Component {
  render() {
    const { children, error, errorInfo } = this.props;

    if (error) {
      return (
        <Message negative>
          <Message.Header>{i18next.t('Something went wrong.')}</Message.Header>
          <p>
            {error && error.toString()}
            <br />
            {errorInfo}
          </p>
        </Message>
      );
    }

    return children;
  }
}

Error.propTypes = {
  error: PropTypes.object,
  errorInfo: PropTypes.string,
  children: PropTypes.node,
};

Error.defaultProps = {
  error: null,
  children: null,
};
