import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./EventForm.css";

const EventForm = ({ eventType, addEvent, closeForm }) => {
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDate: "",
    eventTime: "",
    eventDescription: "",
    eventLocation: eventType,
    eventCity: "",
    eventAddress: "",
    eventLink: "",
    eventTimezone: "",
  });

  // Add the handleChange function
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.eventTitle ||
      !formData.eventDate ||
      !formData.eventLocation ||
      !formData.eventTimezone ||
      (eventType === "Online" && !formData.eventLink)
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEvent = {
      id: uuidv4(),
      title: formData.eventTitle,
      date: formData.eventDate,
      time: formData.eventTime,
      description: formData.eventDescription,
      location: formData.eventLocation,
      city: formData.eventCity,
      address: formData.eventAddress,
      link: formData.eventLink || "",
      timezone: formData.eventTimezone,
      timestamp: new Date().toISOString(),
    };

    addEvent(newEvent);
    console.log(newEvent);

    // Reset form
    setFormData({
      eventTitle: "",
      eventDate: "",
      eventTime: "",
      eventDescription: "",
      eventLocation: eventType,
      eventCity: "",
      eventAddress: "",
      eventLink: "",
      eventTimezone: "",
    });

    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2 className="title-form">{`Create ${eventType} Event`}</h2>

      <div className="form-group">
        <label htmlFor="eventTitle">Event Title</label>
        <input
          type="text"
          id="eventTitle"
          name="eventTitle"
          value={formData.eventTitle}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="eventDate">Event Date</label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="eventTime">Event Time</label>
        <input
          type="time"
          id="eventTime"
          name="eventTime"
          value={formData.eventTime}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="eventDescription">Event Description</label>
        <textarea
          id="eventDescription"
          name="eventDescription"
          value={formData.eventDescription}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="eventLocation">Type</label>
        <input
          type="text"
          id="eventLocation"
          name="eventLocation"
          value={formData.eventLocation}
          onChange={handleChange}
          disabled
        />
      </div>

      {eventType !== "Online" && (
        <>
          <div className="form-group">
            <label htmlFor="eventCity">City</label>
            <input
              type="text"
              id="eventCity"
              name="eventCity"
              value={formData.eventCity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventAddress">Address</label>
            <input
              type="text"
              id="eventAddress"
              name="eventAddress"
              value={formData.eventAddress}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      {eventType === "Online" && (
        <div className="form-group">
          <label htmlFor="eventLink">Event Link</label>
          <input
            type="url"
            id="eventLink"
            name="eventLink"
            value={formData.eventLink}
            onChange={handleChange}
            placeholder="Enter the link for the online event"
            required
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="eventTimezone">Timezone</label>
        <input
          type="text"
          id="eventTimezone"
          name="eventTimezone"
          value={formData.eventTimezone}
          onChange={handleChange}
          required
        />
      </div>

      <button className="submit-btn" type="submit">
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
