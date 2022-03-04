// This file is part of GEO Feedback React
// Copyright (C) 2021 GEO Secretariat.
//
// GEO Feedback React is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { Component } from 'react';

import { Formik } from 'formik';
import { Button, Container, Form } from 'semantic-ui-react';

import schema from './schema';

import { StarsFeedback, TextFeedback } from '../lib';

export default class App extends Component {
  render() {
    return (
      <Container
        style={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            name: '',
            comment: '',
            feedback: {},
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={schema}
        >
          {({ values, handleSubmit, handleChange }) => (
            <Form style={{ width: '80%' }} onSubmit={handleSubmit}>
              <h1>Feedback example app</h1>
              <div>
                <Form.Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                />

                <StarsFeedback icon="star" maxRating={5} fieldPath="feedback" />

                <TextFeedback
                  fieldPath="comment"
                  editorConfig={{
                    removePlugins: [
                      'Image',
                      'ImageCaption',
                      'ImageStyle',
                      'ImageToolbar',
                      'ImageUpload',
                      'MediaEmbed',
                      'Table',
                      'TableToolbar',
                      'TableProperties',
                      'TableCellProperties',
                    ],
                  }}
                />

                <Button type="submit">Create feedback</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}
