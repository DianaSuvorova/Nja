    // /** @jsx React.DOM **/

    // var DepartmentRow = React.createClass({
    //   render: function () {
    //     return (
    //       <tr>
    //         <td>
    //         <a href='#' >
    //         </a>
    //         {this.props.department.get('name')}
    //         </td>
    //       </tr>
    //     );
    //   }
    // });

    // var TableHeader = React.createClass({

    //   handleClick : function () {
    //     this.props.onSort(
    //       !this.props.orderByTitleDesc
    //     );
    //   },

    //   render: function () {
    //     var title = this.props.orderByTitleDesc ?  <span style={{color: 'red'}}> Title </span> : 'Title';
    //     return (
    //       <thead>
    //         <tr>
    //           <th> <a 
    //               href='#'
    //               ref = "orderByTitle"
    //               onClick  = {this.handleClick} 
    //             >
    //             {title}
    //             </a>
    //             </th>
    //         </tr>
    //     </thead>
    //    );
    //   }
    // });

    // var DepartmentTable = React.createClass({
 
    //   getInitialState: function () {
    //        return {orderByTitleDesc: true}
    //      },

    //   orderByTitle: function (a, b) {
    //     var aTitle = a.get('name').toLowerCase();
    //     var bTitle = b.get('name').toLowerCase(); 
    //     if (this.state.orderByTitleDesc) return ((aTitle < bTitle) ? -1 : ((aTitle > bTitle) ? 1 : 0));
    //     return ((aTitle < bTitle) ? 1 : ((aTitle > bTitle) ? -1 : 0))
    //   },


    //   handleSort: function (orderByTitleDesc) {
    //     this.setState({
    //       orderByTitleDesc : orderByTitleDesc
    //     })
    //   },


    //   render: function () {
    //     var rows = this.props.departments
    //     .filter(function (department){
    //       return department.get('name').toLowerCase().indexOf(this.props.filterText.toLowerCase()) > -1;
    //     }.bind(this))
    //     .sort(this.orderByTitle)
    //     .map(function (department) {
    //       return <DepartmentRow key = {department.cid} department = {department} />;
    //     });
  
    //     return (
    //       <div className = "col-lg-4 col-lg-offset-4">
    //         <table width="100%">
    //         <TableHeader 
    //           orderByTitleDesc = {this.state.orderByTitleDesc}
    //           onSort = {this.handleSort}
    //           />
    //           <tbody>
    //             {rows}
    //           </tbody>
    //         </table>
    //       </div>
    //       );
    //   }
    // });


    // var SearchBar = React.createClass({
      
    //   handleChange: function () {
    //     this.props.onUserInput(
    //       this.refs.filterTextInput.getDOMNode().value
    //       );
    //   },

    //   render: function () {
    //     return (
    //       <div className = "row ">
    //         <div className = "col-lg-4 col-lg-offset-4">
    //           <input 
    //             ref="filterTextInput" 
    //             value = {this.props.filterText} 
    //             onChange = {this.handleChange} 
    //             className = "form-control" 
    //             placeholder="Search for department" 
    //             />
    //         </div>
    //       </div>
    //       );
    //   }
    // });


