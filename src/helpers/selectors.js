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
  // console.log("interviewrrr: ", interviewer);
  return {
    ...interview,
    interviewer,
  };
}


function getInterviewersForDay(state, day) {
  const result = new Set()

  const findInterviewers = state.days.filter(elem => elem.name === day);

  if (state.days.length === 0 || findInterviewers[0] === undefined) {
    return [];
  }
console.log("findInterviewers[0]: ",findInterviewers[0]);
  for (const app of findInterviewers[0].appointments) {
    for (const key in state.appointments) {
      if (app === state.appointments[key].id) {
        if (state.appointments[key].interview !== null){
          result.add(state.interviewers[state.appointments[key].interview.interviewer])
        }
      }
    }
  }
  return Array.from(result);
}

module.exports = { getAppointmentsForDay, getInterview,getInterviewersForDay }