/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { List, Popup } from 'semantic-ui-react';

import { CommentTopicsField } from '../../../../components';

export const FeedbackTopics = (props) => {
  return (
    <List selection verticalAlign="middle" size={'big'} relaxed={'very'}>
      {props.categories.map((category) => {
        return (
          <List.Item key={category}>
            <List.Content floated="right">
              <CommentTopicsField
                category={category}
                fieldPath={props.fieldPath}
                {...props.starsProperties}
              />
            </List.Content>
            <List.Content>
              <List.Header>{category}</List.Header>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

FeedbackTopics.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  categories: PropTypes.array,
  starsProperties: PropTypes.object,
  errors: PropTypes.bool,
};

FeedbackTopics.defaultProps = {
  fieldPath: 'topics',
  categories: ['Clarity', 'Usefulness', 'Reusability'],
  starsProperties: {
    icon: 'star',
    maxRating: 5,
  },
  errors: false,
};
