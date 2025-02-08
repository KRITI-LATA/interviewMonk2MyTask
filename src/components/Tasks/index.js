import './index.css'

const Tasks = props => {
  const {tasksDetails} = props
  const {userEnteredText, userSelectTags} = tasksDetails
  return (
    <li className="tasks-item">
      <p className="task-text">{userEnteredText}</p>
      <p className="related-task">{userSelectTags}</p>
    </li>
  )
}

export default Tasks
