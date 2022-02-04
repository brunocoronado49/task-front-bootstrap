import React from "react";

export const TaskBanner = (props) => {
  return (
    <h4 className="bg-primary text-white text-center p-4">
        {props.userName}'s TaskApp ({props.taskItems.filter(t => !t.done).length} tasks to do)
    </h4>
  );
};
