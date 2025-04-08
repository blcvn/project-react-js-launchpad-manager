import PropTypes from "prop-types";

function UserList({ title, users = [] }) {
  return (
    <div className="rounded-lg p-6 border-2 border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      {users.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center text-[var(--primary-color)]">
                Username{" "}
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-[var(--primary-color)]">
                Email{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((contributor, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {contributor.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {contributor.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Nobody</p>
      )}
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};

export default UserList;
