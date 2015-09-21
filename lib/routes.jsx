FlowRouter.route( "/", {
	name: "Home",
	action(params) {
		renderMainLayoutWith(<TodoApp />)
	}
})

function renderMainLayoutWith(component) {
	ReactLayout.render(MainLayout, {
		header: <Header />,
		content: component
	});
}