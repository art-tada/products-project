'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('products', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        price: {
          type: Sequelize.FLOAT
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        created_by: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        updated_by: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        deleted_by: {
          type: Sequelize.STRING(255)
        },
        deleted_at: {
          type: Sequelize.DATE
        }
      }, { transaction: t });

      await queryInterface.createTable('product_names', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        product_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'products',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        language: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        created_by: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        updated_by: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        deleted_by: {
          type: Sequelize.STRING(255)
        },
        deleted_at: {
          type: Sequelize.DATE
        }
      }, { transaction: t });

      await queryInterface.createTable('product_descriptions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        product_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'products',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        language: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        created_by: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        updated_by: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        deleted_by: {
          type: Sequelize.STRING(255)
        },
        deleted_at: {
          type: Sequelize.DATE
        }
      }, { transaction: t });
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('product_descriptions', { transaction: t });
      await queryInterface.dropTable('product_names', { transaction: t });
      await queryInterface.dropTable('products', { transaction: t });
    });
  }
};