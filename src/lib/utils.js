/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { DateTime } from 'luxon';

import { i18next } from '@translations/i18next';

/**
 * Serialize an error object.
 */
export const serializeErrorObject = (errorObject) =>
  errorObject?.response?.data?.message || errorObject?.message;

/**
 * Convert a timestamp date into a relative time (to now).
 */
export const timestampToRelativeTime = (timestamp) =>
  DateTime.fromISO(timestamp).setLocale(i18next.language).toRelative();
