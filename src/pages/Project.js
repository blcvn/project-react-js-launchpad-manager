import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES_PATH } from "../constant/path";
import useFakeData from "../hooks/useFakeData";
import {
  approveProjectForOnboarding,
  completeProject,
  rejectProject,
  setParams,
} from "../stores/features/project/slice";
import { useProjectTableColumns } from "./components/ProjectDetail/useProjectTableColumns";
import TablePagination from "./components/Table/TablePagination";

const Project = () => {
  const { data, totalElements, loading, params } = useSelector(
    (state) => state.project
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSetParams = (page, size) => {
    dispatch(setParams({ page, size }));
  };

  const fakeData = useFakeData(10);

  const actionHandlers = {
    handleAcceptOnboard: async (id) => {
      try {
        const response = await dispatch(
          approveProjectForOnboarding(id)
        ).unwrap();
        notification.success({
          message: "Success",
          description: `Project ${response} approved for onboarding`,
        });
      } catch (err) {
        notification.error({
          message: "Error",
          description: err.message,
        });
      }
    },
    handleRejectOnboard: async (id) => {
      try {
        const response = await dispatch(rejectProject(id)).unwrap();
        notification.success({
          message: "Success",
          description: `Project ${response} rejected for onboarding`,
        });
      } catch (err) {
        notification.error({
          message: "Error",
          description: err.message,
        });
      }
    },
    handleAcceptDone: async (id) => {
      try {
        const response = await dispatch(completeProject(id)).unwrap();
        notification.success({
          message: "Success",
          description: `Project ${response} completed`,
        });
      } catch (err) {
        notification.error({
          message: "Error",
          description: err.message,
        });
      }
    },
    handleRejectDone: async (id) => {
      try {
        const response = await dispatch(rejectProject(id)).unwrap();
        notification.success({
          message: "Success",
          description: `Project ${response} rejected`,
        });
      } catch (err) {
        notification.error({
          message: "Error",
          description: err.message,
        });
      }
    },
    handleViewDetail: (id) => {
      history.push(`${ROUTES_PATH.PROJECT}/${id}`);
    },
  };
  const columns = useProjectTableColumns(actionHandlers);

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
