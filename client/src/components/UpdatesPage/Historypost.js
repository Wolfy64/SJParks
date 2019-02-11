import React from 'react';
import ButtonText from '../UI/Generic/ButtonText';
import {Primary, Secondary, MiniLabel, Message} from './styles';

export default class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            loadMore: false,
            isOpen: false
        };
    }

    showMore = () => {
        this.state.loadMore
        ? this.setState({ loadMore: false })
        : this.setState({ loadMore: true });
    };
    open = () => {
        this.state.isOpen
        ? this.setState({ isOpen: false })
        : this.setState({ isOpen: true });
    };

    render() {
        return (
        <>
            {this.state.isOpen ? (
            <>
                <Primary onClick={this.open}>
                    <div>
                        <i className='fas fa-caret-down'/>
                        <span>{this.props.post.name}</span>
                    </div>
                    <p>
                        {this.props.post.date} at {this.props.post.time}
                    </p>
                </Primary>

                <Secondary>
                    {this.props.post.parkIDs.length < 3 ? (
                        <div className='flexLabels'>
                            {this.props.post.parkIDs.map((parkID, index) => (
                                <MiniLabel key={index}>{parkID}</MiniLabel>
                            ))}
                        </div>
                    ) : (
                        <>
                            {this.state.loadMore ? (
                                <>
                                    <div className='flexLabels'>
                                        {this.props.post.parkIDs.map((parkID, index) => (
                                            <MiniLabel key={index}>{parkID}</MiniLabel>
                                        ))}
                                    </div>
                                    <ButtonText onClick={this.showMore}>
                                        Show less
                                    </ButtonText>
                                </>
                            ) : (
                                <>
                                    <div className='flexLabels'>
                                        {this.props.post.parkIDs.slice(0, 3).map((parkID, index) => (
                                            <MiniLabel key={index}>{parkID}</MiniLabel>
                                        ))}
                                    </div>
                                    <ButtonText onClick={this.showMore}>
                                        {this.props.post.parkIDs.length > 3
                                        ? (this.props.post.parkIDs.length - 3).toString() +
                                            ' more..'
                                        : null}
                                    </ButtonText>
                                </>
                            )}
                        </>
                    )}
                </Secondary>
                <Message><p>{this.props.post.message}</p></Message>
            </>
            ) : (
                <Primary onClick={this.open}>
                    <div>
                        <i className='fas fa-caret-right' />
                        <span>{this.props.post.name}</span>
                    </div>
                    <p>
                        {this.props.post.date} at {this.props.post.time}
                    </p>
                </Primary>
            )}
        </>
        );
    }
}