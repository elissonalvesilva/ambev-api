/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Volumes = sequelize.define('volume', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    line: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    version: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    update_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    kernel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'kernel',
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    volume_pc: {
      type: 'DOUBLE',
      allowNull: false,
    },
    um: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    qty_amount: {
      type: 'DOUBLE',
      allowNull: false,
    },
    volume_hl: {
      type: 'DOUBLE',
      allowNull: false,
    },
    resource: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'volume',
  });

  Volumes.associate = (models) => {
    Volumes.belongsTo(models.kernel, {
      foreign_key: 'kernel_id',
    });
    Volumes.belongsTo(models.products, {
      foreign_key: 'product_id',
    });
  };

  return Volumes;
};
