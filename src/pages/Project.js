import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useFakeData from "../hooks/useFakeData";
import { useProjectTableColumns } from "../hooks/useProjectTableColumns";
import {
  approveProjectForOnboarding,
  approveProjectForReview,
  doneProject,
  rejectProject,
  setParams,
} from "../stores/features/project/slice";
import TablePagination from "./components/Table/TablePagination";

const Project = () => {
  const { data, totalElements, loading, params } = useSelector(
    (state) => state.project
  );
  console.log(data, totalElements, loading, params);
  const dispatch = useDispatch();

  const handleSetParams = (page, size) => {
    dispatch(setParams({ page, size }));
  };

  const fakeData = useFakeData(10);

  const actionHandler = {
    handleApproveToReview: async (id) => {
      try {
        await dispatch(approveProjectForReview(id)).unwrap();
        notification.success({
          message: "Approve project for review successfully",
        });
      } catch (error) {
        notification.error({
          message: "Approve project for review failed",
        });
      }
    },
    handleApproveToOnboard: async (id) => {
      try {
        await dispatch(approveProjectForOnboarding(id)).unwrap();
        notification.success({
          message: "Approve project for onboarding successfully",
        });
      } catch (error) {
        notification.error({
          message: "Approve project for onboarding failed",
        });
      }
    },
    handleReject: async (id) => {
      try {
        await dispatch(rejectProject(id)).unwrap();
        notification.success({
          message: "Reject project successfully",
        });
      } catch (error) {
        notification.error({
          message: "Reject project failed",
        });
      }
    },
    handleDone: async (id) => {
      try {
        await dispatch(doneProject(id)).unwrap();
        notification.success({
          message: "Done project successfully",
        });
      } catch (error) {
        notification.error({
          message: "Done project failed",
        });
      }
    },
  };

  const columns = useProjectTableColumns(actionHandler);

  return (
    <>
      <div>
        <TablePagination
          columns={columns}
          data={fakeData}
          params={params}
          loading={loading}
          setParams={handleSetParams}
        />
      </div>
    </>
  );
};

export default Project;
