import { React, useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  // retrieve the day of an appoinment id
  function getDayFromAppointment(id){
    return (state.days.find(day => day.appointments.includes(id)))
  }

  // add an appoinment both in client and server
  function bookInterview(id, interview) {
    console.log(id, interview);
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
          getDayFromAppointment(id).spots --
          setState({ ...state, appointments })
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
          getDayFromAppointment(id).spots ++
          setState({ ...state, appointments })
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

