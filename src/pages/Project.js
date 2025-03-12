import { DislikeFilled, EyeFilled, LikeFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Pagination,
  Row,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectAPI from "../api/project";
import { search, setParams } from "../stores/features/project/slice";
import CreateProjectModal from "./components/CreateProjectModal";
import AddContributorModal from "./components/AddContributorModal";
import { useHistory } from "react-router-dom";
const statusMapping = {
  1: { text: "Pending", color: "default" },
  2: { text: "Rejected", color: "red" },
  3: { text: "Approved", color: "blue" },
  4: { text: "Finalized", color: "green" },
  5: { text: "Active", color: "cyan" },
  6: { text: "Expired", color: "orange" },
};

function Project() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addRef = useRef();

  const history = useHistory();
  const dispatch = useDispatch();
  const { data, params, status, totalElements } = useSelector(
    (state) => state.project
  );

  const handleChangePagination = (page, pageSize) => {
    dispatch(setParams({ page: page - 1, size: pageSize }));
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateNewProject = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const { text, color } = statusMapping[status] || {
          text: "Unknown",
          color: "gray",
        };
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Token",
      dataIndex: "tokenName",
      key: "tokenName",
    },
    {
      title: "Total Supply",
      dataIndex: "totalSupply",
      key: "totalSupply",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Row justify={"start"} gutter={[24, 24]}>
          <Tooltip title="Approve">
            <Col className={record.status !== 1 ? "disable" : ""}>
              <LikeFilled
                disabled={record.status !== 1}
                onClick={() => {
                  projectAPI
                    .accept(record.id)
                    .then(() => {
                      notification.success({ message: "Accept successful" });
                      setTimeout(() => {
                        dispatch(search());
                      }, 4000);
                    })
                    .catch((err) => {
                      notification.error({
                        message: "Accept failed",
                        description: err.message,
                      });
                    });
                }}
              />{" "}
            </Col>
          </Tooltip>
          <Tooltip title="Reject">
            {" "}
            <Col className={record.status !== 1 ? "disable" : ""}>
              <DislikeFilled
                disabled={record.status !== 1}
                onClick={() => {
                  projectAPI
                    .reject(record.id)
                    .then(() => {
                      notification.success({ message: "Reject successful" });
                      dispatch(search());
                    })
                    .catch((err) => {
                      notification.error({
                        message: "Reject failed",
                        description: err.message,
                      });
                    });
                }}
              />{" "}
            </Col>
          </Tooltip>
          <Tooltip title="View Detail">
            <Col>
              <EyeFilled
                onClick={() => {
                  history.push(`/project/${record.id}`);
                }}
              />
            </Col>
          </Tooltip>
        </Row>
      ),
    },
  ];

  useEffect(() => {
    dispatch(search());
  }, [dispatch]);

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace p-15"
            title="Project manager"
          >
            <Row justify="end">
              <Col>
                <Button type="primary" onClick={handleCreateNewProject}>
                  Create new project
                </Button>
              </Col>
            </Row>
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={data}
                loading={status === "loading"}
                pagination={false}
                className="ant-border-space"
              />
              <Pagination
                className="mt-2"
                current={params.page + 1}
                pageSize={params.size}
                total={totalElements}
                onChange={handleChangePagination}
                showSizeChanger
              />
            </div>
          </Card>
        </Col>
      </Row>
      <CreateProjectModal visible={isModalOpen} onClose={onClose} />
      <AddContributorModal ref={addRef} />
    </div>
  );
}

export default Project;
