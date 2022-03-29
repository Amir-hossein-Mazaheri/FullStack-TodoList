import React, { useCallback, useState } from "react";

import { Autocomplete, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { SET_TODO_TYPE } from "../Store/entities/addTodo";
import fetcher from "../Helpers/fetcher";
import Spinner from "../Common/Spinner";

function AddTodo() {
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const dispatch = useDispatch();

  const { data: todoTypes } = useSWR("todo-type/", fetcher);

  const handleTodoSubmission = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div className="max-w-2xl min-w-fit w-[95%] px-10 py-4 shadow shadow-black/5 absolute left-1/2 -translate-x-1/2 mt-12 bg-white/10 backdrop-blur-lg rounded-lg">
      <h2 className="text-2xl text-center font-bold text-gray-800">
        Add A Todo
      </h2>

      {!Boolean(todoTypes) ? (
        <Spinner />
      ) : (
        <div>
          <form onSubmit={handleTodoSubmission}>
            <div className="flex gap-7 mb-7">
              <TextField
                fullWidth
                id="todo-title"
                label="Todo Title"
                variant="standard"
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
            />

            <div className="mt-7">
              <Button variant="outlined" endIcon={<SendIcon />}>
                Add Todo
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddTodo;
