import PropTypes from "prop-types";

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="font-semibold text-gray-600">{label}</span>
    <span className="text-gray-800">{value || "N/A"}</span>
  </div>
);

InfoRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default InfoRow;
