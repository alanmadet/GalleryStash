﻿//var data = [
//    { id: 1, author: "Daniel Lo Nigro", text: "Hello ReactJS.NET World!" },
//    { id: 2, author: "Pete Hunt", text: "This is one comment by Pete" },
//    { id: 3, author: "Jordan Walke", text: "This is *another* comment" }
//];


var CommentBox = React.createClass({

    loadCommentsFromServer: function () {

        var xhr = new XMLHttpRequest();

        xhr.open('get', this.props.url, true);

        xhr.onload = function () {

            var data = JSON.parse(xhr.responseText);

            this.setState({ data: data });

        }.bind(this);

        xhr.send();

    },

    handleCommentSubmit: function (comment) {

        var comments = this.state.data;

        // Optimistically set an id on the new comment. It will be replaced by an

        // id generated by the server. In a production application you would likely

        // not use Date.now() for this and would have a more robust system in place.

        comment.id = Date.now();

        var newComments = comments.concat([comment]);

        this.setState({ data: newComments });



        var data = new FormData();

        data.append('author', comment.author);

        data.append('text', comment.text);



        var xhr = new XMLHttpRequest();

        xhr.open('post', this.props.submitUrl, true);

        xhr.onload = function () {

            this.loadCommentsFromServer();

        }.bind(this);

        xhr.send(data);

    },

    getInitialState: function () {

        return { data: this.props.initialData };

    },

    componentDidMount: function () {

        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);

    },

    render: function () {

        return (

            <div className="commentBox">

                <h1>Comments</h1>

                <CommentList data={this.state.data} />

                <CommentForm onCommentSubmit={this.handleCommentSubmit} />

                <buttonInstance/>

            </div>

        );

    }

});



var CommentList = React.createClass({

    render: function () {

        var commentNodes = this.props.data.map(function (comment) {

            return (

                <Comment author={comment.author} key={comment.id}>

                    {comment.text}

                </Comment>

            );

        });

        return (

            <div className="commentList">

                {commentNodes}

            </div>

        );

    }

});



var CommentForm = React.createClass({

    getInitialState: function () {

        return { author: '', text: '' };

    },

    handleAuthorChange: function (e) {

        this.setState({ author: e.target.value });

    },

    handleTextChange: function (e) {

        this.setState({ text: e.target.value });

    },

    handleSubmit: function (e) {

        e.preventDefault();

        var author = this.state.author.trim();

        var text = this.state.text.trim();

        if (!text || !author) {

            return;

        }

        this.props.onCommentSubmit({ author: author, text: text });

        this.setState({ author: '', text: '' });

    },

    render: function () {

        return (

            <form className="commentForm" onSubmit={this.handleSubmit}>

                <input

                    type="text"

                    placeholder="Your name"

                    value={this.state.author}

                    onChange={this.handleAuthorChange}

                />

                <input

                    type="text"

                    placeholder="Say something..."

                    value={this.state.text}

                    onChange={this.handleTextChange}

                />

                <input type="submit" value="Post" />

            </form>

        );

    }

});



function createRemarkable() {

    var remarkable = (("undefined" != typeof global) && (global.Remarkable)) ? global.Remarkable : window.Remarkable;

    return new remarkable();

}



var Comment = React.createClass({

    rawMarkup: function () {

        var md = createRemarkable();

        var rawMarkup = md.render(this.props.children.toString());

        return { __html: rawMarkup };

    },

    render: function () {

        return (

            <div className="comment">

                <h2 className="commentAuthor">

                    {this.props.author}

                </h2>

                <span dangerouslySetInnerHTML={this.rawMarkup()} />

            </div>

        );

    }

});


var buttonsInstance = (
    <ButtonToolbar>
        {/* Standard button */}
        <Button>Default</Button>

        {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
        <Button bsStyle="primary">Primary</Button>

        {/* Indicates a successful or positive action */}
        <Button bsStyle="success">Success</Button>

        {/* Contextual button for informational alert messages */}
        <Button bsStyle="info">Info</Button>

        {/* Indicates caution should be taken with this action */}
        <Button bsStyle="warning">Warning</Button>

        {/* Indicates a dangerous or potentially negative action */}
        <Button bsStyle="danger">Danger</Button>

        {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
        <Button bsStyle="link">Link</Button>
    </ButtonToolbar>
);

//ReactDOM.render(buttonsInstance, mountNode);
//ReactDOM.render(
//    <CommentBox url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
//    document.getElementById('content')
//);