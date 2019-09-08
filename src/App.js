import React from "react";
import "./App.css";
import TaskForm from "./Components/TaskForm";
import Controll from "./Components/Controll";
import TaskList from "./Components/TaskList";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], //id,unique,name,status
      isDisplayForm: false,
      taskEdit: null,
      filter: {
        name: "",
        status: -1
      },
      keyword: ''
    };
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks
      });
    }
  }
  // onGenerateData = () => {
  //   var tasks = [
  //     {
  //       id: this.generateID(),
  //       name: "Lập trình",
  //       status: true
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "Bán hàng",
  //       status: true
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "Makerting",
  //       status: false
  //     }
  //   ];
  //   console.log(tasks);
  //   this.setState({
  //     tasks: tasks
  //   });
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // };

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  generateID() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }
  onToggleForm = () => {
    if (this.state.isDisplayForm && this.taskEdit !== null) {
      this.setState({
        isDisplayForm: true,
        taskEdit: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEdit: null
      });
    }
  };
  onCloseForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    });
  };
  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  };
  onSubmit = data => {
    var { tasks } = this.state; // tasks = this.state.tasks
    if (data.id === "") {
      //Thêm công việc
      data.id = this.generateID();
      tasks.push(data);
    } else {
      //Sửa công việc
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEdit: null
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(data);
  };
  // Nhận data từ Taskform

  onUpdateStatus = id => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
    }
  };
  findIndex = id => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };
  onDelete = id => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.onCloseForm();
  };
  onUpdate = id => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEdit = tasks[index];
    this.setState({
      taskEdit: taskEdit
    });
    this.onShowForm();
  };
  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  };
  onSearch =(keyword)=>{
    this.setState({
      keyword:keyword
    });
  }
  render() {
    var { tasks } = this.state; //var tasks=this.state.tasks    tạo biến var truyền state vào trong taskList
    var { tasks, isDisplayForm, taskEdit, filter,keyword } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
        tasks = tasks.filter(task => {
          if(filter.status===-1){
            return task;
          }
          else{
            return task.status === (filter.status===1 ? true:false)
          }
        });
    }
    if(keyword){
      tasks=tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    var elemetTaskForm = isDisplayForm ? (
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEdit}
      />
    ) : (
      ""
    ); //sự kiện onClose truyền vào taskform
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản lý công việc</h1>
          <br />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {/*Form*/}
            {/*<TaskForm />*/}
            {elemetTaskForm}
          </div>
          {/*Search */}

          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="submit"
              className="btn btn-warning"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm công việc
            </button>

            <button
              type="submit"
              className="btn btn-primary ml-15"
              onClick={this.onGenerateData}
            >
              <span className="fa fa-plus mr-5"></span>Generate data
            </button>
            <Controll onSearch={this.onSearch}/>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />{" "}
                {/*Truyền như thế này*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
