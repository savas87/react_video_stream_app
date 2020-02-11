import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../action/index';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  //fetch all streams from start of component
  componentDidMount() {
    //load all streams with id
    //in action fetchstream can have a param
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = formValues => {
    //edit a stream
    this.props.editStream(this.props.match.params.id, formValues);
  };
  render() {
    console.log('props from compoennt', this.props);
    if (!this.props.stream) return <div>Loading...</div>;
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/**
         * lodash pick -> pick the title and description from stream
         */}
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
/*
    state -> whole state
    ownProps -> reference to Component props 
*/
const mapStateToProps = (state, ownProps) => {
  console.log('reference to props from component', ownProps);
  // props is streams -> the id which we want
  // props from component has now a stream
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
