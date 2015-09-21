// Task component - represents a single todo item
Task = React.createClass({
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
  },

  deleteThisTask() {
  	console.log(this.props.task._id)
    Meteor.call("deleteTask", this.props.task._id);
  },

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    // Add "checked" and/or "private" to the className when needed

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
