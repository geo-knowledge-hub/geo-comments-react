/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BaseModal } from './BaseModal';
import { i18next } from '@translations/i18next';

import { serializeErrorObject } from '../../utils';

/**
 * Modal to confirm deletion operation.
 *
 * @note Component adapted from Invenio Requests.
 */
export class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: '',
    };
  }

  onDelete = async () => {
    const { action, onClose } = this.props;

    this.setState({
      isLoading: true,
    });

    try {
      await action();
      this.setState({
        isLoading: false,
        error: '',
      });
      onClose();
    } catch (error) {
      this.setState({
        isLoading: false,
        error: serializeErrorObject(error),
      });
    }
  };

  render() {
    const { onOpen, onClose, open } = this.props;
    const { isLoading, error } = this.state;

    return (
      <BaseModal
        contentText={i18next.t('Are you sure you want to delete this comment?')}
        action={this.onDelete}
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        isLoading={isLoading}
        error={error}
        headerText={i18next.t('Confirm')}
        cancelButtonText={i18next.t('Cancel')}
        actionButtonText={i18next.t('Delete')}
      />
    );
  }
}

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
