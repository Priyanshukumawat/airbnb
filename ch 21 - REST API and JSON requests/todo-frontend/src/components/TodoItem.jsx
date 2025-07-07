import styles from "./TodoItem.module.css";

const TodoItem = ({ id, todoName, todoDate, completed, onDeleteClick, onToggleCompleted }) => {

  const formattedDate = new Date(todoDate).toLocaleDateString('en-GB'); // 'en-GB' gives DD/MM/YYYY


  return (
    <div className={styles.itemRow}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggleCompleted(id, !completed)}
        className={styles.checkbox}
      />
      <div className={`${styles.itemText} ${completed ? styles.completed : ""}`}>
        <div className= {`${styles.textAndDate}`}>
          <span>{todoName}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
      </div>
      <button className={styles.deleteButton} onClick={() => onDeleteClick(id)}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
