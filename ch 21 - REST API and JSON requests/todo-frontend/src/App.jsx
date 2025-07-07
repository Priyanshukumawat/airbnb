import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useEffect, useState } from "react";
import { addItemToServer, deleteItemFromServer, getItemsFromServer, markItemCompletedOnServer } from "./services/itemsService";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getItemsFromServer().then(initialItems => {
      setTodoItems(initialItems);
    });
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    const item = await addItemToServer(itemName, itemDueDate);
    setTodoItems([...todoItems, item]);
  };

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    setTodoItems(todoItems.filter((item) => item.id !== deletedId));
  };

  const handleToggleCompleted = async (id, completed) => {
    const updatedItem = await markItemCompletedOnServer(id, completed);
    setTodoItems(todoItems.map(item =>
      item.id === id ? { ...item, completed: updatedItem.completed } : item
    ));
  };

  const activeItems = todoItems.filter(item => !item.completed);
  const completedItems = todoItems.filter(item => item.completed);

  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {activeItems.length === 0 && <WelcomeMessage />}
      <TodoItems
        todoItems={activeItems}
        onDeleteClick={handleDeleteItem}
        onToggleCompleted={handleToggleCompleted}
      />
      {completedItems.length > 0 && (
        <>
          <hr style={{ margin: "2rem 0", width: "80%" }} />
          <h3>Completed</h3>
          <TodoItems
            todoItems={completedItems}
            onDeleteClick={handleDeleteItem}
            onToggleCompleted={handleToggleCompleted}
            completedList
          />
        </>
      )}
    </center>
  );
}

export default App;