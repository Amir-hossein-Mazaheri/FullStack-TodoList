import { Autocomplete, TextField } from "@mui/material";
import DateTimePicker from "@mui/lab/MobileDatePicker";
import useSWR from "swr";
import { SET_TODO_PROPERTY, SET_TODO_TYPE } from "../Store/entities/addTodo";
import { useDispatch, useSelector } from "react-redux";
import fetcher from "../Helpers/fetcher";
import Spinner from "../Common/Spinner";

function AddTodoProperties() {
  const dispatch = useDispatch();
  const { todo } = useSelector((store) => store.entities.addTodo);

  const { data: todoTypes } = useSWR("todo-type/", fetcher);

  if (!todoTypes) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex gap-7 mb-7">
        <TextField
          fullWidth
          id="todo-title"
          label="Todo Title"
          variant="standard"
          onChange={(event) => {
            console.log(event.target.value);
            dispatch(
              SET_TODO_PROPERTY({
                property: "title",
                value: event.target.value,
              })
            );
          }}
        />
        <Autocomplete
          options={todoTypes}
          getOptionLabel={(option) => option.label}
          id="todo-type"
          onChange={(event, newValue) =>
            dispatch(SET_TODO_TYPE({ id: newValue.id }))
          }
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Todo Type" variant="standard" />
          )}
        />
      </div>
      <TextField
        id="todo-description"
        label="Todo Description"
        variant="standard"
        multiline
        maxRows={5}
        fullWidth
        onChange={(event) => {
          console.log(event.target.value);
          dispatch(
            SET_TODO_PROPERTY({
              property: "description",
              value: event.target.value,
            })
          );
        }}
      />
      <div className="mt-10 mb-5">
        <DateTimePicker
          renderInput={(props) => <TextField fullWidth {...props} />}
          label="Deadline"
          value={todo.deadline}
          onChange={(newValue) => {
            console.log(newValue);
            dispatch(
              SET_TODO_PROPERTY({
                property: "deadline",
                value: newValue.toISOString(),
              })
            );
          }}
        />
      </div>
    </>
  );
}

export default AddTodoProperties;
