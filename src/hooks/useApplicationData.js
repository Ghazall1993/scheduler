import { React, useState, useEffect } from "react";
import axios from "axios";
import { object } from "prop-types";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  // retrieve the day of an appoinment id
  function getDayFromAppointment(id) {
    return (state.days.find(day => day.appointments.includes(id)))
  }

  // add an appoinment both in client and server
  function bookInterview(id, interview) {
    const alreadyBooked = state.appointments[id].interview
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview: appointment.interview })
      .then((response) => {
        if (response.status === 204) {

          if (!alreadyBooked) {
            const newDays = state.days.map((d) => {
              return (d.name === state.day ? { ...d, spots: d.spots - 1 } : d)
            })
            setState({ ...state, appointments, days: newDays })
          } else{
            setState({ ...state, appointments})
          }
        }
      });
  }

  function cancelInterview(id) {
    const appointments = {
      ...state.appointments,
    };
    appointments[id].interview = null;

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        if (response.status === 204) {
          const newDays = state.days.map((d) => {
            return (d.name === state.day ? { ...d, spots: d.spots + 1 } : d)
          })
          setState({ ...state, appointments, days: newDays })
        }
      });
  }

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }))
      });
  }, []
  );

  return (
    {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }
  );
}

