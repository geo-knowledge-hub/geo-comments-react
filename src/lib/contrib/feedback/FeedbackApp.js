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
import { FeedbackSpace } from './components';
import { CommentsApiClient } from '../../resources';

export class FeedbackApp extends Component {
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
      'feedback'
    );

    const appConfig = {
      commentsApi: commentsApi || commentsApiClient,
      record,
      user: { userIsAuthenticated },
      refreshIntervalMs: 60000,
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
          <Icon name={'users'} size={'large'} />
          <b>{this.text}</b>
        </Button>

        <FeedbackSpace
          modalOnClose={() => {
            this.setState({ openCommentModal: false });
          }}
          modalIsOpen={this.state.openCommentModal}
        />
      </Provider>
    );
  }
}

FeedbackApp.propTypes = {
  commentsApi: PropTypes.object,
  record: PropTypes.object,
  defaultQueryParams: PropTypes.object,
  userIsAuthenticated: PropTypes.object,
  buttonText: PropTypes.string,
};

FeedbackApp.defaultProps = {
  buttonText: i18next.t('Learn the community experience with this content'),
};
