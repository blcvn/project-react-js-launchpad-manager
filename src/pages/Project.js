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
import { PROJECT_STATUS_MAPPING } from "../utils/mapping";

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const { text, color } = PROJECT_STATUS_MAPPING[status] || {
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
      title: "Blockchain ID",
      dataIndex: "blockchainId",
      key: "blockchainId",
    },
    {
      title: "CID",
      dataIndex: "cid",
      key: "cid",
    },
    {
      title: "Token Address",
      dataIndex: "tokenAddress",
      key: "tokenAddress",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => totalAmount / 1e18,
    },
    {
      title: "Pool Address",
      dataIndex: "poolAddress",
      key: "poolAddress",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Accept Off Chain",
      dataIndex: "acceptOffChain",
      key: "acceptOffChain",
      render: (acceptOffChain) => (acceptOffChain ? "Yes" : "No"),
    },
    {
      title: "Reject Off Chain",
      dataIndex: "rejectOffChain",
      key: "rejectOffChain",
      render: (rejectOffChain) => (rejectOffChain ? "Yes" : "No"),
    },
    {
      title: "Accept On Chain",
      dataIndex: "acceptOnChain",
      key: "acceptOnChain",
      render: (acceptOnChain) => (acceptOnChain ? "Yes" : "No"),
    },
    {
      title: "Reject On Chain",
      dataIndex: "rejectOnChain",
      key: "rejectOnChain",
      render: (rejectOnChain) => (rejectOnChain ? "Yes" : "No"),
    },
    {
      title: "Release Off Chain",
      dataIndex: "releaseOffChain",
      key: "releaseOffChain",
      render: (releaseOffChain) => (releaseOffChain ? "Yes" : "No"),
    },
    {
      title: "Release On Chain",
      dataIndex: "releaseOnChain",
      key: "releaseOnChain",
      render: (releaseOnChain) => (releaseOnChain ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Row justify={"start"} gutter={[24, 24]}>
          <Tooltip title="Approve">
            <Col>
              <LikeFilled
                onClick={() => {
                  projectAPI
                    .accept(record.id)
                    .then(() => {
                      notification.success({ message: "Accept successful" });
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
            <Col>
              <DislikeFilled
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
    // const intervalRef = setInterval(() => {
    //   dispatch(search());
    // }, 1000);
    // return () => clearInterval(intervalRef);
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
