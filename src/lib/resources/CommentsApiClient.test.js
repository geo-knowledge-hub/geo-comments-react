/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

jest.mock('./api.js');

import { http } from './api';

import { CommentsApiClient } from './CommentsApiClient';

// Mock data
import commentContent from '@tests/mocks/comments/comment-content.json';
import commentResponse from '@tests/mocks/comments/comment-op-create.json';
import commentSearchResponse from '@tests/mocks/comments/comment-op-search.json';

// Constants
const API_PREFIX = '/api/packages/865z2-ahg25';
const API_COMMENT_TYPE = 'comments';

// Tests
describe('CommentsApiClient tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const commentsApiClient = new CommentsApiClient(API_PREFIX, API_COMMENT_TYPE);

  describe('Creating comment', () => {
    beforeEach(async () => {
      http.post.mockImplementation(() => {
        return Promise.resolve({ data: commentResponse, status: 201 });
      });

      await commentsApiClient.create(commentContent);
    });

    it('should call http.post', () => {
      expect(http.post).toHaveBeenCalledTimes(1);
    });

    it('should call http.post with proper URL', () => {
      expect(http.post).toHaveBeenCalledWith(
        `${API_PREFIX}/${API_COMMENT_TYPE}?expand=true`,
        commentContent
      );
    });

    it('should return the created comment', async () => {
      const createdComment = await commentsApiClient.create(commentContent);

      expect(createdComment).toHaveProperty('code');
      expect(createdComment).toHaveProperty('data');

      expect(createdComment.code).toEqual(201);
      expect(createdComment.data.user_id).toEqual(1);
      expect(createdComment.data.content).toEqual(commentContent.content);
    });
  });

  describe('Reading a comment', () => {
    beforeEach(async () => {
      http.get.mockImplementation(() => {
        return Promise.resolve({ data: commentResponse, status: 200 });
      });

      await commentsApiClient.get(commentResponse.id);
    });

    it('should call http.get', () => {
      expect(http.get).toHaveBeenCalledTimes(1);
    });

    it('should call http.get with proper URL', () => {
      expect(http.get).toHaveBeenCalledWith(
        `${API_PREFIX}/${API_COMMENT_TYPE}/${commentResponse.id}?expand=true`
      );
    });

    it('should return the created comment', async () => {
      const loadedComment = await commentsApiClient.get(commentResponse.id);

      expect(loadedComment).toHaveProperty('code');
      expect(loadedComment).toHaveProperty('data');

      expect(loadedComment.code).toEqual(200);
      expect(loadedComment.data.content).toEqual(commentContent.content);
    });
  });

  describe('Searching comments', () => {
    beforeEach(async () => {
      http.get.mockImplementation(() => {
        return Promise.resolve({ data: commentSearchResponse, status: 200 });
      });

      await commentsApiClient.search({});
    });

    it('should call http.get', () => {
      expect(http.get).toHaveBeenCalledTimes(1);
    });

    it('should call http.get with proper URL', () => {
      expect(http.get).toHaveBeenCalledWith(
        `${API_PREFIX}/${API_COMMENT_TYPE}?expand=true`
      );
    });

    it('should return the created comment', async () => {
      const comments = await commentsApiClient.search({});

      expect(comments).toHaveProperty('code');
      expect(comments).toHaveProperty('data');

      expect(comments.code).toEqual(200);
      expect(comments.data.hits.hits).toHaveLength(1);
      expect(comments.data.hits.hits[0]).toHaveProperty('id');
    });
  });

  describe('Updating a comment', () => {
    beforeEach(async () => {
      http.put.mockImplementation(() => {
        return Promise.resolve({ data: commentResponse, status: 200 });
      });

      await commentsApiClient.update(commentResponse.id, commentResponse);
    });

    it('should call http.put', () => {
      expect(http.put).toHaveBeenCalledTimes(1);
    });

    it('should call http.put with proper URL', () => {
      expect(http.put).toHaveBeenCalledWith(
        `${API_PREFIX}/${API_COMMENT_TYPE}/${commentResponse.id}?expand=true`,
        commentResponse
      );
    });

    it('should return the updated comment', async () => {
      const comments = await commentsApiClient.update(
        commentResponse.id,
        commentResponse
      );

      expect(comments).toHaveProperty('code');
      expect(comments).toHaveProperty('data');

      expect(comments.code).toEqual(200);
    });
  });

  describe('Deleting a comment', () => {
    beforeEach(async () => {
      http.delete.mockImplementation(() => {
        return Promise.resolve({ data: '', status: 200 });
      });

      await commentsApiClient.delete(commentResponse.id, commentResponse);
    });

    it('should call http.delete', () => {
      expect(http.delete).toHaveBeenCalledTimes(1);
    });

    it('should call http.delete with proper URL', () => {
      expect(http.delete).toHaveBeenCalledWith(
        `${API_PREFIX}/${API_COMMENT_TYPE}/${commentResponse.id}?expand=true`
      );
    });
  });
});
