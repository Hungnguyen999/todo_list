import React from "react";
import Search from "./Search"
import Sort from './Sort'
class Controll extends React.Component {
  render() {
    return (
      /*Search */
      <div className="row mt-15">
       <Search onSearch={this.props.onSearch}/>
        {/**sort */}
      <Sort/>
      </div>
    );
  }
}
export default Controll
