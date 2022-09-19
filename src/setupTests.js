/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { Formik } from 'formik';

/**
 * Required libraries
 */

// Base theme
import 'semantic-ui-css/semantic.min.css';

/**
 * @name wrapperFormikProvider
 *
 * @description Wrapper for custom formik render.
 *
 * This wrapper functions generate a customizable ``Formik`` context provider
 * to be used with the ``testing-library`` ``render`` function.
 *
 * @param {Object} options object for the ``Formik`` context provider.
 *
 * @returns function callback to wrap the Rendered component.
 */
const wrapperFormikProvider =
  (options) =>
  ({ children }) =>
    <Formik {...options}>{children}</Formik>;

/**
 * @name customFormikRender
 * @description Custom render method for the ``testing-library``
 */
const customFormikRender = (ui, formikOptions = {}, renderOptions = {}) =>
  render(ui, {
    wrapper: wrapperFormikProvider(formikOptions),
    ...renderOptions,
  });

export * from '@testing-library/react';
export { render as render, customFormikRender as renderWithFormikProvider };
