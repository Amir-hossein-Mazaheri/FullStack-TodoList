import { useCallback, useState, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, CircularProgress as Progress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import axiosInstance from "../Helpers/axiosInstance";
import Message, { Alert } from "../Helpers/message";
import {
  DELETE_SUB_TODO,
  SAVE_SUB_TODO,
  SET_SUB_TODO,
} from "../Store/entities/addTodo";

function AddSubTodo({ subTodoId, value }) {
  const [isSavingSubTodo, setIsSavingSubTodo] = useState(false);
  const dispatch = useDispatch();

  const { isTodoSaved, generatedTodoId, subTodos } = useSelector(
    (store) => store.entities.addTodo
  );

  const currentSubTodo = useMemo(() => {
    return subTodos.find((subTodo) => subTodo.id === subTodoId);
  }, [subTodoId, subTodos]);

  const changeSubTodoTitle = useCallback(
    (event) => {
      dispatch(SET_SUB_TODO({ id: subTodoId, title: event.target.value }));
    },
    [dispatch, subTodoId]
  );

  const saveSubTodo = useCallback(() => {
    if (!isTodoSaved) {
      Message.fire({
        titleText: "You can't save sub todo without saving todo first 😢",
        icon: "error",
      });
      return;
    }

    if (!currentSubTodo.title) {
      Message.fire({
        titleText: "Can't Save Empty SubTodo",
        icon: "error",
      });
      return;
    }

    setIsSavingSubTodo(true);

    axiosInstance
      .post(`/todos/${generatedTodoId}/sub-todos/`, {
        title: currentSubTodo.title,
        is_done: false,
      })
      .then((res) => {
        console.log(res.data);
        const dbId = res.data.id;
        dispatch(SAVE_SUB_TODO({ id: subTodoId, dbId }));
        Message.fire({
          titleText: "Sub Todo Saved",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err);
        Message.fire({
          titleText: "A Problem Happened",
          icon: "error",
        });
      })
      .finally(() => setIsSavingSubTodo(false));
  }, [currentSubTodo.title, dispatch, generatedTodoId, isTodoSaved, subTodoId]);

  const deleteSubTodo = useCallback(() => {
    Alert.fire({
      title: "Are you sure ?",
      confirmButtonText: "Delete SubTodo",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (!result.isConfirmed) return;
      dispatch(DELETE_SUB_TODO({ id: subTodoId }));

      // if sub todo is saved this will delete the data from database
      if (currentSubTodo.isSaved) {
        axiosInstance
          .delete(`/todos/${generatedTodoId}/sub-todos/${currentSubTodo.dbId}`)
          .then((res) => {
            console.log(res.data);
            Message.fire({
              titleText: "Deleted Successfully",
              icon: "success",
            });
          });
      }
    });
  }, [
    currentSubTodo.dbId,
    currentSubTodo.isSaved,
    dispatch,
    generatedTodoId,
    subTodoId,
  ]);

  const editSubTodo = useCallback(() => {
    if (!currentSubTodo.isSaved && !currentSubTodo.dbId) return;

    axiosInstance
      .patch(`/todos/${generatedTodoId}/sub-todos/${currentSubTodo.dbId}/`, {
        title: currentSubTodo.title,
      })
      .then((res) => {
        console.log(res.data);
        Message.fire({
          titleText: "Sub Todo Edited Successfully",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        Message.fire({
          titleText: "A Problem Happened",
          icon: "error",
        });
      });
  }, [
    currentSubTodo.dbId,
    currentSubTodo.isSaved,
    currentSubTodo.title,
    generatedTodoId,
  ]);

  return (
    <div className="flex items-end gap-5">
      <div className="grow">
        <TextField
          onChange={changeSubTodoTitle}
          id="todo-title"
          fullWidth
          label="Sub Todo Title"
          variant="standard"
          value={value}
        />
      </div>
      {!isSavingSubTodo ? (
        <div className="flex gap-5">
          <Button variant="outlined" color="error" onClick={deleteSubTodo}>
            <DeleteIcon />
          </Button>
          {!currentSubTodo.isSaved ? (
            <Button variant="outlined" onClick={saveSubTodo}>
              <SaveIcon />
            </Button>
          ) : (
            <Button variant="outlined" onClick={editSubTodo}>
              <EditIcon />
            </Button>
          )}
        </div>
      ) : (
        <Progress />
      )}
    </div>
  );
}

export default AddSubTodo;
