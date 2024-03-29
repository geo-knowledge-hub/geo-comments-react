/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import { default as createReducers } from './state/reducers';
import { initialTimelineState } from '../../state/reducers';
import { initialTimelineEditorState } from './state/reducers';

const composeEnhancers = composeWithDevTools({
  name: 'Ask Provider',
});

export function configureStore(config) {
  const { user } = config;
  const { size } = config.defaultQueryParams;

  return createStore(
    createReducers(),
    // config object will be available in the actions,
    {
      timeline: { ...initialTimelineState, size },
      timelineEditor: { ...initialTimelineEditorState, user },
    },
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(config)))
  );
}
