/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  FEEDBACK_MODAL_FORM_OPEN,
  FEEDBACK_MODAL_FORM_CLOSE,
  FEEDBACK_MODAL_FORM_SUCCESS,
  FEEDBACK_MODAL_FORM_HAS_ERROR,
} from '../actions';

import {
  TIMELINE_CHANGE_PAGE,
  TIMELINE_IS_REFRESHING,
  TIMELINE_SUCCESS,
} from '../../../../state/actions';

import {
  clearTimelineInterval,
  generateUpdatedTimelineState,
  setTimelineInterval,
} from '../../../../state/operations/timeline';

import { serializeErrorObject } from '../../../../utils';
import { generateUpdatedTimelineStateWithUpdate } from '../../../../state/operations/message';

const INITIAL_MODAL_FORM_STATE = {
  topics: {},
};

export const feedbackModalOpen = (
  modalOperation,
  modalData = INITIAL_MODAL_FORM_STATE
) => {
  return async (dispatch, getState, config) => {
    dispatch({
      type: FEEDBACK_MODAL_FORM_OPEN,
      payload: {
        modalData,
        modalOperation,
      },
    });
  };
};

export const feedbackModalClose = () => {
  return async (dispatch, getState, config) => {
    dispatch({
      type: FEEDBACK_MODAL_FORM_CLOSE,
    });
  };
};

export const feedbackModalCreateFeedback = (content) => {
  return async (dispatch, getState, config) => {
    const { timeline: timelineState } = getState();

    dispatch(clearTimelineInterval());

    try {
      const payload = {
        content: content.content,
        topics: content.topics,
      };

      const response = await config.commentsApi.create(payload);

      const currentPage = timelineState.page;
      const currentSize = timelineState.size;
      const currentCommentsLength = timelineState.data.hits.hits.length;
      const shouldGoToNextPage = currentCommentsLength + 1 > currentSize;

      if (shouldGoToNextPage) {
        dispatch({ type: TIMELINE_CHANGE_PAGE, payload: currentPage + 1 });
      }

      dispatch({ type: FEEDBACK_MODAL_FORM_SUCCESS });

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
        type: FEEDBACK_MODAL_FORM_HAS_ERROR,
        payload: serializeErrorObject(error),
      });

      dispatch(setTimelineInterval());

      // throw it again, so it can be caught in the local state
      throw error;
    }
  };
};

export const feedbackModalUpdateFeedback = (content) => {
  return async (dispatch, getState, config) => {
    dispatch(clearTimelineInterval());
    dispatch({ type: TIMELINE_IS_REFRESHING });

    const payload = {
      content: content.content,
      topics: content.topics,
    };
    const response = await config.commentsApi.update(content.id, payload);

    dispatch({ type: FEEDBACK_MODAL_FORM_SUCCESS });

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
