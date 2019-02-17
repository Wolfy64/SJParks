import React from 'react';
import ButtonText from '../UI/Generic/ButtonText';
import { Primary, Secondary, MiniLabel, Message } from './styles';

export default class UpdatePost extends React.Component {
  state = {
    loadMore: false,
    isOpen: false
  };

  componentDidMount() {
    console.log(this.props.post);
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
    const { post } = this.props;
    const createdAt = new Date(post.createdAt);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      createdAt
    );
    return (
      <>
        {this.state.isOpen ? (
          <>
            <Primary onClick={this.open}>
              <div>
                <i className='fas fa-caret-down' />
                <span>{post.author.fullName}</span>
              </div>
              <p>{post.createdAt}</p>
            </Primary>

            <Secondary>
              {post.parks.length < 3 ? (
                <div className='flexLabels'>
                  {post.parks.map((parkID, index) => (
                    <MiniLabel key={index}>{parkID}</MiniLabel>
                  ))}
                </div>
              ) : (
                <>
                  {this.state.loadMore ? (
                    <>
                      <div className='flexLabels'>
                        {post.parks.map((parkID, index) => (
                          <MiniLabel key={index}>{parkID}</MiniLabel>
                        ))}
                      </div>
                      <ButtonText onClick={this.showMore}>Show less</ButtonText>
                    </>
                  ) : (
                    <>
                      <div className='flexLabels'>
                        {post.parks.slice(0, 3).map((parkID, index) => (
                          <MiniLabel key={index}>{parkID}</MiniLabel>
                        ))}
                      </div>
                      <ButtonText onClick={this.showMore}>
                        {post.parks.length > 3
                          ? (post.parks.length - 3).toString() + ' more..'
                          : null}
                      </ButtonText>
                    </>
                  )}
                </>
              )}
            </Secondary>
            <Message>
              <p>{post.message}</p>
            </Message>
          </>
        ) : (
          <Primary onClick={this.open}>
            <div>
              <i className='fas fa-caret-right' />
              <span>{post.author}</span>
            </div>
            <p>
              {month} {createdAt.getDate()}, {createdAt.getFullYear()} at{' '}
              {createdAt.getHours()}:{createdAt.getMinutes()}
            </p>
          </Primary>
        )}
      </>
    );
  }
}
