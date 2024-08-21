import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import EventCard from "./EventCard";
import { useForm } from "react-hook-form";

const CalendarComponent = () => {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  // Load data
  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  // React hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    const title = data.title;
    const description = data.description;
    const date = startDate;
    const eventInfo = {title, description, date}

    console.log(eventInfo)
  }

  // console.log(startDate);

  const showModal = () => {
    
    // const {value: text}=await Swal.fire({
    //   title: "Input email address",
    //   input: "text",
    //   input: "textarea",
    //   inputLabel: "Your email address",
    //   inputPlaceholder: `Enter Title here
    //   Start typing here
    //   `
    // });
    // if (text) {
    //   // Swal.fire(`Entered email: ${text}`);

    // }
    console.log(value);
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-col items-center space-y-5 mt-10">
        <div>
          <h1 className="text-3xl font-bold">Event Lists</h1>
        </div>
        <div className="relative">
          <EventCard events={events} />
        </div>
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
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
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
                      dateFormat={"dd/mm/yyyy"}
                    />
                    <label className="label">
                      <span className="label-text">Event title</span>
                    </label>
                    <input
                      {...register("title")}
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
                      {...register("description")}
                      className="textarea textarea-bordered"
                      placeholder="event details"
                      required
                    ></textarea>
                  </div>
                  <button className="btn bg-[#F6F5F5] hover:bg-[#F9E2AF] border-none">Done</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <div className="flex items-center">
        <Calendar
          onChange={setValue}
          className={""}
          onClickDay={showModal}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
