/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'react-invenio-forms';
import { Container, Feed, Icon } from 'semantic-ui-react';

/**
 * Comment base container.
 *
 * @note This code and the approach used here was adapted from the Invenio Requests module.
 */
export const CommentFeed = ({ children }) => (
  <Container className="requests-feed-container ml-0-mobile mr-0-mobile">
    <Feed>{children}</Feed>
  </Container>
);

export const CommentItem = ({ children }) => (
  <div className="requests-event-item">
    <div className="requests-event-container">{children}</div>
  </div>
);

export const CommentInnerContainer = ({ children, isComment }) => (
  <div
    className={`requests-event-inner-container${isComment ? ' thread' : ''}`}
  >
    {children}
  </div>
);

export const CommentAvatarContainer = ({ src, ...uiProps }) => (
  <div className="requests-avatar-container">
    <Image src={src} rounded avatar {...uiProps} />
  </div>
);

export const CommentItemIconContainer = ({ name, size, color }) => (
  <div className="requests-action-event-icon">
    <Icon name={name} size={size} className={color} />
  </div>
);

export const CommentItemBody = ({ isActionEvent, ...props }) => (
  <Feed.Event
    {...props}
    className={isActionEvent ? 'requests-action-event' : ''}
  />
);

CommentFeed.Content = CommentInnerContainer;
CommentFeed.ContentBody = CommentItemBody;
CommentFeed.Avatar = CommentAvatarContainer;
CommentFeed.Icon = CommentItemIconContainer;
CommentFeed.Item = CommentItem;
