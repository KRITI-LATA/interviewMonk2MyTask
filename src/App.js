import {Component} from 'react'
import {v4 as uuid} from 'uuid'

import Tasks from './components/Tasks'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    taskInput: '',
    tagsSelect: tagsList[0].displayText,
    tasksList: [],
    activeTags: 'INITIAL',
  }

  onChangeTask = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({tagsSelect: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {taskInput, tagsSelect} = this.state
    const newUserTask = {
      id: uuid(),
      userEnteredText: taskInput,
      userSelectTags: tagsSelect,
    }
    if (taskInput !== 0) {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newUserTask],
        taskInput: '',
        tagsSelect: tagsList[0].displayText,
      }))
    }
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTags:
        prevState.activeTags === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {taskInput, tagsSelect, tasksList, activeTags} = this.state
    const filteredTasksList =
      activeTags === 'INITIAL'
        ? tasksList
        : tasksList.filter(eachCat => eachCat.userSelectTags === activeTags)

    console.log(filteredTasksList)

    return (
      <div className="app-container">
        <form className="task-form" onSubmit={this.onSubmitForm}>
          <h1 className="heading">Create a task!</h1>
          <div className="task-container">
            <label className="task-label" htmlFor="task">
              Task
            </label>
            <input
              className="select-input"
              type="text"
              id="task"
              value={taskInput}
              placeholder="Enter the task here"
              onChange={this.onChangeTask}
            />
          </div>
          <div className="task-container">
            <label className="task-label" htmlFor="tags">
              Tags
            </label>
            <select
              className="select-input"
              id="tags"
              value={tagsSelect}
              onChange={this.onChangeSelect}
            >
              {tagsList.map(eachList => (
                <option
                  className="option"
                  key={eachList.optionId}
                  value={eachList.optionId}
                >
                  {eachList.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Add Task
          </button>
        </form>
        <div className="created-task-container">
          <h1 className="tags-text"> Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => {
              const isActive = activeTags === eachTag.optionId
              return (
                <li className="tags-item" key={eachTag.optionId}>
                  <button
                    className={`btn ${
                      isActive ? 'active-btn' : 'not-active-btn'
                    }`}
                    type="button"
                    value={eachTag.optionId}
                    onClick={this.onClickTag}
                  >
                    {eachTag.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1 className="tags-text">Tasks</h1>
          {filteredTasksList.length === 0 ? (
            <div className="no-tasks-view">
              <p className="no-tasks-heading">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="tasks-list">
              {filteredTasksList.map(eachTask => (
                <Tasks key={eachTask.id} tasksDetails={eachTask} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default App
