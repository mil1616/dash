// var Vue = require('vue');

new Vue({
  el: '#root',

  data: {
    message: 'Youhou',
    task: {
      title: ''
    },
    tasks: []
  },

  ready: function() {
    this.fetchTasks();
  },

  methods: {
    getTestMessage() {
      return 'TestMessage';
    },

    fetchTasks: function() {
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
      if (this.task.title) {
        this.tasks.push(this.task);
        this.task = {
          title: ''
        };
      }
    },

    deleteEvent: function(index) {
      // if(confirm("Are you sure you want to delete this event?")) {
      // $remove is a Vue convenience method similar to splice
      this.tasks.splice(index, 1);
      // }
    }
  }
});
