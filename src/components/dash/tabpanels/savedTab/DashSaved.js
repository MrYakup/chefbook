import { useGetDashSavedQuery } from "./dashSavedApiSlice";
import DashSave from "./DashSave";
import PulseLoader from "react-spinners/PulseLoader";

const DashSaved = () => {
  const {
    data: saved,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDashSavedQuery("savedList", {
    // pollingInterval: 15000,
    // refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  
  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-2xl">{error?.data?.message}</p>
      </div>
    );
  }

  if (isSuccess) {
    const { ids } = saved;

    const tableContent =
      ids?.length && ids.map((savedId) => <DashSave key={savedId} savedId={savedId} />);

    content = (
      <div className="h-screen">
        <div className="mx-2 my-4 ">
          <div className="flex flex-col gap-4">{tableContent?.length ? tableContent : <div className="flex justify-center items-center min-h-[40vh] text-2xl text-gray-600">içerik yok</div>}</div>
        </div>
      </div>
    );
  }

  return content;
};
export default DashSaved;
