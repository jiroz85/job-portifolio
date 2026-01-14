const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Audit = sequelize.define(
  "Audit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    action: {
      type: DataTypes.ENUM(
        "ROLE_CHANGE",
        "STATUS_CHANGE",
        "USER_DELETE",
        "USER_CREATE",
        "USER_UPDATE",
        "LOGIN",
        "LOGOUT",
        "JOB_CREATE",
        "JOB_UPDATE",
        "JOB_DELETE",
        "APPLICATION_SUBMIT",
        "APPLICATION_UPDATE"
      ),
      allowNull: false,
    },
    targetUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "ID of the user this action relates to",
    },
    performedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "ID of the admin/user who performed this action",
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Additional details about the action",
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "audit_logs",
    indexes: [
      {
        fields: ["action"],
      },
      {
        fields: ["targetUserId"],
      },
      {
        fields: ["performedBy"],
      },
      {
        fields: ["createdAt"],
      },
    ],
  }
);

// Define associations
Audit.associate = (models) => {
  Audit.belongsTo(models.User, {
    foreignKey: "performedBy",
    as: "performedByUser",
  });

  Audit.belongsTo(models.User, {
    foreignKey: "targetUserId",
    as: "targetUser",
  });
};

module.exports = Audit;
