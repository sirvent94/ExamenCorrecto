import React, { Component, Fragment } from 'react';
import './App.css';
import TweetBox from './TweetBox';
import Feed from './Feed';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            error: null,
            isLoaded: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch("https://still-garden-88285.herokuapp.com/draft_tweets")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        tweets: result.draft_tweets
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    })
                }
            )
    }


    //DELETE

    deleteTweet(e) {
        console.log(e.target.getAttribute('data-tweet'));
        let tweet = e.target.getAttribute('data-tweet');

        fetch(`https://still-garden-88285.herokuapp.com/draft_tweets/${tweet}`, {
                method: 'DELETE',
            })
            .then(this.setState({ idLoading: true }))
            .then(setTimeout(this.componentDidMount.bind(this), 500));

    }


    handleSubmit(newText) {
        this.setState({ isLoaded: false });

        let newTweet = {
            user_name: 'Yvone',
            avatar: 'https://img.ifcdn.com/images/d3951bf44788590b80f69c0c65718f7a23eb33c645cb677ee335f81a6e785ee6_3.jpg',
            description: newText
        };

        let headers = {};
        headers['Content-Type'] = 'application/json';

        const options = {
            headers: headers,
            method: 'POST',
            // credentials: 'include',
            body: JSON.stringify(newTweet)
        };

        fetch("https://still-garden-88285.herokuapp.com/draft_tweets", options)
            .then(res => res.json())
            .then(
                (result) => {
                    let newTweets = this.state.tweets.slice();

                    this.setState({
                        isLoaded: true,
                        tweets: newTweets.concat(result.draft_tweet)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, tweets } = this.state;
        let content;

        if (error) {
            content = < div > Error: { error.message } < /div>;
        } else {
            return (
                content = ( <
                    Fragment >
                    <
                    TweetBox onSubmitNewTweet = { this.handleSubmit }
                    /> <
                    Feed tweets = { tweets }
                    isLoaded = { isLoaded }
                    /> < /
                    Fragment >
                )
            );
        }

        return ( <
            div className = "App" > { content } <
            /div>
        )
    }
}

export default App;