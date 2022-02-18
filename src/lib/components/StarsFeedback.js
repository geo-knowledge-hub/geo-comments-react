// This file is part of GEO Feedback React
// Copyright (C) 2022 GEO Secretariat.
//
// GEO Feedback React is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { Component } from "react";

import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

import { StarsFeedbackField } from "./fields/StarsFeedbackField";

export class StarsFeedback extends Component {
  render() {
    return (
      <>
        <List selection verticalAlign="middle" size={"big"} relaxed={"very"}>
          {this.props.categories.map((category) => {
            return (
              <List.Item>
                <List.Content floated="right">
                  <StarsFeedbackField {...this.props.starsProperties} />
                </List.Content>
                <List.Content>
                  <List.Header>{category}</List.Header>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </>
    );
  }
}

StarsFeedback.propTypes = {
  categories: PropTypes.array,
  starsProperties: PropTypes.object,
};

StarsFeedback.defaultProps = {
  categories: ["Clarity", "Usefulness", "Reusability"],
  starsProperties: {
    icon: "star",
    maxRating: 5,
    defaultRating: 3,
    fieldPath: "feedback",
  },
};
