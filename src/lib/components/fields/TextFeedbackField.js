/*
 * This file is part of GEO-Feedback-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Feedback-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { FieldLabel, RichInputField } from 'react-invenio-forms';

/**
 * TextFeedbackField is a formik field that renders a text field for rating.
 *
 * @param {object} props - Props passed to the component.
 * @param {string} props.fieldPath - The path to the field in the form values.
 * @param {string} props.label - The label of the field.
 * @param {string} props.labelIcon - The icon of the label.
 * @param {object} props.editorConfig - The configuration of the text editor.
 */
export class TextFeedbackField extends Component {
  render() {
    const { fieldPath, label, labelIcon, editorConfig } = this.props;

    return (
      // Adapted from: https://github.com/inveniosoftware/react-invenio-deposit/blob/master/src/lib/components/DescriptionsField.js#L16
      <>
        <RichInputField
          fieldPath={fieldPath}
          editorConfig={editorConfig}
          label={
            <FieldLabel htmlFor={fieldPath} icon={labelIcon} label={label} />
          }
          optimized
        />
      </>
    );
  }
}

TextFeedbackField.propTypes = {
  fieldPath: PropTypes.string,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  editorConfig: PropTypes.object,
};

TextFeedbackField.defaultProps = {
  fieldPath: 'review',
  label: 'Review text',
  labelIcon: 'pencil',
  editorConfig: {},
};
