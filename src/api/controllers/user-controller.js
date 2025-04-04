import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  removeUser
} from '../models/user-model.js';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201).json({ message: 'New user added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedUser = updateUser(userId, updatedData);
    if (updatedUser) {
      res.json({
        message: 'User updated successfully.',
        user: updatedUser
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  const isDeleted = removeUser(userId);

  if (isDeleted) {
    res.json({ message: 'User deleted successfully.' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export { getUser, getUserById, postUser, putUser, deleteUser };