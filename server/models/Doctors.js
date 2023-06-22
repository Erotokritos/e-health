module.exports = (sequelize, DataTypes) => {
  const Doctors = sequelize.define("Doctors", {
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    address: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    doctorNumber: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
  });

  Doctors.associate = (models) => {
    Doctors.hasMany(models.Medications),
      {
        onDelete: "cascade",
      };
    Doctors.hasMany(models.Visits),
      {
        onDelete: "cascade",
      };
  };

  return Doctors;
};
