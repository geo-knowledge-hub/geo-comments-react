/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { i18next } from '@translations/i18next';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';

import {
  getTimelineWithRefresh,
  clearTimelineInterval,
  setPage,
} from '../../../../state/operations/timeline';

import { FeedbackControl } from '../feedback';
import {
  CommentFeed,
  Loader,
  Error,
  Pagination,
  DeleteModal,
} from '../../../../components';

export class TimelineFeedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      modalAction: null,
    };
  }

  componentDidMount() {
    const { getTimelineWithRefresh } = this.props;
    getTimelineWithRefresh();
  }

  componentWillUnmount() {
    const { timelineStopRefresh } = this.props;
    timelineStopRefresh();
  }

  onOpenModal = (action) => {
    this.setState({ modalOpen: true, modalAction: action });
  };

  render() {
    const { modalOpen, modalAction } = this.state;
    const { timeline, loading, error, setPage, size, page, userAvatar } =
      this.props;

    // Extracting the timeline data
    const timelineData = timeline?.hits?.hits || [];

    return (
      <Loader isLoading={loading}>
        <Error error={error}>
          <Container id="requests-timeline" className="ml-0-mobile mr-0-mobile">
            {timelineData.length !== 0 ? (
              <CommentFeed>
                {timelineData.map((comment) => (
                  <FeedbackControl
                    key={comment.id}
                    comment={comment}
                    openConfirmModal={this.onOpenModal}
                  />
                ))}
              </CommentFeed>
            ) : (
              <Segment placeholder size={'large'}>
                <Header icon>
                  <Icon name="comments outline" />
                  {i18next.t(
                    'No feedback have been made yet. Create the first one now!'
                  )}
                </Header>
              </Segment>
            )}
            <Container textAlign="center" className="mb-15 mt-15">
              <Pagination
                page={page}
                size={size}
                setPage={setPage}
                totalLength={timeline.hits?.total}
              />
            </Container>
            <DeleteModal
              open={modalOpen}
              action={modalAction}
              onOpen={() => this.setState({ modalOpen: true })}
              onClose={() => this.setState({ modalOpen: false })}
            />
          </Container>
        </Error>
      </Loader>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTimelineWithRefresh: () => dispatch(getTimelineWithRefresh()),
  timelineStopRefresh: () => dispatch(clearTimelineInterval()),
  setPage: (page) => dispatch(setPage(page)),
});

const mapStateToProps = (state) => ({
  loading: state.timeline.loading,
  refreshing: state.timeline.refreshing,
  timeline: state.timeline.data,
  error: state.timeline.error,
  size: state.timeline.size,
  page: state.timeline.page,
});

export const TimelineFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineFeedComponent);
