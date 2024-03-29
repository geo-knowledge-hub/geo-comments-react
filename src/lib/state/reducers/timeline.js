/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  TIMELINE_IS_LOADING,
  TIMELINE_IS_REFRESHING,
  TIMELINE_SUCCESS,
  TIMELINE_HAS_ERROR,
  TIMELINE_CHANGE_PAGE,
  TIMELINE_SIDE_EFFECT_START,
  TIMELINE_SIDE_EFFECT_END,
} from '../actions';

export const initialTimelineState = {
  loading: false,
  refreshing: false,
  data: {},
  error: null,
  size: 15,
  page: 1,
  needSideEffectUpdate: false,
};

export const timelineReducer = (state = initialTimelineState, action) => {
  switch (action.type) {
    case TIMELINE_IS_LOADING:
      return { ...state, loading: true };
    case TIMELINE_IS_REFRESHING:
      return { ...state, refreshing: true };
    case TIMELINE_SUCCESS:
      return {
        ...state,
        refreshing: false,
        loading: false,
        data: action.payload,
        error: null,
        needUpdate: true,
      };
    case TIMELINE_HAS_ERROR:
      return {
        ...state,
        refreshing: false,
        loading: false,
        error: action.payload,
      };
    case TIMELINE_CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case TIMELINE_SIDE_EFFECT_START:
      return {
        ...state,
        needSideEffectUpdate: true,
      };
    case TIMELINE_SIDE_EFFECT_END:
      return {
        ...state,
        needSideEffectUpdate: false,
      };
    default:
      return state;
  }
};
