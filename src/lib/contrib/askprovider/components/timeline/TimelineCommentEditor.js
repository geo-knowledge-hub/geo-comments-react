/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { i18next } from '@translations/i18next';

import { Container, Message } from 'semantic-ui-react';

import { CommentEditor } from '../comment';
import { SaveButton } from '../../../../components';
import { CommentAvatarContainer } from '../../../../components/feed/CommentFeed';

import { setEventContent, submitComment } from '../../state/operations/editor';

export const TimelineCommentEditorComponent = ({
  isLoading,
  commentContent,
  setCommentContent,
  error,
  submitComment,
  userAvatar,
}) => {
  return (
    <div className="timeline-comment-editor-container">
      {error && <Message negative>{error}</Message>}
      <div className="flex">
        <CommentAvatarContainer
          src={userAvatar}
          className="tablet computer only rel-mr-1"
        />
        <Container fluid className="ml-0-mobile mr-0-mobile fluid-mobile">
          <CommentEditor
            data={commentContent}
            onChange={(comment, editor) => setCommentContent(editor.getData())}
            minHeight="7rem"
          />
        </Container>
      </div>
      <div className="text-align-right rel-mt-1">
        <SaveButton
          icon="send"
          size="medium"
          content={i18next.t('Comment')}
          loading={isLoading}
          onClick={() => submitComment(commentContent)}
        />
      </div>
    </div>
  );
};

TimelineCommentEditorComponent.propTypes = {
  commentContent: PropTypes.string,
  isLoading: PropTypes.bool,
  setCommentContent: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitComment: PropTypes.func.isRequired,
  userAvatar: PropTypes.string,
};

TimelineCommentEditorComponent.defaultProps = {
  commentContent: '',
  isLoading: false,
  error: '',
  userAvatar: '',
};

const mapDispatchToProps = (dispatch) => ({
  submitComment: (content, format) => dispatch(submitComment(content, format)),
  setCommentContent: (content) => dispatch(setEventContent(content)),
});

const mapStateToProps = (state) => ({
  isLoading: state.timelineEditor.isLoading,
  error: state.timelineEditor.error,
  commentContent: state.timelineEditor.commentContent,
});

export const TimelineCommentEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineCommentEditorComponent);
