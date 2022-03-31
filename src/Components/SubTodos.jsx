import { useCallback } from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import AddSubTodo from "./AddSubTodo";
import { ADD_EMPTY_SUB_TODO } from "../Store/entities/addTodo";

function SubTodos() {
  const dispatch = useDispatch();
  const { subTodos } = useSelector((store) => store.entities.addTodo);

  const addSubTodoBase = useCallback(
    (event) => {
      dispatch(ADD_EMPTY_SUB_TODO());
    },
    [dispatch]
  );

  return (
    <>
      <div className="mb-4 flex justify-between">
        <h3 className="font-medium text-lg">Sub Todos</h3>
        <Button
          sx={{
            borderRadius: "999rem",
          }}
          startIcon={<AddIcon />}
          variant="text"
          onClick={addSubTodoBase}
        >
          <span>Add</span>
        </Button>
      </div>
      <div className="space-y-6">
        {subTodos.map((subTodo) => (
          <AddSubTodo subTodoId={subTodo.id} value={subTodo.title} />
        ))}
      </div>
    </>
  );
}

export default SubTodos;
