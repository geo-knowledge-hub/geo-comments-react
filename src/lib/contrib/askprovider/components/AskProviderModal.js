/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Trans } from 'react-i18next';
import { i18next } from '@translations/i18next';

import { Modal, Segment, Icon, Message, Grid } from 'semantic-ui-react';
import { TimelineFeed } from './timeline';
import { TimelineCommentEditor } from './timeline/TimelineCommentEditor';

const AskProviderModalComponent = ({ isModalOpen, onModalClose, user }) => {
  const [messageVisible, setMessageVisibility] = useState(true);

  return (
    <Modal onClose={onModalClose} open={isModalOpen} size={'large'} closeIcon>
      <Modal.Header>
        <Icon name={'comments outline'} /> {i18next.t('Ask the provider')}
      </Modal.Header>
      <Modal.Content scrolling>
        <TimelineFeed />
      </Modal.Content>
      <Modal.Actions>
        {user.userIsAuthenticated ? (
          <>
            <Grid>
              <Grid.Row align={'center'}>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={14} textAlign={'left'}>
                  {messageVisible && (
                    <Message
                      info
                      onDismiss={() => {
                        setMessageVisibility(false);
                      }}
                      header={i18next.t(
                        'Get in touch with the Provider'
                      )}
                      content={i18next.t(
                        'Providers do their best to bring you ' +
                          'the most helpful content. However, sometimes it is necessary to ask. In this' +
                          ' tab, you can talk directly to the Provider. Ask your question and keep in touch.'
                      )}
                    />
                  )}
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
              </Grid.Row>
            </Grid>
            <Segment basic>
              <TimelineCommentEditor />
            </Segment>
          </>
        ) : (
          <Grid>
            <Grid.Row align={'center'}>
              <Grid.Column width={1}></Grid.Column>
              <Grid.Column width={14} textAlign={'center'}>
                <Message
                  info
                  header={i18next.t(
                    'Do you want to interact with the Knowledge Provider ? '
                  )}
                  content={
                    <Trans>
                      You must register on the Geo Knowledge Hub.{' '}
                      <a href={'/signup'}>Click here</a> to register now or{' '}
                      <a href={'/login'}>Login</a>
                    </Trans>
                  }
                />
              </Grid.Column>
              <Grid.Column width={1}></Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  user: state.timelineEditor.user,
});

export const AskProviderModal = connect(
  mapStateToProps,
  null
)(AskProviderModalComponent);
