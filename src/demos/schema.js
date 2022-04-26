/*
 * This file is part of GEO-Feedback-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Feedback-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required(),
  feedback: Yup.object().shape({
    clarity: Yup.number().required(),
    usefulness: Yup.number().required(),
    reusability: Yup.number().required(),
  }),
  comment: Yup.string().min(20).required(),
});
