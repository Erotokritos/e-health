module.exports = (sequelize, DataTypes) => {
  const Visits = sequelize.define("Visits", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reasonOfVisit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conclusion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Visits;
};
