import React, { useEffect } from "react";

import "./Todos.css";



const Todos = (props) => {
  const { setState } = props;
  console.log("TODO PROPS",props)
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_message: props.state.currentText,
      topic: "",
      client: "Apple Inc.",
    }),
  };

  useEffect(() => {
    fetch("https://student-of-the-client-backend-rp6izobdea-uc.a.run.app/api/chat", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        //console.log("STATE IS ",state)
        setState((state) => ( console.log("what is this state",state) ,{ ...state, todos: data }));
      });
  }, []);

  const renderTodos = () => {
      return (
        props.todos && props.todos.response && 
        <li className="todos-widget-list-item" key={props.todos.response.Answer}>
          {props.todos.response.Answer}
        </li>
      );
  };
  return (
    <div className="todos-widget">
      <ul className="todos-widget-list">{renderTodos()}</ul>
    </div>
  );
};

export default Todos;