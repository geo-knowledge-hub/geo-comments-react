/*
 * This file is part of GEO-Comments-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Comments-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function MinHeightPlugin(editor) {
  this.editor = editor;
}

function setMinHeight(minHeight) {
  MinHeightPlugin.prototype.init = function () {
    this.editor.ui.view.editable.extendTemplate({
      attributes: {
        style: {
          minHeight: minHeight,
        },
      },
    });
  };
  ClassicEditor.builtinPlugins.push(MinHeightPlugin);
}

const defaultConfig = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'Indent',
    'Outdent',
    'blockQuote',
    'Undo',
    'Redo',
  ],
};

export class CommentEditor extends Component {
  constructor(props) {
    super(props);
    const { minHeight } = this.props;
    if (minHeight !== undefined) {
      setMinHeight(minHeight);
    }
  }

  render() {
    const {
      editor,
      data,
      config,
      id,
      disabled,
      onReady,
      onChange,
      onBlur,
      onFocus,
    } = this.props;
    return (
      <CKEditor
        editor={editor}
        data={data}
        config={config}
        id={id}
        disabled={disabled}
        onReady={onReady}
        onInit={onReady}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );
  }
}

CommentEditor.propTypes = {
  editor: PropTypes.func,
  data: PropTypes.string,
  config: PropTypes.object,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onReady: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  minHeight: PropTypes.string,
};

CommentEditor.defaultProps = {
  editor: ClassicEditor,
  minHeight: undefined,
  data: '',
  config: defaultConfig,
  id: undefined,
  disabled: undefined,
  onReady: undefined,
  onChange: undefined,
  onBlur: undefined,
  onFocus: undefined,
};
