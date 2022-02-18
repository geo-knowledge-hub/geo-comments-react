// This file is part of GEO Feedback React
// Copyright (C) 2022 GEO Secretariat.
//
// GEO Feedback React is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { Component } from "react";

import PropTypes from "prop-types";

import { TextFeedbackField } from "./fields/TextFeedbackField";

export class TextFeedback extends Component {
  render() {
    return (
      <>
        <TextFeedbackField
          fieldPath={this.props.fieldPath}
          editorConfig={this.props.editorConfig}
        />
      </>
    );
  }
}

TextFeedback.propTypes = {
  fieldPath: PropTypes.string,
  editorConfig: PropTypes.object,
};

TextFeedback.defaultProps = {
  fieldPath: "comment",
  editorConfig: {
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
  },
};
