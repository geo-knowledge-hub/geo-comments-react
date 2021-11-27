// This file is part of GEO Feedback React
// Copyright (C) 2021 GEO Secretariat.
//
// GEO Feedback React is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import axios from "axios";
import urlcat from "urlcat";

// const CancelToken = axios.CancelToken;
const apiConfig = {
    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
};
const axiosWithconfig = axios.create(apiConfig);


/**
 * API Client response model.
 * 
 */
export class FeedbackApiClientResponse {
    constructor(data, errors, code) {
        this.data = data;
        this.errors = errors;
        this.code = code;
    }
}

/**
 * API Client for feedbacks
 */
export class FeedbackApiClient {
    constructor(feedbackBaseUrl) {
        this.feedbackBaseUrl = feedbackBaseUrl;
    }

    async createResponse(axios_call) {
        try {
            let response = await axios_call();
            return new FeedbackApiClientResponse(
                response.data,
                response.data.errors,
                response.status
            );
        } catch (error) {
            return new FeedbackApiClientResponse(
                error.response.data,
                error.response.data.errors,
                error.response.status
            );
        }
    }

    /**
     * Create a new feedback from API.
     * 
     * @param {string} recordId - Record ID
     * @param {object} feedback - Serialized feedback
     */
    async create(recordId, feedback) {
        const createUrl = urlcat(this.feedbackBaseUrl, { "recid": this.recordId });

        return this.createResponse(() => axiosWithconfig.post(createUrl, feedback));
    }

    /**
     * Get a feedback from API.
     * 
     * @param {object} feedbackId - Feedback ID
     */
    async get(feedbackId) {
        const feedbackUrl = urlcat(this.feedbackBaseUrl, { "id": feedbackId });

        return this.createResponse(() => axiosWithconfig.get(feedbackUrl));
    }

    /**
     * Search feedbacks from API.
     * 
     * @param {object} query - Search query
     */
    async search(query) {
        const searchUrl = urlcat(this.feedbackBaseUrl, query);

        return this.createResponse(() => axiosWithconfig.get(searchUrl));
    }

    /**
     * Update a feedback from API.
     * 
     * @param {object} feedback - Serialized feedback
     */
    async update(feedback) {
        const updateUrl = urlcat(this.feedbackBaseUrl, { "id": feedback.id });

        return this.createResponse(() => axiosWithconfig.put(updateUrl, feedbackData));
    }

    /**
     * Delete a feedback from API.
     * 
     * @param {object} feedbackId - Feedback ID
     */
    async delete(feedbackId) {
        const deleteUrl = urlcat(this.feedbackBaseUrl, { "id": feedbackId });

        return this.createResponse(() => axiosWithconfig.delete(deleteUrl));
    }
}
