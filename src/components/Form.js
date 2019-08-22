import React, { useState, useEffect} from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

function OnboardForm({ errors, touched, values, status }) {
  const [state, setState] = useState([]);
  console.log(touched)

  useEffect(() => {
    if (status) {
      setState([...state, status]);
    }
  }, [status])

  return (
    <div className="onboard-form">
      <h1>Onboard Form</h1>
      
      <Form>
        <Field type='text' name='name' placeholder='name' />
          {touched.name && errors.name && (
            <p>{errors.name}</p>
          )}
        
        <Field type='text' name='email' placeholder='email' />
        {touched.email && errors.email && (
            <p>{errors.email}</p>
          )}
        <Field type='text' name='password' placeholder='password'></Field>
        {touched.password && errors.password && (
            <p>{errors.password}</p>
          )}
        <label className="checkbox-container">
          CheckBox
          <Field
            type="checkbox"
            name="checkbox"
            checked={false}
          />
          <span className="checkmark" />
        </label>

        <button type="submit">Submit!</button>
      </Form>
      {state.map(person => (
        <ul key={person.id}>
          <li>Name: {person.name}</li>
          <li>email: {person.email}</li>
        </ul>
      ))}
    </div>
  );
}

const FormikOnboardForm = withFormik({
  mapPropsToValues({name, email, password}) {
    return {
      name: name || '',
      email: email || '',
      password: password || ''
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name required'),
    email: Yup.string().required('Hello email please'),
    password: Yup.string().required('Really dude, password?')
  }),

  handleSubmit(values, { setStatus }) {
    axios.post(' https://reqres.in/api/users', values)
    .then(res => {
      setStatus(res.data)
    })
    .catch(error => console.log('Sorry error ', error))
  }
})(OnboardForm);

export default FormikOnboardForm;
