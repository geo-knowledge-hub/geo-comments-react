/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Comment } from './Comment';

import { serializeErrorObject } from '../../../../utils';

import { updateComment } from '../../state/operations/editor';
import { deleteComment } from '../../../../state/operations/message';

export class CommentControlComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEditing: false,
      error: null,
    };
  }

  /**
   * Enable or disable edit mode of a message.
   */
  toggleEditMode = () => {
    const { isEditing } = this.state;

    this.setState({ isEditing: !isEditing, error: null });
  };

  updateComment = async (content, format) => {
    const { updateComment, comment } = this.props;

    if (!content) return;

    this.setState({
      isLoading: true,
    });

    try {
      await updateComment({ content, format, comment });

      this.setState({
        isLoading: false,
        isEditing: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        isEditing: true,
        error: serializeErrorObject(error),
      });
    }
  };

  deleteComment = async () => {
    const { deleteComment, comment, openConfirmModal } = this.props;

    openConfirmModal(() => deleteComment({ comment }));
  };

  render() {
    const { comment } = this.props;
    const { isLoading, isEditing, error } = this.state;

    return (
      <Comment
        updateComment={this.updateComment}
        deleteComment={this.deleteComment}
        toggleEditMode={this.toggleEditMode}
        isLoading={isLoading}
        isEditing={isEditing}
        error={error}
        comment={comment}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateComment: async (payload) => dispatch(updateComment(payload)),
  deleteComment: async (payload) => dispatch(deleteComment(payload)),
});

export const CommentControl = connect(
  null,
  mapDispatchToProps
)(CommentControlComponent);
