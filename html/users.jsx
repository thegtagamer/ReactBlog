var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var browserHistory = window.ReactRouter.browserHistory;
var Link = window.ReactRouter.Link;

class UserProfile extends React.Component {
    constructor(props) {
      super(props);
      this.getProfile = this.getProfile.bind(this);
      this.findByUsername = this.findByUsername.bind(this);
      this.state = {
        username:'',
        name:'',
        email:'',
        password:'',
        id:''
      };
      
    }
    componentDidMount(){
      document.getElementById('addHyperLink').className = "";
      document.getElementById('homeHyperlink').className = "";
      document.getElementById('profileHyperlink').className = "active";
      document.getElementById('tagHyperlink').className = "";
      this.getProfile();
      this.findByUsername();
    }

    findByUsername(){
      var username = this.props.params.username;
      
      var self = this;
      
      axios.post('/users:username', {
        username: username
      })
      .then(function (response) {
        if(response){
          self.setState({username:response.data.username});
      
        }
        
      })
      .catch(function (error) {
        console.log('error is ',error);
      });

    }

    
    render() {
      return (
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <div className="form-group">
                  <input value={this.state.username} type="text" className="form-control" placeholder="Username" required />
                </div>
                                <button type="button"  id="submit" name="submit" className="btn btn-primary pull-right">Update</button>
              </form>
          </div>
        </div>
      )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>

        <Route component={UserProfile} path="/users:username"></Route>
     
    </Router>,
document.getElementById('app'));