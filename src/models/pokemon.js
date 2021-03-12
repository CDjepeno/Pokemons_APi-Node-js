const validTypes = ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée'];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le champ ne doit pas être vide" },
          notNull : { msg: "Le champ est une propriété requise" }
        },
        unique: {
          msg: "Le nom du pokemon est déja utilisé"
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt : { msg: "Utilisé uniquement des nombres entiers pour les points de vie" },
          notNull : { msg: "Les points de vie sont une propriété requise" },
          min: {
            args: [0],
            msg:"Les points de vie doit être supérieur ou égale à 0"
          },
          max: {
            args: [999],
            msg:"Les points de vie doit être supérieur ou égale à 999"
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt : { msg: "Utilisé uniquement des nombres entiers pour les points de vie" },
          notNull : { msg: "Les points de dégats sont une propriété requise" },
          min: {
            args: [0],
            msg:"Les points de dégat doit être supérieur ou égale à 0"
          },
          max: {
            args: [99],
            msg:"Les points de vie doit être supérieur ou égale à 99"
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl : { msg: "veuillez rentré une URL valide" },
          notNull : { msg: "L'image est une propriété requise" }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('types').split(',')
        },
        set(types) {
            this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value) {
            if(!value) {
              throw new Error("Un pokemon doit au moins avoir un type")
            }
            if(value.split(',').length > 3) {
              throw new Error("Un pokemon ne peux pas avoir plus de trois types")
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Le type d'un pokemon doit appartenir à la liste suivante : ${validTypes}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }
