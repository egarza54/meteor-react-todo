// Defining the collection to hold tasks of a user
Tasks = new Mongo.Collection("tasks");

if (Meteor.isServer) {
  // This code only runs on the server
  // Publish tasks that belong to the current user
  Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [
        { owner: this.userId }
      ]
    });
  });
}

if (Meteor.isClient) {
  console.log("In the Client");
	// This code is executed on the client side only
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});

	Meteor.subscribe("tasks");
}

Meteor.methods({
	addTask(text) {
		// User must be logged in to create a task
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized: User must be logged in")
		}

		// .insert creates a new Task to the db 
		Tasks.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},

	deleteTask(taskId) {
		// finds the task using the taskId
		var task = Tasks.findOne(taskId);

		// If the user is not the owner of the task the user cannot delete it
		if (task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized: User is not the owner of the task")
		}

		Tasks.remove(taskId);
	},

	setChecked(taskId, setChecked){
		var task = Tasks.findOne(taskId);

		if (task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized: User is not the owner of the task")
		}

		Tasks.update(taskId, { $set: {checked: setChecked} });

	}
})