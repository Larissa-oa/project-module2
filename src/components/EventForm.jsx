import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactTimeZoneSelect from "react-timezone-select";
import { uploadToCloudinary } from "../utils/cloudinaryConfig";
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
    eventImage: "",
  });

  // State for image upload
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Automatically detect user's timezone on component mount
  useEffect(() => {
    const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setFormData((prev) => ({ ...prev, eventTimezone: defaultTimezone }));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle timezone change from react-timezone-select
  const handleTimezoneChange = (selectedTimezone) => {
    setFormData((prev) => ({
      ...prev,
      eventTimezone: selectedTimezone.value,
    }));
  };

  // URL Image Preview Handler
  const handleUrlPreview = () => {
    if (formData.eventImage) {
      setFormData((prev) => ({
        ...prev,
        eventImage: formData.eventImage,
      }));
      setImagePreview(formData.eventImage);
    }
  };

  // Cloudinary image upload handler
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const uploadedImageUrl = await uploadToCloudinary(file);

      // Update form data with Cloudinary image URL
      setFormData((prev) => ({
        ...prev,
        eventImage: uploadedImageUrl,
      }));
      setImagePreview(uploadedImageUrl);
      setIsUploading(false);
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image. Please try again.");
      setIsUploading(false);
    }
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
      image: formData.eventImage,
    };

    addEvent(newEvent);
    console.log(newEvent);

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
      eventImage: "",
    });

    closeForm();
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

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
          min={today}
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

      <div className="form-group">
        <label>Image</label>
        <p>Enter a URL</p>
        <div className="image-upload-container">
          <input
            type="text"
            id="eventImage"
            name="eventImage"
            value={formData.eventImage}
            onChange={handleChange}
            placeholder="Paste image URL here"
          />
          <button
            type="button"
            onClick={handleUrlPreview}
            disabled={!formData.eventImage}
          >
            Preview your URL image
          </button>
        </div>

        <p>Or</p>
        <div className="file-upload-container">
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <button
            type="button"
            onClick={() => document.getElementById("imageUpload").click()}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>

        {imagePreview && (
          <div className="image-preview">
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          </div>
        )}
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
            <label htmlFor="eventCountry">Address</label>
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

      <div className="form-group" id="time-form">
        <label htmlFor="eventTimezone">Timezone</label>
        <ReactTimeZoneSelect
          value={formData.eventTimezone}
          onChange={handleTimezoneChange}
        />
      </div>

      <button className="submit-btn" type="submit">
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
