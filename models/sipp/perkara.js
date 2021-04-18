'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perkara extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Perkara.init({
    perkara_id : {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nomor_perkara: DataTypes.STRING,
    pihak1_text: DataTypes.STRING,
    pihak2_text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Perkara',
    tableName : 'perkara',
    timestamps : false,
    createdAt : false,
    freezeTableName : true,
  });
  Perkara.removeAttribute('id');
  return Perkara;
};