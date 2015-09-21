TodoApp = React.createClass({

	// This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Initializes the variable hideCompleted
  getInitialState() {
    return {
      hideCompleted: false
    }
  },

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    let query = {};

    if (this.state.hideCompleted) {
      // If hide completed is checked, filter tasks
      query = {checked: {$ne: true}};
    }

    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
      currentUser: Meteor.user()
    };
  },

  submitTask(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call("addTask", text);

    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },

  getTasks() {
  	// Get tasks from this.data.tasks
    return this.data.tasks.map((task) => {
      const currentUserId = this.data.currentUser && this.data.currentUser._id;

      return <Task
        key={task._id}
        task={task} />;
    });
  },


	render() {
		return (
			<div className="home-wrapper">
				<h1>react todos</h1>
				<div className="lists">

					{ this.data.currentUser ?
		        <form className="task-input" onSubmit={this.submitTask} >
		          <input
		            className="description_field"
		            type="text"
		            ref="textInput"
		            placeholder="Type to add new tasks" />
		        </form> : ''
	        }

	        <div className="tasks-wrapper">
	          {this.getTasks()}
	        </div>

      	</div>
			</div>
		)
	}
})