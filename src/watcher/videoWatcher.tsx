import { useDispatch } from "react-redux";
import { Fragment, useCallback, useEffect} from "react";

import { AppDispatch } from "store";
import { getListVideo } from "store/videos.controller";

const VideoWatcher = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = useCallback(async () => {
    try {
      
      await dispatch(getListVideo({ page: 1 })).unwrap();
    } catch (err) {
      // notifyError(err)
      console.log(err);
    }
  }, [dispatch]);

  //   const watchData = useCallback(async () => {
  // if (watchId) return
  // const newWatcherId = connection.onProgramAccountChange(
  //   accountClient.programId,
  //   async (info) => {
  //     const address = info.accountId.toBase58()
  //     const buffer = info.accountInfo.data
  //     const accountData = program.coder.accounts.decode(name, buffer)
  //     upset(address, accountData)
  //   },
  //   'confirmed',
  //   [
  //     { dataSize: accountClient.size },
  //     {
  //       memcmp: {
  //         offset: 0,
  //         bytes: encodeIxData(accountDiscriminator(name)),
  //       },
  //     },
  //     ...filter,
  //   ],
  // )
  // setWatchId(newWatcherId)
  //   }, [

  //   ])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //   useEffect(() => {
  //     watchData()
  //     return () => {
  //       ;(async () => {
  // if (!watchId) return

  //       })()
  //     }
  //   }, [, watchData])

  return <Fragment />;
};

export default VideoWatcher;
