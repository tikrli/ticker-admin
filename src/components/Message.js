import React from "react";
import {Card, Icon} from "semantic-ui-react";

import Moment from "react-moment";
import {deleteMessage} from "../api/Message";

export default class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.message.id,
            text: Message._replaceMagic(props.message.text),
            creationDate: props.message.creation_date
        };

        this._getText = this._getText.bind(this);
        this._deleteMessage = this._deleteMessage.bind(this);
    }

    static _replaceMagic(text) {
        return (text
            .replace(/(https?:\/\/([^\s]+))/g, '<a href="$1" target="_blank">$2</a>')
            .replace(/#(\S+)/g, '<a target="_blank" href="https://twitter.com/search?q=%23$1">#$1</a>')
            .replace(/@(\S+)/g, '<a target="_blank" href="https://twitter.com/$1">@$1</a>')
            .replace(/(?:\r\n|\r|\n)/g, '<br/>'));
    }

    _getText() {
        return (<p dangerouslySetInnerHTML={{ __html: this.state.text }} />);
    }

    _deleteMessage(event) {
        deleteMessage(this.state.id).then(() => {
            this.props.loadMessages()
        });

        event.preventDefault();
    }

    render() {
        return (<Card fluid>
            <Card.Content>
                <a onClick={this._deleteMessage}><Icon fitted link color='grey' name='close' style={{float: 'right'}}/></a>
                {this._getText()}
                <Card.Meta>
                    <Moment fromNow>{this.state.creationDate}</Moment>
                </Card.Meta>
            </Card.Content>
        </Card>);
    }
}