import { useGetTodosQuery } from "../features/api/apiSlice";
import Todo from "./Todo";

export default function TodoList({ colorFilter, statusFilter }) {
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosQuery({ status: statusFilter, color: colorFilter });
  let content = null;
  if (isLoading) {
    content = (
      <>
        <div className="font-bold text-center">Loading...</div>
      </>
    );
  }
  if (!isLoading && !isError) {
    content = (
      <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
        {todos?.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </div>
    );
  }
  return <div>{content}</div>;
}
