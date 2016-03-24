function TodoController ($scope) {
	$scope.applicationTitle = "TODO task manager";
	$scope.saved = localStorage.getItem('todos');
	var defaultValues = [ {text: 'Default task', taskId: 0, done: false},
						  {text: 'Additional default task', taskId: 1, done: false} ];
	$scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : defaultValues;
	localStorage.setItem('todos', JSON.stringify($scope.todos));
	$scope.restoreState = function() {
		console.log(localStorage);
		localStorage.setItem('todos', JSON.stringify(defaultValues));
		(localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : defaultValues;
	};
	$scope.addTodo = function() {
		$scope.todos.push({
			text: $scope.todoText,
			taskId: (function(){
				var lastIndex = 0;
				angular.forEach($scope.todos, function(todo){
					if(todo.taskId>lastIndex) {
						lastIndex = todo.taskId;
					}
				});
				lastIndex+=1;
				return lastIndex;
			})(),
			done: false
		});
		$scope.todoText = '';
	};
	
	$scope.deleteTask = function(deleteText, taskId) {
		if(confirm("Would you like to delete task with name: "+deleteText+"?")){
			var removeIndex = $scope.todos.map(
					function(item) { 
						return item.taskId; 
					}).indexOf(taskId);
			removeIndex > -1 && $scope.todos.splice(removeIndex, 1);
		}
	};

	$scope.editTask = function(taskId) {
		//$scope.todos.find(function(todo){todo.taskId});
		$scope.todos.forEach(function(todo) {
			if(todo.taskId === taskId)
				todo.makeShow = true;
		});
		/*var newTaskTitle = prompt("Current title: "+titleText+". Insert new task title:");
		if(newTaskTitle){
			var titleIndex = $scope.todos.map(
					function(item) { 
						return item.taskId; 
					}).indexOf(taskId);
			if(titleIndex > -1) {
				console.log(titleIndex);
				$scope.todos[titleIndex].text = newTaskTitle;
			}
		}*/
	};

	$scope.saveEdit = function(newTaskTitle, taskId) {
		console.log(newTaskTitle);
		if(newTaskTitle){
			var titleIndex = $scope.todos.map(
					function(item) {
						return item.taskId;
					}).indexOf(taskId);
			if(titleIndex > -1) {
				console.log(titleIndex);
				$scope.todos[titleIndex].text = newTaskTitle;
				$scope.todos[titleIndex].makeShow = false;
			}
		}
	};

	$scope.closeEdit = function (taskId) {
		//$scope.todos.find(function(todo){todo.taskId});
		$scope.todos.forEach(function(todo) {
			if(todo.taskId === taskId)
				todo.makeShow = false;
		});
	};
	
	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count+= todo.done ? 0 : 1;
		});
		localStorage.setItem('todos', JSON.stringify($scope.todos));
		return count;
	};

	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo){
			if (!todo.done)
				$scope.todos.push(todo);
		});
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};
}