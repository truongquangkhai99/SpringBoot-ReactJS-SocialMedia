import React, {Component} from 'react';
import ListTodoComponents from '../post/ListPostsComponent.jsx'
import PostComponent from '../post/PostComponent.jsx';
import AuthenticationService from '../post/AuthenticationService'
import Socket from '../post/StartSocket';
import "./profile.scss";

let stompClient = null;

class NewsFeedComponent extends React.Component{

    componentDidMount() {
        stompClient = Socket.connect();
        stompClient.connect({}, this.onConnected, this.onError);
    }

    refreshFeed = () => {
        if(this.child)
            this.child.refreshFeed();
    }

    onConnected = () => {
        stompClient.subscribe("/topic/status", this.refreshTodos);
    }

    onError = (err) => {
        console.error(err);
    }

    render(){
        return(
            <div className="col4">
                {AuthenticationService.getLoggedInUserName() === this.props.username ?
                    <div className="container">
                        <PostComponent match={this.props.match} stompClient={stompClient} refreshFeed={this.refreshFeed} username={this.props.username} history={this.props.history}/>
                    </div> : ""}
                <ListTodoComponents history={this.props.history} onRef={ref => (this.child = ref)} username={this.props.username} stompClient={stompClient}/>
            </div>
        )
    }
}

export default NewsFeedComponent;