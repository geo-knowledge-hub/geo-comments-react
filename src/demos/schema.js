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
