import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  filteredTask: null,
  add: (title, status) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Date.now(),
          title,
          status,
        },
      ],
    })),
  edit: (id, newTitle, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, status: newStatus } : task
      ),
    })),

  delete: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  filter: (status) =>
    set(() => ({
      filteredTask: status,
    })),
}));

export default useTaskStore;
