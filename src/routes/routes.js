import { createBrowserRouter } from 'react-router-dom';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import {
  Upload,
  Creator,
  Feedback,
  Analytics,
  Comments,
  CreatorAcademy,
} from '~/pages/Upload';
import Search from '~/pages/Search';
import Profile from '~/pages/Profile';
import { DefaultLayout, UploadLayout } from '~/layouts';
import config from '~/config';
import Modal from '~/components/Modal';
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';
import { Posts } from '~/pages/Upload/UploadPage/Posts';
import { VideoDetail } from '~/pages/VideoDetail';
import { PageNotFound } from '~/components/PageNotFound';

export const router = createBrowserRouter([
  {
    path: config.routes.home,
    element: (
      <DefaultLayout>
        <Home />
        <Modal />
      </DefaultLayout>
    ),
    errorElement: <PageNotFound />,
  },
  {
    path: config.routes.following,
    element: (
      <ProtectedRoute>
        <DefaultLayout>
          <Following />
          <Modal />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: config.routes.upload,
    element: (
      <ProtectedRoute>
        <UploadLayout>
          <Upload />
        </UploadLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: config.routes.creator,
    element: (
      <ProtectedRoute>
        <UploadLayout>
          <Creator />
        </UploadLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: config.routes.analytics,
    element: (
      <ProtectedRoute>
        <UploadLayout>
          <Analytics />
        </UploadLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: config.routes.comments,
    element: (
      <ProtectedRoute>
        <UploadLayout>
          <Comments />
        </UploadLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: config.routes.creatorAcademy,
    element: (
      <ProtectedRoute>
        <UploadLayout>
          <CreatorAcademy />
        </UploadLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: config.routes.feedback,
    element: (
      <ProtectedRoute>
        <UploadLayout>
          <Feedback />
        </UploadLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: config.routes.posts,
    element: (
      <ProtectedRoute>
        <UploadLayout>
          <Posts />
        </UploadLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: config.routes.profile,
    element: (
      <DefaultLayout>
        <Profile />
        <Modal />
      </DefaultLayout>
    ),
  },
  {
    path: config.routes.videoDetail,
    element: (
      <>
        <VideoDetail />
        <Modal />
      </>
    ),
  },
  {
    path: config.routes.search,
    element: (
      <DefaultLayout>
        <Search />
        <Modal />
      </DefaultLayout>
    ),
  },
]);
