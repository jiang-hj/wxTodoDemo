Page({
  data: {
    inpText: '',
    checkedAll: false,
    todos: [],
    leftNum: 0,
    showState: 'all'
  },

  onLoad() {
    let self = this
    wx.getStorage({
      key: 'todos',
      success(res) {
        self.setData({
          todos: res.data
        })

        self.refreshLeftNum()
      }
    })    
  },

  //新增项目
  addTodo(e) {
    let value = e.detail.value,
    todos = this.data.todos
    console.log(e)
    console.log(todos)
    if(value) {
      this.data.todos.push({text: value,finished:false})
      this.setData({
        inpText: '',  
        todos: this.data.todos,
        checkedAll: false     
      })     
    }

    this.refreshLeftNum()

    this.saveTodos()
  },

  //选取所有
  checkAll(e) {
    // console.log(e)
    if(e.detail.value.length) {
      // console.log('全选')
      this.data.todos.forEach(todo => {
        todo.finished = true
      });      
    }else {
      // console.log('取消')
      this.data.todos.forEach(todo => {
        todo.finished = false
      });
    }

    this.setData({
      todos: this.data.todos
    })

    this.refreshLeftNum()
    this.saveTodos()
  },

  //项目选取
  checkItem(e) {
    let index = e.target.dataset.index,
        isChecked = !this.data.todos[index].finished
    
    this.data.todos[index].finished = isChecked
    this.setData({
      todos: this.data.todos
    })
  
    if(isChecked) {
      let flag = true
      this.data.todos.forEach(todo => {
        if(!todo.finished) {
          flag = false
        }
      })

      if(flag) {
        this.setData({
          checkedAll: true
        })
      }
    }else {
      this.setData({
        checkedAll: false
      })
    }
    this.refreshLeftNum()
    this.saveTodos()

    console.log(this.data.checkedAll)
  },

  //切换显示
  toggleShow(e) {
    console.log(e)
    if(e.target.dataset.state) {
      this.setData({
        showState : e.target.dataset.state
      })
    }
    
    console.log(this.data.showState)
  },

  //清除完成
  clearCompleted() {
    for(let i = this.data.todos.length - 1; i >= 0; i--) {
      if(this.data.todos[i].finished) {
        this.data.todos.splice(i,1)
      }
    }

    this.setData({
      todos: this.data.todos
    })
  },

  //刷新未完成数量
  refreshLeftNum() {    
    let leftNum = 0
    this.data.todos.forEach(item => {
      if(!item.finished) {
        leftNum++
      }
    })
    this.setData({
      leftNum
    })
  },
  
  //本地存储
  saveTodos() {
    wx.setStorageSync('todos',this.data.todos);
  }
})