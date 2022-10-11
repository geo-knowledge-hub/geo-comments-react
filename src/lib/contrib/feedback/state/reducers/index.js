/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { combineReducers } from 'redux';
import { timelineReducer } from '../../../../state/reducers';

import { feedbackModalReducer } from './modal';
import { feedbackSpaceReducer } from './space';

export default function createReducers() {
  return combineReducers({
    timeline: timelineReducer,
    modal: feedbackModalReducer,
    space: feedbackSpaceReducer,
  });
}
