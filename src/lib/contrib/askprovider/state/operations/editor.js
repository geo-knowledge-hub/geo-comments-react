/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  TIMELINE_CHANGE_PAGE,
  TIMELINE_IS_REFRESHING,
  TIMELINE_SUCCESS,
} from '../../../../state/actions';

import {
  EDITOR_IS_LOADING,
  EDITOR_HAS_ERROR,
  EDITOR_SUCCESS,
  EDITOR_SETTING_CONTENT,
} from '../actions';

import {
  clearTimelineInterval,
  generateUpdatedTimelineState,
  setTimelineInterval,
} from '../../../../state/operations/timeline';

import { serializeErrorObject } from '../../../../utils';
import { generateUpdatedTimelineStateWithUpdate } from '../../../../state/operations/message';

export const setEventContent = (content) => {
  return async (dispatch, getState, config) => {
    dispatch({
      type: EDITOR_SETTING_CONTENT,
      payload: content,
    });
  };
};

export const submitComment = (content, format) => {
  return async (dispatch, getState, config) => {
    const { timeline: timelineState } = getState();

    dispatch(clearTimelineInterval());

    dispatch({
      type: EDITOR_IS_LOADING,
    });

    try {
      /* Because of the delay in ES indexing we need to handle the updated state on the client-side until it is ready to be retrieved from the server.
            That includes the pagination logic e.g. changing pages if the current page size is exceeded by a new comment. */
      const response = await config.commentsApi.create({
        content,
      });

      const currentPage = timelineState.page;
      const currentSize = timelineState.size;
      const currentCommentsLength = timelineState.data.hits.hits.length;
      const shouldGoToNextPage = currentCommentsLength + 1 > currentSize;

      if (shouldGoToNextPage) {
        dispatch({ type: TIMELINE_CHANGE_PAGE, payload: currentPage + 1 });
      }

      dispatch({ type: EDITOR_SUCCESS });

      await dispatch({
        type: TIMELINE_SUCCESS,
        payload: generateUpdatedTimelineState(
          response.data,
          timelineState,
          shouldGoToNextPage
        ),
      });

      dispatch(setTimelineInterval());
    } catch (error) {
      dispatch({
        type: EDITOR_HAS_ERROR,
        payload: serializeErrorObject(error),
      });

      dispatch(setTimelineInterval());

      // throw it again, so it can be caught in the local state
      throw error;
    }
  };
};

export const updateComment = ({ content, comment }) => {
  return async (dispatch, getState, config) => {
    dispatch(clearTimelineInterval());
    dispatch({ type: TIMELINE_IS_REFRESHING });

    const payload = { content };
    const response = await config.commentsApi.update(comment.id, payload);

    dispatch({
      type: TIMELINE_SUCCESS,
      payload: generateUpdatedTimelineStateWithUpdate(
        response.data,
        getState().timeline.data
      ),
    });

    dispatch(setTimelineInterval());

    return response.data;
  };
};
