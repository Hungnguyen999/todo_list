import React from "react";
class Sort extends React.Component {
  render() {
    return (
        /**sort */
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenu1"
              data-toggle="true"
              aria-expanded="true"
            >
              Sắp xếp
              <span className="fa fa-caroet-square-o-down ml-5"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li>
                <a role="button" className="sort-selected">
                  <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
                </a>
              </li>
              <li>
                <a role="button">
                  <span className="fa fa-sort-alpha-asc pr-5">Tên Z-A</span>
                </a>
              </li>
              <li role="separator" className="divider"></li>
              <li>
                <a role="button">Trạng thái kích hoạt</a>
              </li>
              <li>
                <a role="button">Trạng thái ẩn</a>
              </li>
            </ul>
          </div>
        </div>
    );
  }
}
export default Sort
