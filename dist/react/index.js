    /** @jsx React.DOM **/

    var DepartmentRow = React.createClass({displayName: 'DepartmentRow',
      render: function () {
        return (
          React.DOM.tr(null, 
            React.DOM.td(null, this.props.department.get('name'))
          )
        );
      }
    });

    var TableHeader = React.createClass({displayName: 'TableHeader',

      handleClick : function () {
        this.props.onSort(
          !this.props.orderByTitleDesc
        );
      },

      render: function () {
        var title = this.props.orderByTitleDesc ?  React.DOM.span({style: {color: 'red'}}, " Title ") : 'Title';
        return (
          React.DOM.thead(null, 
            React.DOM.tr(null, 
              React.DOM.th(null, " ", React.DOM.a({
                  href: "#", 
                  ref: "orderByTitle", 
                  onClick: this.handleClick
                }, 
                title
                )
                )
            )
        )
       );
      }
    });

    var DepartmentTable = React.createClass({displayName: 'DepartmentTable',
 
      getInitialState: function () {
           return {orderByTitleDesc: true}
         },

      orderByTitle: function (a, b) {
        var aTitle = a.get('name').toLowerCase();
        var bTitle = b.get('name').toLowerCase(); 
        if (this.state.orderByTitleDesc) return ((aTitle < bTitle) ? -1 : ((aTitle > bTitle) ? 1 : 0));
        return ((aTitle < bTitle) ? 1 : ((aTitle > bTitle) ? -1 : 0))
      },


      handleSort: function (orderByTitleDesc) {
        this.setState({
          orderByTitleDesc : orderByTitleDesc
        })
      },


      render: function () {
        var rows = this.props.departments
        .filter(function (department){
          console.log(department);
          return department.get('name').toLowerCase().indexOf(this.props.filterText.toLowerCase()) > -1;
        }.bind(this))
        .sort(this.orderByTitle)
        .map(function (department) {
          return DepartmentRow({key: department.cid, department: department});
        });
  
        return (
          React.DOM.div({className: "col-lg-4 col-lg-offset-4"}, 
            React.DOM.table({width: "100%"}, 
            TableHeader({
              orderByTitleDesc: this.state.orderByTitleDesc, 
              onSort: this.handleSort}
              ), 
              React.DOM.tbody(null, 
                rows
              )
            )
          )
          );
      }
    });


    var SearchBar = React.createClass({displayName: 'SearchBar',
      
      handleChange: function () {
        this.props.onUserInput(
          this.refs.filterTextInput.getDOMNode().value
          );
      },

      render: function () {
        return (
          React.DOM.div({className: "row "}, 
            React.DOM.div({className: "col-lg-4 col-lg-offset-4"}, 
              React.DOM.input({
                ref: "filterTextInput", 
                value: this.props.filterText, 
                onChange: this.handleChange, 
                className: "form-control", 
                placeholder: "Search for department"}
                )
            )
          )
          );
      }
    });


    var FilterableDepartmentTable = React.createClass({displayName: 'FilterableDepartmentTable',

      getInitialState: function(){
        return {filterText: ""};
      },

      handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText,
          });
        },
      
      render : function () {
        return (
        React.DOM.div({className: "spacer"}, 
          SearchBar({
            filterText: this.state.filterText, 
            onUserInput: this.handleUserInput}
          ), 
          DepartmentTable({
            filterText: this.state.filterText, 
            departments: this.props.departments, 
            orderByTitleDesc: this.state.orderByTitleDesc}
          )
        )
        )
      }
    });

