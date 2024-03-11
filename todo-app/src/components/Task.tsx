import React from "react";
import { Button, Typography, Paper, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  done_flag: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
}

interface TaskProps {
  task: Task;
  onUpdate: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdate }) => {
  const handleUpdateTask = async () => {
    await axios.put(
      `https://todo-1adpw2hyu-k0us-projects.vercel.app/tasks/${
        task.id
      }?done_flag=${!task.done_flag}`,
      {}
    );
    onUpdate(); // onUpdate 関数を呼ぶ
  };

  const TaskPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
  }));

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <TaskPaper
          elevation={3}
          sx={{
            width: "auto",
            height: 50,
            padding: 2,
            marginBottom: 2,
            marginRight: 2,
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            {task.title}
          </Typography>
        </TaskPaper>
      </Grid>
      <Grid justifyContent="">
        {task.done_flag ? (
          <Button
            variant="outlined"
            onClick={handleUpdateTask}
            startIcon={<UndoOutlinedIcon />}
          >
            戻す
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={handleUpdateTask}
            startIcon={<DoneOutlinedIcon />}
          >
            完了
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default Task;
