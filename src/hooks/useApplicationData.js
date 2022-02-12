import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_INTERVIEW,
} from "../reducers/application";

export default function useApplicationData() {
  
  const [state, dispatch] = 
  //useState(
  useReducer(reducer, 
    {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => 
  dispatch({ type: SET_DAY, day });
  //setState({ ...state, day });
  
useEffect(() => {
  Promise.all([
  axios.get("http://localhost:8001/api/days"),
  axios.get("http://localhost:8001/api/appointments"),
  axios.get("http://localhost:8001/api/interviewers")
  ])
  .then((all) => {
    dispatch({ type: SET_APPLICATION_DATA, 
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data });
   /* setState(prev => (
      {...prev, 
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data}
      ));*/
      //Web Socket
    /*  const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
        socket.onopen = () => {
        console.log("Web socket opened");
        socket.send("Ping...");
      };
      //On message from server, update state with interview
      socket.onmessage = appointmentData => {
        const appointment = JSON.parse(appointmentData.data);
        console.log(appointment);

        if (appointment.type === "SET_INTERVIEW") {

        //  dispatch({ type: "UPDATE_INTERVIEW", id: appointment.id, interview: appointment.interview});
        }
      };*/
  });
  }, []);

  function bookInterview(id, interview) {
 /*   const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // update spots
    
    const days = [...state.days];
    for (let i in days) {
      let day = days[i];
      if (day.appointments.includes(id)) {
        const newDay = { ...day, spots: day.spots - 1 };
        days[i] = newDay;
      }
    }*/

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then(() => {
     // setState({ ...state, appointments, days});
      dispatch({ type: SET_INTERVIEW, id, interview });
  });

  
 };

 function cancelInterview(id) {
  /*const appointment = {
    ...state.appointments[id],
    interview: null,
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };

  // update spots
  const days = [...state.days];
  for (let i in days) {
    let day = days[i];
    if (day.appointments.includes(id)) {
      const newDay = { ...day, spots: day.spots + 1 };
      days[i] = newDay;
    }
  }*/

  return axios
    .delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => 
    dispatch({ type: SET_INTERVIEW, id, interview: null })
   // setState({ ...state, appointments, days })
    );
};

  /*
function editInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview },
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };

  return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then(() => {
    setState({ ...state, appointments });
  });
};
*/


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    //editInterview,
  };
}