    /** @jsx React.DOM **/

    var DepartmentRow = React.createClass({displayName: 'DepartmentRow',
      render: function () {
        return (
          React.DOM.tr(null, 
            React.DOM.td(null, this.props.department.name)
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
        var aTitle = a.name.toLowerCase();
        var bTitle = b.name.toLowerCase(); 
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
          return department.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) > -1;
        }.bind(this))
        .sort(this.orderByTitle)
        .map(function (department) {
          return DepartmentRow({key: department.department_id, department: department});
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


     var departments = [
        {
            "school_specific_id": "AERO ST",
            "school_id": 1,
            "name": "Aerospace Studies",
            "department_id": "UCLA_AERO_ST"
        },
        {
            "school_specific_id": "AF AMER",
            "school_id": 1,
            "name": "African American Studies",
            "department_id": "UCLA_AF_AMER"
        },
        {
            "school_specific_id": "AF LANG",
            "school_id": 1,
            "name": "African Languages",
            "department_id": "UCLA_AF_LANG"
        },
        {
            "school_specific_id": "AFRC ST",
            "school_id": 1,
            "name": "African Studies",
            "department_id": "UCLA_AFRC_ST"
        },
        {
            "school_specific_id": "AM IND",
            "school_id": 1,
            "name": "American Indian Studies",
            "department_id": "UCLA_AM_IND"
        },
        {
            "school_specific_id": "ASL",
            "school_id": 1,
            "name": "American Sign Language",
            "department_id": "UCLA_ASL"
        },
        {
            "school_specific_id": "AN N EA",
            "school_id": 1,
            "name": "Ancient Near East",
            "department_id": "UCLA_AN_N_EA"
        },
        {
            "school_specific_id": "ANTHRO",
            "school_id": 1,
            "name": "Anthropology",
            "department_id": "UCLA_ANTHRO"
        },
        {
            "school_specific_id": "APPLING",
            "school_id": 1,
            "name": "Applied Linguistics",
            "department_id": "UCLA_APPLING"
        },
        {
            "school_specific_id": "ARABIC",
            "school_id": 1,
            "name": "Arabic",
            "department_id": "UCLA_ARABIC"
        },
        {
            "school_specific_id": "ARCHEOL",
            "school_id": 1,
            "name": "Archaeology",
            "department_id": "UCLA_ARCHEOL"
        },
        {
            "school_specific_id": "ARCH&UD",
            "school_id": 1,
            "name": "Architecture and Urban Design",
            "department_id": "UCLA_ARCH&UD"
        },
        {
            "school_specific_id": "ARMENIA",
            "school_id": 1,
            "name": "Armenian",
            "department_id": "UCLA_ARMENIA"
        },
        {
            "school_specific_id": "ART",
            "school_id": 1,
            "name": "Art",
            "department_id": "UCLA_ART"
        },
        {
            "school_specific_id": "ART HIS",
            "school_id": 1,
            "name": "Art History",
            "department_id": "UCLA_ART_HIS"
        },
        {
            "school_specific_id": "ART&ARC",
            "school_id": 1,
            "name": "Arts and Architecture",
            "department_id": "UCLA_ART&ARC"
        },
        {
            "school_specific_id": "ASIAN",
            "school_id": 1,
            "name": "Asian",
            "department_id": "UCLA_ASIAN"
        },
        {
            "school_specific_id": "ASIA AM",
            "school_id": 1,
            "name": "Asian American Studies",
            "department_id": "UCLA_ASIA_AM"
        },
        {
            "school_specific_id": "ASTR",
            "school_id": 1,
            "name": "Astronomy",
            "department_id": "UCLA_ASTR"
        },
        {
            "school_specific_id": "A&O SCI",
            "school_id": 1,
            "name": "Atmospheric and Oceanic Sciences ",
            "department_id": "UCLA_A&O_SCI"
        },
        {
            "school_specific_id": "BIOENGR",
            "school_id": 1,
            "name": "Bioengineering",
            "department_id": "UCLA_BIOENGR"
        },
        {
            "school_specific_id": "BIOINFO",
            "school_id": 1,
            "name": "Bioinformatics (Graduate)",
            "department_id": "UCLA_BIOINFO"
        },
        {
            "school_specific_id": "BIOL CH",
            "school_id": 1,
            "name": "Biological Chemistry",
            "department_id": "UCLA_BIOL_CH"
        },
        {
            "school_specific_id": "BIOMATH",
            "school_id": 1,
            "name": "Biomathematics",
            "department_id": "UCLA_BIOMATH"
        },
        {
            "school_specific_id": "BMEDPHY",
            "school_id": 1,
            "name": "Biomedical Physics",
            "department_id": "UCLA_BMEDPHY"
        },
        {
            "school_specific_id": "BMD RES",
            "school_id": 1,
            "name": "Biomedical Research",
            "department_id": "UCLA_BMD_RES"
        },
        {
            "school_specific_id": "BIOSTAT",
            "school_id": 1,
            "name": "Biostatistics",
            "department_id": "UCLA_BIOSTAT"
        },
        {
            "school_specific_id": "CEE STD",
            "school_id": 1,
            "name": "Central and East European Studies (Pre-Win...",
            "department_id": "UCLA_CEE_STD"
        },
        {
            "school_specific_id": "CH ENGR",
            "school_id": 1,
            "name": "Chemical Engineering",
            "department_id": "UCLA_CH_ENGR"
        },
        {
            "school_specific_id": "CHEM",
            "school_id": 1,
            "name": "Chemistry and Biochemistry",
            "department_id": "UCLA_CHEM"
        },
        {
            "school_specific_id": "CHICANO",
            "school_id": 1,
            "name": "Chicana and Chicano Studies",
            "department_id": "UCLA_CHICANO"
        },
        {
            "school_specific_id": "CHIN",
            "school_id": 1,
            "name": "Chinese",
            "department_id": "UCLA_CHIN"
        },
        {
            "school_specific_id": "CIVIC",
            "school_id": 1,
            "name": "Civic Engagement",
            "department_id": "UCLA_CIVIC"
        },
        {
            "school_specific_id": "C&EE",
            "school_id": 1,
            "name": "Civil and Environmental Engineering",
            "department_id": "UCLA_C&EE"
        },
        {
            "school_specific_id": "CLASSIC",
            "school_id": 1,
            "name": "Classics",
            "department_id": "UCLA_CLASSIC"
        },
        {
            "school_specific_id": "COMM ST",
            "school_id": 1,
            "name": "Communication Studies",
            "department_id": "UCLA_COMM_ST"
        },
        {
            "school_specific_id": "COM HLT",
            "school_id": 1,
            "name": "Community Health Sciences",
            "department_id": "UCLA_COM_HLT"
        },
        {
            "school_specific_id": "COM LIT",
            "school_id": 1,
            "name": "Comparative Literature",
            "department_id": "UCLA_COM_LIT"
        },
        {
            "school_specific_id": "C&S BIO",
            "school_id": 1,
            "name": "Computational and Systems Biology",
            "department_id": "UCLA_C&S_BIO"
        },
        {
            "school_specific_id": "COM SCI",
            "school_id": 1,
            "name": "Computer Science",
            "department_id": "UCLA_COM_SCI"
        },
        {
            "school_specific_id": "CAEM",
            "school_id": 1,
            "name": "Conservation of Archaeological Ethnographi...",
            "department_id": "UCLA_CAEM"
        },
        {
            "school_specific_id": "DANCE",
            "school_id": 1,
            "name": "Dance",
            "department_id": "UCLA_DANCE"
        },
        {
            "school_specific_id": "DENT",
            "school_id": 1,
            "name": "Dentistry",
            "department_id": "UCLA_DENT"
        },
        {
            "school_specific_id": "DESMA",
            "school_id": 1,
            "name": "Design | Media Arts",
            "department_id": "UCLA_DESMA"
        },
        {
            "school_specific_id": "DGT HUM",
            "school_id": 1,
            "name": "Digital Humanities",
            "department_id": "UCLA_DGT_HUM"
        },
        {
            "school_specific_id": "DIS STD",
            "school_id": 1,
            "name": "Disability Studies",
            "department_id": "UCLA_DIS_STD"
        },
        {
            "school_specific_id": "DUTCH",
            "school_id": 1,
            "name": "Dutch",
            "department_id": "UCLA_DUTCH"
        },
        {
            "school_specific_id": "EPS SCI",
            "school_id": 1,
            "name": "Earth, Planetary, and Space Sciences",
            "department_id": "UCLA_EPS_SCI"
        },
        {
            "school_specific_id": "EE BIOL",
            "school_id": 1,
            "name": "Ecology and Evolutionary Biology ",
            "department_id": "UCLA_EE_BIOL"
        },
        {
            "school_specific_id": "ECON",
            "school_id": 1,
            "name": "Economics",
            "department_id": "UCLA_ECON"
        },
        {
            "school_specific_id": "EDUC",
            "school_id": 1,
            "name": "Education",
            "department_id": "UCLA_EDUC"
        },
        {
            "school_specific_id": "EL ENGR",
            "school_id": 1,
            "name": "Electrical Engineering",
            "department_id": "UCLA_EL_ENGR"
        },
        {
            "school_specific_id": "ENGR",
            "school_id": 1,
            "name": "Engineering",
            "department_id": "UCLA_ENGR"
        },
        {
            "school_specific_id": "ENGL",
            "school_id": 1,
            "name": "English",
            "department_id": "UCLA_ENGL"
        },
        {
            "school_specific_id": "ESL",
            "school_id": 1,
            "name": "English as a Second Language ",
            "department_id": "UCLA_ESL"
        },
        {
            "school_specific_id": "ENGCOMP",
            "school_id": 1,
            "name": "English Composition",
            "department_id": "UCLA_ENGCOMP"
        },
        {
            "school_specific_id": "ENVIRON",
            "school_id": 1,
            "name": "Environment",
            "department_id": "UCLA_ENVIRON"
        },
        {
            "school_specific_id": "ENV HLT",
            "school_id": 1,
            "name": "Environmental Health Sciences",
            "department_id": "UCLA_ENV_HLT"
        },
        {
            "school_specific_id": "EPIDEM",
            "school_id": 1,
            "name": "Epidemiology",
            "department_id": "UCLA_EPIDEM"
        },
        {
            "school_specific_id": "ETHNOMU",
            "school_id": 1,
            "name": "Ethnomusicology",
            "department_id": "UCLA_ETHNOMU"
        },
        {
            "school_specific_id": "FILIPNO",
            "school_id": 1,
            "name": "Filipino",
            "department_id": "UCLA_FILIPNO"
        },
        {
            "school_specific_id": "FILM TV",
            "school_id": 1,
            "name": "Film and Television",
            "department_id": "UCLA_FILM_TV"
        },
        {
            "school_specific_id": "FRNCH",
            "school_id": 1,
            "name": "French",
            "department_id": "UCLA_FRNCH"
        },
        {
            "school_specific_id": "GENDER",
            "school_id": 1,
            "name": "Gender Studies",
            "department_id": "UCLA_GENDER"
        },
        {
            "school_specific_id": "GE CLST",
            "school_id": 1,
            "name": "General Education Clusters",
            "department_id": "UCLA_GE_CLST"
        },
        {
            "school_specific_id": "GEOG",
            "school_id": 1,
            "name": "Geography",
            "department_id": "UCLA_GEOG"
        },
        {
            "school_specific_id": "GERMAN",
            "school_id": 1,
            "name": "German",
            "department_id": "UCLA_GERMAN"
        },
        {
            "school_specific_id": "GLBL ST",
            "school_id": 1,
            "name": "Global Studies",
            "department_id": "UCLA_GLBL_ST"
        },
        {
            "school_specific_id": "GREEK",
            "school_id": 1,
            "name": "Greek",
            "department_id": "UCLA_GREEK"
        },
        {
            "school_specific_id": "HLT POL",
            "school_id": 1,
            "name": "Health Policy and Management",
            "department_id": "UCLA_HLT_POL"
        },
        {
            "school_specific_id": "HEBREW",
            "school_id": 1,
            "name": "Hebrew",
            "department_id": "UCLA_HEBREW"
        },
        {
            "school_specific_id": "HIN-URD",
            "school_id": 1,
            "name": "Hindi-Urdu",
            "department_id": "UCLA_HIN-URD"
        },
        {
            "school_specific_id": "HIST",
            "school_id": 1,
            "name": "History",
            "department_id": "UCLA_HIST"
        },
        {
            "school_specific_id": "HNRS",
            "school_id": 1,
            "name": "Honors Collegium",
            "department_id": "UCLA_HNRS"
        },
        {
            "school_specific_id": "HUM GEN",
            "school_id": 1,
            "name": "Human Genetics",
            "department_id": "UCLA_HUM_GEN"
        },
        {
            "school_specific_id": "HUNGRN",
            "school_id": 1,
            "name": "Hungarian (Pre-Winter 2015)",
            "department_id": "UCLA_HUNGRN"
        },
        {
            "school_specific_id": "ILA",
            "school_id": 1,
            "name": "Indigenous Languages of the Americas",
            "department_id": "UCLA_ILA"
        },
        {
            "school_specific_id": "I E STD",
            "school_id": 1,
            "name": "Indo-European Studies",
            "department_id": "UCLA_I_E_STD"
        },
        {
            "school_specific_id": "INDO",
            "school_id": 1,
            "name": "Indonesian",
            "department_id": "UCLA_INDO"
        },
        {
            "school_specific_id": "INF STD",
            "school_id": 1,
            "name": "Information Studies",
            "department_id": "UCLA_INF_STD"
        },
        {
            "school_specific_id": "I A STD",
            "school_id": 1,
            "name": "International and Area Studies",
            "department_id": "UCLA_I_A_STD"
        },
        {
            "school_specific_id": "INTL DV",
            "school_id": 1,
            "name": "International Development Studies",
            "department_id": "UCLA_INTL_DV"
        },
        {
            "school_specific_id": "IRANIAN",
            "school_id": 1,
            "name": "Iranian",
            "department_id": "UCLA_IRANIAN"
        },
        {
            "school_specific_id": "ISLAMIC",
            "school_id": 1,
            "name": "Islamics",
            "department_id": "UCLA_ISLAMIC"
        },
        {
            "school_specific_id": "ITALIAN",
            "school_id": 1,
            "name": "Italian",
            "department_id": "UCLA_ITALIAN"
        },
        {
            "school_specific_id": "JAPAN",
            "school_id": 1,
            "name": "Japanese",
            "department_id": "UCLA_JAPAN"
        },
        {
            "school_specific_id": "JEWISH",
            "school_id": 1,
            "name": "Jewish Studies",
            "department_id": "UCLA_JEWISH"
        },
        {
            "school_specific_id": "KOREA",
            "school_id": 1,
            "name": "Korean",
            "department_id": "UCLA_KOREA"
        },
        {
            "school_specific_id": "LBR&WS",
            "school_id": 1,
            "name": "Labor and Workplace Studies",
            "department_id": "UCLA_LBR&WS"
        },
        {
            "school_specific_id": "LATIN",
            "school_id": 1,
            "name": "Latin",
            "department_id": "UCLA_LATIN"
        },
        {
            "school_specific_id": "LATN AM",
            "school_id": 1,
            "name": "Latin American Studies",
            "department_id": "UCLA_LATN_AM"
        },
        {
            "school_specific_id": "LAW",
            "school_id": 1,
            "name": "Law",
            "department_id": "UCLA_LAW"
        },
        {
            "school_specific_id": "LGBTS",
            "school_id": 1,
            "name": "Lesbian, Gay, Bisexual, and Transgender St...",
            "department_id": "UCLA_LGBTS"
        },
        {
            "school_specific_id": "LIFESCI",
            "school_id": 1,
            "name": "Life Sciences",
            "department_id": "UCLA_LIFESCI"
        },
        {
            "school_specific_id": "LING",
            "school_id": 1,
            "name": "Linguistics",
            "department_id": "UCLA_LING"
        },
        {
            "school_specific_id": "MGMT",
            "school_id": 1,
            "name": "Management",
            "department_id": "UCLA_MGMT"
        },
        {
            "school_specific_id": "MAT SCI",
            "school_id": 1,
            "name": "Materials Science and Engineering",
            "department_id": "UCLA_MAT_SCI"
        },
        {
            "school_specific_id": "MATH",
            "school_id": 1,
            "name": "Mathematics",
            "department_id": "UCLA_MATH"
        },
        {
            "school_specific_id": "MECH&AE",
            "school_id": 1,
            "name": "Mechanical and Aerospace Engineering",
            "department_id": "UCLA_MECH&AE"
        },
        {
            "school_specific_id": "MED HIS",
            "school_id": 1,
            "name": "Medical History",
            "department_id": "UCLA_MED_HIS"
        },
        {
            "school_specific_id": "MED",
            "school_id": 1,
            "name": "Medicine",
            "department_id": "UCLA_MED"
        },
        {
            "school_specific_id": "MIMG",
            "school_id": 1,
            "name": "Microbiology, Immunology, and Molecular Ge...",
            "department_id": "UCLA_MIMG"
        },
        {
            "school_specific_id": "M E STD",
            "school_id": 1,
            "name": "Middle Eastern Studies",
            "department_id": "UCLA_M_E_STD"
        },
        {
            "school_specific_id": "MIL SCI",
            "school_id": 1,
            "name": "Military Science",
            "department_id": "UCLA_MIL_SCI"
        },
        {
            "school_specific_id": "M PHARM",
            "school_id": 1,
            "name": "Molecular and Medical Pharmacology",
            "department_id": "UCLA_M_PHARM"
        },
        {
            "school_specific_id": "MOL BIO",
            "school_id": 1,
            "name": "Molecular Biology",
            "department_id": "UCLA_MOL_BIO"
        },
        {
            "school_specific_id": "MOL TOX",
            "school_id": 1,
            "name": "Molecular Toxicology",
            "department_id": "UCLA_MOL_TOX"
        },
        {
            "school_specific_id": "MCD BIO",
            "school_id": 1,
            "name": "Molecular, Cell, and Developmental Biology",
            "department_id": "UCLA_MCD_BIO"
        },
        {
            "school_specific_id": "MC&IP",
            "school_id": 1,
            "name": "Molecular, Cellular, and Integrative Physi...",
            "department_id": "UCLA_MC&IP"
        },
        {
            "school_specific_id": "MIA STD",
            "school_id": 1,
            "name": "Moving Image Archive Studies",
            "department_id": "UCLA_MIA_STD"
        },
        {
            "school_specific_id": "MUSIC",
            "school_id": 1,
            "name": "Music",
            "department_id": "UCLA_MUSIC"
        },
        {
            "school_specific_id": "MUS HST",
            "school_id": 1,
            "name": "Music History",
            "department_id": "UCLA_MUS_HST"
        },
        {
            "school_specific_id": "MUS IND",
            "school_id": 1,
            "name": "Music Industry",
            "department_id": "UCLA_MUS_IND"
        },
        {
            "school_specific_id": "MUSCLGY",
            "school_id": 1,
            "name": "Musicology",
            "department_id": "UCLA_MUSCLGY"
        },
        {
            "school_specific_id": "NAV SCI",
            "school_id": 1,
            "name": "Naval Science",
            "department_id": "UCLA_NAV_SCI"
        },
        {
            "school_specific_id": "NR EAST",
            "school_id": 1,
            "name": "Near Eastern Languages",
            "department_id": "UCLA_NR_EAST"
        },
        {
            "school_specific_id": "NEURBIO",
            "school_id": 1,
            "name": "Neurobiology",
            "department_id": "UCLA_NEURBIO"
        },
        {
            "school_specific_id": "NEURLGY",
            "school_id": 1,
            "name": "Neurology",
            "department_id": "UCLA_NEURLGY"
        },
        {
            "school_specific_id": "NEUROSC",
            "school_id": 1,
            "name": "Neuroscience",
            "department_id": "UCLA_NEUROSC"
        },
        {
            "school_specific_id": "NEURO",
            "school_id": 1,
            "name": "Neuroscience (Graduate)",
            "department_id": "UCLA_NEURO"
        },
        {
            "school_specific_id": "NEURSGY",
            "school_id": 1,
            "name": "Neurosurgery",
            "department_id": "UCLA_NEURSGY"
        },
        {
            "school_specific_id": "NURSING",
            "school_id": 1,
            "name": "Nursing",
            "department_id": "UCLA_NURSING"
        },
        {
            "school_specific_id": "OBGYN",
            "school_id": 1,
            "name": "Obstetrics and Gynecology",
            "department_id": "UCLA_OBGYN"
        },
        {
            "school_specific_id": "ORL BIO",
            "school_id": 1,
            "name": "Oral Biology",
            "department_id": "UCLA_ORL_BIO"
        },
        {
            "school_specific_id": "PATH",
            "school_id": 1,
            "name": "Pathology and Laboratory Medicine",
            "department_id": "UCLA_PATH"
        },
        {
            "school_specific_id": "PHILOS",
            "school_id": 1,
            "name": "Philosophy",
            "department_id": "UCLA_PHILOS"
        },
        {
            "school_specific_id": "PHYSICS",
            "school_id": 1,
            "name": "Physics",
            "department_id": "UCLA_PHYSICS"
        },
        {
            "school_specific_id": "PHYSCI",
            "school_id": 1,
            "name": "Physiological Science",
            "department_id": "UCLA_PHYSCI"
        },
        {
            "school_specific_id": "PHYSIOL",
            "school_id": 1,
            "name": "Physiology",
            "department_id": "UCLA_PHYSIOL"
        },
        {
            "school_specific_id": "POLISH",
            "school_id": 1,
            "name": "Polish (Pre-Winter 2015)",
            "department_id": "UCLA_POLISH"
        },
        {
            "school_specific_id": "POL SCI",
            "school_id": 1,
            "name": "Political Science",
            "department_id": "UCLA_POL_SCI"
        },
        {
            "school_specific_id": "PORTGSE",
            "school_id": 1,
            "name": "Portuguese",
            "department_id": "UCLA_PORTGSE"
        },
        {
            "school_specific_id": "COMPTNG",
            "school_id": 1,
            "name": "Program in Computing",
            "department_id": "UCLA_COMPTNG"
        },
        {
            "school_specific_id": "PSYCTRY",
            "school_id": 1,
            "name": "Psychiatry and Biobehavioral Sciences",
            "department_id": "UCLA_PSYCTRY"
        },
        {
            "school_specific_id": "PSYCH",
            "school_id": 1,
            "name": "Psychology",
            "department_id": "UCLA_PSYCH"
        },
        {
            "school_specific_id": "PUB HLT",
            "school_id": 1,
            "name": "Public Health",
            "department_id": "UCLA_PUB_HLT"
        },
        {
            "school_specific_id": "PUB PLC",
            "school_id": 1,
            "name": "Public Policy",
            "department_id": "UCLA_PUB_PLC"
        },
        {
            "school_specific_id": "RELIGN",
            "school_id": 1,
            "name": "Religion, Study of",
            "department_id": "UCLA_RELIGN"
        },
        {
            "school_specific_id": "ROMAN",
            "school_id": 1,
            "name": "Romanian (Pre-Winter 2015)",
            "department_id": "UCLA_ROMAN"
        },
        {
            "school_specific_id": "RUSSIAN",
            "school_id": 1,
            "name": "Russian (Pre-Winter 2015)",
            "department_id": "UCLA_RUSSIAN"
        },
        {
            "school_specific_id": "SCAND",
            "school_id": 1,
            "name": "Scandinavian",
            "department_id": "UCLA_SCAND"
        },
        {
            "school_specific_id": "SCI EDU",
            "school_id": 1,
            "name": "Science Education",
            "department_id": "UCLA_SCI_EDU"
        },
        {
            "school_specific_id": "SEMITIC",
            "school_id": 1,
            "name": "Semitics",
            "department_id": "UCLA_SEMITIC"
        },
        {
            "school_specific_id": "SER CRO",
            "school_id": 1,
            "name": "Serbian/Croatian (Pre-Winter 2015)",
            "department_id": "UCLA_SER_CRO"
        },
        {
            "school_specific_id": "SLAVIC",
            "school_id": 1,
            "name": "Slavic (Pre-Winter 2015)",
            "department_id": "UCLA_SLAVIC"
        },
        {
            "school_specific_id": "SOC THT",
            "school_id": 1,
            "name": "Social Thought",
            "department_id": "UCLA_SOC_THT"
        },
        {
            "school_specific_id": "SOC WLF",
            "school_id": 1,
            "name": "Social Welfare",
            "department_id": "UCLA_SOC_WLF"
        },
        {
            "school_specific_id": "SOC GEN",
            "school_id": 1,
            "name": "Society and Genetics",
            "department_id": "UCLA_SOC_GEN"
        },
        {
            "school_specific_id": "SOCIOL",
            "school_id": 1,
            "name": "Sociology",
            "department_id": "UCLA_SOCIOL"
        },
        {
            "school_specific_id": "S ASIAN",
            "school_id": 1,
            "name": "South Asian",
            "department_id": "UCLA_S_ASIAN"
        },
        {
            "school_specific_id": "SEASIAN",
            "school_id": 1,
            "name": "Southeast Asian",
            "department_id": "UCLA_SEASIAN"
        },
        {
            "school_specific_id": "SPAN",
            "school_id": 1,
            "name": "Spanish",
            "department_id": "UCLA_SPAN"
        },
        {
            "school_specific_id": "STATS",
            "school_id": 1,
            "name": "Statistics",
            "department_id": "UCLA_STATS"
        },
        {
            "school_specific_id": "SURGERY",
            "school_id": 1,
            "name": "Surgery",
            "department_id": "UCLA_SURGERY"
        },
        {
            "school_specific_id": "THAI",
            "school_id": 1,
            "name": "Thai",
            "department_id": "UCLA_THAI"
        },
        {
            "school_specific_id": "THEATER",
            "school_id": 1,
            "name": "Theater",
            "department_id": "UCLA_THEATER"
        },
        {
            "school_specific_id": "TURKIC",
            "school_id": 1,
            "name": "Turkic Languages",
            "department_id": "UCLA_TURKIC"
        },
        {
            "school_specific_id": "UKRAIN",
            "school_id": 1,
            "name": "Ukrainian (Pre-Winter 2015)",
            "department_id": "UCLA_UKRAIN"
        },
        {
            "school_specific_id": "UNIV ST",
            "school_id": 1,
            "name": "University Studies",
            "department_id": "UCLA_UNIV_ST"
        },
        {
            "school_specific_id": "URBN PL",
            "school_id": 1,
            "name": "Urban Planning",
            "department_id": "UCLA_URBN_PL"
        },
        {
            "school_specific_id": "VIETMSE",
            "school_id": 1,
            "name": "Vietnamese",
            "department_id": "UCLA_VIETMSE"
        },
        {
            "school_specific_id": "WL ARTS",
            "school_id": 1,
            "name": "World Arts and Cultures",
            "department_id": "UCLA_WL_ARTS"
        },
        {
            "school_specific_id": "YIDDSH",
            "school_id": 1,
            "name": "Yiddish",
            "department_id": "UCLA_YIDDSH"
        }
    ];

    var RView = React.createClass({displayName: 'RView',
      render: function () {
        return(
        FilterableDepartmentTable({departments: departments})
      )
      }
    });