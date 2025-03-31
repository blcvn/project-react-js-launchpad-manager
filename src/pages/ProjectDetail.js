import { faker } from "@faker-js/faker";
import { Affix, Button, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ProjectStatus } from "../constant/status.js";
import {
  approveProjectForOnboarding,
  completeProject,
  rejectProject,
} from "../stores/features/project/slice.js";
import ModalSubmitDocument from "./components/ProjectDetail/ModelSubmitDocument.js";
import { getActionByStatus } from "./components/ProjectDetail/ProjectAction.js";
import ProjectInfo from "./components/ProjectDetail/ProjectInfo.js";

const generateMockProject = () => ({
  name: faker.company.name(),
  description: faker.lorem.sentence(),
  icon: { filename: "icon.png", content: faker.image.avatar() },
  owner: faker.internet.email(),
  token_address: faker.finance.ethereumAddress(),
  address: faker.finance.ethereumAddress(),
  contributors: Array.from({ length: 3 }, () => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
  })),
  donators: Array.from({ length: 2 }, () => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
  })),
  infos: [{ filename: "info1.pdf", content: "PDF Content" }],
  completed_infos: [
    { filename: "completed_info1.pdf", content: "PDF Content" },
  ],
  reject_review_reason: faker.lorem.sentence(),
  reject_done_reason: faker.lorem.sentence(),
  status: faker.helpers.arrayElement(Object.values(ProjectStatus)),
});

const ProjectDetail = () => {
  const { idoAddress } = useParams();
  const [project, setProject] = useState(generateMockProject());
  const submitDocRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    setProject(generateMockProject());
  }, [idoAddress]);

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
  };
  return (
    <div>
      <div className="flex justify-content-end mr-4">
        <Affix offsetTop={50}>
          <Button className="mr-4">
            {getActionByStatus(project.status, idoAddress, actionHandlers)}
          </Button>
        </Affix>
      </div>
      <div className="mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-6">
          <div className="lg:col-span-3 bg-white shadow-md rounded-lg p-6">
            <ProjectInfo project={project} />
          </div>
        </div>
      </div>
      <ModalSubmitDocument ref={submitDocRef} />
    </div>
  );
};

export default ProjectDetail;
