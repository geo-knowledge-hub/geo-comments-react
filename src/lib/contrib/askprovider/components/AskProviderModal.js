/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useState } from 'react';

import { i18next } from '@translations/i18next';

import {
  Modal,
  Segment,
  Icon,
  Message,
  Grid,
  Container,
} from 'semantic-ui-react';
import { TimelineFeed } from './timeline';
import { TimelineCommentEditor } from './timeline/TimelineCommentEditor';

export const AskProviderModal = ({ isModalOpen, onModalClose }) => {
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
                  header={i18next.t('Get in touch with the Knowledge Provider')}
                  content={i18next.t(
                    'Knowledge Providers do their best to bring you ' +
                      'the most helpful content. However, sometimes it is necessary to ask. In this' +
                      ' tab, you can talk directly to the Knowledge Provider. Ask your question and keep in touch.'
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
      </Modal.Actions>
    </Modal>
  );
};
