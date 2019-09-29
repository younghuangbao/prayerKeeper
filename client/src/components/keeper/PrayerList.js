import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { addRequest, deleteRequest } from '../../actions/keeper';

const PrayerList = ({ prayerList, addRequest, deleteRequest }) => {
  const [formData, setFormData] = useState({
    name: '',
    text: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addRequest(formData);
    setFormData({
      name: '',
      text: ''
    });
  };

  const requests = prayerList.map(request => (
    <div className='card' key={request._id}>
      <div className='card-body'>
        <h5 className='card-title'>{request.name}</h5>
        <p className='card-text'>{request.text}</p>
        <Button onClick={() => deleteRequest(request._id)} variant='info'>
          Delete
        </Button>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <h2>Prayer List</h2>
      <div class='post-form'>
        <div class='bg-primary p'>
          <h3>Add To Prayer List</h3>
        </div>
        <form class='form my-1' onSubmit={handleSubmit}>
          <textarea
            name='name'
            placeholder='Who do you want to pray for?'
            onChange={handleChange}
            required
          ></textarea>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='What do you want to pray about?'
            onChange={handleChange}
            required
          ></textarea>
          <input type='submit' class='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
      {requests}
    </Fragment>
  );
};

PrayerList.propTypes = {
  prayerList: PropTypes.array.isRequired,
  addRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired
};

export default connect(
  null,
  { addRequest, deleteRequest }
)(PrayerList);
