/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _cloneDeep from 'lodash/cloneDeep';

import { TIMELINE_IS_REFRESHING, TIMELINE_SUCCESS } from '../actions';

import { setTimelineInterval, clearTimelineInterval } from './timeline';

export const deleteComment = ({ comment }) => {
  return async (dispatch, getState, config) => {
    dispatch(clearTimelineInterval());
    // const commentsApi = config.requestEventsApi(event.links);

    dispatch({ type: TIMELINE_IS_REFRESHING });

    // const response = await commentsApi.deleteComment();
    const response = await config.commentsApi.delete(comment.id);

    dispatch({
      type: TIMELINE_SUCCESS,
      payload: generateUpdatedTimelineStateWithDelete(comment.id, getState),
    });

    dispatch(setTimelineInterval());

    return response.data;
  };
};

export const generateUpdatedTimelineStateWithUpdate = (
  updatedComment,
  currentState
) => {
  // return timeline with the updated comment
  const timelineState = _cloneDeep(currentState);
  const currentHits = timelineState.hits.hits;
  const currentCommentKey = currentHits.findIndex(
    (comment) => comment.id === updatedComment.id
  );

  currentHits[currentCommentKey] = updatedComment;
  return timelineState;
};

const generateUpdatedTimelineStateWithDelete = (commentId, currentState) => {
  // return timeline with the deleted comment replaced by the deletion event
  const timelineState = _cloneDeep(currentState().timeline.data);
  const currentHits = timelineState.hits.hits;

  const indexCommentToDelete = currentHits.findIndex(
    (comment) => comment.id === commentId
  );

  if (indexCommentToDelete !== -1) {
    currentHits.splice(indexCommentToDelete - 1, 1);
  }

  return timelineState;
};
