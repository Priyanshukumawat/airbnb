import TodoItem from "./TodoItem";
import styles from "./TodoItems.module.css";

const TodoItems = ({ todoItems, onDeleteClick, onToggleCompleted }) => {
  return (
    <div className={styles.itemsContainer}>
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todoDate={item.dueDate}
          todoName={item.name}
          completed={item.completed}
          onDeleteClick={onDeleteClick}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </div>
  );
};

export default TodoItems;
