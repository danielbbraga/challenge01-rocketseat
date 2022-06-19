import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [id, setId] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const alreadyHasTask = tasks.some(e => e.title === newTaskTitle);
    if (alreadyHasTask) {
      Alert.alert('Ops!', 'Tarefa já existe');
      return;
    }

    const task = {
      id,
      title: newTaskTitle,
      done: false
    }
    setId(id+1);
    setTasks([...tasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    const doneTaskList = tasks.map(e => {
      if (e.id === id){
        e.done = !e.done;
      }
     return e;});

    setTasks(doneTaskList);
   
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Tem certeza?', 'Você tem certeza que deseja remover esta tarefa?'
    , [
      {text: 'Sim', onPress: () => {
        const arrayWithoutElement = tasks.filter(e => e.id !== id);
        setTasks(arrayWithoutElement);
      }},
      {text: 'Não', onPress: () => {}, style: 'cancel'}
    ])
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