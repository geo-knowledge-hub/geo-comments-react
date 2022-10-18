/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  TIMELINE_SIDE_EFFECT_START,
  TIMELINE_SIDE_EFFECT_END,
} from '../actions';

export const startSideEffectUpdate = () => {
  return async (dispatch) => {
    dispatch({
      type: TIMELINE_SIDE_EFFECT_START,
    });
  };
};

export const stopSideEffectUpdate = () => {
  return async (dispatch) => {
    dispatch({
      type: TIMELINE_SIDE_EFFECT_END,
    });
  };
};
