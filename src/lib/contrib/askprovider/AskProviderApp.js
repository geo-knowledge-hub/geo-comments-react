/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

import { i18next } from '@translations/i18next';

import { configureStore } from './store';
import { AskProviderModal } from './components';
import { CommentsApiClient } from '../../resources';

/**
 * Ask Provider App
 */
export class AskProviderApp extends Component {
  constructor(props) {
    super(props);

    // Extracting parameters
    const {
      commentsApi,
      record,
      defaultQueryParams,
      userIsAuthenticated,
      buttonText,
    } = this.props;

    // Creating Comments API client
    const commentsApiClient = new CommentsApiClient(
      record.links.self,
      'comments'
    );

    const appConfig = {
      commentsApi: commentsApi || commentsApiClient,
      record,
      user: { userIsAuthenticated },
      refreshIntervalMs: 5000,
      defaultQueryParams,
    };

    this.state = {
      openCommentModal: false,
    };

    this.store = configureStore(appConfig);

    this.text = buttonText;
  }

  render() {
    return (
      <Provider store={this.store}>
        <Button
          onClick={() => {
            this.setState({ openCommentModal: true });
          }}
          basic
          fluid
          color={'grey'}
          animated={'fade'}
        >
          <Icon name={'comments outline'} size={'large'} />
          <b>{this.text}</b>
        </Button>
        <AskProviderModal
          onModalClose={() => {
            this.setState({ openCommentModal: false });
          }}
          isModalOpen={this.state.openCommentModal}
        />
      </Provider>
    );
  }
}

AskProviderApp.propTypes = {
  commentsApi: PropTypes.object,
  record: PropTypes.object,
  defaultQueryParams: PropTypes.object,
  userIsAuthenticated: PropTypes.object,
  buttonText: PropTypes.string,
};

AskProviderApp.defaultProps = {
  buttonText: i18next.t('Ask the provider'),
};
