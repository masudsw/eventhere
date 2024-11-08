import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from './shared/Heading';
import useAxiosCommon from '../hooks/useAxiosCommon';
import Container from './shared/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth';

const CreateEvent = () => {
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [eventData, setEventData] = useState({
    title: '',
    eventType: '',
    location: '',
    date: '',
    image: '',
    entryFee: '',
    specialNote: '',
    tag: ''
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageFile = e.target.image.files[0];

    if (!imageFile) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      setLoading(true);

      // 1. Upload image to imgbb
      const { data } = await axiosCommon.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = data.data.display_url;

      // 2. Save event data including image URL
      const newEventData = {
        ...eventData,
        image: imageUrl,
        userName: user?.displayName || 'Anonymous',
        userEmail: user?.email || 'No email provided',
        userImage: user?.photoURL || 'default_image_url' // Use a default URL if there's no profile image

      };
      await axiosCommon.post('/events', newEventData);

      // Display success message and redirect
      Swal.fire({
        title: "yes!",
        text: "Task added!",
        icon: "success"
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Create New Event</title>
      </Helmet>
      <div className="max-w-screen-lg mx-auto">
        <ToastContainer />
        <Heading title="Create a New Event" subtitle="Fill in the details below" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="text-lg font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Event Type */}
            <div>
              <label className="text-lg font-semibold">Event Type</label>
              <input
                type="text"
                name="eventType"
                value={eventData.eventType}
                onChange={handleChange}
                placeholder="Event Type"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-lg font-semibold">Location</label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                placeholder="Event Location"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="text-lg font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Event Image */}
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>

            {/* Entry Fee */}
            <div>
              <label className="text-lg font-semibold">Entry Fee</label>
              <input
                type="number"
                name="entryFee"
                value={eventData.entryFee}
                onChange={handleChange}
                placeholder="Entry Fee"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Special Note */}
            <div>
              <label className="text-lg font-semibold">Special Note</label>
              <textarea
                name="specialNote"
                value={eventData.specialNote}
                onChange={handleChange}
                placeholder="Add any special notes here"
                className="w-full p-2 border rounded-md"
                rows="4"
              />
            </div>

            {/* Tag */}
            <div>
              <label className="text-lg font-semibold">Tag</label>
              <input
                type="text"
                name="tag"
                value={eventData.tag}
                onChange={handleChange}
                placeholder="Event Tag (e.g., networking, workshop)"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-40 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors my-8 ${loading ? 'cursor-not-allowed' : ''}`}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CreateEvent;
