import { Affix, Button, notification } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ROUTES_PATH } from "../constant/path.js";
import { ProjectStatus } from "../constant/status.js";
import {
  approveDone,
  approveOnboarding,
  approveProjectForReview,
  queryProjectById,
  rejectDone,
  rejectOnboard,
} from "../stores/features/project/slice";
import { Base64ToFile } from "../utils/string.js";
import { getActionByStatus } from "./components/ProjectDetail/ProjectAction.js";
import ProjectInfo from "./components/ProjectDetail/ProjectInfo.js";
import UserList from "./components/ProjectDetail/UseList.js";
import ModalInputReason from "./Project/components/ModalInputReason.jsx";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const history = useHistory();

  const dispatch = useDispatch();

  const rejectRef = useRef(null);

  const actionHandlers = {
    handleAcceptReview: async (id) => {
      try {
        const response = await dispatch(approveProjectForReview(id)).unwrap();
        notification.success({
          message: "Success",
          description: `Project ${response} approved for review`,
        });
      } catch (err) {
        notification.error({
          message: "Error",
          description: err.message,
        });
      }
    },
    handleAcceptOnboard: async (id) => {
      try {
        const response = await dispatch(approveOnboarding(id)).unwrap();
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
            const response = await dispatch(rejectOnboard(id)).unwrap();
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
        const response = await dispatch(approveDone(id)).unwrap();
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
            const response = await dispatch(rejectDone(id)).unwrap();
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

  const fetchData = useCallback(async () => {
    const response = await dispatch(queryProjectById({ id: id })).unwrap();
    const data = response?.projects?.[0];
    if (data) {
      const file = Base64ToFile(
        `${data.icon.contentType},${data.icon.content}`,
        data.icon.filename
      );
      const logoFileList = [
        {
          uid: "-1",
          name: file.name,
          originFileObj: file,
          thumbUrl: `${data.icon.contentType},${data.icon.content}`,
          status: "done", // Ensure the file shows as uploaded
        },
      ];
      const pdfFiles = data.infos.map((item, index) => {
        const file = Base64ToFile(
          `${item.content_type},${item.content}`,
          item.filename
        );
        return {
          uid: index,
          name: file.name,
          originFileObj: file,
          status: "done",
          type: "application/pdf",
        };
      });
      setProject({
        ...data,
        logoFile: logoFileList,
        pdfFiles: pdfFiles,
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="border-2 border-gray-200 bg-white rounded-lg shadow-md">
      {[
        ProjectStatus.REVIEWING,
        ProjectStatus.COMPLETED,
        ProjectStatus.SUBMITTED,
      ].includes(project.status) && (
        <div className="flex justify-end mr-4">
          <Affix offsetTop={50}>
            <Button className="mr-4">
              {getActionByStatus(project.status, id, actionHandlers)}
            </Button>
          </Affix>
        </div>
      )}

      <div className="mx-auto p-6 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div className="col-span-2 rounded-lg p-6">
            <ProjectInfo project={project} />
          </div>
          <div className="col-span-1">
            <UserList title={"Contributors"} users={project.contributors} />
          </div>
          <div className="col-span-1">
            <UserList title={"Donators"} users={project.donators} />
          </div>
        </div>
      </div>
      <ModalInputReason ref={rejectRef} />
    </div>
  );
};

export default ProjectDetail;
