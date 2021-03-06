import * as React from 'react';

import { Form, Icon, Button } from 'antd';
const FormItem = Form.Item;

import { withFormik, FormikErrors, FormikProps, Field, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import { LoggedOutContainer } from '../../shared/LoggedOutContainer';
import { InputField } from '../../shared/FormikField/InputField';

import './ForgotPasswordView.css';

interface FormValues {
  email: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class ForgotPasswordView extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <LoggedOutContainer>
        <FormikForm id="forgotPassword-form">
          <Field
            name="email"
            prefix={ <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> as any }
            placeholder="Email"
            component={InputField}
          />

          <FormItem>
            <Button type="primary" htmlType="submit" className="form-button">
              Reset password
            </Button>
            Or <Link to="/login">login now!</Link>
          </FormItem>
        </FormikForm>
      </ LoggedOutContainer>
    );
  }
}

const emailNotLongEnough = 'email must be at least 3 characters long';
const emailNotValid = 'email must be a valid email';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(emailNotValid)
    .required()
});

export default withFormik<Props, FormValues>({
  validationSchema,
  mapPropsToValues: () => ({ email: '', password: ''}),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    await props.submit(values).then(
      _ => {
        setSubmitting(false);
      },
      errors => {
        setSubmitting(false);
        const parsedErrors = {};
        errors.map((err: any) => parsedErrors[err.path] = err.message);

        setErrors(parsedErrors);
      }
    )
  }
})(ForgotPasswordView)
