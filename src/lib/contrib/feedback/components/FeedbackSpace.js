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
} from 'semantic-ui-react';

import { i18next } from '@translations/i18next';

import {
  feedbackModalCreateFeedback,
  feedbackModalOpen,
} from '../state/operations/modal';
import { getFeedbackSpaceMetrics } from '../state/operations/metrics';

import { FeedbackModal } from './modal';
import { TimelineFeed } from './timeline';
import { Loader } from '../../../components';

export class FeedbackSpaceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoginRequiredMessage: false,
    };
  }

  componentDidMount() {
    const { getFeedbackSpaceMetrics } = this.props;
    getFeedbackSpaceMetrics();
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
  showLoginRequiredMessage() {
    this.setState({ ...this.state, showLoginRequiredMessage: true });
  }

  closeLoginRequiredMessage() {
    this.setState({ ...this.state, showLoginRequiredMessage: false });
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

    return (
      <Modal onClose={modalOnClose} open={modalIsOpen} size={'large'} closeIcon>
        <Modal.Header>Feedback space</Modal.Header>
        <Modal.Content>
          <Container>
            <Segment basic>
              <Container>
                <Grid fluid verticalAlign={'middle'}>
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <p className={'feedback feedback-metrics-title'}>
                        Community feedback for <b>{recordTitle}</b>
                      </p>
                    </Grid.Column>

                    <Grid.Column width={4} align={'right'}>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={16} textAlign={'center'}>
                            <Loader isLoading={metricsIsLoading}>
                              {recordMetricDataOverview ? (
                                <Statistic size={'small'}>
                                  <Statistic.Value>
                                    {recordMetricDataOverview}/5
                                  </Statistic.Value>
                                  <Statistic.Label>
                                    <Popup
                                      trigger={
                                        <p>
                                          General Rating{' '}
                                          <Icon name={'dropdown'} />
                                        </p>
                                      }
                                      flowing
                                      hoverable
                                    >
                                      <Grid
                                        centered
                                        divided
                                        columns={
                                          topicMetricsDataOverview.length
                                        }
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
                                  className={'feedback feedback-metrics-empty'}
                                >
                                  <Grid.Row>
                                    <Grid.Column
                                      width={16}
                                      textAlign={'center'}
                                    >
                                      {i18next.t(
                                        'General metrics not are not available.'
                                      )}
                                    </Grid.Column>
                                  </Grid.Row>
                                </Grid>
                              )}
                            </Loader>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={12}></Grid.Column>
                  <Grid.Column width={4}>
                    <Grid fluid>
                      <Grid.Row>
                        <Grid.Column width={16} textAlign={'center'}>
                          <Button
                            content={i18next.t('Share your feedback')}
                            size={'tiny'}
                            color={'green'}
                            onClick={() => {
                              if (user.userIsAuthenticated) {
                                feedbackCreateModal();
                              } else {
                                this.showLoginRequiredMessage();
                              }
                            }}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment basic>
              <TimelineFeed />
            </Segment>

            <FeedbackModal />

            <Modal
              open={this.state.showLoginRequiredMessage}
              onClose={() => {
                this.closeLoginRequiredMessage();
              }}
              closeIcon
              closeOnEscape={true}
              closeOnDimmerClick={true}
            >
              <Modal.Header>{i18next.t('Login required')}</Modal.Header>
              <Modal.Content>
                <Trans>
                  To create a new feedback in this record, you should be logged
                  in. <a href={'/signup'}>Click here</a> to register now or{' '}
                  <a href={'/login'}>Login</a>
                </Trans>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  content="Ok"
                  labelPosition="right"
                  icon="checkmark"
                  onClick={() => {
                    this.closeLoginRequiredMessage();
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
  getFeedbackSpaceMetrics: () => dispatch(getFeedbackSpaceMetrics()),
  feedbackCreateModal: () =>
    dispatch(feedbackModalOpen(feedbackModalCreateFeedback)),
});

const mapStateToProps = (state) => ({
  user: state.space.user,
  record: state.modal.record,
  metricsData: state.modal.metricsData,
  metricsIsLoading: state.modal.metricsIsLoading,
});

export const FeedbackSpace = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackSpaceComponent);
