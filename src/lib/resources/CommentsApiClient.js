/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import urlcat, { join } from 'urlcat';

import { http } from './api';

/**
 * GEO Knowledge Hub Comments API Response.
 *
 */
export class CommentsApiClientResponse {
  constructor(data, errors, code) {
    this.data = data;
    this.code = code;
    this.errors = errors;
  }
}

/**
 * GEO Knowledge Hub Comments API Client
 */
export class CommentsApiClient {
  constructor(apiPrefix, commentType, httpClient = http) {
    this.httpClient = httpClient;

    this.apiUrl = join(apiPrefix, '/', commentType);
  }

  async createResponse(axios_call) {
    try {
      let response = await axios_call();
      return new CommentsApiClientResponse(
        response.data,
        response.data.errors,
        response.status
      );
    } catch (error) {
      return new CommentsApiClientResponse(
        error.response.data,
        error.response.data.errors,
        error.response.status
      );
    }
  }

  /**
   * Search comments from API.
   *
   * @param {object} query - Search query
   */
  async search(query = {}) {
    const operationUrl = urlcat(this.apiUrl, { ...query, expand: true });

    return this.createResponse(() => this.httpClient.get(operationUrl));
  }

  /**
   * Create a new comment from API.
   *
   * @param {string} commentContent - Comment content
   */
  async create(commentContent) {
    const operationUrl = urlcat(this.apiUrl, { expand: true });

    return this.createResponse(() =>
      this.httpClient.post(operationUrl, commentContent)
    );
  }

  /**
   * Get a comment from API.
   *
   * @param {object} commentId - Comment ID
   */
  async get(commentId) {
    const operationUrl = urlcat(this.apiUrl, '/:comment_id', {
      comment_id: commentId,
      expand: true,
    });

    return this.createResponse(() => this.httpClient.get(operationUrl));
  }

  /**
   * Update a comment from API.
   *
   * @param {object} commentId - Comment ID
   * @param {object} commentContent - Serialized comment content
   */
  async update(commentId, commentContent) {
    const operationUrl = urlcat(this.apiUrl, '/:comment_id', {
      comment_id: commentId,
      expand: true,
    });

    return this.createResponse(() =>
      this.httpClient.put(operationUrl, commentContent)
    );
  }

  /**
   * Delete a comment from API.
   *
   * @param {object} commentId - Comment ID
   */
  async delete(commentId) {
    const operationUrl = urlcat(this.apiUrl, '/:comment_id', {
      comment_id: commentId,
      expand: true,
    });

    return this.createResponse(() => this.httpClient.delete(operationUrl));
  }

  /**
   * Read the feedback metrics from a record (Available only for the Feedback space).
   */
  async metrics() {
    const operationUrl = urlcat(this.apiUrl, '/metrics');

    return this.createResponse(() => this.httpClient.get(operationUrl));
  }

  /**
   * Validate if user can create a new feedback (Available only for the Feedback space).
   */
  async validateUserState() {
    const operationUrl = urlcat(this.apiUrl, '/actions/validate-user');

    return this.createResponse(() => this.httpClient.get(operationUrl));
  }
}
