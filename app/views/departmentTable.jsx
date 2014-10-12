    /** @jsx React.DOM **/
Ninja.Views.FilterableDepartmentTable = React.createClass({

  mixins: [Ninja.BackboneMixin],

  getInitialState: function(){
    return {filterText: ""};
  },

  componentDidMount: function() {
    this.props.departments.fetch();
  },

  // componentDidUpdate: function() {
  //   // If saving were expensive we'd listen for mutation events on Backbone and
  //   // do this manually. however, since saving isn't expensive this is an
  //   // elegant way to keep it reactively up-to-date.
  //   this.props.departments.forEach(function(department) {
  //     department.save();
  //   });
  // },

  getBackboneModels: function() {
    return [this.props.departments];
  },

  handleUserInput: function(filterText) {
    this.setState({
        filterText: filterText,
      });
    },
  
  render : function () {
    return (
      <div className = "spacer">
        <SearchBar
          filterText = {this.state.filterText}
          onUserInput = {this.handleUserInput}
        />
        <DepartmentTable
          filterText = {this.state.filterText}
          departments = {this.props.departments}
          orderByTitleDesc = {this.state.orderByTitleDesc}
        />
      </div>
      )
    }
});
