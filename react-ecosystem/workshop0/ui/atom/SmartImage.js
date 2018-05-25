import observe from '@jurca/react-dom-observe';
import classnames from 'classnames';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import React from 'react';
import Loader from '~/ui/atom/Loader';
import Sizer from '~/ui/atom/Sizer';
import {getBoundingClientRect, getVisibilityRatio} from '~/util/componentHelpers';

const EXTENDED_PADDING = 300;

export default class SmartImage extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    layout: PropTypes.string,
    alt: PropTypes.string,
  };

  static defaultProps = {
    width: null,
    height: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      noloading: false,
      visibleInViewport: false,
    };

    this._root = null;
    this._throttledCheckVisibility = throttle(() => this._checkVisibility(), 333);
  }

  render() {
    return (
      <div
        className={classnames(
          'atm-image',
          'atm-overflow',
          {
            'atm-responsive': this.props.layout === 'responsive',
          },
        )}
        style={this.props.layout !== 'responsive' ?
          {
            width: this.props.width,
            height: this.props.height,
          }
          :
          null
        }
        ref={null/* TODO: obtain the root element reference */}
      >
        {this.props.layout === 'responsive' &&
          <Sizer
            width={this.props.width}
            height={this.props.height}
            placeholder
          />
        }
        {/* TODO: show loader while loading instead of img */}
        <img
          src={this.props.src}
          alt={this.props.alt}
          className={classnames(
            'atm-fill',
            {
              'atm-loaded': this.state.noloading,
            },
          )}
        />
      </div>
    );
  }

  _rootMounted(rootNode) {
    this._root = rootNode;
    this._bindEventListeners();
    this._checkVisibility();
  }

  _rootUnmounted() {
    this._root = null;
    this._unbindEventListeners();
  }

  _bindEventListeners() {
    window.addEventListener('resize', this._throttledCheckVisibility);
    window.addEventListener('scroll', this._throttledCheckVisibility);
  }

  _unbindEventListeners() {
    window.removeEventListener('resize', this._throttledCheckVisibility);
    window.removeEventListener('scroll', this._throttledCheckVisibility);
  }

  _checkVisibility() {
    if (!this._root) {
      return;
    }

    // TODO - see the pseudocode below

    // get bounds of the root element with some extra padding

    // if the element is visible and we did not trigger image loading yet:
    //   - load image
    //   - remove event listeners
    //   - set flag that we started image loading
  }

  _preLoadImage() {
    const image = new Image();

    image.onload = () => {
      if (this._root) {
        this.setState({noloading: true});
      }
    };
    image.onerror = () => {
      if (this._root) {
        this.setState({noloading: true});
      }
    };

    if (this.props.src) {
      image.src = this.props.src;
    } else {
      if (this._root) {
        this.setState({noloading: true});
      }
    }
  }
}
