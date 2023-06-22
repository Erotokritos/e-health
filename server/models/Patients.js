module.exports = (sequelize, DataTypes) => {
  const Patients = sequelize.define("Patients", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherName: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    medicalNumber: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    allergies: {
      type: DataTypes.STRING,
      allowNUll: true,
    },
    smoking: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    bodyWeight: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    bmi: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    stds: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    drinking: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    excercise: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    timeSpentOnScreen: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    healthStatus: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
  });

  Patients.associate = (models) => {
    Patients.hasMany(models.Medications),
      {
        onDelete: "cascade",
      };
    Patients.hasMany(models.Visits),
      {
        onDelete: "cascade",
      };
  };

  return Patients;
};
