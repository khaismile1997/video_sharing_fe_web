import { useDispatch } from "react-redux";
import { Fragment, useCallback, useEffect } from "react";

import { AppDispatch } from "store";
import { getListVideo } from "store/videos.controller";
import consumer from "../services/actionCable";
import { useUser } from "hooks/useUser";

const VideoWatcher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { session_token, email } = useUser();

  const fetchData = useCallback(async () => {
    try {
      if (!session_token) return;
      await dispatch(getListVideo({ page: 1 })).unwrap();
    } catch (err) {
      // notifyError(err)
      console.log(err);
    }
  }, [dispatch, session_token]);

  // const watchData = useCallback(async () => {

  // }, [

  // ])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const noticationsChannel = consumer.subscriptions.create(
      { channel: "NotificationsChannel" },
      {
        connected() {
          console.log("connected");
        },

        disconnected() {
          console.log("disconnected");
        },

        received(data) {
          if (data.sharer_email !== email) {
            window.notify({
              type: "info",
              description: `${data.sharer_email} shared the video ${data.video_title}`,
            });
          }
        },
      }
    );
    return () => {
      noticationsChannel.unsubscribe();
    };
  }, [email]);

  return <Fragment />;
};

export default VideoWatcher;
