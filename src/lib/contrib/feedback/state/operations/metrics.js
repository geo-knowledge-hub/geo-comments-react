/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  FEEDBACK_MODAL_METRICS_HAS_ERROR,
  FEEDBACK_MODAL_METRICS_IS_LOADING,
  FEEDBACK_MODAL_METRICS_SUCCESS,
} from '../actions';

export const getFeedbackSpaceMetrics = () => {
  return async (dispatch, getState, config) => {
    const state = getState();
    const { record } = state.modal;

    dispatch({
      type: FEEDBACK_MODAL_METRICS_IS_LOADING,
    });

    try {
      const response = await config.commentsApi.metrics();

      dispatch({
        type: FEEDBACK_MODAL_METRICS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FEEDBACK_MODAL_METRICS_HAS_ERROR,
        payload: error,
      });
    }
  };
};
