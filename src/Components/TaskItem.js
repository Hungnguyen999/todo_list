import React from 'react'
class TaskList extends React.Component{
      onUpdateStatus =()=>{
        this.props.onUpdateStatus(this.props.task.id);
      }
      onDelete =()=>{
        this.props.onDelete(this.props.task.id);
      }
      onUpdate =()=>{
        this.props.onUpdate(this.props.task.id);
      }
    render(){
      var { task,index }=this.props;  {/*Nhận giá trị task, index từ tasklist */}

        return( 
            <tr>     
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                  <span className={task.status===true?"label label-danger":"label label-success"} 
                        onClick={this.onUpdateStatus}>{task.status===true? 'Kích hoạt':'Ẩn'}</span>
                </td>
                <td className="text-center">
                  <button type="submit" className="btn btn-warning" onClick={this.onUpdate}>
                    <span className="fa fa-plus mr-5"></span>Sửa
                  </button>
                  &nbsp;
                  <button type="submit" className="btn btn-danger" onClick={this.onDelete}>
                    <span className="fa fa-close mr-5"></span>Xóa
                  </button>
                  &nbsp;
                </td>
            </tr>
        );
    }
}
export default TaskList;