import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import EventCard from "./EventCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import useEvent from "../hooks/useEvent";

const CalendarComponent = () => {
  const axiosPublic = useAxiosPublic();
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [events, refetch] = useEvent();

  const formatedDate = format(new Date(startDate), "MM/dd/yyyy");
  // const selectedDate = format(new Date(date), "MM/dd/yyyy");

  const formatDate = date => {
    return format(new Date(date), "MM/dd/yyyy");
  }

  const hasEvent = (date) => {
    const calendarFormatedDate = formatDate(date);
    return events.some(event => event.date === calendarFormatedDate);
  }

  const onSubmit = async (e) => {
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const date = formatedDate;
    const eventInfo = { title, description, date }

    await axiosPublic.post('/events', eventInfo)
      .then(res => {
        if (res.data.insertedId) {
          toast.success('Event added Successfully!')
        }
      })
      .catch(err => toast.error(`${err.message}`))
    refetch();
  }


  return (
    <div className="flex justify-around" >
      <div className="flex flex-col items-center space-y-5 mt-10">
        <div>
          <h1 className="text-3xl font-bold">Event Lists</h1>
        </div>
        <div className="relative">
          <EventCard events={events} />
        </div>
        {/* Modal div */}
        <div className="mt-10 flex justify-center">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn bg-[#F6F5F5] hover:bg-[#F9E2AF] border-none"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Add Event
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <div className="modal-action">
                <form onSubmit={onSubmit} className="card-body" method="dialog">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Event Date</span>
                    </label>
                    <DatePicker
                      className="border-2 w-full text-center p-3 rounded-xl"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      isClearable
                      placeholderText="Selection cleared!"
                    />
                    <label className="label">
                      <span className="label-text">Event title</span>
                    </label>
                    <input
                      name="title"
                      type="text"
                      placeholder="event title"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Event details</span>
                    </label>
                    <textarea
                      name="description"
                      className="textarea textarea-bordered"
                      placeholder="event details"
                      required
                    ></textarea>
                  </div>
                  <button className="btn bg-[#F6F5F5] hover:bg-[#F9E2AF] border-none">Done</button>
                  <p className="text-center mt-8">Press <strong>ESC</strong> to close the modal</p>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <Calendar
          oncli={setDate}
          tileClassName={({ date, view }) => view === 'month' && hasEvent(date) ? 'event-date' : null}
        />
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div >
  );
};

export default CalendarComponent;
