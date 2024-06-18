const Document = require("../../../Model/Document");
const Author = require("../../../Model/Author");

const ShareDocument = async (req, res) => {
  const admin = await Author.findAuthorById(req.admin);
  if (!admin) {
    return res.status(404).json({ message: "Not Authorized" });
  }

  const { documentId, email, permission } = req.body;

  //   try {
  // Validate permission
  const validPermissions = ["edit", "peer", "view"];
  if (!validPermissions.includes(permission)) {
    return res.status(400).json({ message: "Invalid permission" });
  }

  // Find the document
  const document = await Document.getDocument(documentId);
  if (!document) {
    return res.status(404).json({ message: "Document not found" });
  }

  // Check if the admin has access to the document
  const adminHasAccess = document.userList.some(
    (userPermission) =>
      userPermission.id.equals(req.admin) &&
      ["edit", "peer"].includes(userPermission.permissions)
  );
  if (!adminHasAccess) {
    return res
      .status(403)
      .json({ message: "You don't have permission to share this document" });
  }

  // Find the user
  const user = await Author.getDataByEmail( email );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const userId = user._id;

  // Check if the user already has permissions on this document
  const userPermissionIndex = document.userList.findIndex((userPermission) =>
    userPermission.id.equals(userId)
  );
  if (userPermissionIndex !== -1) {
    // Update the permission if user already exists in the list
    document.userList[userPermissionIndex].permissions = permission;
  } else {
    // Add new user with permission
    document.userList.push({ id: userId, permissions: permission });
  }

  // Save the updated document
  await document.save();

  res.status(200).json({ message: "Document shared successfully", document });
  //   } catch (error) {
  //     res.status(500).json({ message: "An error occurred", error });
  //   }
};

module.exports = { ShareDocument };
