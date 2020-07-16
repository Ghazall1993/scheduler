import "components/Appointment/styles.scss"
import React, { Fragment } from "react";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode"
import Form from "./Form";
import getInterviewersForDay from "helpers/selectors"
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props
    .bookInterview(props.id, interview)
    .then(() => { transition(SHOW, true) })
    .catch((error) => {
      debugger
      transition(ERROR_SAVE)
    });
  };

  function cancel() {
    transition(DELETING,true)
    props
    .cancelInterview(props.id)
    .then(() => { transition(EMPTY) })
    .catch((error) => {
      transition(ERROR_DELETE,true)
    });
  };


  return (
    <article className="appointment">
      <Header time={props.time}></Header>

      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === SAVING && (
        <Status message="Saving..." />
      )}

      {mode === DELETING && (
        <Status message="DELETING..." />
      )}

      {mode === CONFIRM && (
        <Confirm
          onConfirm={cancel}
          onCancel={back}
          message="Are you sure you would like to delete?"
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          onClose={back}
          message="Could not save appoinment!"
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          onClose={back}
          message="Could not cancel appoinment!"
        />
      )}

    </article>
  );
}