import classNames from 'classnames/bind';
import 'tippy.js/animations/shift-away.css';

import styles from './UploadForm.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { CreatorContext } from '../Creator';
import UploadGroup from '../UploadGroup';
import Description from './Description';
import Cover from './Cover';
import Privacy from './Privacy';
import Allow from './Allow';
import LoadingAnimation from '~/components/LoadingAnimation/LoadingAnimation';
import * as videoService from '~/services/videoService';
import Modal from './Modal';
import { useStore } from '~/context';
import { toast } from 'sonner';

const cx = classNames.bind(styles);

const privacyItems = [
  {
    id: 1,
    title: 'Everyone',
    value: 'public',
  },
  {
    id: 2,
    title: 'Friends',
    value: 'friends',
    info: 'Followers you follow back',
  },
  {
    id: 3,
    title: 'Only you',
    value: 'private',
  },
];

const allowingItems = [
  {
    id: 1,
    title: 'Comment',
    value: 'comment',
    checked: true,
  },
  {
    id: 2,
    title: 'Duet',
    value: 'duet',
    checked: false,
  },
  {
    id: 3,
    title: 'Stitch',
    value: 'stitch',
    checked: false,
  },
];

export const UploadFormContext = createContext();
function UploadForm() {
  const { handleDisplayModal } = useStore();

  const { uploadFile } = useContext(CreatorContext);
  const [fileInfo, setFileInfo] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [thumbLists, setThumbLists] = useState([]);
  const [thumbIsAvailable, setThumbIsAvailable] = useState(false);
  const [isGenerateThumbnails, setIsGenerateThumbnails] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [uploadData, setUploadData] = useState({
    description: '',
    upload_file: '',
    thumbnail_time: '',
    viewable: 'public',
    allow: [],
  });
  const [alterFile, setAlterFile] = useState(false); // handle altering file
  const [videoLoading, setVideoLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  // ref
  const videoPreviewRef = useRef();
  const progressRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (uploadFile) {
      setUploadData((prev) => ({ ...prev, upload_file: uploadFile }));
      setAlterFile(false);
      setVideoLoading(true);

      const url = URL.createObjectURL(uploadFile);
      setFileURL(url);

      const tempVideo = document.createElement('video');
      tempVideo.src = url;
      tempVideo.load();

      tempVideo.addEventListener('loadeddata', () => {
        let minute, second;

        if (tempVideo.duration >= 60) {
          minute = Math.trunc(tempVideo.duration / 60);
          second = Math.ceil(tempVideo.duration - minute * 60);
        } else if (tempVideo.duration < 60) {
          minute = 0;
          second = Math.ceil(tempVideo.duration);
        }

        setFileInfo({
          name: uploadFile.name,
          size:
            Math.floor(uploadFile.size * 0.00000095367432 * 100) / 100 + ' MB',
          duration: minute + 'm ' + second + 's',
        });
      });

      return () => {
        URL.revokeObjectURL(uploadFile);
        tempVideo.remove();
      };
    }
  }, [uploadFile]);

  useEffect(() => {
    videoPreviewRef.current.load();
  }, [fileURL]);

  const handleLoadedVideo = () => {
    setThumbIsAvailable(false);
    setIsGenerateThumbnails(true);
    videoPreviewRef.current.removeAttribute('loop');
    videoPreviewRef.current.currentTime = 0;
  };

  const handleSeekedVideo = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = videoPreviewRef.current.videoWidth;
    canvas.height = videoPreviewRef.current.videoHeight;

    ctx.drawImage(videoPreviewRef.current, 0, 0, canvas.width, canvas.height);

    const thumbURL = canvas.toDataURL('image/webp');

    if (thumbLists.length === 0) {
      setThumbLists([
        {
          thumb: thumbURL,
          atTime: Math.floor(videoPreviewRef.current.currentTime),
        },
      ]);
    } else {
      setThumbLists((prev) => [
        ...prev,
        {
          thumb: thumbURL,
          atTime: Math.floor(videoPreviewRef.current.currentTime),
        },
      ]);
    }
  };

  useEffect(() => {
    if (thumbLists.length !== 0) {
      const videoTime = {
        duration: videoPreviewRef.current.duration,
        interval: videoPreviewRef.current.duration / 7,
      };

      if (
        videoPreviewRef.current.currentTime + videoTime.interval >
        videoTime.duration
      ) {
        setThumbIsAvailable(true);
        setVideoLoading(false);
        setIsGenerateThumbnails(false);
        videoPreviewRef.current.setAttribute('loop', '');
        videoPreviewRef.current.currentTime = 0;
        videoPreviewRef.current.play();
        return;
      }

      videoPreviewRef.current.currentTime += videoTime.interval;

      const percent = (1 / 7) * 100;
      const containerWidth = containerRef.current.offsetWidth;
      const progressWidth =
        (progressRef.current.offsetWidth * 100) / containerWidth;

      progressRef.current.style.width = percent + progressWidth + '%';
      setProgressPercent(Math.ceil(percent + progressWidth));

      return () => {
        Object.keys(videoTime).forEach((key) => delete videoTime[key]);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbLists]);

  const handleAlterFile = () => {
    setAlterFile(true);
  };

  useEffect(() => {
    if (alterFile) {
      setFileURL(null);
      setThumbLists([]);
      setVideoLoading(false);
      setThumbIsAvailable(false);
    }
  }, [alterFile]);

  useEffect(() => {
    !!uploadCompleted && handleDisplayModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadCompleted]);

  const handleSubmit = async () => {
    setUploadLoading(true);
    setUploadCompleted(false);
    const formData = new FormData();

    formData.append('description', uploadData.description);
    formData.append('upload_file', uploadData.upload_file);
    formData.append('thumbnail_time', uploadData.thumbnail_time);
    formData.append('viewable', uploadData.viewable);
    uploadData.allow.forEach((allow) => {
      formData.append('allows[]', allow);
    });

    const response = await videoService.create(formData);
    if (response) {
      setUploadCompleted(true);
    } else {
      toast('Failed in uploading video');
    }
    setUploadLoading(false);
  };

  return (
    <UploadFormContext.Provider value={{ uploadData, setUploadData }}>
      {uploadCompleted && (
        <Modal
          setAlterFile={setAlterFile}
          setUploadCompleted={setUploadCompleted}
        />
      )}
      <div ref={containerRef} className={cx('container')}>
        <div className={cx('heading')}>
          {alterFile ? (
            <div className={cx('upload-zone')}>
              <UploadGroup height="200px" />
            </div>
          ) : (
            <>
              <div className={cx('header-content')}>
                <div className={cx('file-name')}>{fileInfo?.name}</div>
                <div className={cx('file-info-container')}>
                  <p className={cx('file-size')}>
                    <span className={cx('file-info-title')}>Size:</span>
                    <span className={cx('file-info-value')}>
                      {fileInfo?.size}
                    </span>
                  </p>
                  <p className={cx('file-duration')}>
                    <span className={cx('file-info-title')}>Duration:</span>
                    <span className={cx('file-info-value')}>
                      {fileInfo?.duration}
                    </span>
                  </p>
                </div>
                <Button className={cx('replace-btn')} onClick={handleAlterFile}>
                  Replace
                </Button>
                <div className={cx('uploaded-container')}>
                  <div
                    className={cx('uploaded-status', {
                      success: progressPercent === 100,
                    })}
                  >
                    <FontAwesomeIcon
                      className={cx('success-icon')}
                      icon={faCircleCheck}
                    />
                    Uploaded
                  </div>
                  <div className={cx('uploaded-percent')}>
                    {progressPercent}%
                  </div>
                </div>
              </div>
              <div
                ref={progressRef}
                className={cx('progress-bar', {
                  success: progressPercent === 100,
                })}
              ></div>
            </>
          )}
        </div>
        <div className={cx('body')}>
          <div className={cx('content-container')}>
            <div className={cx('edit-container')}>
              <Description
                uploadData={uploadData}
                setUploadData={setUploadData}
                fileInfo={fileInfo}
                alterFile={alterFile}
              />
              <Cover
                thumbIsAvailable={thumbIsAvailable}
                alterFile={alterFile}
                thumbLists={thumbLists}
              />
              <Privacy privacyItems={privacyItems} alterFile={alterFile} />
              <Allow allowingItems={allowingItems} alterFile={alterFile} />
            </div>
            <div className={cx('preview-container')}>
              <video
                ref={videoPreviewRef}
                className={cx('video')}
                controls
                muted
                onLoadedData={handleLoadedVideo}
                onSeeked={!isGenerateThumbnails ? () => {} : handleSeekedVideo}
              >
                <source src={fileURL} type="video/mp4" />
              </video>
              {!thumbIsAvailable && <div className={cx('no-video')}></div>}
              {videoLoading && (
                <LoadingAnimation className={cx('loading-icon')} />
              )}
            </div>
          </div>
          <div className={cx('action')}>
            <Button
              className={cx('submit-btn', {
                disabled: alterFile,
                loading: uploadLoading,
              })}
              onClick={handleSubmit}
              leftIcon={<FontAwesomeIcon icon={faCircleNotch} />}
            >
              Post
            </Button>
            <Button
              className={cx('cancel-btn')}
              onClick={() => setAlterFile(true)}
            >
              Discard
            </Button>
          </div>
        </div>
      </div>
    </UploadFormContext.Provider>
  );
}

export default UploadForm;
