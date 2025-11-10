import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";

import { ArrowUpRightIcon, Plus, X } from "lucide-react";
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
  const maxLengthTask = 30;

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

  const handleCheck = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
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
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <Task task={task} handleCheck={handleCheck} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Task = ({
  task,
  handleCheck,
}: {
  task: TaskProps;
  handleCheck: (id: number) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      key={task.id}
      className={`flex relative items-center justify-between rounded-2xl text-wrap duration-300 transition-colors border-border/40 border px-4 py-2 ${
        task.isCompleted
          ? "line-through opacity-50 bg-accent/20 hover:bg-accent/20"
          : "hover:bg-primary/10"
      } group`}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="text-sm px-2 py-1 overflow-hidden text-ellipsis">
            {task.task}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p>{task.task}</p>
        </TooltipContent>
      </Tooltip>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          //   onClick={() => deleteTask(task.id)}
          className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-400"
        >
          <X className="h-2 w-2 text-red-500" />
        </Button>
        <Checkbox
          className="w-5 h-5 bg-primary cursor-pointer"
          checked={task.isCompleted}
          onCheckedChange={() => handleCheck(task.id)}
        />
      </div>
      {/* </Button> */}
    </motion.div>
  );
};

export default Tasks;
