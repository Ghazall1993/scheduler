function getAppointmentsForDay(state, day) {
  const result = []
  const findDay = state.days.filter(elem => elem.name === day);

  if (!findDay || findDay.length === 0) {
    return [];
  }

  for (const app of findDay[0].appointments) {
    for (const key in state.appointments) {
      if (app === state.appointments[key].id) {
        result.push(state.appointments[key])
      }
    }
  }
  return result;
}

function getInterview(state, interview) {
  const result = [];
  if (!interview || !interview.interviewer) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return {
    ...interview,
    interviewer,
  };
}


function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(elem => elem.name === day);

  if (state.days.length === 0 || dayObj === undefined) {
    return [];
  }
  if (dayObj.interviewers) {
    return dayObj.interviewers.map((interviewerId) => {
      return state.interviewers[interviewerId]
    })
  } else {
    return []
  }
}
module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }