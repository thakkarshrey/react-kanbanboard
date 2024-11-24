import React, { Dispatch, SetStateAction } from 'react';
import DropIndicator from './drop-indicator';
import './Kanban.scss';

type Task = {
  id: number;
  content: string;
  columnId: string;
};

type Column = {
  id: string;
  label: string;
};

export type TaskProps = {
  task: Task;
  column: Column;
};
export type ColumnProps = {
  column: Column;
  tasks: Task[];
};

type Props = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  columns: Column[];
  ColumnComponent: React.ComponentType<ColumnProps>;
  TaskComponent: React.ComponentType<TaskProps>;
};

function Kanban({
  tasks,
  setTasks,
  columns,
  ColumnComponent,
  TaskComponent,
}: Props) {

  const COLOR_NAMES_ARRAY = [
    'pink',
    'blue',
    'orange',
    'teal',
    'deep-pink',
    'candy-pink',
    'lime-green',
    'orange-voilet',
  ];

  const getColorName = (index: number) =>
    COLOR_NAMES_ARRAY[index % COLOR_NAMES_ARRAY.length];

  const handleDragStart = (event: React.DragEvent, task: Task) => {
    event.dataTransfer.setData('taskId', task.id.toString());
  };

  const handleDragOver = (event: React.DragEvent, column: Column) => {
    event.preventDefault();
    highlightIndicator(event, column);
  };

  const handleDragLeave = (event: React.DragEvent, column: Column) => {
    const indicators = getIndicators(column);
    clearHighlights(indicators);
  };

  const handleDragDrop = (event: React.DragEvent, column: Column) => {
    const indicators = getIndicators(column);
    clearHighlights(indicators);

    const taskId = Number(event.dataTransfer.getData('taskId'));

    const el: { element: Element; offset: number } = getNearestIndicator(
      event,
      indicators
    );

    const before = Number(el.element.getAttribute('data-before'));

    if (before !== taskId) {
      let tasksCopy: Task[] = [...tasks];
      let taskToMove = tasksCopy.find((_element) => _element.id === taskId);
      if (!taskToMove) return;

      taskToMove = {
        ...taskToMove,
        columnId: column.id,
      };

      tasksCopy = tasksCopy.filter((element) => element.id !== taskId);

      const moveToBack = before === -1;

      if (moveToBack) {
        tasksCopy.push(taskToMove);
      } else {
        const insertAtIndex = tasksCopy.findIndex(
          (element) => element.id === before
        );

        if (insertAtIndex === undefined) return;
        tasksCopy.splice(insertAtIndex, 0, taskToMove);
      }

      setTasks(tasksCopy);
    }
  };

  const highlightIndicator = (event: React.DragEvent, column: Column) => {
    console.log(column, 'column')
    const indicators = getIndicators(column);
    clearHighlights(indicators);
    const el: { element: Element; offset: number } = getNearestIndicator(
      event,
      indicators
    );

    const element = el.element as HTMLElement
    element.style.opacity = '1';
  };

  const getIndicators = (column: Column) => {
    return Array.from(
      document.querySelectorAll(`[data-column="${column.id}"]`)
    );
  };

  const getNearestIndicator = (
    event: React.DragEvent,
    indicators: Element[]
  ) => {
    const el = indicators.reduce(
      (accumulator: { offset: number, element: Element }, currentElement: Element) => {
        console.log(accumulator, 'accumulator')
        const box = currentElement.getBoundingClientRect();
        const offset = event.clientY - box.top;
        if (offset < 0 && offset > accumulator.offset) {
          return {
            offset,
            element: currentElement,
          };
        } else {
          return accumulator;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const clearHighlights = (els: Element[] | null) => {
    els?.forEach((indicator: Element) => {
      const temp_indicator = indicator as HTMLElement
      temp_indicator.style.opacity = '0';
    });
  };
  return (
    <div className="kanban-board-container">
      <div className="column-wrapper">
        {columns?.map((column: Column, columnIndex: number) => (
          <div className="column-card" key={column.id}>
            <div
              className={`column-container ${getColorName(columnIndex)}`}
              onDragOver={(event) => handleDragOver(event, column)}
              onDragLeave={(event) => handleDragLeave(event, column)}
              onDrop={(event) => handleDragDrop(event, column)}
            >
              <ColumnComponent column={column} tasks={tasks} />
              <div className="task-wrapper">
                {tasks
                  ?.filter((task: Task) => task.columnId === column.id)
                  .map((task: Task) => {
                    return (
                      <React.Fragment key={task.id}>
                        <DropIndicator beforeId={task.id} columnId={column.id} />
                        <div
                          className="task-card"
                          draggable
                          onDragStart={(event) => handleDragStart(event, task)}
                        >
                          <TaskComponent column={column} task={task} />
                        </div>
                      </React.Fragment>
                    )
                  })}
                <DropIndicator beforeId={-1} columnId={column.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kanban;
