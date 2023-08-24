const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find({});
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.id })
                .populate('thoughts')
                .populate('friends');
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.id });
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.status(200).json({message: "User deleted!"});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { friends: req.params.friendId } },
                { new: true }
            )
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.status(200).json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.id },
                {$pull: { friends: req.params.friendId }},
                {new: true}
            )
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.status(200).json({message: "Friend deleted!"});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}