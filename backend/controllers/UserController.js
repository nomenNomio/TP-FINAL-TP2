import connection from "../connection/connection.js";
import { User, Role, UserGame, Sale } from "../Models/models.js";
import { genToken } from "../utils/token.js";

const USER_TOKEN_NAME = "token";


class UserControllers {

  static userToken({ id, userName }) {
    const token = genToken({ id, userName });

    return token;
  }

  async getAllUser(req, res) {
    try {
      const { id } = req.user;

      const isAdmin = await User.isAdminByPk(id);
      if (!isAdmin) throw new Error("Necesita ser Administrador para esta consulta.");

      const result = await User.findAll({
        attributes: ["id", "userName", "email", "RoleId"],
        include: {
          model: Role,
          attributes: ["role"],
        },
      });

      res.status(200).send({ success: true, message: result });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const {dataValues: result} = await User.findByPk(id);
      if (!result) throw new Error("Usuario no encontrado.");

      res.status(200).send({ success: true, message: result });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async createUser(req, res) {
    const transactionCreateUser = await connection.transaction();

    try {
      const { name, lastName, userName, email, password, role } = req.body;

      if (role.toUpperCase() == "ADMIN") throw new Error("Rol no valido.");

      const UserResult = await User.create(
        {
          name,
          lastName,
          userName,
          email,
          password,
          role,
        },
        { transaction: transactionCreateUser }
      );

      await transactionCreateUser.commit();

      res.cookie(
        USER_TOKEN_NAME,
        UserControllers.userToken(UserResult.dataValues)
      );
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
      const { id } = req.user;
      const { userName, email, password } = req.body;

      const result = await User.update(
        { userName, email, password },
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
      res.status(400).send({ success: false, message: error.message });
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
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { mail, password } = req.body;

      const user = await User.findOne({
        where: {
          mail,
        },
      });

      if (!user) throw new Error("Usuario no encontrado.");

      //se fija si la contraseña es correcta
      const comparePass = await user.comparePass(password);
      if (!comparePass)
        throw new Error("El usuario o la contraseña son incorrectos.");

      //envia el token
      res.cookie(
        USER_TOKEN_NAME,
        UserControllers.userToken(user.dataValues)
      );
      res
        .status(200)
        .send({ success: true, message: "usuario logueado con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async me(req, res) {
    try {
      const { user } = req;
      res.status(200).send({ success: true, message: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async buyGame(req, res) {
    const transactionSale = await connection.transaction();

    try {
      const { title: GameTitle, amount } = req.body;
      const { id: UserId } = req.user;

      //este metodo esta reescrito en la clase, añade al amount si la "Sale" ya existe.
      const {dataValues: sale} = await Sale.create(
        {
          GameTitle,
          UserId,
          amount,
        },
        { transaction: transactionSale }
      );

      transactionSale.commit();

      res.status(200).send({ success: true, message: sale });
    } catch (error) {
      transactionSale.rollback();
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async claimGame(req, res) {
    const transactionClaimGame = await connection.transaction();

    try {
      const { title: GameTitle } = req.body;
      const { id: UserId } = req.user;

      //reprogramado el create en la clase
      const {dataValues: userGame} = await UserGame.create(
        { UserId, GameTitle },
        { transaction: transactionClaimGame }
      );

      transactionClaimGame.commit();

      res.status(200).send({ success: true, message: userGame });
    } catch (error) {
      transactionClaimGame.rollback();
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async faveUnFave(req, res) {
    //pone el juego pasado en el body como favorito o lo saca de favorito
    const transactionFave = await connection.transaction();

    try {
      const { title: GameTitle } = req.body;
      const { id: UserId } = req.user;

      const userGame = await UserGame.faveUnFave(
        { UserId, GameTitle },
        { transaction: transactionFave }
      );

      res.status(200).send({ success: true, message: userGame });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async getAllFavouriteGames(req, res) {
    try {
      const { id: UserId } = req.user;

      const favouriteGames = await UserGame.findAll({
        attributes: ["GameTitle"],
        where: {
          UserId,
          favourite: true,
        },
      });

      res.status(200).send({ success: true, message: favouriteGames });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }
}

export default UserControllers;