import React from "react";
class Search extends React.Component {
  constructor(props){
    super(props);
    this.state={
      keyword:''
    }
  }
  onChange =(event)=>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:value
    });
  }
  onSearch =()=>{
    this.props.onSearch(this.state.keyword);
    console.log(this.state)
  }
  render() {  
    var {keyword}=this.state;
    return (
      /*Search */
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
            <input
              name="keyword"
              type="text"
              className="form-control"
              placeholder="Nhập từ khóa......"
              value={keyword}
              onChange={this.onChange}
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-danger" onClick={this.onSearch}> 
                <span className="fa fa-close mr-5"></span>Tìm kiếm
              </button>
              &nbsp;
            </span>
          </div>
        </div>
    );
  }
}
export default Search
