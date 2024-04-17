/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Yup from 'yup';

import { Formik } from 'formik';
import {
  Modal,
  Grid,
  Container,
  Label,
  Icon,
  Button,
  Popup,
} from 'semantic-ui-react';

import { i18next } from '@translations/i18next';

import { FeedbackTopics, FeedbackText } from '../feedback';
import { feedbackModalClose } from '../../state/operations/modal';

/**
 * Validation scheme for the feedback generated using Formik.
 */
export const feedbackSchema = Yup.object().shape({
  topics: Yup.object()
    .shape({
      clarity: Yup.number().required(),
      usefulness: Yup.number().required(),
      reusability: Yup.number().required(),
    })
    .required(),
  content: Yup.string().min(20).required(),
});

export class FeedbackModalComponent extends Component {
  render() {
    const {
      categories,
      formModalData,
      formModalIsOpen,
      formModalOperation,
      feedbackModalClose,
      callAction,
    } = this.props;

    // Defining feedback properties based on
    // initial data defined by user.
    const formModalProperties = formModalData || {};

    const id = formModalProperties.id;
    const topics = formModalProperties.topics || [];
    const content = formModalProperties.content || '';

    return (
      <Modal
        closeIcon
        size={'large'}
        centered={false}
        dimmer={'blurring'}
        open={formModalIsOpen}
        onClose={feedbackModalClose}
      >
        <Modal.Header>{i18next.t('Share your feedback')}</Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={{
              content,
              topics,
            }}
            validationSchema={feedbackSchema}
            onSubmit={(values) => {
              // Processing the data
              const topicsData = Object.entries(values.topics).map((value) => ({
                name: value[0],
                rating: value[1],
              }));
              callAction(() => {
                return formModalOperation({
                  id: id,
                  content: values.content,
                  topics: topicsData,
                });
              });
            }}
            enableReinitialize
          >
            {({ values, touched, errors, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Grid columns={2} divided padded stackable>
                  <Grid.Column computer={5} tablet={16} mobile={16}>
                    <Container style={{ marginBottom: '2rem' }}>
                      <Label circular color={'blue'} key={'blue'}>
                        1
                      </Label>{' '}
                      {i18next.t('Share your experience with this element')}
                    </Container>
                    <FeedbackTopics categories={categories} />
                    {errors.topics && (
                      <Grid fluid>
                        <Grid.Row>
                          <Grid.Column width={16} textAlign={'center'}>
                            <Label pointing>
                              {i18next.t('All categories must be defined!')}
                            </Label>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    )}
                  </Grid.Column>
                  <Grid.Column centered computer={11} tablet={16} mobile={16}>
                    <Container style={{ marginBottom: '2rem' }}>
                      <Label circular color={'blue'} key={'blue'}>
                        2
                      </Label>{' '}
                      {i18next.t(
                        'Tell the community a bit about your experiences with this element.'
                      )}
                    </Container>
                    <FeedbackText />
                  </Grid.Column>
                </Grid>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={16} align={'right'}>
                      <Button
                        color={'green'}
                        type={'submit'}
                        disabled={isSubmitting}
                      >
                        <Icon name={'send'} /> {i18next.t('Share')}
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </form>
            )}
          </Formik>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  callAction: (operation) => dispatch(operation()),
  feedbackModalClose: () => dispatch(feedbackModalClose()),
});

const mapStateToProps = (state) => ({
  formModalData: state.modal.formModalData,
  formModalIsOpen: state.modal.formModalIsOpen,
  formModalOperation: state.modal.formModalOperation,
});

export const FeedbackModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackModalComponent);

FeedbackModal.propTypes = {
  categories: PropTypes.array,
};

FeedbackModal.defaultProps = {
  categories: ['Clarity', 'Usefulness', 'Reusability'],
};
