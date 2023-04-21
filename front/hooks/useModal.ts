import useSWR, { useSWRConfig } from 'swr';

interface IModalData {
  currentModal?: string | null;
  uploadImageLocate?: string;
  alertData?: { type: string; text: string };
}

function useModal() {
  const { data, error, mutate: modalMutate } = useSWR('modal');
  const { mutate } = useSWRConfig();

  const setModal = (newData: IModalData) => {
    modalMutate({ ...data, ...newData });
  };

  const clearModalCache = () => {
    mutate('modal', undefined, { revalidate: false });
  };

  return {
    currentModal: data?.currentModal ?? '',
    uploadImageLocate: data?.uploadImageLocate ?? '',
    alertData: data?.alertData ?? null,
    error,
    loading: !data && !error,
    setModal,
    clearModalCache,
  };
}

export default useModal;
