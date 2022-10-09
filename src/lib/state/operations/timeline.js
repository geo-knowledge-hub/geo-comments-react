/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _cloneDeep from 'lodash/cloneDeep';

import {
  TIMELINE_IS_LOADING,
  TIMELINE_IS_REFRESHING,
  TIMELINE_SUCCESS,
  TIMELINE_HAS_ERROR,
  TIMELINE_CHANGE_PAGE,
} from '../actions';

class intervalManager {
  static IntervalId = undefined;

  static setIntervalId(intervalId) {
    this.intervalId = intervalId;
  }

  static resetInterval() {
    clearInterval(this.intervalId);
    delete this.intervalId;
  }
}

export const fetchTimeline = (loadingState = true) => {
  return async (dispatch, getState, config) => {
    const state = getState();
    const { size, page, data: timelineData } = state.timeline;

    if (loadingState) {
      dispatch({
        type: TIMELINE_IS_LOADING,
      });
    }

    dispatch({
      type: TIMELINE_IS_REFRESHING,
    });

    try {
      const response = await config.commentsApi.search({
        size: size,
        page: page,
        sort: 'oldest',
      });

      dispatch({
        type: TIMELINE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: TIMELINE_HAS_ERROR,
        payload: error,
      });
    }
  };
};

export const clearTimelineInterval = () => {
  return (dispatch, getState, config) => {
    intervalManager.resetInterval();
  };
};

const timelineReload = (dispatch, getState, config) => {
  const state = getState();
  const { loading, refreshing, error } = state.timeline;
  const { isLoading: isSubmitting } = state.timelineEditor;

  if (error) {
    dispatch(clearTimelineInterval());
  }

  const concurrentRequests = loading && refreshing && isSubmitting;

  if (concurrentRequests) return;

  dispatch(fetchTimeline(false));
};

export const setTimelineInterval = () => {
  return async (dispatch, getState, config) => {
    const intervalAlreadySet = intervalManager.intervalId;

    if (!intervalAlreadySet) {
      const intervalId = setInterval(
        () => timelineReload(dispatch, getState, config),
        config.refreshIntervalMs
      );
      intervalManager.setIntervalId(intervalId);
    }
  };
};

export const getTimelineWithRefresh = () => {
  return async (dispatch, getState, config) => {
    dispatch(fetchTimeline(true));
    dispatch(setTimelineInterval());
  };
};

export const setPage = (page) => {
  return async (dispatch, getState, config) => {
    dispatch({
      type: TIMELINE_CHANGE_PAGE,
      payload: page,
    });

    await dispatch(fetchTimeline());
  };
};

export const generateUpdatedTimelineState = (
  newComment,
  timelineState,
  shouldGoToNextPage
) => {
  // return timeline with new comment and pagination logic
  const timelineData = _cloneDeep(timelineState.data);
  const currentHits = timelineData.hits.hits;

  timelineData.hits.hits = shouldGoToNextPage
    ? [newComment]
    : [...currentHits, newComment];

  timelineData.hits.total++;

  return timelineData;
};
