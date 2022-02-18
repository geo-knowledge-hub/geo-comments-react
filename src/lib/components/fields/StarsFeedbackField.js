// This file is part of GEO Feedback React
// Copyright (C) 2021 GEO Secretariat.
//
// GEO Feedback React is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { Component } from "react";

import { Rating } from "semantic-ui-react";
import { Field, FastField, getIn } from "formik";

/**
 * StarsFeedbackField is a formik field that renders a star rating field.
 *
 * @param {object} props - The props passed to the component.
 * @param {string} props.fieldPath - The path to the field in the form values.
 * @param {object} props.* - Any other props passed to the semantic-ui Rating component.
 */
export class StarsFeedbackField extends Component {
  renderFormField = (formikBag) => {
    const { fieldPath, value, onChange, ...uiProps } = this.props;

    const onRateHandler = (event, data) => {
      if (this.props.onChange) {
        this.props.onChange({ event, data, formikBag });
      } else {
        formikBag.form.setFieldValue(fieldPath, getIn(data, fieldPath));
      }
    };

    return (
      <Rating
        onRate={onRateHandler}
        value={getIn(formikBag.form.values, fieldPath, "")}
        {...uiProps}
      />
    );
  };

  render() {
    const FormikField = this.props.optimized ? FastField : Field;

    return (
      <FormikField
        name={this.props.fieldPath}
        component={this.renderFormField}
      />
    );
  }
}
