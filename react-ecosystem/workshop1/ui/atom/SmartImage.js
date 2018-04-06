import observe from '@jurca/react-dom-observe';
import classnames from 'classnames';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
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
        ref={observe(this, this._rootMounted, this._rootUnmounted)}
      >
        {this.props.layout === 'responsive' &&
          <Sizer
            width={this.props.width}
            height={this.props.height}
            placeholder
          />
        }
        {this.state.noloading ?
          <img
            src={this.props.src}
            alt={this.props.alt}
            className={classnames(
              'atm-fill',
              {
                'atm-loaded': this.state.noloading && this.state.visibleInViewport,
              },
            )}
          />
          :
          <Loader mode="small" layout="center"/>
        }
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

    const rootElementRect = getBoundingClientRect(
      this._root,
      {
        width: this.props.width,
        height: this.props.height,
      },
      EXTENDED_PADDING,
    );

    if (
      this.state.visibleInViewport === false &&
      getVisibilityRatio(rootElementRect) > 0
    ) {
      this._preLoadImage();
      this._unbindEventListeners();
      this.setState({visibleInViewport: true});
    }
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
