import { Button, InputNumber, message } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

const UserInfo = ({
  user,
  blcData,
  handleClaim,
  handleDonate,
  handleChangeInvestAmount,
  handleSwap,
}) => {
  const [donationAmount, setDonationAmount] = useState(null);

  const handleDonationChange = (value) => {
    setDonationAmount(value);
    handleChangeInvestAmount(value);
  };

  const handleDonationClick = () => {
    if (!donationAmount || donationAmount <= 0) {
      message.warning("Please enter a valid donation amount.");
      return;
    }
    handleDonate();
  };

  const handleClaimClick = () => {
    if (blcData?.toClaim === "0") {
      message.info("No funds available to claim.");
      return;
    }
    handleClaim();
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        User Information
      </h2>

      {/* User Basic Info */}
      <div className="grid grid-cols-2 gap-y-4 text-gray-700 gap-5">
        <div className="flex justify-between">
          <span className="font-medium">Username:</span>
          <span>{user?.username || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{user?.email || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Wallet Address:</span>
          <span className="truncate">{user?.wallet?.address || "N/A"}</span>
        </div>
      </div>

      {/* User Balance Data */}
      <div className="grid grid-cols-2 gap-y-4 mt-6 text-gray-700 gap-5">
        <div className="flex justify-between">
          <span className="font-medium">Total Donated:</span>
          <span>{blcData?.totalDonated || "0"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Donated:</span>
          <span>{blcData?.donated || "0"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Your Balance:</span>
          <span>{blcData?.balance || "0"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">To Claim:</span>
          <span>{blcData?.toClaim || "0"}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Button
          className="!bg-gray-800 !text-white hover:!bg-gray-700 w-full sm:w-auto"
          onClick={handleClaimClick}
        >
          Claim
        </Button>
        <Button
          className="!bg-blue-600 !text-white hover:!bg-blue-500 w-full sm:w-auto"
          onClick={handleSwap}
        >
          Swap
        </Button>
        <InputNumber
          placeholder="Input amount to donate"
          className="!text-gray-800 w-full sm:w-auto"
          value={donationAmount}
          onChange={handleDonationChange}
        />
        <Button
          className="!bg-amber-700 !text-white hover:!bg-amber-600 w-full sm:w-auto"
          onClick={handleDonationClick}
        >
          Donate
        </Button>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    wallet: PropTypes.shape({
      address: PropTypes.string,
    }),
  }),
  blcData: PropTypes.shape({
    totalDonated: PropTypes.string,
    donated: PropTypes.string,
    balance: PropTypes.string,
    toClaim: PropTypes.string,
  }).isRequired,
  handleClaim: PropTypes.func.isRequired,
  handleDonate: PropTypes.func.isRequired,
  handleChangeInvestAmount: PropTypes.func.isRequired,
  handleSwap: PropTypes.func.isRequired,
};

export default UserInfo;
