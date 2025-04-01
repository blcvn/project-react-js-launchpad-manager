import { notification } from "antd";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES_PATH } from "../../constant/path";
import {
  approveProjectForOnboarding,
  completeProject,
  queryProject,
  rejectProject,
  setParams,
} from "../../stores/features/project/slice";
import { useProjectTableColumns } from "../components/ProjectDetail/useProjectTableColumns";
import TablePagination from "../components/Table/TablePagination";
import ModalInputReason from "./components/ModalInputReason";

const Project = () => {
  const { data, loading, params } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSetParams = (page, size) => {
    dispatch(setParams({ page: page - 1, size }));
  };
  const rejectRef = useRef(null);

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
      rejectRef.current.show({
        callback: async () => {
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
      });
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
      rejectRef.current.show({
        callback: async () => {
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
      });
    },
    handleViewDetail: (id) => {
      history.push(`${ROUTES_PATH.PROJECT}/${id}`);
    },
  };
  const columns = useProjectTableColumns(actionHandlers,params);
  const fetchData = useCallback(() => {
    dispatch(
      queryProject({
        status: "DRAFT",
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
        loading={loading}
        setParams={handleSetParams}
        clientSearch={true}
      />
      <ModalInputReason ref={rejectRef} />
    </div>
  );
};

export default Project;
