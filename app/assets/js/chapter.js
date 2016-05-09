new Vue({
  el: '#app',
  data: {
    current: 0,
    list: {
      0: 'intro',
      1: 'entry'
    }
  },
  computed: {
    currentChapter: function() {
      return this.list[this.current];
    }
  },
  methods: {
    nextChapter: function() {
      this.current += 1;
      if(this.list[this.current] === undefined){this.current = 0;}
    }
  }
})
