/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Feedback } from './Feedback';

import { deleteComment } from '../../../../state/operations/message';
import {
  feedbackModalOpen,
  feedbackModalUpdateFeedback,
} from '../../state/operations/modal';

export class FeedbackControlComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEditing: false,
      error: null,
    };
  }

  updateComment = async () => {
    const topicData = {};
    const { feedbackEditModal, comment } = this.props;

    comment.topics.forEach((x) => {
      topicData[x.name] = x.rating;
    });

    const commentData = {
      content: comment.content,
      topics: topicData,
      id: comment.id,
    };

    await feedbackEditModal(commentData);
  };

  deleteComment = async () => {
    const { deleteComment, comment, openConfirmModal } = this.props;

    openConfirmModal(() => deleteComment({ comment }));
  };

  render() {
    const { comment } = this.props;
    const { isLoading, isEditing, error } = this.state;

    return (
      <Feedback
        updateComment={this.updateComment}
        deleteComment={this.deleteComment}
        toggleEditMode={this.toggleEditMode}
        isLoading={isLoading}
        error={error}
        comment={comment}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteComment: async (payload) => dispatch(deleteComment(payload)),
  feedbackEditModal: (modalData) =>
    dispatch(feedbackModalOpen(feedbackModalUpdateFeedback, modalData)),
});

export const FeedbackControl = connect(
  null,
  mapDispatchToProps
)(FeedbackControlComponent);
