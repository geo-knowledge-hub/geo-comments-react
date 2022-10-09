/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Loader as UILoader, Dimmer, Segment } from 'semantic-ui-react';

/**
 * Loader component.
 *
 * @note Component adapted from Invenio Requests.
 */
export class Loader extends Component {
  render() {
    const { isLoading, children } = this.props;
    return (
      <>
        {isLoading ? (
          <Segment className="loader-container">
            <Dimmer active inverted>
              <UILoader active size="large" inline="centered" />
            </Dimmer>
          </Segment>
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>{children}</>
        )}
      </>
    );
  }
}
