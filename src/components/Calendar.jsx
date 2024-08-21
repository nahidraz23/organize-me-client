import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

const CalendarComponent = () => {
  const [value, setValue] = useState(new Date())
  const [events, setEvents] = useState([])
  const [startDate, setStartDate] = useState(new Date());


  // Load data
  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => setEvents(data))
  }, [])

  console.log(startDate)

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
    console.log(value)
  }

  return (
    <div className='flex justify-between'>
      <div>
        <div>
          <h1 className='text-3xl font-bold'>Event Lists</h1>
        </div>
        <div className='relative'>
          <div className='border-2 w-[550px] h-[600px] space-y-3 overflow-auto flex flex-col items-center rounded-2xl p-5'>
            {
              events.map(event =>
                <>
                  <div className=''>
                    <div className="card bg-base-100 w-96 shadow-xl ">
                      <div className="card-body">
                        <div className="card-actions justify-end">
                          <button className="btn btn-square btn-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className='text-center'>
                          <h1>{event.title}</h1>
                          <p>{event.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>)
            }
          </div>
        </div>
        <div className='mt-10 flex justify-center'>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Event</button>
          <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">

              {/* form start */}
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Event Date</span>
                  </label>
                  <DatePicker
                    className='border-2 w-full text-center p-3 rounded-xl'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    isClearable
                    placeholderText="Selection cleared!"
                  />
                  <label className="label">
                    <span className="label-text">Event title</span>
                  </label>
                  <input type="text" placeholder="event title" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Event details</span>
                  </label>
                  <textarea className="textarea textarea-bordered" placeholder="Bio" required></textarea>
                </div>
              </form>
              {/* form end */}
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Done</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      <div clas>
        <Calendar
          onChange={setValue}
          className={''}
          onClickDay={showModal}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;