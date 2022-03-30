import { verifyExistingUser } from "../repositories/authRepository.js";
import {
  addUser,
  followUserById,
  verifyFollower,
  unfollowUser,
  checkFollowing,
} from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const user = req.body;
  try {
    const existingUsers = await verifyExistingUser(user.email);
    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await addUser(user, passwordHash);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUser(req, res) {
  const { user } = res.locals;

  res.send({ id: user.id, image: user.image, name: user.name });
}

export async function followUser(req, res) {
  const { user } = res.locals;
  const { followedUserId } = req.body;
  try {
    const { rows: followers } = await verifyFollower(followedUserId, user.id);
    const follower = followers[0];
    if (follower) {
      await unfollowUser(followedUserId, user.id);
      return res.sendStatus(200);
    }
    await followUserById(followedUserId, user.id);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getFollower(req, res) {
  const { user } = res.locals;
  const { id } = req.params;

  try {
    const { rows: followers } = await verifyFollower(id, user.id);
    res.send(followers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function checkFollowings(req, res) {
  const { user } = res.locals;

  try {
    const { rows: result } = await checkFollowing(user.id);
    res.send(result[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
