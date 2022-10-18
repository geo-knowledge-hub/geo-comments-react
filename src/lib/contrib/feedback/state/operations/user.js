/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  FEEDBACK_MODAL_USER_STATE_IS_LOADING,
  FEEDBACK_MODAL_USER_STATE_SUCCESS,
  FEEDBACK_MODAL_USER_STATE_ERROR,
} from '../actions';

export const getFeedbackSpaceUserStatus = () => {
  return async (dispatch, getState, config) => {
    dispatch({
      type: FEEDBACK_MODAL_USER_STATE_IS_LOADING,
    });

    try {
      const response = await config.commentsApi.validateUserState();

      dispatch({
        type: FEEDBACK_MODAL_USER_STATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FEEDBACK_MODAL_USER_STATE_ERROR,
        payload: {
          is_valid_to_create: false,
        },
      });
    }
  };
};
