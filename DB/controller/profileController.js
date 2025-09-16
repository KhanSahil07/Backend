import { messages } from "@vinejs/vine/defaults";
import { imageValidator } from "../../utils/helper.js";
import prisma from "../db.config.js";

class ProfileController {

  static async index(req, res) {
    try {
      const user = req.user;
      return res.json({ status: 200, user });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async store(req, res) {
    // Implement if needed
  }

  static async show(req, res) {
    // Implement if needed
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const authUser = req.user;

      console.log("Profile upload - req.file:", req.file);

      // Check if file is present
      if (!req.file) {
        return res.status(400).json({ message: "Profile image is required" });
      }

      // Access the uploaded file
      const profile = req.file;

      console.log("File details:", {
        size: profile.size,
        mimetype: profile.mimetype,
        filename: profile.filename
      });

      // Validate file
      const message = imageValidator(profile?.size, profile.mimetype);
      console.log("Validation message:", message);
      
      if (message !== null) {
        return res.status(400).json({ status: 400, message: message });
      }

      // Update user profile in database
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { profile: profile.path }
      });

      return res.json({
        status: 200,
        message: "Profile updated successfully",
        user: updatedUser
      });

    } catch (error) {
      console.error("Profile update error:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async destroy(req, res) {
    // Implement if needed
  }
}

export default ProfileController;
