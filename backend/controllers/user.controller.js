import User from "../models/users.js";

export const getusersForSidebar = async (req, res) => {
    try {
        const loggedInUsers = req.user._id;

        const filteredUsers = await User.find({_id: {$ne: loggedInUsers}}).select("-password"); //$ne = not equal to in mongoose syntax.

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Issue in getUsersForSidebar', error.message);
        res.status(500).json({error: "Internal server error"});
    }
}