import { useCallback, useMemo, useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/SaveAs";
import AddIcon from "@mui/icons-material/AddCircle";
import HelpIcon from "@mui/icons-material/Help";
import EditIcon from "@mui/icons-material/Edit";
import Spinner from "../Common/Spinner";
import axiosInstance from "../Helpers/axiosInstance";
import SubTodos from "../Components/SubTodos";
import AddTodoProperties from "../Components/AddTodoProperties";
import { RESET_ADD_TODO, SAVE_TODO } from "../Store/entities/addTodo";

const Message = withReactContent(Swal);

function AddTodoPage() {
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const { todo, todoTypeId, isTodoSaved, generatedTodoId, subTodos } =
    useSelector((store) => store.entities.addTodo);

  const dispatch = useDispatch();

  const todoDetails = useMemo(() => {
    return {
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline,
      is_finished_before_deadline: false,
      status: "U",
      is_removed: false,
      todo_type: todoTypeId,
    };
  }, [todo.deadline, todo.description, todo.title, todoTypeId]);

  const saveTodo = useCallback(() => {
    setIsAddingTodo(true);
    axiosInstance
      .post("/todos/", todoDetails)
      .then((res) => {
        console.log(res.data);
        Message.fire({
          title: "Todo Saved",
          text: "Now you can add and save sub todo",
          icon: "success",
        });
        const todoId = res.data.id;
        dispatch(SAVE_TODO({ id: todoId }));
      })
      .catch((err) => {
        Message.fire({
          title: "A Problem Happened",
          text: "Try saving again",
          icon: "error",
        });
        console.log(err.response);
      })
      .finally(() => setIsAddingTodo(false));
  }, [dispatch, todoDetails]);

  const editTodo = useCallback(() => {
    setIsAddingTodo(true);
    axiosInstance
      .patch(`/todos/${generatedTodoId}/`, todoDetails)
      .then((res) => {
        console.log(res.data);
        Message.fire({
          title: "Todo Edited",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        Message.fire({
          title: "A Problem Happened",
          icon: "error",
        });
      })
      .finally(() => setIsAddingTodo(false));
  }, [generatedTodoId, todoDetails]);

  const handleTodoSubmission = useCallback(
    (event) => {
      event.preventDefault();
      const subTodosDbIds = subTodos
        .map((subTodo) => subTodo.dbId)
        .filter((dbId) => dbId !== null);

      const todoItem = {
        todo: generatedTodoId,
        sub_todos: subTodosDbIds,
        todo_type: todoTypeId,
      };

      setIsSavingAll(true);

      axiosInstance
        .post(`/todo-item/`, todoItem)
        .then((res) => {
          console.log(res);
          Message.fire({
            titleText: "Todo Added Completely",
            icon: "success",
          });
          dispatch(RESET_ADD_TODO());
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          Message.fire({
            titleText: "A Problem Happened On Saving",
            icon: "error",
          });
        })
        .finally(() => setIsSavingAll(false));
    },
    [dispatch, generatedTodoId, subTodos, todoTypeId]
  );

  return (
    <div
      style={{ backgroundImage: 'url("background.jpg")' }}
      className="bg-fixed bg-center min-h-screen py-12"
    >
      <div className="max-w-2xl min-w-fit w-[95%] px-10 py-4 shadow shadow-black/10 mx-auto bg-white/10 backdrop-blur-lg rounded-lg">
        <div className="mb-3 mt-1 flex">
          <h2 className="text-2xl text-center mx-auto font-bold text-gray-800">
            Add A Todo
          </h2>
          <div>
            <span>
              <HelpIcon />
            </span>
          </div>
        </div>

        <div>
          <form onSubmit={handleTodoSubmission}>
            <AddTodoProperties />

            <div className="my-7">
              <SubTodos />
            </div>

            <div className="mt-12 ml-auto w-fit flex gap-5">
              <div>
                {isAddingTodo ? (
                  <div className="px-5 py-2 mt-5 relative w-fit">
                    <Spinner className="p-2" />
                  </div>
                ) : !isTodoSaved ? (
                  <Button
                    onClick={saveTodo}
                    startIcon={<AddIcon />}
                    variant="outlined"
                  >
                    Save Todo
                  </Button>
                ) : (
                  <Button
                    onClick={editTodo}
                    startIcon={<EditIcon />}
                    variant="outlined"
                  >
                    Edit Todo
                  </Button>
                )}
              </div>
              <div>
                {isSavingAll ? (
                  <div className="px-5 py-2 mt-5 relative w-fit">
                    <Spinner className="p-2" />
                  </div>
                ) : (
                  <Button
                    type="submit"
                    startIcon={<SaveIcon />}
                    color="success"
                    variant="outlined"
                  >
                    <span className="font-medium">Save All</span>
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTodoPage;
