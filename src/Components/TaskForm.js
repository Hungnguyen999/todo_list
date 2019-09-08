import React from "react";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false
    };
  }
  componentWillMount() {
    console.log();
    if(this.props.task){
      this.setState({
        id:this.props.task.id,
        name:this.props.task.name,
        status:this.props.task.status   //do truyển vào task={taskEdit} trong App.js 
      });
    }
  }
  componentWillReceiveProps(nextprops){
    console.log(nextprops);
    if(nextprops && nextprops.task){
      this.setState({
        id:nextprops.task.id,
        name:nextprops.task.name,
        status:nextprops.task.status
      });
    } else if(!nextprops.task){
      this.setState({
        id:'',
        name:'',
        status:false
      })
    }
    
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  };
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    //console.log(this.state)
    this.onClear();
    this.onCloseForm();
  }; //truyền thằng state qua thằng app.js
  onClear = () => {
    this.setState = {
      name: "",
      status: false
    };
  };

  render() {
    var {id}=this.state;

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id !==''? "Cập nhật công việc": "Thêm công việc"}
            <span
              className="fa fa-times-circle text-right"
              onClick={this.onCloseForm}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-groups">
              <label>Tên:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Trạng thái: </label>
            <select
              className="form-control"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Kích hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                <span className="fa fa-plus mr-5"></span>Lưu lại
              </button>
              &nbsp;
              <button
                type="submit"
                className="btn btn-danger"
                onClick={this.onClear}
              >
                <span className="fa fa-close mr-5"></span>Hủy bỏ
              </button>
              &nbsp;
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default TaskForm;
