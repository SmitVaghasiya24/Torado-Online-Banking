import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const CreditCardApply = sequelize.define(
    "CreditCardApply",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        middle_name: {
            type: DataTypes.STRING(100),
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        ssn_tax_id: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        is_us_citizen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        residential_address1: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        residential_address2: {
            type: DataTypes.STRING(255),
        },
        zip_code: {
            type: DataTypes.STRING(10),
        },
        city: {
            type: DataTypes.STRING(100),
        },
        province: {
            type: DataTypes.STRING(100),
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        telephone_number: {
            type: DataTypes.STRING(20),
        },

        employment_status: {
            type: DataTypes.STRING(100),
        },
        total_annual_income: {
            type: DataTypes.DECIMAL(12, 2),
        },
        monthly_mortgage_or_rent: {
            type: DataTypes.DECIMAL(12, 2),
        },
        has_bank_account: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        terms_accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active",
        },
        created_by: {
            type: DataTypes.INTEGER,
        },
        updated_by: {
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: "tbl_credit_card_apply",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default CreditCardApply;
