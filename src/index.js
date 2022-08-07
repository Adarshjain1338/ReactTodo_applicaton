import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDesc: ''
    }
  }

  handleTextTaskChange(e) {
    this.setState({
      taskDesc: e.target.value
    });
  }

  handleAddTaskClick() {
    if(!this.state.taskDesc ){
      alert("Please Input should be Something");
      return;
    }
    let inputValue = this.state.taskDesc;
    if(inputValue != null){
      inputValue = inputValue.trim();
      this.props.handleToCollectTaskInfo(this.state.taskDesc);
      this.setState({
        taskDesc: ''
      });
    }
  }

  render() {
    return (
      <>
        <form >
          <input type="text" value={this.state.taskDesc} placeholder='Enter your TO-DO here' onChange={(e) => this.handleTextTaskChange(e)} />
          <input type='button' value='Add Task' onClick={() => this.handleAddTaskClick()}></input>
        </form>
      </>
    )
  }
}

class TaskLists extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  handleTaskClick(taskDesc) {
    this.props.handleToCollectTaskClickInfo(taskDesc);
  }
  render() {

    let lists = [];

    for (let i = 0; i < this.props.tasks.length; i++) {
      let task = this.props.tasks[i];
      let spanAction;

      if (task.isFinished) {
        spanAction = (
          <span class="material-icons" id='close' onClick={() => this.handleTaskClick(task.desc)}>close</span>
        );
      } else {
        spanAction = (
          <span class="material-icons" id='done' onClick={() => this.handleTaskClick(task.desc)}>done</span>
        );
      }
      let ListItem = (
        <li key={i}>
          <span>{task.desc}</span>
          {spanAction}
        </li>
      );
      lists.push(ListItem);
    }

    return (
      <div className={this.props.forStyling}>
        <div className='box-title'>
          {this.props.purpose}
        </div>
        <ul>
          {lists}
        </ul>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          desc: 'switch off the fan.',
          isFinished: false
        }, {
          desc: 'switch off the light.',
          isFinished: true
        }, {
          desc: 'switch off the phone.',
          isFinished: false
        }, {
          desc: 'switch off the button.',
          isFinished: true
        },
      ]
    }
  }

  handleNewTask(taskDesc) {
    let oldTasks = this.state.tasks.slice();
    oldTasks.push({
      desc: taskDesc,
      isFinished: false
    });
    this.setState({
      tasks: oldTasks
    });

  }

  handleTaskUpdate(taskDesc, status) {
    let oldTasks = this.state.tasks.slice();
    let taskItem = oldTasks.find(ot => ot.desc == taskDesc);
    taskItem.isFinished = status;
    this.setState({
      taskDesc: oldTasks
    })
  }



  render() {
    let tasks = this.state.tasks;
    // eslint-disable-next-line eqeqeq
    let todoTasks = tasks.filter(t => t.isFinished == false);
    // eslint-disable-next-line eqeqeq
    let doneTasks = tasks.filter(t => t.isFinished == true);
    return (
      <>
        <div className='add-task'>
          <AddTask handleToCollectTaskInfo={(taskDesc) => this.handleNewTask(taskDesc)} />
        </div>
        <div className='task-lists'>
          <TaskLists handleToCollectTaskClickInfo={(taskDesc) => this.handleTaskUpdate(taskDesc, true)} tasks={todoTasks} purpose="To-do" forStyling="todo" />
          <TaskLists handleToCollectTaskClickInfo={(taskDesc) => this.handleTaskUpdate(taskDesc, false)} tasks={doneTasks} purpose="Finished" forStyling="finished" />
        </div>
      </>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));