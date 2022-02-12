export function getAppointmentsForDay(state,day){
  let appointmentsList = [];

  const filteredDays = state.days.filter((item) => item.name === day);

  if (filteredDays.length) {
    for (let appointment of filteredDays[0].appointments) {
      appointmentsList.push(state.appointments[appointment]);
    }
  }

  return appointmentsList;
}
export function getInterview(state,interview){
  if (interview) {
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  };
}
else{
  return null;
}
}
export function getInterviewersForDay(state, day) {
  let interviewersList = [];

  const filteredDays = state.days.filter((item) => item.name === day);

  if (filteredDays[0]) {
    interviewersList = filteredDays[0].interviewers.map((interviewer) => state.interviewers[interviewer]);
  }

  return interviewersList;
}