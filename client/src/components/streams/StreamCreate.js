import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../action';
import StreamForm from './StreamForm';

class StreamCreate extends Component {
  //eventhelper
  onSubmit = formValues => {
    //redux action createStream with param
    this.props.createStream(formValues);
  };
  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
