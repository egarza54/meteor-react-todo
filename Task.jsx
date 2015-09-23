// Task component - represents a single todo item
Task = React.createClass({
  toggleChecked() {
    // Set 'checked' to opposite value
    Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
  },

  deleteThisTask() {
  	console.log(this.props.task._id)
    Meteor.call("deleteTask", this.props.task._id);
  },

  render() {
    // If a task is 'checked' it will provided a new className
    // See home.scss for details 

    const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
      (this.props.task.private ? "private" : "");

    return (
      <div className="task-item">
        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked} />

        <p className={taskClassName}>
          {this.props.task.text}
        </p>

        <div className="delete" onClick={this.deleteThisTask}>
          &times;
        </div>
      </div>
    );
  }
});
