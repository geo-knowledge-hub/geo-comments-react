// This file is part of GEO Feedback React
// Copyright (C) 2021 GEO Secretariat.
//
// GEO Feedback React is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { Component } from "react";

import { Formik } from "formik";
import { Button, Container, Form } from "semantic-ui-react";

import { StarsFeedbackField, TextFeedbackField } from "../lib";


export default class App extends Component {
  render() {
    return (
      <Container
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh"
        }}
      >
        <Formik
          initialValues={{
            name: "",
            comment: "",
            rating: -1,
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {
            ({ values, handleSubmit, handleChange }) => (
              <Form style={{ width: "80%" }} onSubmit={handleSubmit}>
                <h1>Feedback example app</h1>
                <div>
                  <Form.Input type="text" placeholder="Name" name="name" onChange={handleChange} />

                  <TextFeedbackField
                    fieldPath="comment"
                    editorConfig={{
                      removePlugins: [
                        "Image",
                        "ImageCaption",
                        "ImageStyle",
                        "ImageToolbar",
                        "ImageUpload",
                        "MediaEmbed",
                        "Table",
                        "TableToolbar",
                        "TableProperties",
                        "TableCellProperties",
                      ],
                    }}
                  />
                  <StarsFeedbackField
                    icon="star"
                    maxRating={5}
                    defaultRating={3}
                    fieldPath="rating"
                  />

                  <Button type="submit">Create feedback</Button>
                </div>
              </Form>
            )
          }
        </Formik>
      </Container>
    );
  }
}
