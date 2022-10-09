/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  EDITOR_IS_LOADING,
  EDITOR_HAS_ERROR,
  EDITOR_SUCCESS,
  EDITOR_SETTING_CONTENT,
} from '../actions';

const initialState = {
  error: null,
  isLoading: false,
  commentContent: '',
};

export const commentEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDITOR_SETTING_CONTENT:
      return { ...state, commentContent: action.payload };
    case EDITOR_IS_LOADING:
      return { ...state, isLoading: true };
    case EDITOR_HAS_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case EDITOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        commentContent: '',
      };
    default:
      return state;
  }
};
