import { messages } from "@vinejs/vine/defaults";
import { imageValidator } from "../utils/helper.js";

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

      // Check if files are present
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: " is required" });
      }

      // Access the uploaded file
      const profile = req.files.profile;

      // Validate file
      const message = imageValidator(profile?.size, profile.mimetype);
      if (message !== null) {
        return res.status(400).json({ status: 400, message: "Plewwese upload a supported image file" });
      }

      // Optionally, save the file to uploads folder
      await profile.mv(`./uploads/${profile.name}`);

      return res.json({
        status: 200,
        name: profile.name,
        size: profile?.size,
        mime: profile?.mimetype
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async destroy(req, res) {
    // Implement if needed
  }
}

export default ProfileController;
