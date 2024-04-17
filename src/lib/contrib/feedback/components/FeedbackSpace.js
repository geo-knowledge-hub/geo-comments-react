/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Trans } from 'react-i18next';

import _sum from 'lodash/sum';
import _groupBy from 'lodash/groupBy';

import {
  Modal,
  Segment,
  Grid,
  Statistic,
  Button,
  Popup,
  Icon,
  Container,
  List,
  Header,
} from 'semantic-ui-react';

import { i18next } from '@translations/i18next';

import {
  feedbackModalCreateFeedback,
  feedbackModalOpen,
} from '../state/operations/modal';

import { getFeedbackSpaceMetrics } from '../state/operations/metrics';
import { getFeedbackSpaceUserStatus } from '../state/operations/user';

import { FeedbackModal } from './modal';
import { TimelineFeed } from './timeline';
import { Loader } from '../../../components';
import { stopSideEffectUpdate } from '../../../state/operations/effect';

export class FeedbackSpaceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalTitle: '',
      modalMessage: '',
      showModalMessage: false,
    };
  }

  componentDidMount() {
    this.updateUserAndMetrics();
  }

  updateUserAndMetrics() {
    const { getFeedbackSpaceMetrics, getFeedbackSpaceUserStatus } = this.props;
    getFeedbackSpaceMetrics();
    getFeedbackSpaceUserStatus();
  }

  /**
   * Calculate overview metrics for each topic available.
   */
  generateTopicsOverviewMetrics(metricsData) {
    if (metricsData) {
      const metricGroups = _groupBy(metricsData, 'name');

      return Object.entries(metricGroups).map((metricGroup) => {
        const data = metricGroup[1];

        const topicOverviewMetric =
          _sum(
            data.map((metric) => {
              return metric.stats.avg;
            })
          ) / data.length;

        return {
          name: metricGroup[0],
          rating: Math.round(topicOverviewMetric),
        };
      });
    }
    return [];
  }

  /**
   * Calculate a single metric to create a overview of the record feedbacks.
   */
  generateRecordOverviewMetric(topicOverviewMetrics) {
    return Math.round(
      _sum(topicOverviewMetrics.map((metric) => metric.rating)) /
        topicOverviewMetrics.length
    );
  }

  /**
   * Methods to handle the login required message.
   */
  showModalMessage(modalTitle, modalMessage) {
    this.setState({
      ...this.state,
      modalTitle,
      modalMessage,
      showModalMessage: true,
    });
  }

  closeModalMessage() {
    this.setState({
      ...this.state,
      modalTitle: '',
      modalMessage: '',
      showModalMessage: false,
    });
  }

  render() {
    const {
      user,
      record,
      modalOnClose,
      modalIsOpen,
      metricsIsLoading,
      metricsData,
      feedbackCreateModal,
      userStateData,
      userStateDataIsLoading,
      needSideEffectUpdate,
      stopSideEffectUpdate,
    } = this.props;

    // Properties
    const recordTitle = record?.metadata?.title;
    const topicMetricsData = metricsData?.topics || [];

    // Generating overview metrics
    const topicMetricsDataOverview =
      this.generateTopicsOverviewMetrics(topicMetricsData);

    const recordMetricDataOverview = this.generateRecordOverviewMetric(
      topicMetricsDataOverview
    );

    if (needSideEffectUpdate) {
      // Side effecting some components
      setTimeout(() => {
        this.updateUserAndMetrics();
      }, 1000);

      stopSideEffectUpdate();
    }

    return (
      <Modal onClose={modalOnClose} open={modalIsOpen} size={'large'} closeIcon>
        <Modal.Header>Feedback space</Modal.Header>
        <Modal.Content>
          <Container>
            <Segment basic>
              <Container>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column computer={12} mobile={16} tablet={16}>
                      <p className={'feedback feedback-metrics-title'}>
                        Community feedback for <b>{recordTitle}</b>
                      </p>
                    </Grid.Column>

                    <Grid.Column
                      width={4}
                      textAlign={'right'}
                      only={'computer'}
                    >
                      <Loader
                        isLoading={
                          metricsData === undefined && metricsIsLoading
                        }
                      >
                        {recordMetricDataOverview ? (
                          <Statistic size={'small'}>
                            <Statistic.Value>
                              {recordMetricDataOverview}/5
                            </Statistic.Value>
                            <Statistic.Label>
                              <Popup
                                trigger={
                                  <p>
                                    General Rating <Icon name={'dropdown'} />
                                  </p>
                                }
                                flowing
                                hoverable
                              >
                                <Grid
                                  centered
                                  divided
                                  columns={topicMetricsDataOverview.length}
                                >
                                  {topicMetricsDataOverview.map(
                                    (topicMetric) => (
                                      <Grid.Column textAlign="center">
                                        <Statistic size={'tiny'}>
                                          <Statistic.Label>
                                            {topicMetric.name}
                                          </Statistic.Label>
                                          <Statistic.Value>
                                            {topicMetric.rating}/5
                                          </Statistic.Value>
                                        </Statistic>
                                      </Grid.Column>
                                    )
                                  )}
                                </Grid>
                              </Popup>
                            </Statistic.Label>
                          </Statistic>
                        ) : (
                          <Grid
                            fluid
                            padded
                            className={'feedback feedback-metrics-empty'}
                          >
                            <Grid.Row>
                              <Grid.Column width={16} textAlign={'center'}>
                                {i18next.t(
                                  'There is not feedback metrics available yet.'
                                )}
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        )}
                      </Loader>
                    </Grid.Column>

                    <Grid.Column
                      width={16}
                      textAlign={'left'}
                      only={'mobile tablet'}
                      style={{ padding: '20px' }}
                    >
                      <Loader
                        isLoading={
                          metricsData === undefined && metricsIsLoading
                        }
                      >
                        {recordMetricDataOverview ? (
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={16}>
                                <Header as={'h3'}>General Rating</Header>
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                              <Grid.Column width={16}>
                                <List
                                  selection
                                  verticalAlign={'middle'}
                                  size={'big'}
                                >
                                  {topicMetricsDataOverview.map(
                                    (topic, index) => {
                                      const topicValue = Math.round(
                                        topic.rating
                                      );
                                      return (
                                        <List.Item>
                                          <List.Content floated={'right'}>
                                            <List.Header>
                                              <p>{topicValue}/5</p>
                                            </List.Header>
                                          </List.Content>
                                          <List.Content
                                            style={{
                                              textTransform: 'capitalize',
                                            }}
                                          >
                                            <List.Header>
                                              <p>{topic.name}</p>
                                            </List.Header>
                                          </List.Content>
                                        </List.Item>
                                      );
                                    }
                                  )}
                                </List>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        ) : (
                          <Grid
                            fluid
                            padded
                            className={'feedback feedback-metrics-empty'}
                          >
                            <Grid.Row>
                              <Grid.Column width={16} textAlign={'center'}>
                                {i18next.t(
                                  'There is not feedback metrics available yet.'
                                )}
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        )}
                      </Loader>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row only={'computer'}>
                    <Grid.Column textAlign={'right'}>
                      <Loader
                        isLoading={
                          userStateData === undefined && userStateDataIsLoading
                        }
                      >
                        <Button
                          content={i18next.t('Share your feedback')}
                          size={'tiny'}
                          color={'green'}
                          onClick={() => {
                            if (user.userIsAuthenticated) {
                              if (!userStateData.is_valid_to_create) {
                                this.showModalMessage(
                                  i18next.t('Feedback validation'),
                                  i18next.t(
                                    'You already have feedback. Please, you can edit your already defined ' +
                                      'feedback providing more details, or' +
                                      ' delete it to create a new one.'
                                  )
                                );
                              } else {
                                feedbackCreateModal();
                              }
                            } else {
                              this.showModalMessage(
                                i18next.t('Login required'),
                                <Trans>
                                  To create a new feedback in this record, you
                                  should be logged in.{' '}
                                  <a href={'/signup'}>Click here</a> to register
                                  now or <a href={'/login'}>Login</a>
                                </Trans>
                              );
                            }
                          }}
                        />
                      </Loader>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row only={'tablet mobile'}>
                    <Grid.Column>
                      <Loader
                        isLoading={
                          userStateData === undefined && userStateDataIsLoading
                        }
                      >
                        <Button
                          content={i18next.t('Share your feedback')}
                          fluid
                          size={'tiny'}
                          color={'green'}
                          onClick={() => {
                            if (user.userIsAuthenticated) {
                              if (!userStateData.is_valid_to_create) {
                                this.showModalMessage(
                                  i18next.t('Feedback validation'),
                                  i18next.t(
                                    'You already have feedback. Please, you can edit your already defined ' +
                                      'feedback providing more details, or' +
                                      ' delete it to create a new one.'
                                  )
                                );
                              } else {
                                feedbackCreateModal();
                              }
                            } else {
                              this.showModalMessage(
                                i18next.t('Login required'),
                                <Trans>
                                  To create a new feedback in this record, you
                                  should be logged in.{' '}
                                  <a href={'/signup'}>Click here</a> to register
                                  now or <a href={'/login'}>Login</a>
                                </Trans>
                              );
                            }
                          }}
                        />
                      </Loader>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
            <Segment basic>
              <TimelineFeed />
            </Segment>

            <FeedbackModal />

            <Modal
              open={this.state.showModalMessage}
              onClose={() => {
                this.closeModalMessage();
              }}
              closeIcon
              closeOnEscape={true}
              closeOnDimmerClick={true}
            >
              <Modal.Header>{this.state.modalTitle}</Modal.Header>
              <Modal.Content>{this.state.modalMessage}</Modal.Content>
              <Modal.Actions>
                <Button
                  content="Ok"
                  labelPosition="right"
                  icon="checkmark"
                  onClick={() => {
                    this.closeModalMessage();
                  }}
                  positive
                />
              </Modal.Actions>
            </Modal>
          </Container>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getFeedbackSpaceUserStatus: () => dispatch(getFeedbackSpaceUserStatus()),
  getFeedbackSpaceMetrics: () => dispatch(getFeedbackSpaceMetrics()),
  feedbackCreateModal: () =>
    dispatch(feedbackModalOpen(feedbackModalCreateFeedback)),
  stopSideEffectUpdate: () => dispatch(stopSideEffectUpdate()),
});

const mapStateToProps = (state) => ({
  user: state.space.user,
  record: state.modal.record,
  metricsData: state.modal.metricsData,
  metricsIsLoading: state.modal.metricsIsLoading,
  userStateData: state.modal.userStateData,
  userStateDataIsLoading: state.modal.userStateDataIsLoading,
  needSideEffectUpdate: state.timeline.needSideEffectUpdate,
});

export const FeedbackSpace = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackSpaceComponent);
