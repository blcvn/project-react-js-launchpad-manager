import { notification } from "antd";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES_PATH } from "../../constant/path";
import {
  approveDone,
  approveOnboarding,
  approveProjectForReview,
  queryProject,
  rejectDone,
  rejectOnboard,
  setParams,
} from "../../stores/features/project/slice";
import { useProjectTableColumns } from "../components/ProjectDetail/useProjectTableColumns";
import TablePagination from "../components/Table/TablePagination";
import ModalInputReason from "./components/ModalInputReason";

const Project = () => {
  const { data, status, params } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSetParams = (page, size) => {
    dispatch(setParams({ page: page - 1, size }));
  };
  const rejectRef = useRef(null);

  const actionHandlers = {
    handleAcceptReview: async (id) => {
      try {
        await dispatch(approveProjectForReview(id)).unwrap();
        notification.success({
          message: "Success",
          description: `Project ${id} approved for review`,
        });
        fetchData();
      } catch (err) {
        notification.error({
          message: "Error",
          description: err.message,
        });
      }
    },
    handleAcceptOnboard: async (id) => {
      try {
        await dispatch(approveOnboarding(id)).unwrap();
        notification.success({
          message: "Success",
          description: `Project ${id} approved for onboarding`,
        });
        fetchData();
      } catch (err) {
        notification.error({
          message: "Error",
          description: err.message,
        });
      }
    },
    handleRejectOnboard: async (id) => {
      rejectRef.current.show({
        callback: async (text) => {
          try {
            await dispatch(rejectOnboard({ id: id, text })).unwrap();
            notification.success({
              message: "Success",
              description: `Project ${id} rejected for onboarding`,
            });
            fetchData();
          } catch (err) {
            notification.error({
              message: "Error",
              description: err.message,
            });
          }
        },
      });
    },
    handleAcceptDone: async (id) => {
      try {
        await dispatch(approveDone(id)).unwrap();
        notification.success({
          message: "Success",
          description: `Project ${id} completed`,
        });
        fetchData();
      } catch (err) {
        notification.error({
          message: "Error",
          description: err.message,
        });
      }
    },
    handleRejectDone: async (id) => {
      rejectRef.current.show({
        callback: async (text) => {
          try {
            await dispatch(rejectDone({ id, text })).unwrap();
            notification.success({
              message: "Success",
              description: `Project ${id} rejected`,
            });
            fetchData();
          } catch (err) {
            notification.error({
              message: "Error",
              description: err.message,
            });
          }
        },
      });
    },
    handleViewDetail: (id) => {
      history.push(`${ROUTES_PATH.PROJECT}/${id}`);
    },
  };
  const columns = useProjectTableColumns(actionHandlers, params);
  const fetchData = useCallback(() => {
    dispatch(
      queryProject({
        // status: "DRAFT",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="tabled ">
      <TablePagination
        columns={columns}
        data={data}
        params={params}
        loading={status === "loading"}
        setParams={handleSetParams}
        clientSearch={true}
      />
      <ModalInputReason ref={rejectRef} />
    </div>
  );
};

export default Project;
