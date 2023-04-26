import { IAertData, IDetailPictureInfo, IModalData } from '@typing/client';
import useSWR, { useSWRConfig } from 'swr';

function useModal() {
  const { data, error, mutate: modalMutate } = useSWR<IModalData>('modal');
  const { mutate } = useSWRConfig();

  const setModalType = (newData: string | null) => {
    if (!data) return;
    modalMutate({ ...data, currentModal: newData });
  };

  const setUploadImgLocate = (newData: string) => {
    if (!data) return;
    modalMutate({ ...data, uploadImageLocate: newData });
  };

  const setAlertData = (newData: IAertData) => {
    if (!data) return;
    modalMutate({ ...data, alertData: { ...newData } });
  };

  const setDetailPictureInfo = (newData: IDetailPictureInfo) => {
    if (!data) return;
    modalMutate({ ...data, detailPictureInfo: { ...newData } });
  };

  const clearModalCache = () => {
    mutate('modal', undefined, { revalidate: false });
  };

  return {
    data,
    error,
    modalLoading: !data && !error,
    setModalType,
    setUploadImgLocate,
    setAlertData,
    setDetailPictureInfo,
    clearModalCache,
  };
}

export default useModal;
