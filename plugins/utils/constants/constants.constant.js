const CONSTANTS = {
  FILTERS: {
    STATUS: [
      {
        name: "Inactive",
        type: "error",
        value: 0
      },
      {
        name: "Active",
        type: "success",
        value: 1
      }
    ],
    REWARD: [
      {
        name: "Cash Discount",
        type: "error",
        value: "CASH_DISCOUNT"
      },
      {
        name: "Free Item",
        type: "success",
        value: "FREE_ITEM"
      }
    ],
    POINT_HISTORY: [
      {
        name: "Transaction Points Earning",
        type: "info",
        value: "TRANSACTION"
      },
      {
        name: "Sign up bonus point",
        type: "info",
        value: "SIGN_UP_BONUS"
      },
      {
        name: "Graduation point",
        type: "info",
        value: "GRADUATION"
      },
      {
        name: "Add Manual Points",
        type: "info",
        value: "ADD_MANUAL"
      },
      {
        name: "Deduct Manual Points",
        type: "info",
        value: "DEDUCT_MANUAL"
      },
      {
        name: "Redeem Points",
        type: "info",
        value: "REDEMPTION"
      },
      {
        name: "Points expired",
        type: "info",
        value: "EXPIREDREDEMPTION"
      }
    ],
    VOUCHER_STATUS: [
      {
        name: "Expired",
        type: "info",
        value: "EXPIRED"
      },
      {
        name: "Burned",
        type: "error",
        value: "BURNED"
      },
      {
        name: "Available",
        type: "success",
        value: "AVAILABLE"
      },
      {
        name: "Issued",
        type: "warning",
        value: "ISSUED"
      }
    ],
    NEWS_OR_PROMOTION: [
      {
        name: "News & Event",
        type: "error",
        value: "NEWS"
      },
      {
        name: "Promotion",
        type: "success",
        value: "PROMOTION"
      }
    ]
  }
};

export default CONSTANTS;
