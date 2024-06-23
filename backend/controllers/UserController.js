import connection from "../connection/connection.js";
import { User, Role, UserGame, Sale } from "../Models/models.js";
import { genToken, verifyToken } from "../utils/token.js";

const USER_TOKEN_NAME = "token";

class UserControllers {

  userToken({id, userName}){

    const token = genToken({id, userName});

    return token;
  }

  async getAllUser(req, res) {

    try {

      const result = await User.findAll({
        attributes: ["id", "userName", "email", "RoleId"],
        include: {
          model: Role,
          attributes: ["role"],
        },
      });

      res.status(200).send({ success: true, message: result });
    } catch (error) {
      res.status(400).send({ success: false, message: error });
    }

  }

  async getUserById(req, res) {

    try {
      const { id } = req.params;

      const result = await User.findByPk(id);
      if(!result) throw error;

      res.status(200).send({ success: true, message: result });
    } catch (error) {
      res.status(400).send({ success: false, message: error });
    }
  }

  async createUser(req, res) {

    const transactionCreateUser = await connection.transaction();

    try {

      const { name, lastName, userName, email, password, role} = req.body;
      
      if(role.toUpperCase()=="ADMIN") throw new Error("Rol no valido.");

      const UserResult = await User.create(
        {
          name,
          lastName,
          userName,
          email,
          password,
          role,
        },
        {transaction:transactionCreateUser}
      );

      await transactionCreateUser.commit();

      res.cookie(USER_TOKEN_NAME, userToken(UserResult));
      res.status(200).send({
        success: true,
        message: `Usuario: ${UserResult.dataValues.name} creado con exito`,
      });

    } catch (error) {
      await transactionCreateUser.rollback();
      res.status(400).send({ success: false, message: error.message });
    }

  }

  async updateUser(req, res) {

    try {
      //modifica el usuario que tenga el mismo id que en la cookie
      const { id } = req.user.id;
      const { userName, mail, password } = req.body;

      const result = await User.update(
        { userName, mail, password },
        {
          where: {
            id,
          },
        }
      );

      res
        .status(200)
        .send({ success: true, message: "Usuario modificado con exito." });
    } catch (error) {
      res.status(400).send({ success: false, message: error });
    }
    
  }

  async deleteUser(req, res) {

    try {
      const { id } = req.body;
      const result = await User.destroy({
        where: {
          id,
        },
      });

      res
        .status(200)
        .send({ success: true, message: "Usuario eliminado con exito." });
    } catch (error) {
      res.status(400).send({ success: false, message: error });
    }

  }

  async login (req, res){
    try {

      const { mail, password } = req.body;

      const user = await User.findOne({
        where: {
          mail,
        },
      });
      if (!user) throw new Error("Usuario no encontrado.");

      const comparePass = await user.comparePass(password);
      if (!comparePass) throw new Error("El usuario o la contraseña son incorrectos.");


      res.cookie(USER_TOKEN_NAME, userToken(user));
      res
        .status(200)
        .send({ success: true, message: "usuario logueado con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  async me(req, res) {
    try {
      const { user } = req;
      res.status(200).send({ success: true, message: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  async buyGame(req, res){
    try {

      const { title: GameTitle, amount } = req.body;
      const UserId = req.user.id;

      let sale = await Sale.findOne({
        where: {
          UserId,
          GameTitle
        }
      })

      if(sale){

        sale.amount += amount;
        await sale.save();

      } else {

        sale  = await Sale.create({GameTitle, UserId, amount});
      }



      res.status(200).send({ success: true, message: sale });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async claimGame(req, res){
    try {

      const {title: GameTitle} = req.body;
      const UserId = req.user.id;

      if(
        await UserGame.findOne({
          where: {
            UserId,
            GameTitle
          }
        })
      ){
        throw new Error("Ya reclamaste este juego.");
      }

      let sale = await Sale.findOne({
        where: {
          UserId,
          GameTitle
        }
      })

      if(!sale) throw new Error("No tenes el juego comprado.");
      
      if(sale.amount <= 1){
        await sale.destroy();
      }else{
        sale.amount--;
        await sale.save();
      }

      const userGame = UserGame.create({GameTitle, UserId});

      res.status(200).send({ success: true, message: userGame });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async faveUnFave(req, res){
    try {

      const {title: GameTitle} = req.body;
      const UserId = req.user.id;

      const userGame = await UserGame.findOne({
        where: {
          UserId,
          GameTitle
        }
      })

      if(!userGame) throw new Error("No tenes el juego reclamado.");
      await userGame.faveUnFave();

      res.status(200).send({ success: true, message: userGame });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async getAllFavouriteGames(req, res){
    try {
      


      const UserId = req.user.id;


      const favouriteGames = await UserGame.findAll({
        attributes:["GameTitle"], 
        where: {
          UserId,
          favourite:true,
        }
      });

      res.status(200).send({ success: true, message: favouriteGames });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }
}

export default UserControllers;