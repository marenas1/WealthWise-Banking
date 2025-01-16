import PropTypes from "prop-types";

function AccountBox({ name, balance }) {
  return (
    <div className="w-80 h-36 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Top Section with Account Name */}
      <div className="bg-green-100 dark:bg-green-900 p-4 flex justify-center items-center">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {name}
        </h3>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-gray-300 dark:bg-gray-600"></div>

      {/* Bottom Section with Account Balance */}
      <div className="p-4 flex justify-center items-center">
        <p className="text-xl font-medium text-green-600 dark:text-green-400">
          Balance: ${balance.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

AccountBox.propTypes = {
  name: PropTypes.string.isRequired, // Account name must be a string
  balance: PropTypes.number.isRequired, // Account balance must be a number
};

export default AccountBox;
