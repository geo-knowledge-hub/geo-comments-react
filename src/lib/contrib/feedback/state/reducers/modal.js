/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  // Form
  FEEDBACK_MODAL_FORM_CLOSE,
  FEEDBACK_MODAL_FORM_OPEN,
  FEEDBACK_MODAL_FORM_SUCCESS,
  // Metrics
  FEEDBACK_MODAL_METRICS_IS_LOADING,
  FEEDBACK_MODAL_METRICS_SUCCESS,
  FEEDBACK_MODAL_USER_STATE_ERROR,
  FEEDBACK_MODAL_USER_STATE_IS_LOADING,
  FEEDBACK_MODAL_USER_STATE_SUCCESS,
} from '../actions';

import { feedbackModalCreateFeedback } from '../operations/modal';

const initialState = {
  error: null,
  isLoading: false,
  metricsIsLoading: false,
  metricsData: [],
  commentContent: '',
  record: {},
  formModalData: {},
  formModalIsOpen: false,
  formModalOperation: feedbackModalCreateFeedback,
  userStateData: {},
  userStateDataIsLoading: false,
};

export const feedbackModalReducer = (state = initialState, action) => {
  switch (action.type) {
    // Form
    case FEEDBACK_MODAL_FORM_OPEN:
      return {
        ...state,
        formModalIsOpen: true,
        formModalData: action.payload.modalData,
        formModalOperation: action.payload.modalOperation,
        args: action.payload.args,
      };
    case FEEDBACK_MODAL_FORM_CLOSE:
      return { ...state, formModalData: null, formModalIsOpen: false };
    case FEEDBACK_MODAL_FORM_SUCCESS:
      return { ...state, formModalData: null, formModalIsOpen: false };

    // Metrics
    case FEEDBACK_MODAL_METRICS_IS_LOADING:
      return { ...state, metricsIsLoading: true };
    case FEEDBACK_MODAL_METRICS_SUCCESS:
      return { ...state, metricsData: action.payload, metricsIsLoading: false };

    // Users
    case FEEDBACK_MODAL_USER_STATE_IS_LOADING:
      return { ...state, userStateDataIsLoading: true };
    case FEEDBACK_MODAL_USER_STATE_SUCCESS:
    case FEEDBACK_MODAL_USER_STATE_ERROR:
      return {
        ...state,
        userStateData: action.payload,
        userStateDataIsLoading: false,
      };

    default:
      return state;
  }
};
