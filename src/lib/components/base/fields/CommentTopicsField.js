/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Rating } from 'semantic-ui-react';
import { Field, FastField, getIn } from 'formik';

/**
 * CommentTopicsField is a formik field that renders a star rating field.
 *
 * @param {object} props - The props passed to the component.
 * @param {string} props.fieldPath - The path to the field in the form values.
 * @param {object} props.* - Any other props passed to the semantic-ui Rating component.
 */
export const CommentTopicsField = (props) => {
  const { fieldPath, category, optimized, ...uiProps } = props;
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

  const FormikField = optimized ? FastField : Field;
  return <FormikField name={fieldPathCategory} component={renderFormField} />;
};

CommentTopicsField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  optimized: PropTypes.bool,
};

CommentTopicsField.defaultProps = {
  fieldPath: 'topics',
  category: 'categoryOne',
  optimized: false,
  icon: 'star',
  clearable: false,
};
