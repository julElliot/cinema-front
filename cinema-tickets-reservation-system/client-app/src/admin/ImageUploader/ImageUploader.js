/* eslint-disable no-unused-expressions */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
//import {useDropzone} from 'react-dropzone'
import Dropzone from 'react-dropzone';
import localStorageHelper from '../../helper/LocalStorageHelpers';
import Tool from '../../shared/Tool/Tool';
import './imageUploader.scss';

class ImageUploader extends Component {
    static defaultProps = {
      className: '',
    };

    static propTypes = {
      className: PropTypes.string,
      input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
      }).isRequired,
      meta: PropTypes.shape().isRequired,

    };

    state = {
      imagePath: null,
    };


    componentDidMount() {
      window.addEventListener('beforeunload', () => localStorageHelper.saveStateToLocalStorage(this.state));
      this.hydrateStateWithLocalStorage();
      if (this.props.uploadedFile) {
        this.setState({
          imagePath: { src: this.props.uploadedFile.photo },
        });
      }
    }

    componentWillUnmount() {
      window.removeEventListener('beforeunload', () => localStorageHelper.saveStateToLocalStorage(this.state));
      localStorageHelper.removeStateFromLocalStorage(this.state);
    }

    hydrateStateWithLocalStorage = () => {
      for (const key in this.state) {
        // eslint-disable-next-line no-prototype-builtins
        if (localStorage.hasOwnProperty(key)) {
          let value = localStorage.getItem(key);
          try {
            value = JSON.parse(value);
            this.setState({ [key]: value });
          } catch (e) {
            this.setState({ [key]: value });
          }
        }
      }
    };

    handleDrop = (acceptedFiles) => {
      this.setState({
        imagePath: Object.assign(acceptedFiles[0], { src: URL.createObjectURL(acceptedFiles[0]) }),
      });

      this.props.input.onChange(acceptedFiles[0]);
    };

    removeItem = () => {
      this.setState({
        imagePath: null,
      });
      this.props.input.onChange(null);
    };

    renderUploader = ({ getRootProps, getInputProps }) => {
      const {
        meta: { touched, error },
        className,
      } = this.props;

      const uploaderClasses = classNames('uploader', className, {
        uploader_invalid: error && touched,
      });

      const activeZoneClasses = classNames('uploader__active-zone', {
        'uploader__active-zone_invalid': error && touched,
      });

      return (
        <section className={uploaderClasses}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p className={activeZoneClasses}>Drag `n` drop photo here, or click to select photos</p>
          </div>
          {this.props.input.value && (
            <aside className="uploader__aside">
              {
                this.state.imagePath
              && (
                <div className="uploader__aside-container">
                  <Tool
                    src="/images/delete.png"
                    className="uploader__aside-container-delete"
                    handleClick={() => this.removeItem(this.state.imagePath)}
                  />
                  <img className="uploader__aside-container-image" src={this.state.imagePath.src} alt="film poster" />
                </div>
              )
              }
            </aside>
          )}
        </section>
      );
    };

    render() {
      return (
        <Dropzone
          onDrop={this.handleDrop}
          accept="image/*"
          multiple={false}
        >
          {this.renderUploader}
        </Dropzone>
      );
    }
}

export default ImageUploader;
