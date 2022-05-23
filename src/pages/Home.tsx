import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [id, setId] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = {
      id,
      title: newTaskTitle,
      done: false
    }
    setId(id+1);
    setTasks([...tasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    const doneTaskList = tasks.map((e, index) => {
      if (index === id){
        e.done = !e.done;
      }
     return e;});

    setTasks(doneTaskList);
   
  }

  function handleRemoveTask(id: number) {
     const arrayWithoutElement = tasks.filter((_,index) => index !== id);
     setTasks(arrayWithoutElement);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})