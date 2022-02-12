import React from "react";
import { useEffect } from 'react';
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Confirm from "components/Appointment/Confirm";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/style.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const ERROR_SAVE = "ERROR_SAVE";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR_DELETE = "ERROR_DELETE";
const EDIT = "EDIT";
export default function Appointment(props){
  function bookInterview(id, interview) {
    console.log(id, interview);
  }
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  useEffect(() => {
    
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
    }, [mode, transition, props.interview]);

  function save(name, interviewer) {
    
    if (name && interviewer) {
      transition(SAVING);

      const interview = {
        student: name,
        interviewer
      };

      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true))
    }
  }
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };     
    transition("SAVING");
    props
    .bookInterview(props.id, interview)
    .then(() => transition("SHOW"))
    .catch((error) => transition("ERROR_SAVE", true));
};

function destroy() {
  transition(DELETING, true);
  props
  .cancelInterview(props.id)
  .then(() => transition("EMPTY"))
  .catch((error) => transition("ERROR_DELETE", true));
};
/*
function edit(name, interviewer) {
  const interview = {
    student: name,
    interviewer,
  };
  transition("SAVING");
  props
  .editInterview(props.id, interview)
  .then(() => transition(SHOW))
  .catch((error) => transition("ERROR_SAVE". true));
}*/

return (
  <article className="appointment" data-testid="appointment">
    <Header time = {props.time}/>
    {mode === EMPTY && <Empty 
      onAdd={() => transition(CREATE)} />}

    {mode === CREATE && <Form 
      interviewers = {props.interviewers} 
      onCancel = {() => back(EMPTY)} 
      onSave = {save} /> }

    {mode === SHOW && (
      <Show
      student={props.interview.student}
      interview={props.interview}
      interviewer={props.interview && props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit = {() => transition(EDIT)} />
    )}

    {mode === SAVING && <Status message="Saving....." />}
    {mode === DELETING && <Status message="Deleting..." />}
    {mode === CONFIRM && (
      <Confirm
      onConfirm={destroy}
      onCancel={back}
      message={"Are you sure you would like to delete?"} />
      )}
      { mode == EDIT && (
        <Form
        name = {props.interview.student}
        interview = {props.interview}
        interviewers = {props.interviewers}
        onCancel = {back}
        onSave = {save} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Could not delete appointment"} onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Could not book appointment"} onClose={back} />
      )}
  </article>
);
}