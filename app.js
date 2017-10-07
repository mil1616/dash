// var Vue = require('vue');

new Vue({
  el: '#root',

  data: {
    message: 'Youhou',
    task: {
      title: ''
    },
    tasks: [],
    list: null
  },

  ready: function() {
    this.fetchTasks();
  },

  methods: {
    getTestMessage() {

    },

    fetchTasks: function() {
      var vm = this;
      this.$http.get('http://localhost:8090/tasks').then(function(response) {
        vm.$set('tasks', response.data)
      }, function(error) {
        console.log(error.statusText);
      });

      // other possibility
      // this.$http.get('http://localhost:8090/tasks', function(tasks) {
      //    this.$set('tasks', tasks)
      //  })
    },

    oldFfetchTasks: function() {
      var tasks = [{
          id: 1,
          title: 'put water in the iron'
        },
        {
          id: 2,
          title: 'buy reusable coffee cup'
        }
      ];
      this.$set('tasks', tasks);
    },

    addEvent: function() {
      var vm = this;
      if (this.task.title) {
        this.$http.post('http://localhost:8090/tasks', this.task).then(function(response) {
          vm.tasks.push(vm.task);
          vm.task = {
            title: ''
          };
        }, function(error) {
          console.log(error.statusText);
        });
      }
    },

    oldAddEvent: function() {
      if (this.task.title) {
        this.tasks.push(this.task);
        this.task = {
          title: ''
        };
      }
    },

    deleteEvent: function(index, taskId) {
      // if(confirm("Are you sure you want to delete this event?")) {
      // $remove is a Vue convenience method similar to splice
      var vm = this;
      this.$http.delete('http://localhost:8090/task', {id : taskId}).then(function(response) {
        vm.tasks.splice(index, 1);
      }, function(error) {
        console.log(error.statusText);
      });
      // }
    },

    oldDeleteEvent: function(index) {
      // if(confirm("Are you sure you want to delete this event?")) {
      // $remove is a Vue convenience method similar to splice
      this.tasks.splice(index, 1);
      // }
    }
  }
});
