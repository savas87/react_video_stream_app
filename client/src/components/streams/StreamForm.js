import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../action';

class StreamForm extends Component {
  //render error field
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  // render input field
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  //eventhelper
  onSubmit = formValues => {
    //redux action createStream with param
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//simple validation
const validate = formValue => {
  const errors = {};
  if (!formValue.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValue.description) {
    errors.description = 'You must enter a title';
  }
  return errors;
};

// export both conect and reduxForm
export default reduxForm({
  form: 'streamForm',
  validate: validate
})(StreamForm);
