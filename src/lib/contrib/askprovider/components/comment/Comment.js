/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';

import { i18next } from '@translations/i18next';

import { Image } from 'react-invenio-forms';
import { Container, Dropdown, Feed } from 'semantic-ui-react';

import { CommentEditor } from './CommentEditor';

import {
  CommentFeed,
  SaveButton,
  CancelButton,
  Error,
} from '../../../../components';

import { MessageContent } from '../../../../components';
import { timestampToRelativeTime } from '../../../../utils';

export class Comment extends Component {
  constructor(props) {
    super(props);

    const { comment } = props;

    this.state = {
      commentContent: comment.content,
    };
  }

  render() {
    const { commentContent } = this.state;

    const {
      isLoading,
      isEditing,
      error,
      comment,
      updateComment,
      deleteComment,
      toggleEditMode,
    } = this.props;

    // Comment properties
    const commentHasBeenEdited = comment?.revision_id > 2 && comment?.content;

    // Permissions
    const canUpdate = comment?.permissions?.can_update;
    const canDelete = comment?.permissions?.can_delete;

    // User profile
    const user = comment.expanded.user;
    const userName = user.profile.full_name || user.username;

    return (
      <CommentFeed.Item>
        <CommentFeed.Content>
          <CommentFeed.Avatar src={user.links.avatar} as={Image} circular />
          <CommentFeed.ContentBody>
            <Feed.Content>
              {(canDelete || canUpdate) && (
                <Dropdown
                  icon="ellipsis horizontal"
                  className="right-floated"
                  direction="left"
                >
                  <Dropdown.Menu>
                    {canUpdate && (
                      <Dropdown.Item onClick={() => toggleEditMode()}>
                        {i18next.t('Edit')}
                      </Dropdown.Item>
                    )}
                    {canDelete && (
                      <Dropdown.Item onClick={() => deleteComment()}>
                        {i18next.t('Delete')}
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <Feed.Summary>
                <b>{userName}</b>
                <Feed.Date>
                  {i18next.t('commented')}{' '}
                  {timestampToRelativeTime(comment.created)}
                </Feed.Date>
              </Feed.Summary>

              <Feed.Extra text={!isEditing}>
                {error && <Error error={error} />}

                {isEditing ? (
                  <CommentEditor
                    data={comment?.content}
                    onChange={(event, editor) =>
                      this.setState({ commentContent: editor.getData() })
                    }
                    minHeight="100%"
                  />
                ) : (
                  <MessageContent content={comment?.content} />
                )}

                {isEditing && (
                  <Container fluid className="mt-15" textAlign="right">
                    <CancelButton onClick={() => toggleEditMode()} />
                    <SaveButton
                      onClick={() => updateComment(commentContent, 'html')}
                      loading={isLoading}
                    />
                  </Container>
                )}
              </Feed.Extra>
              {commentHasBeenEdited && (
                <Feed.Meta>{i18next.t('Edited')}</Feed.Meta>
              )}
            </Feed.Content>
          </CommentFeed.ContentBody>
        </CommentFeed.Content>
      </CommentFeed.Item>
    );
  }
}
