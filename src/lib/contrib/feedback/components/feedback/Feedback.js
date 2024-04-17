/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';

import { Image } from 'react-invenio-forms';
import { Dropdown, Feed, Grid, List, Statistic } from 'semantic-ui-react';

import { i18next } from '@translations/i18next';

import { timestampToRelativeTime } from '../../../../utils';
import { CommentFeed, Error, MessageContent } from '../../../../components';

export class Feedback extends Component {
  render() {
    const { error, comment, deleteComment, updateComment } = this.props;

    // Comment properties
    const commentHasBeenEdited = comment?.revision_id > 2 && comment?.content;

    // Permissions
    const canUpdate = comment?.permissions?.can_update;
    const canDelete = comment?.permissions?.can_delete;

    // User profile
    const user = comment?.expanded?.user || {};
    const userName = user?.profile?.full_name || user?.username;

    // Feedback topics
    const topics = comment?.topics || [];

    return (
      <CommentFeed.Item>
        <CommentFeed.Content>
          <CommentFeed.Avatar src={user?.links?.avatar} as={Image} circular />
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
                      <Dropdown.Item onClick={() => updateComment()}>
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

              <Feed.Extra>
                {error && <Error error={error} />}
                <Grid stackable>
                  <Grid.Row verticalAlign={'middle'}>
                    <Grid.Column computer={10} mobile={16} tablet={16}>
                      <MessageContent content={comment?.content} />
                    </Grid.Column>

                    <Grid.Column computer={6} only={'computer'}>
                      <Grid centered columns={topics.length}>
                        {topics.map((topic, index) => {
                          const topicValue = Math.round(topic.rating);
                          return (
                            <Grid.Column textAlign="center">
                              <Statistic size={'tiny'}>
                                <Statistic.Label>{topic.name}</Statistic.Label>
                                <Statistic.Value>
                                  {topicValue}/5
                                </Statistic.Value>
                              </Statistic>
                            </Grid.Column>
                          );
                        })}
                      </Grid>
                    </Grid.Column>

                    <Grid.Column width={16} only={'tablet mobile'}>
                      <List selection verticalAlign={'middle'} size={'large'}>
                        {topics.map((topic, index) => {
                          const topicValue = Math.round(topic.rating);
                          return (
                            <List.Item>
                              <List.Content floated={'right'}>
                                <List.Header>
                                  <p>{topicValue}/5</p>
                                </List.Header>
                              </List.Content>
                              <List.Content
                                style={{
                                  textTransform: 'capitalize',
                                }}
                              >
                                <List.Header>
                                  <p>{topic.name}</p>
                                </List.Header>
                              </List.Content>
                            </List.Item>
                          );
                        })}
                      </List>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
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
