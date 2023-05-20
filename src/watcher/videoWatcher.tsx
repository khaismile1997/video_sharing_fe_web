import { useDispatch } from "react-redux";
import { Fragment, useCallback, useEffect } from "react";

import { AppDispatch } from "store";
import { getListVideo } from "store/videos.controller";
import consumer from "../services/actionCable";
import { useUser } from "hooks/useUser";

const VideoWatcher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {session_token} = useUser()

  const fetchData = useCallback(async () => {
    try {
        if(!session_token) return
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
      { channel: "notifications" },
      {
        connected() {
          // Called when the subscription is ready for use on the server

          console.log("da connected ");
        },

        disconnected() {
          // Called when the subscription has been terminated by the server
          console.log("da disconnected ");
        },

        received(data) {
          console.log("da received ", data);
        },
      }
    );
    return () => {
      noticationsChannel.unsubscribe();
    };
  }, []);

  return <Fragment />;
};

export default VideoWatcher;
