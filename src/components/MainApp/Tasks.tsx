import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";

import { ArrowUpRightIcon, Plus, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { TaskProps } from "@/types/types";
import { motion } from "motion/react";
import { Toaster, toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Checkbox } from "../ui/checkbox";

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [actualTask, setActualTask] = useState<TaskProps>({
    id: Date.now(),
    task: "",
    isCompleted: false,
  });

  const randomTasks = [
    // {
    //   id: 0,
    //   task: "Task 1",
    //   isCompleted: true,
    // },
    // {
    //   id: 1,
    //   task: "Task 2,Task 2,Task 2,Task 2, Task 2",
    //   isCompleted: false,
    // },
  ] as TaskProps[];

  useEffect(() => {
    setTasks(randomTasks);
  }, []);
  const maxLengthTask = 50;

  const validTask = () => {
    if (actualTask.task.trim() == "") {
      toast.error(errorMessage[0].message, {
        richColors: true,
        duration: 3000,
        closeButton: true,
      });
      return false;
    } else if (actualTask.task.length > maxLengthTask) {
      toast.error(errorMessage[1].message, {
        richColors: true,
        duration: 3000,
        closeButton: true,
      });
      return false;
    }
    return true;
  };
  const errorMessage = [
    { id: 1, message: "Task is empty" },
    {
      id: 2,
      message: `Task is too long, max length is ${maxLengthTask} characters.`,
    },
  ];

  const activeTasks = tasks.filter((task) => !task.isCompleted);
  const handleAddTask = () => {
    if (!validTask()) return;

    setTasks((prev) => [...prev, actualTask]);
    setActualTask({
      id: Date.now(),
      task: "",
      isCompleted: false,
    });
  };
  const completedTasks = tasks.filter((task) => task.isCompleted);

  const handleCheck = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };
  const handleDeleteTask = (id: number) => {
    console.log(id);
    // set tasks to prev state but filter only that that has different id then that we clicked.
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  return (
    <Card className="border-border rounded-2xl bg-card/20 backdrop-blur-sm h-fit">
      <CardContent className="px-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="tracking-wide">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            {activeTasks.length} active
          </p>
        </div>
        <div className="flex gap-1 items-center px-1">
          <Input
            type="text"
            className="flex-1 rounded-xl"
            placeholder="Add task"
            value={actualTask.task}
            onChange={(e) =>
              setActualTask({ ...actualTask, task: e.target.value })
            }
          />
          <Button className="rounded-xl" onClick={handleAddTask}>
            <Plus />
          </Button>
          {/* BUTTON inside the input */}
          {/*         <Button
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl"
            size={"icon-sm"}
            onClick={handleAddTask}
          >
            <Plus className="w-4 h-4" />
          </Button> */}
        </div>
        {tasks.length === 0 ? (
          <div className="text-center h-16 flex items-center justify-center text-xs text-muted-foreground">
            No tasks yet. Add one to get started.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <Task
                  task={task}
                  handleCheck={handleCheck}
                  deleteTask={handleDeleteTask}
                />
              ))}
            </div>
            <div className="flex items-center justify-between px-1">
              <p className="text-[11px] text-muted-foreground">
                {completedTasks.length} of {tasks.length} completed
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const Task = ({
  task,
  handleCheck,
  deleteTask,
}: {
  task: TaskProps;
  handleCheck: (id: number) => void;
  deleteTask: (id: number) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      key={task.id}
      className={`flex relative items-center rounded-2xl duration-300 transition-colors border-border/40 px-4 py-2 border ${
        task.isCompleted
          ? "line-through opacity-50 bg-accent/20 hover:bg-accent/20"
          : "hover:bg-primary/10"
      } group`}
    >
      <div className="flex items-center w-full justify-between gap-2 min-w-0">
        <div className="flex items-center gap-1 min-w-0 flex-1">
          <Checkbox
            className="w-5 h-5 bg-primary cursor-pointer shrink-0"
            checked={task.isCompleted}
            onCheckedChange={() => handleCheck(task.id)}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm px-2 py-1 overflow-hidden text-ellipsis min-w-0">
                {task.task}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{task.task}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {/* Delete Button */}
        <button
          onClick={() => deleteTask(task.id)}
          className="shrink-0 opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </motion.div>
  );
};

export default Tasks;
