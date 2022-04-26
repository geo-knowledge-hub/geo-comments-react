/*
 * This file is part of GEO-Feedback-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Feedback-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import PropTypes from 'prop-types';

import { Rating } from 'semantic-ui-react';
import { Field, FastField, getIn } from 'formik';

/**
 * StarsFeedbackField is a formik field that renders a star rating field.
 *
 * @param {object} props - The props passed to the component.
 * @param {string} props.fieldPath - The path to the field in the form values.
 * @param {object} props.* - Any other props passed to the semantic-ui Rating component.
 */
export const StarsFeedbackField = (props) => {
  const { fieldPath, category, ...uiProps } = props;
  const fieldPathCategory = `${fieldPath}.${category.toLowerCase()}`;

  const renderFormField = (formikBag) => {
    const onRateHandler = (event, data) => {
      formikBag.form.setFieldValue(fieldPathCategory, getIn(data, 'rating'));
    };

    return (
      <Rating
        onRate={onRateHandler}
        rating={getIn(formikBag.form.values, fieldPathCategory, '')}
        {...uiProps}
      ></Rating>
    );
  };

  const FormikField = props.optimized ? FastField : Field;
  return <FormikField name={fieldPathCategory} component={renderFormField} />;
};

StarsFeedbackField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  uiProps: PropTypes.object,
};

StarsFeedbackField.defaultProps = {
  fieldPath: 'feedback',
  category: 'categoryOne',
  uiProps: {},
};
